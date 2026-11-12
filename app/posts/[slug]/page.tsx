import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  findArticle,
  coverAbsolute,
  SITE_URL,
  zhArticles,
  enArticles,
  type Article,
} from '@/lib/articles';
import { renderArticleHtml } from '@/lib/markdown';
import { languagesFor } from '@/lib/hreflang-pairs';
import { JsonLd } from '@/components/json-ld';
import { PostEngagement } from '@/components/post-engagement';
import { categoryOf, postsInCategory, postHref } from '@/lib/site-content';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { site } = await import('@/lib/articles');
  return site.articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = findArticle(decodeURIComponent((await params).slug));
  if (!article) return {};

  const canonical = `${SITE_URL}/posts/${article.slug}.html`;
  const cover = coverAbsolute(article);
  const [imgW, imgH] = article.coverSize;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical, languages: languagesFor(article.slug, article.lang, SITE_URL) },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: canonical,
      publishedTime: article.date,
      images: [{ url: cover, width: imgW, height: imgH, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [cover],
    },
  };
}

function blogPostingLd(article: Article, canonical: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    // Always present: falls back to the publish date when the article
    // carries no explicit 更新于/最后核实 marker (never backfilled
    // silently — the visible "最后更新" line still only shows when the
    // marker exists).
    dateModified: article.updated ?? article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    image: [coverAbsolute(article)],
    author: {
      '@type': 'Person',
      name: 'jianyunyi',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: '出海实操教程',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-mark.svg`,
      },
    },
  };
}

/** Home → category (or /articles when uncategorized) → article. */
function breadcrumbLd(article: Article, canonical: string) {
  const cat = categoryOf(article);
  const items = [
    { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
  ];
  if (cat) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: cat.name,
      item: `${SITE_URL}/categories#${cat.key}`,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: '最新文章',
      item: `${SITE_URL}/articles`,
    });
  }
  items.push({
    '@type': 'ListItem',
    position: 3,
    name: article.title,
    item: canonical,
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/** FAQPage from the article's parsed 常见问题 section (prebuild.js).
 *  Only emitted when the section yields real Q&A pairs. */
function faqPageLd(article: Article) {
  if (!article.faq || article.faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/**
 * Related posts: same category, newest first, excluding this article.
 * Every category holds ≥10 posts after the P0 backfill, so this is
 * always 4. Falls back to the newest same-language posts when the
 * article has no category.
 */
function relatedPosts(article: Article): Article[] {
  const cat = categoryOf(article);
  const pool = cat
    ? postsInCategory(cat.key)
    : article.isEn
      ? enArticles()
      : zhArticles();
  return pool.filter((a) => a.slug !== article.slug).slice(0, 4);
}

/** Prev/next in publish order, same language: 上一篇 = published just
 *  before this one, 下一篇 = just after. */
function prevNext(article: Article): { prev?: Article; next?: Article } {
  const list = article.isEn ? enArticles() : zhArticles(); // newest first
  const i = list.findIndex((a) => a.slug === article.slug);
  if (i < 0) return {};
  return { prev: list[i + 1], next: list[i - 1] };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // CJK slugs arrive percent-encoded from the router; slugify() never
  // produces a literal '%', so decoding is safe for ASCII slugs too.
  const article = findArticle(decodeURIComponent((await params).slug));
  if (!article) notFound();

  const html = await renderArticleHtml(article);
  const canonical = `${SITE_URL}/posts/${article.slug}.html`;
  const faqLd = faqPageLd(article);
  const related = relatedPosts(article);
  const { prev, next } = prevNext(article);
  const cat = categoryOf(article);

  return (
    <>
      <JsonLd data={blogPostingLd(article, canonical)} />
      <JsonLd data={breadcrumbLd(article, canonical)} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <article className="post">
        <div className="meta">
          <time dateTime={article.date}>{article.date}</time>
          {article.updated && article.updated !== article.date ? (
            <>
              {' · 最后更新 '}
              <time dateTime={article.updated}>{article.updated}</time>
            </>
          ) : null}
        </div>
        {/* markdown HTML: <h1> + cover + body, images rewritten to /img/*.webp */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      {/* Related + prev/next: every article now links onward (≥3 internal
          links — 4 related + up to 2 neighbours), template-generated. */}
      <nav className="post-related" aria-label="相关推荐">
        <h2>{cat ? `更多${cat.name}实测` : '相关推荐'}</h2>
        <ul>
          {related.map((a) => (
            <li key={a.slug}>
              <Link href={postHref(a)}>{a.title}</Link>
              <span className="post-related-date">{a.date}</span>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="post-nav" aria-label="上下篇">
        {prev ? (
          <Link href={postHref(prev)} className="post-nav-link">
            <span className="post-nav-label">← 上一篇</span>
            <span className="post-nav-title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={postHref(next)} className="post-nav-link post-nav-next">
            <span className="post-nav-label">下一篇 →</span>
            <span className="post-nav-title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
      <PostEngagement slug={article.slug} lang={article.lang} />
    </>
  );
}
