import type { Metadata } from 'next';
import { site, sortDesc, SITE_URL, type Article } from '@/lib/articles';
import { PostCard } from '@/components/post-card';

export const metadata: Metadata = {
  title: '最新文章 · 出海实操教程',
  description: `本站全部 ${site.articles.length} 篇出海实操教程：域名邮箱、VPS 服务器、税号身份、手机保号、跨境收款与 AI 工具，每篇亲手实测，配真实封面、标题、日期和分步截图，按日期倒序照着做就能办成。`,
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title: '最新文章 · 出海实操教程',
    description: `本站全部 ${site.articles.length} 篇出海实操教程，每篇亲手实测，照着做就能办成。`,
    type: 'website',
    url: `${SITE_URL}/articles`,
  },
};

/** All 61 posts (zh + en), newest first — the same data/articles.json the homepage uses. */
const posts: Article[] = sortDesc(site.articles);
const zhCount = posts.filter((a) => !a.isEn).length;
const enCount = posts.length - zhCount;

export default function ArticlesPage() {
  return (
    <div className="lp-page">
      <section className="lp-hero">
        <span className="lp-kicker">全部 {posts.length} 篇 · 持续更新</span>
        <h1
          className="lp-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
          }}
        >
          最新文章
        </h1>
        <p className="lp-sub">
          域名邮箱、VPS 服务器、税号身份、手机保号、跨境收款与 AI 工具——每篇都亲手实测，配真实封面、标题、日期和分步截图，照着做就能办成。
        </p>
        <p className="lp-stats">
          中文 {zhCount} 篇 · 英文 {enCount} 篇 · 按日期倒序
        </p>
      </section>
      <section aria-label="全部文章">
        <div className="lp-grid">
          {posts.map((a) => (
            <PostCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
