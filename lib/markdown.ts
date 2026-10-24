/**
 * Markdown → HTML pipeline (server-side, build time).
 *
 * Ports the old python-markdown config (extensions: extra, sane_lists,
 * nl2br) to remark/rehype:
 *   - remark-gfm     ≈ "extra" (tables, fenced code, strikethrough)
 *   - remark-breaks  ≈ nl2br (single newline → <br>)
 *
 * Plus a custom hast plugin that replicates the old site's image handling:
 *   - img/...  → /img/...  (Next serves public/ at /)
 *   - .png     → .webp     (reuse the pre-converted files)
 *   - body images get loading="lazy" decoding="async" + width/height (no CLS)
 *   - the article cover (first md image, or the PIL-generated cover) is
 *     injected right after the first <h1>, exactly like build_site.py did
 */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import type { Article, SiteManifest } from './articles';
import { site, SRC_DIR } from './articles';

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyNode = any;

function routeImg(mdPath: string): string {
  let p = mdPath;
  if (p.startsWith('img/')) p = '/img/' + p.slice(4);
  if (p.toLowerCase().endsWith('.png')) p = p.slice(0, -4) + '.webp';
  return p;
}

function dimsFor(absPath: string): [number, number] | undefined {
  return (site as SiteManifest).imgDims[absPath];
}

/** hast plugin: fix image srcs, add lazy/decode/size attrs, inject cover. */
function articleImagesPlugin(article: Article) {
  return (tree: AnyNode) => {
    visit(tree, 'element', (node: AnyNode) => {
      if (node.tagName !== 'img') return;
      const src: string = node.properties?.src ?? '';
      // micromark percent-encodes non-ASCII link/image destinations
      // (CommonMark rule) — decode so lookups match the raw file paths.
      const raw = decodeURIComponent(src);
      if (!raw.startsWith('img/')) return; // external or already absolute
      const fixed = routeImg(raw);
      node.properties.src = fixed;
      node.properties.src = fixed;
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';
      const dims = dimsFor(fixed);
      if (dims) {
        node.properties.width = dims[0];
        node.properties.height = dims[1];
      }
    });

    // inject the cover right after the first <h1> (old site behaviour)
    const coverNode: AnyNode = {
      type: 'element',
      tagName: 'img',
      properties: {
        className: ['post-cover'],
        src: article.cover,
        alt: article.title,
        width: article.coverSize[0],
        height: article.coverSize[1],
        decoding: 'async',
      },
      children: [],
    };
    const idx = tree.children.findIndex(
      (n: AnyNode) => n.type === 'element' && n.tagName === 'h1',
    );
    if (idx >= 0) tree.children.splice(idx + 1, 0, coverNode);
    else tree.children.unshift(coverNode);
  };
}

export async function renderArticleHtml(article: Article): Promise<string> {
  const mdPath = path.join(SRC_DIR(), article.mdFile);
  const text = fs.readFileSync(mdPath, 'utf-8');

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(() => articleImagesPlugin(article))
    .use(rehypeStringify);

  const file = await processor.process(text);
  return String(file);
}
