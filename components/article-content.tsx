'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';

type ImageItem = { src: string; alt: string };

export function ArticleContent({ html }: { html: string }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  async function handleClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const copyButton = target.closest<HTMLButtonElement>('.code-copy-button');
    if (copyButton) {
      const code = copyButton.parentElement?.querySelector('pre code')?.textContent ?? '';
      let copied = false;
      try {
        await navigator.clipboard.writeText(code);
        copied = true;
      } catch {
        let textarea: HTMLTextAreaElement | null = null;
        try {
          textarea = document.createElement('textarea');
          textarea.value = code;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          copied = document.execCommand('copy');
        } catch {
          copied = false;
        } finally {
          textarea?.remove();
        }
      }
      copyButton.textContent = copied ? '已复制' : '复制失败';
      window.setTimeout(() => { if (copyButton.isConnected) copyButton.textContent = '复制'; }, 1800);
      return;
    }

    const image = target.closest<HTMLImageElement>('img');
    if (!image) return;
    event.preventDefault();
    const root = event.currentTarget;
    const items = Array.from(root.querySelectorAll('img')).map((item) => ({ src: item.currentSrc || item.src, alt: item.alt }));
    const index = Array.from(root.querySelectorAll('img')).indexOf(image);
    if (index >= 0) {
      setImages(items);
      setImageIndex(index);
    }
  }

  useEffect(() => {
    if (imageIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setImageIndex(null);
      if (event.key === 'ArrowLeft') setImageIndex((index) => index === null ? null : (index + images.length - 1) % images.length);
      if (event.key === 'ArrowRight') setImageIndex((index) => index === null ? null : (index + 1) % images.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.classList.add('lightbox-open');
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('lightbox-open');
    };
  }, [imageIndex, images.length]);

  const current = imageIndex === null ? null : images[imageIndex];
  return (
    <>
      <div className="article-content" onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />
      {current && imageIndex !== null ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="图片预览" onClick={(event) => { if (event.target === event.currentTarget) setImageIndex(null); }}>
          <button className="lightbox-close" type="button" aria-label="关闭图片预览" onClick={() => setImageIndex(null)}>×</button>
          {images.length > 1 ? <button className="lightbox-prev" type="button" aria-label="上一张" onClick={() => setImageIndex((imageIndex + images.length - 1) % images.length)}>‹</button> : null}
          <img src={current.src} alt={current.alt} />
          {images.length > 1 ? <button className="lightbox-next" type="button" aria-label="下一张" onClick={() => setImageIndex((imageIndex + 1) % images.length)}>›</button> : null}
          <span className="lightbox-count">{imageIndex + 1} / {images.length}</span>
        </div>
      ) : null}
    </>
  );
}
