#!/usr/bin/env node
/**
 * postbuild — runs after `next build` (wired via npm "postbuild" hook).
 *
 * Next.js App Router has a single root <html> element, so the static export
 * stamps every page with the root layout's lang. The old site used
 * lang="en" on the 8 English articles and lang="zh-CN" everywhere else;
 * this pass restores the correct attribute on the exported English pages
 * (English slugs all end in "-en").
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, '..', 'out');

function main() {
  if (!fs.existsSync(OUT)) {
    console.error('[postbuild] ERROR: out/ not found — did `next build` succeed?');
    process.exit(1);
  }
  const postsDir = path.join(OUT, 'posts');
  if (!fs.existsSync(postsDir)) {
    console.error('[postbuild] ERROR: out/posts not found');
    process.exit(1);
  }

  let fixed = 0;
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith('-en.html')) continue;
    const full = path.join(postsDir, file);
    let html = fs.readFileSync(full, 'utf-8');
    if (html.includes('<html lang="zh-CN">')) {
      html = html.replace('<html lang="zh-CN">', '<html lang="en">', 1);
      fs.writeFileSync(full, html, 'utf-8');
      fixed += 1;
    }
  }
  console.log(`[postbuild] lang="en" restored on ${fixed} English article pages`);

  /* Second-level listing pages (/articles, /categories): with
     output:'export' + trailingSlash:false, Next writes them as flat
     out/<name>.html. The site links them as clean URLs (/articles,
     /categories), so publish each as a directory index file — the
     form every static host (Cloudflare Pages included) serves at the
     clean path. */
  for (const name of ['articles', 'categories']) {
    const flat = path.join(OUT, `${name}.html`);
    const index = path.join(OUT, name, 'index.html');
    if (!fs.existsSync(flat)) {
      console.error(`[postbuild] WARNING: ${name}.html not found in out/`);
      continue;
    }
    fs.mkdirSync(path.join(OUT, name), { recursive: true });
    fs.renameSync(flat, index);
    console.log(`[postbuild] ${name}.html → ${name}/index.html (clean URL)`);
  }
}

main();
