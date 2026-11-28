'use client';

import { useMemo, useState } from 'react';
import type { ArticleCardData } from '@/lib/articles';
import { PostCard } from '@/components/post-card';

function sortArticles(articles: ArticleCardData[], order: 'newest' | 'oldest') {
  return [...articles].sort((a, b) => {
    const newestOrder = a.date === b.date ? (a.title < b.title ? 1 : a.title > b.title ? -1 : 0) : a.date < b.date ? 1 : -1;
    return order === 'newest' ? newestOrder : -newestOrder;
  });
}

export function ArticleList({ articles, random = false }: { articles: ArticleCardData[]; random?: boolean }) {
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');
  const sorted = useMemo(() => sortArticles(articles, order), [articles, order]);

  function openRandom() {
    if (!articles.length) return;
    const article = articles[Math.floor(Math.random() * articles.length)];
    window.location.assign('/posts/' + article.slug + '.html');
  }

  return (
    <>
      <div className="article-list-controls">
        <label className="sort-control">排序
          <select value={order} onChange={(event) => setOrder(event.target.value as 'newest' | 'oldest')}>
            <option value="newest">最新</option>
            <option value="oldest">最早</option>
          </select>
        </label>
        {random ? <button className="random-article-button" type="button" onClick={openRandom}>随机一篇</button> : null}
      </div>
      <div className="lp-grid">
        {sorted.map((article) => <PostCard key={article.slug} article={article} />)}
      </div>
    </>
  );
}
