#!/usr/bin/env node
/**
 * prebuild — runs before `next build` (wired via npm "prebuild" hook).
 *
 * Responsibilities (repo-relative: every input lives inside this repo):
 *  1. Reuse the WebP assets in assets/img
 *     (including assets/img/covers/ covers) → public/img/.
 *  2. Copy the user logo set (logo-mark.svg, favicons, apple-touch-icon)
 *     from assets/logo → public/.
 *  3. Write ads.txt, _headers (Cloudflare Pages), llms.txt.
 *  4. Scan the dated markdown sources in articles/ → data/articles.json manifest
 *     (slug, date, lang, title, excerpt, cover, per-image width/height).
 *  5. Generate card thumbnails: max-width 640 WebP q70 → public/img/thumbs/
 *     (sharp via npm; sharp is a hard requirement — no fallback).
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'articles');
const ASSETS_IMG = path.join(ROOT, 'assets', 'img');
const LOGO_DIR = path.join(ROOT, 'assets', 'logo');
const PUB = path.join(ROOT, 'public');
const DATA = path.join(ROOT, 'data');

const SITE = 'https://jianyunyi.gv.uy';
const THUMB_WIDTH = 640;
const THUMB_QUALITY = 70;

/* ---------- helpers (ported from build_site.py) ---------- */

function slugify(name) {
  const s = String(name).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'post';
}

function extractTitle(text, fallback) {
  for (const ln of text.split('\n')) {
    const s = ln.trim();
    if (s.startsWith('# ')) return s.slice(2).trim();
  }
  return fallback;
}

