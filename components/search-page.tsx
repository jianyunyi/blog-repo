'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

type SearchArticle = { slug: string; title: string; excerpt: string; keywords: string[]; date: string; category?: string | null; isEn: boolean };
type SearchIndex = { articles: SearchArticle[]; hotTerms: string[] };

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const at = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (at < 0) return <>{text}</>;
  return <>{text.slice(0, at)}<mark>{text.slice(at, at + query.length)}</mark>{text.slice(at + query.length)}</>;
}

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchIndex>({ articles: [], hotTerms: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get('q') ?? '');
    fetch('/search-index.json').then((response) => response.ok ? response.json() : null).then((data: SearchIndex | null) => {
      if (data) setIndex(data);
      setLoaded(true);
    }).catch(() => { setIndex({ articles: [], hotTerms: [] }); setLoaded(true); });
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return [];
    return index.articles.filter((article) =>
      [article.title, article.excerpt, ...article.keywords, article.category ?? '']
        .some((value) => value.toLocaleLowerCase().includes(q)),
    ).sort((a, b) => b.date.localeCompare(a.date) || b.title.localeCompare(a.title));
  }, [index, query]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.pathname + url.search);
  }

  return (
    <div className="lp-page search-page">
      <section className="lp-hero">
        <span className="lp-kicker">站内检索</span>
        <h1 className="lp-title">搜索教程</h1>
        <p className="lp-sub">按标题、摘要与标题关键词查找本站文章。</p>
      </section>
      <form className="search-form" onSubmit={submit} role="search">
        <label className="search-label" htmlFor="site-search">搜索文章</label>
        <div className="search-input-row">
          <input id="site-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入关键词" autoComplete="off" />
          <button type="submit">搜索</button>
        </div>
      </form>
      <div className="search-hot" aria-label="热门搜索词">
        <span>热门搜索</span>
        {index.hotTerms.map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}
      </div>
      {query.trim() ? !loaded ? <p className="search-prompt">正在加载索引…</p> : (
        <section className="search-results" aria-live="polite">
          <h2>搜索结果（{results.length}）</h2>
          {results.length ? <ul>{results.map((article) => (
            <li key={article.slug}>
              <a href={'/posts/' + article.slug + '.html'}><Highlight text={article.title} query={query.trim()} /></a>
              <time dateTime={article.date}>{article.date}</time>
              <p><Highlight text={article.excerpt} query={query.trim()} /></p>
            </li>
          ))}</ul> : <p>没有找到匹配文章，试试其他关键词。</p>}
        </section>
      ) : <p className="search-prompt">输入关键词开始搜索。</p>}
    </div>
  );
}
