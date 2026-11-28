'use client';

import { useEffect, useState } from 'react';
import type { ArticleHeading } from '@/lib/markdown';

export function Toc({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    if (!headings.length) return;
    const nodes = headings.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-15% 0px -72% 0px', threshold: 0 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  const links = headings.map((heading) => (
    <li key={heading.id} className={heading.level === 3 ? 'toc-level-3' : undefined}>
      <a className={activeId === heading.id ? 'is-active' : undefined} href={'#' + encodeURIComponent(heading.id)}>{heading.title}</a>
    </li>
  ));
  return (
    <>
      <aside className="article-toc article-toc-desktop" aria-label="文章目录">
        <p>文章目录</p>
        <ol>{links}</ol>
      </aside>
      <details className="article-toc article-toc-mobile">
        <summary>文章目录（{headings.length}）</summary>
        <ol>{links}</ol>
      </details>
    </>
  );
}
