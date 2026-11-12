import type { MetadataRoute } from 'next';
import { site, SITE_URL } from '@/lib/articles';
import { CATEGORIES } from '@/lib/site-content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = site.articles.map((a) => ({
    url: `${SITE_URL}/posts/${a.slug}.html`,
    lastModified: a.date,
    changeFrequency: 'weekly' as const,
  }));
  // Per-category landing pages (P1 SEO): one real URL per category.
  const categoryPages = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/categories/${c.key}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...categoryPages,
    ...posts,
  ];
}