/** Plain-text excerpt, ~150 chars, for meta descriptions + llms.txt. */
function makeExcerpt(text, maxLen = 150) {
  const parts = [];
  for (const raw of text.split('\n')) {
    let s = raw.trim();
    if (!s || s.startsWith('# ')) continue;
    s = s
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`>#|>]/g, ' ')
      .replace(/\|/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (s) parts.push(s);
    if (parts.join(' ').length >= maxLen) break;
  }
  let ex = parts.join(' ');
  if (ex.length > maxLen) {
    ex = ex.slice(0, maxLen);
    const lastSpace = ex.lastIndexOf(' ');
    if (lastSpace > maxLen * 0.6) ex = ex.slice(0, lastSpace);
    ex = ex.trim() + '…';
  }
  return ex;
}

/* ---------- categories + FAQ (P0 SEO) ---------- */

/** The site's six topic categories (same keys as lib/site-content.ts CATEGORIES). */
const CATEGORY_KEYS = ['domain-email', 'vps-server', 'tax-id', 'sim-keep', 'payment', 'ai-tools'];

/**
 * Fallback keyword rules over title+slug — the old regex classification.
 * Used ONLY when a post has no explicit `category:` frontmatter.
 * Kept in sync with lib/site-content.ts CATEGORIES[].match.
 */
const CATEGORY_RULES = [
  { key: 'domain-email', match: /域名(邮箱|与)|免费域名|邮箱|Zoho|Forward|is-a\.dev|afraid|Northwest|Freenom/i },
  { key: 'vps-server', match: /VPS|免费云|甲骨文|Oracle|AWS/i },
  { key: 'tax-id', match: /税号(申请|实录|在线|免费)|EIN|TIN|EORI/ },
  { key: 'sim-keep', match: /eSIM|号码|手机号|TextNow|Google Voice|TextFree|Giffgaff|VOXI/i },
  { key: 'payment', match: /Wise|收款|多币种|银行账户|数字银行|开户|境外银行|支付/ },
  { key: 'ai-tools', match: /\bAI\b|智能体|Copilot|赠金|MiMo|Dify|n8n|Flowise|扣子|Coze|会员/i },
];

/**
 * Strip an optional YAML frontmatter block (`---` ... `---`) at the very
 * top of a markdown source. Returns { data, body }; data holds the parsed
 * `key: value` pairs (only `category` is used today).
 * New posts MUST carry `category: <one of the six keys>` here; posts
 * without it fall back to CATEGORY_RULES and are listed in the build log.
 * Mirrored in lib/markdown.ts (render-time strip) — keep the two in sync.
 */
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+?)\s*$/);
    if (kv) data[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '');
  }
  return { data, body: text.slice(m[0].length) };
}

/** Resolve one article's category: explicit frontmatter wins, else keyword rules. */
function resolveCategory(title, slug, explicit) {
  if (explicit) {
    if (CATEGORY_KEYS.includes(explicit)) return { category: explicit, explicit: true };
    console.error(`[prebuild] WARNING: unknown category "${explicit}" — falling back to keyword rules`);
  }
  for (const r of CATEGORY_RULES) {
    if (r.match.test(title) || r.match.test(slug)) return { category: r.key, explicit: false };
  }
  return { category: null, explicit: false };
}

/** Strip markdown inline markup to plain text (for FAQ answers + excerpts). */
function plainText(s) {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract Q&A pairs from a `## ...常见问题...` (or `## FAQ`) section, if any.
 * Real formats in the stock articles:
 *   ### Question?            + paragraph answers
 *   **Q：Question?** / **Q1：...** (+ `A：` answer lines)
 *   - **Question?** answer   (bullet form)
 *   **Question?**answer      (inline bold form)
 * Returns [{ q, a }] with plain-text answers (capped ~500 chars); [] when
 * the section has no parseable Q&A (e.g. risk lists, not questions).
 */
function extractFaq(body) {
  const lines = body.split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].trim();
    if (/^##\s+.*常见问题/.test(h) || /^##\s*FAQ\s*$/.test(h)) { start = i; break; }
  }
  if (start < 0) return [];
  const faqs = [];
  let q = null;
  let buf = [];
  const flush = () => {
    if (!q) return;
    let a = buf.join(' ').replace(/\s+/g, ' ').trim();
    a = a.replace(/^A\s*[：:]\s*/, '');
    if (a) faqs.push({ q: q.trim(), a: a.length > 500 ? a.slice(0, 500) + '…' : a });
    q = null;
    buf = [];
  };
  for (let i = start + 1; i < lines.length; i++) {
    const raw = lines[i];
    if (/^##\s/.test(raw)) break;
    const line = raw.trim();
    let qm = line.match(/^###\s+(.+?)\s*$/);
    if (qm) { flush(); q = qm[1]; continue; }
    qm = line.match(/^\*\*Q\d*\s*[：:]\s*(.+?)\*\*\s*(.*)$/);
    if (qm) { flush(); q = qm[1]; if (qm[2]) buf.push(plainText(qm[2])); continue; }
    qm = line.match(/^-\s*\*\*(.+?[？?])\*\*\s*(.*)$/);
    if (qm) { flush(); q = qm[1]; if (qm[2]) buf.push(plainText(qm[2])); continue; }
    qm = line.match(/^\*\*(.+?[？?])\*\*\s*(.+)$/);
    if (qm) { flush(); q = qm[1]; if (qm[2]) buf.push(plainText(qm[2])); continue; }
    if (q && line) buf.push(plainText(line));
  }
  flush();
  return faqs;
}

/**
 * Route a markdown image path through the same rules as the old site,
 * but site-absolute (Next serves public/ at /):
 *   img/foo/bar.png  →  /img/foo/bar.webp
 */
function routeImg(mdPath) {
  let p = mdPath;
  if (p.startsWith('img/')) p = '/img/' + p.slice(4);
  if (p.toLowerCase().endsWith('.png')) p = p.slice(0, -4) + '.webp';
  return p;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function copyTree(srcDir, destDir) {
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of walk(srcDir)) {
    const rel = path.relative(srcDir, f);
    const dest = path.join(destDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(f, dest);
  }
}

/* ---------- main ---------- */

async function main() {
  if (!fs.existsSync(ASSETS_IMG)) {
    console.error('[prebuild] ERROR: assets/img not found — the WebP assets live there.');
    process.exit(1);
  }
  const oldImg = ASSETS_IMG;

  /* 1. reuse converted WebP assets (incl. generated covers) */
  copyTree(oldImg, path.join(PUB, 'img'));
  const reused = walk(path.join(PUB, 'img')).length;

  /* 1b. cap copied WebP width at 1600px (article column shows <=1200px;
     2560px Microlink screenshots bloat the deploy zip past the Pages
     25 MiB direct-upload limit — 2026-10-23 hreflang deploy was rejected.
     Source files in assets/img stay full-size; only the copies shrink.) */
  try {
    const sharpCap = require('sharp');
    for (const f of walk(path.join(PUB, 'img'))) {
      if (!f.toLowerCase().endsWith('.webp')) continue;
      const meta = await sharpCap(f).metadata();
      if (meta.width && meta.width > 1600) {
        const buf = await sharpCap(f)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        fs.writeFileSync(f, buf);
      }
    }
  } catch (e) {
    console.error('[prebuild] image width-cap step failed (continuing):', e.message);
  }

  /* 2. logo set + favicons */
  for (const name of ['logo-mark.svg', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png']) {
    const src = path.join(LOGO_DIR, name);
    if (!fs.existsSync(src)) {
      console.error(`[prebuild] ERROR: missing logo asset ${name} in ${LOGO_DIR}`);
      process.exit(1);
    }
    fs.copyFileSync(src, path.join(PUB, name));
  }

  /* 3. ads.txt + _headers */
  fs.writeFileSync(
    path.join(PUB, 'ads.txt'),
    'google.com, pub-2161791874458915, DIRECT, f08c47fec0942fa0\n',
    'utf-8',
  );
  fs.writeFileSync(
    path.join(PUB, '_headers'),
    '/img/*\n  Cache-Control: public, max-age=31536000, immutable\n',
    'utf-8',
  );

  /* 4. scan articles */
  const mdFiles = fs
    .readdirSync(SRC)
    .filter((n) => /^2026-.*\.md$/.test(n))
    .sort();
  if (mdFiles.length === 0) {
    console.error('[prebuild] ERROR: no dated markdown sources found in articles/');
    process.exit(1);
  }

  const articles = [];
  const imgDims = {}; // "/img/..." -> [w, h]  (filled in step 5/6)
  const thumbJobs = []; // {src, out}
  const noExplicitCategory = [];
  const noCategoryAtAll = [];
  let faqArticleCount = 0;

  for (const file of mdFiles) {
    const rawText = fs.readFileSync(path.join(SRC, file), 'utf-8');
    // frontmatter (optional `--- category: <key> ---` block) is stripped
    // before every other extraction, so it never leaks into titles,
    // excerpts, images or the rendered article HTML.
    const { data: fm, body: text } = parseFrontmatter(rawText);
    const isEn = file.endsWith('-en.md');
    const title = extractTitle(text, path.basename(file, '.md'));
    const m = file.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = m ? m[1] : '';
    const slug = slugify(path.basename(file, '.md'));
    // updated: optional explicit marker in the md body, e.g. "更新于：2026-10-31"
    // or "最后核实：2026-10-31". Absent marker = no updated date is shown
    // (never backfilled from the publish date).
    const um = text.match(/(?:更新于|最后核实|最后更新)[:：]\s*(\d{4}-\d{2}-\d{2})/);
    const updated = um ? um[1] : undefined;

    // cover: first markdown image, else the generated cover in assets/img/covers/
    const firstImg = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
    let cover;
    if (firstImg) cover = routeImg(firstImg[1]);
    else cover = `/img/covers/${slug}.webp`;

    // every body image, for dimension collection
    const bodyImgs = [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((x) => routeImg(x[1]));

    // category: explicit frontmatter wins; else the keyword rules; else null
    // (null = uncategorized; the build log lists them so they can be backfilled).
    const { category, explicit } = resolveCategory(title, slug, fm.category);
    if (!explicit) noExplicitCategory.push(file);
    if (!category) noCategoryAtAll.push(file);

    // FAQ Q&A pairs from the 常见问题 section, for FAQPage JSON-LD.
    const faq = extractFaq(text);
    if (faq.length) faqArticleCount += 1;

    articles.push({
      slug,
      date,
      updated,
      title,
      lang: isEn ? 'en' : 'zh-CN',
      isEn,
      excerpt: makeExcerpt(text),
      cover,
      bodyImgs,
      mdFile: file,
      category,
      ...(faq.length ? { faq } : {}),
    });
  }

  // validate covers + body images exist among the reused WebP files
  const missing = [];
  for (const a of articles) {
    if (!fs.existsSync(path.join(PUB, a.cover))) missing.push(a.cover);
    for (const p of a.bodyImgs) {
      if (!fs.existsSync(path.join(PUB, p))) missing.push(p);
    }
  }
  const uniqueMissing = [...new Set(missing)];
  if (uniqueMissing.length) {
    console.error('[prebuild] ERROR: referenced images missing from dist/img (was build_site.py run after the articles were added?):');
    for (const p of uniqueMissing) console.error('  ' + p);
    process.exit(1);
  }

  /* 5. thumbnails (max-width 640, WebP q70) — sharp (required) */
  const thumbsDir = path.join(PUB, 'img', 'thumbs');
  fs.mkdirSync(thumbsDir, { recursive: true });
  for (const a of articles) {
    thumbJobs.push({
      src: path.join(PUB, a.cover),
      out: path.join(thumbsDir, a.slug + '.webp'),
    });
  }

  try {
    const sharp = require('sharp');
    for (const job of thumbJobs) {
      await sharp(job.src)
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY, method: 4 })
        .toFile(job.out);
    }
  } catch (err) {
    console.error('[prebuild] ERROR: sharp thumbnail generation failed (sharp is required):', err.message);
    process.exit(1);
  }

  /* 6. dimensions for cover + all body images (for width/height attrs → no CLS) */
  const allImgs = [...new Set([...articles.flatMap((a) => [a.cover, ...a.bodyImgs])])];
  try {
    const sharp = require('sharp');
    for (const p of allImgs) {
      const meta = await sharp(path.join(PUB, p)).metadata();
      imgDims[p] = [meta.width, meta.height];
    }
  } catch (err) {
    console.error('[prebuild] ERROR: sharp image-dimension read failed (sharp is required):', err.message);
    process.exit(1);
  }

  // thumb dims = resized cover dims (aspect preserved)
  for (const a of articles) {
    const [w, h] = imgDims[a.cover];
    if (w > THUMB_WIDTH) {
      a.thumbSize = [THUMB_WIDTH, Math.round((h * THUMB_WIDTH) / w)];
    } else {
      a.thumbSize = [w, h];
    }
    a.coverSize = [w, h];
  }

  /* 7. manifest for the Next build (pages, sitemap, robots import it) */
  fs.mkdirSync(DATA, { recursive: true });
  const manifest = {
    site: SITE,
    generatedAt: new Date().toISOString(),
    count: { zh: articles.filter((a) => !a.isEn).length, en: articles.filter((a) => a.isEn).length },
    thumb: { width: THUMB_WIDTH, quality: THUMB_QUALITY, engine: 'sharp' },
    imgDims,
    articles: articles.map(({ bodyImgs, ...rest }) => rest),
  };
  fs.writeFileSync(path.join(DATA, 'articles.json'), JSON.stringify(manifest, null, 2), 'utf-8');

  /* 8. llms.txt (llmstxt.org format): `#` title, summary as a blockquote,
     `##` sections, `- [title](url): description` items. Only the summary
     is a quote — the old version prefixed EVERY line with `> `, which
     turns the whole file into one blockquote and breaks AI parsers. */
  const SUMMARY =
    '手把手实操笔记：域名、支付、税号、eSIM 与 AI 工具 —— 全部当天实测，照着做就能上线。';
  const llms = [
    '# 出海实操教程 · Going Global Tutorials',
    `> ${SUMMARY}`,
    '> ',
    `> 全文版见 llms-full.txt：${SITE}/llms-full.txt`,
    '',
  ];
  const zhSorted = sortDesc(articles.filter((a) => !a.isEn));
  const enSorted = sortDesc(articles.filter((a) => a.isEn));
  llms.push(`## 中文文章（${zhSorted.length} 篇）`);
  for (const a of zhSorted) llms.push(`- [${a.title}](${SITE}/posts/${a.slug}.html): ${a.excerpt}`);
  llms.push('');
  llms.push(`## English Articles (${enSorted.length})`);
  for (const a of enSorted) llms.push(`- [${a.title}](${SITE}/posts/${a.slug}.html): ${a.excerpt}`);
  llms.push('');
  fs.writeFileSync(path.join(PUB, 'llms.txt'), llms.join('\n'), 'utf-8');

  /* 8b. llms-full.txt: the full text of every article (newest first, zh
     then en), so AI tools can read the tutorials without fetching 179
     pages. Body image paths are rewritten to absolute site URLs. */
  const full = [
    '# 出海实操教程 · Going Global Tutorials — 全文版',
    `> ${SUMMARY}`,
    '> ',
    `> 本文件包含本站全部 ${articles.length} 篇教程的完整正文，按发布倒序排列；单篇摘要见 llms.txt：${SITE}/llms.txt`,
    '',
  ];
  const absImg = (body) =>
    body.replace(/\]\((img\/[^)]+)\)/g, (m, p) => `](${SITE}/${routeImg(p).slice(1)})`);
  for (const a of [...zhSorted, ...enSorted]) {
    const body = fs.readFileSync(path.join(SRC, a.mdFile), 'utf-8');
    const { body: stripped } = parseFrontmatter(body);
    full.push(`## ${a.title}`);
    full.push('');
    full.push(absImg(stripped.trim()));
    full.push('');
  }
  fs.writeFileSync(path.join(PUB, 'llms-full.txt'), full.join('\n'), 'utf-8');

  if (noCategoryAtAll.length) {
    console.error(`[prebuild] WARNING: ${noCategoryAtAll.length} article(s) match no category (add \`category:\` frontmatter):`);
    for (const f of noCategoryAtAll) console.error('  ' + f);
  }

  console.log(
    `[prebuild] ${articles.length} articles (${manifest.count.zh} zh + ${manifest.count.en} en), ` +
      `${reused} reused WebP assets, ${thumbJobs.length} thumbs via ${manifest.thumb.engine}, ` +
      `llms.txt/llms-full.txt/ads.txt/_headers written, ` +
      `${articles.length - noExplicitCategory.length} explicit categories, ` +
      `${faqArticleCount} articles with FAQ, ${noCategoryAtAll.length} uncategorized`,
  );
}

function sortDesc(list) {
  return [...list].sort((a, b) =>
    a.date === b.date ? (a.title < b.title ? 1 : -1) : a.date < b.date ? 1 : -1,
  );
}

main().catch((err) => {
  console.error('[prebuild] fatal:', err);
  process.exit(1);
});
