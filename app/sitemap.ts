import type { MetadataRoute } from 'next';
import { site, SITE_URL } from '@/lib/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = site.articles.map((a) => ({
    url: `${SITE_URL}/posts/${a.slug}.html`,
    lastModified: a.date,
    changeFrequency: 'weekly' as const,
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
    ...posts,
  ];
}
