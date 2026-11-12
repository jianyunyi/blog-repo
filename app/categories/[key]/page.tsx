import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, postsInCategory } from '@/lib/site-content';
import { CATEGORY_PAGES } from '@/lib/category-pages';
import { SITE_URL } from '@/lib/articles';
import { PostCard } from '@/components/post-card';
import { JsonLd } from '@/components/json-ld';

/**
 * Per-category landing pages (P1 SEO): one real URL per category,
 * e.g. /categories/sim-keep. Each page carries an original intro
 * (300–500 chars, grounded in the category's real articles — see
 * lib/category-pages.ts), a FAQ section, and the full article list.
 * Counts come from data/articles.json at build time — never hardcoded.
 */

export function generateStaticParams(): { key: string }[] {
  return CATEGORIES.map((c) => ({ key: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const cat = CATEGORIES.find((c) => c.key === key);
  if (!cat) return {};
  const posts = postsInCategory(key);
  const intro = CATEGORY_PAGES[key]?.intro[0] ?? '';
  const description = `${cat.name}实测教程 ${posts.length} 篇：${intro.slice(0, 110)}…`;
  const canonical = `${SITE_URL}/categories/${key}`;
  return {
    title: `${cat.name} · 出海实操教程`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${cat.name} · 出海实操教程`,
      description,
      type: 'website',
      url: canonical,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const cat = CATEGORIES.find((c) => c.key === key);
  const content = CATEGORY_PAGES[key];
  if (!cat || !content) notFound();
  const posts = postsInCategory(key);
  const canonical = `${SITE_URL}/categories/${key}`;

  const collectionPageLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} · 出海实操教程`,
    description: `${cat.name}实测教程 ${posts.length} 篇，每篇亲手实测，配真实封面、标题、日期和分步截图。`,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: '出海实操教程',
      url: SITE_URL,
    },
  };

  const faqPageLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '教程分类', item: `${SITE_URL}/categories` },
      { '@type': 'ListItem', position: 3, name: cat.name, item: canonical },
    ],
  };

  return (
    <div className="lp-page">
      <JsonLd data={collectionPageLd} />
      <JsonLd data={faqPageLd} />
      <JsonLd data={breadcrumbLd} />
      <section className="lp-hero">
        <span className="lp-kicker">教程分类 · 全部实测</span>
        <h1
          className="lp-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
          }}
        >
          {cat.name}
        </h1>
        <p className="lp-sub">
          {cat.name}实测教程共 {posts.length} 篇，每篇都亲手实测，配真实封面、标题、日期和分步截图，照着做就能办成。
        </p>
      </section>
      <section className="lp-intro" aria-label="分类导读">
        {content.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
      <section className="lp-faq" aria-label="常见问题">
        <h2
          className="lp-faq-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
          }}
        >
          常见问题
        </h2>
        {content.faq.map(({ q, a }) => (
          <div key={q} className="lp-faq-item">
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </section>
      <section className="lp-cat">
        <div className="lp-cat-head">
          <h2
            className="lp-cat-name"
            style={{
              fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
            }}
          >
            全部{cat.name}实测
          </h2>
          <span className="lp-cat-count">{posts.length} 篇实测</span>
        </div>
        <div className="lp-grid">
          {posts.map((a) => (
            <PostCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <p className="lp-note">
        回到 <a href="/categories">全部教程分类</a>，或按日期浏览 <a href="/articles">最新文章</a>。
      </p>
    </div>
  );
}
