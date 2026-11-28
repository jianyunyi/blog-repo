import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/articles';
import { SearchPage } from '@/components/search-page';

export const metadata: Metadata = {
  title: '站内搜索 · 出海实操教程',
  description: '搜索本站的实操教程。',
  alternates: { canonical: SITE_URL + '/search' },
};

export default function SearchRoute() {
  return <SearchPage />;
}
