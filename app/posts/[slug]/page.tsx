import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  findArticle,
  coverAbsolute,
  SITE_URL,
  type Article,
} from '@/lib/articles';
import { renderArticleHtml } from '@/lib/markdown';
import { languagesFor } from '@/lib/hreflang-pairs';
import { JsonLd } from '@/components/json-ld';
import { PostEngagement } from '@/components/post-engagement';

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
    ...(article.updated ? { dateModified: article.updated } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    image: [coverAbsolute(article)],
    author: {
      '@type': 'Organization',
      name: '出海实操教程',
      url: SITE_URL,
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

  return (
    <>
      <JsonLd data={blogPostingLd(article, canonical)} />
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
      <PostEngagement slug={article.slug} lang={article.lang} />
    </>
  );
}
