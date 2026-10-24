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

  for (const file of mdFiles) {
    const text = fs.readFileSync(path.join(SRC, file), 'utf-8');
    const isEn = file.endsWith('-en.md');
    const title = extractTitle(text, path.basename(file, '.md'));
    const m = file.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = m ? m[1] : '';
    const slug = slugify(path.basename(file, '.md'));

    // cover: first markdown image, else the generated cover in assets/img/covers/
    const firstImg = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
    let cover;
    if (firstImg) cover = routeImg(firstImg[1]);
    else cover = `/img/covers/${slug}.webp`;

    // every body image, for dimension collection
    const bodyImgs = [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((x) => routeImg(x[1]));

    articles.push({
      slug,
      date,
      title,
      lang: isEn ? 'en' : 'zh-CN',
      isEn,
      excerpt: makeExcerpt(text),
      cover,
      bodyImgs,
      mdFile: file,
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

  /* 8. llms.txt (llmstxt.org format) */
  const lines = [
    '> # 出海实操教程 · Going Global Tutorials',
    '> 手把手实操笔记：域名、支付、税号、eSIM 与 AI 工具 —— 全部当天实测，照着做就能上线。',
    '',
  ];
  const zhSorted = sortDesc(articles.filter((a) => !a.isEn));
  const enSorted = sortDesc(articles.filter((a) => a.isEn));
  lines.push(`> ## 中文文章（${zhSorted.length} 篇）`);
  for (const a of zhSorted) lines.push(`> * [${a.title}](${SITE}/posts/${a.slug}.html): ${a.excerpt}`);
  lines.push('');
  lines.push(`> ## English Articles (${enSorted.length})`);
  for (const a of enSorted) lines.push(`> * [${a.title}](${SITE}/posts/${a.slug}.html): ${a.excerpt}`);
  lines.push('');
  fs.writeFileSync(path.join(PUB, 'llms.txt'), lines.join('\n'), 'utf-8');

  console.log(
    `[prebuild] ${articles.length} articles (${manifest.count.zh} zh + ${manifest.count.en} en), ` +
      `${reused} reused WebP assets, ${thumbJobs.length} thumbs via ${manifest.thumb.engine}, ` +
      `llms.txt/ads.txt/_headers written`,
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
