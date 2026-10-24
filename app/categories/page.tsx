import type { Metadata } from 'next';
import { CATEGORIES, postsInCategory } from '@/lib/site-content';
import { SITE_URL } from '@/lib/articles';
import { PostCard } from '@/components/post-card';

/** Six real categories with real counts, computed from data/articles.json
 *  (the same rules the homepage Services cards use). */
const sections = CATEGORIES.map((cat) => ({
  cat,
  posts: postsInCategory(cat.key),
}));
const total = sections.reduce((n, s) => n + s.posts.length, 0);

export const metadata: Metadata = {
  title: '教程分类 · 出海实操教程',
  description: `六大教程分类：${sections.map((s) => s.cat.name).join('、')}，共 ${total} 篇中文实测图文，每篇亲手实测，配真实封面、标题、日期和分步截图，按主题浏览照着做就能办成。`,
  alternates: { canonical: `${SITE_URL}/categories` },
  openGraph: {
    title: '教程分类 · 出海实操教程',
    description: `六大教程分类，共 ${total} 篇中文实测图文，按主题浏览。`,
    type: 'website',
    url: `${SITE_URL}/categories`,
  },
};

export default function CategoriesPage() {
  return (
    <div className="lp-page">
      <section className="lp-hero">
        <span className="lp-kicker">六大主题 · 全部实测</span>
        <h1
          className="lp-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
          }}
        >
          教程分类
        </h1>
        <p className="lp-sub">
          六大主题共 {total} 篇中文实测图文：{sections.map((s) => s.cat.name).join('、')}。每篇都亲手实测，配真实封面、标题、日期和分步截图，照着做就能办成。
        </p>
      </section>
      <nav className="lp-toc" aria-label="分类目录">
        {sections.map(({ cat, posts }) => (
          <a key={cat.key} href={`#${cat.key}`}>
            {cat.name} · {posts.length} 篇
          </a>
        ))}
      </nav>
      {sections.map(({ cat, posts }) => (
        <section key={cat.key} id={cat.key} className="lp-cat">
          <div className="lp-cat-head">
            <h2
            className="lp-cat-name"
            style={{
              fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
            }}
          >
            {cat.name}
          </h2>
            <span className="lp-cat-count">{posts.length} 篇实测</span>
          </div>
          <div className="lp-grid">
            {posts.map((a) => (
              <PostCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ))}
      <p className="lp-note">
        英文教程与其余实测文章（共 61 篇）见{' '}
        <a href="/articles">最新文章</a>。
      </p>
    </div>
  );
}
