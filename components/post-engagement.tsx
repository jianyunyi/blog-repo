'use client';

// Per-article engagement block: like button (own Worker + KV counter) and
// Waline comments. Added 2026-10-23. Both backends degrade silently — if
// either is unreachable the rest of the page is unaffected.
import { useEffect, useRef, useState } from 'react';
import { init as walineInit } from '@waline/client';
import '@waline/client/style';

const WALINE_SERVER = 'https://waline-server-three-sooty.vercel.app';
const LIKE_API = 'https://blog-likes.16671100373.workers.dev/';

function LikeButton({ slug, lang }: { slug: string; lang: 'zh-CN' | 'en' }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    try {
      if (window.localStorage.getItem('liked:' + slug) === '1') setLiked(true);
    } catch {
      /* localStorage may be unavailable; server state still loads */
    }
    fetch(LIKE_API + '?slug=' + encodeURIComponent(slug))
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (typeof d.count === 'number') setCount(d.count);
        if (typeof d.liked === 'boolean') setLiked(d.liked);
      })
      .catch(() => {
        /* counter offline: button stays hidden via count === null */
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  const toggle = async () => {
    if (busy || count === null) return;
    setBusy(true);
    const action = liked ? 'unlike' : 'like';
    // optimistic update; rolled back if the POST fails
    setLiked(!liked);
    setCount(count + (liked ? -1 : 1));
    try {
      const r = await fetch(LIKE_API + '?slug=' + encodeURIComponent(slug), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const d = await r.json();
      if (typeof d.count === 'number') setCount(d.count);
      if (typeof d.liked === 'boolean') setLiked(d.liked);
      try {
        window.localStorage.setItem('liked:' + slug, action === 'like' ? '1' : '0');
      } catch {
        /* ignore */
      }
    } catch {
      setLiked(liked);
      setCount(count);
    } finally {
      setBusy(false);
    }
  };

  if (count === null) return null;
  const label = lang === 'en' ? 'Like' : '点赞';
  return (
    <div className="engage-like">
      <button
        type="button"
        className={liked ? 'like-btn liked' : 'like-btn'}
        onClick={toggle}
        disabled={busy}
        aria-pressed={liked}
      >
        <span aria-hidden="true">{liked ? '❤️' : '🤍'}</span> {label} · {count}
      </button>
    </div>
  );
}

function WalineComments({ slug, lang }: { slug: string; lang: 'zh-CN' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const instance = walineInit({
      el: root,
      serverURL: WALINE_SERVER,
      // slug is the stable comment-thread key for the article
      path: slug,
      lang: lang === 'en' ? 'en' : 'zh-CN',
      dark: false,
      reaction: false,
      pageview: false,
      comment: false,
      imageUploader: false,
      search: false,
    });

    // --- Guard: a comment must not be empty or whitespace-only. Waline's
    // own submit check only tests raw length, so spaces alone would pass.
    // Intercept in the capture phase (submit click + Ctrl/Cmd+Enter) before
    // the client's handlers run.
    const hintText =
      lang === 'en'
        ? 'Comment cannot be empty or only spaces.'
        : '评论内容不能为空，也不能只有空格。';
    const showHint = (scope: HTMLElement) => {
      let hint = scope.querySelector<HTMLElement>('.wl-space-hint');
      if (!hint) {
        hint = document.createElement('div');
        hint.className = 'wl-space-hint';
        scope.appendChild(hint);
      }
      hint.textContent = hintText;
    };
    const editorIn = (scope: HTMLElement | null) =>
      scope?.querySelector<HTMLTextAreaElement>('textarea.wl-editor') ?? null;
    const blank = (ed: HTMLTextAreaElement | null) =>
      !!ed && ed.value.trim() === '';
    const onClickCapture = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest?.(
        'button.primary.wl-btn',
      ) as HTMLElement | null;
      if (!btn || !root.contains(btn)) return;
      const form = btn.closest('form') as HTMLElement | null;
      const ed = editorIn(form) ?? editorIn(root);
      if (blank(ed)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showHint(form ?? root);
        ed?.focus();
      }
    };
    const onKeyCapture = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || !(e.ctrlKey || e.metaKey)) return;
      const ed = e.target as HTMLTextAreaElement;
      if (!ed.classList?.contains('wl-editor')) return;
      if (blank(ed)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showHint((ed.closest('form') as HTMLElement | null) ?? root);
      }
    };
    root.addEventListener('click', onClickCapture, true);
    root.addEventListener('keydown', onKeyCapture, true);

    // --- Pin comment times to an absolute snapshot (YYYY-MM-DD HH:mm)
    // instead of Waline's live-ticking relative text. The client renders
    // only relative strings into .wl-time spans and keeps updating them,
    // so we mirror the same list API, flatten it in DOM order, and keep
    // re-writing each span from its stored timestamp.
    let flat: number[] = [];
    let sortBy = 'insertedAt_desc';
    let disposed = false;
    let refetchTimer: ReturnType<typeof setTimeout> | undefined;
    const pad = (n: number) => String(n).padStart(2, '0');
    const fmt = (ms: number) => {
      const d = new Date(ms);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };
    type RawComment = {
      time?: number;
      insertedAt?: string;
      children?: RawComment[];
    };
    const flatten = (items: RawComment[], out: number[]) => {
      for (const c of items) {
        const t =
          typeof c.time === 'number' ? c.time : Date.parse(c.insertedAt ?? '');
        if (!Number.isNaN(t)) out.push(t);
        if (Array.isArray(c.children)) flatten(c.children, out);
      }
    };
    const applyTimes = () => {
      const spans = root.querySelectorAll<HTMLElement>('.wl-time');
      if (!spans.length || spans.length !== flat.length) return;
      spans.forEach((s, i) => {
        const txt = fmt(flat[i]);
        if (s.textContent !== txt) s.textContent = txt;
      });
    };
    const loadTimes = async () => {
      try {
        const r = await fetch(
          `${WALINE_SERVER}/api/comment?path=${encodeURIComponent(slug)}&pageSize=100&page=1&lang=${lang === 'en' ? 'en' : 'zh-CN'}&sortBy=${sortBy}`,
        );
        const j = await r.json();
        if (disposed || j.errno !== 0) return;
        const out: number[] = [];
        flatten((j.data?.data ?? []) as RawComment[], out);
        flat = out;
        applyTimes();
      } catch {
        /* backend hiccup: keep the client's own time text */
      }
    };
    loadTimes();
    // Sort tabs keep a fixed order (Latest / Oldest / Hottest); follow the
    // reader's choice so the timestamp mapping stays aligned.
    const SORTS = ['insertedAt_desc', 'insertedAt_asc', 'like_desc'];
    const onSortClick = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest?.(
        '.wl-sort li, .wl-sort span',
      ) as HTMLElement | null;
      if (!item || !root.contains(item)) return;
      const list = item.closest('ul, .wl-sort');
      if (!list) return;
      const idx = Array.from(list.querySelectorAll('li, span')).indexOf(item);
      if (idx >= 0 && SORTS[idx] && SORTS[idx] !== sortBy) {
        sortBy = SORTS[idx];
        clearTimeout(refetchTimer);
        refetchTimer = setTimeout(loadTimes, 700);
      }
    };
    root.addEventListener('click', onSortClick, false);
    const mo = new MutationObserver(() => {
      applyTimes();
      const n = root.querySelectorAll('.wl-time').length;
      if (n !== flat.length) {
        clearTimeout(refetchTimer);
        refetchTimer = setTimeout(loadTimes, 900);
      }
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true });

    return () => {
      disposed = true;
      mo.disconnect();
      clearTimeout(refetchTimer);
      root.removeEventListener('click', onClickCapture, true);
      root.removeEventListener('keydown', onKeyCapture, true);
      root.removeEventListener('click', onSortClick, false);
      instance?.destroy();
    };
  }, [slug, lang]);

  return <div ref={ref} className="engage-comments" />;
}

export function PostEngagement({
  slug,
  lang,
}: {
  slug: string;
  lang: 'zh-CN' | 'en';
}) {
  return (
    <section className="post-engage">
      <LikeButton slug={slug} lang={lang} />
      <WalineComments slug={slug} lang={lang} />
    </section>
  );
}
