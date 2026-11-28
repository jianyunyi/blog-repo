import { SITE_URL, sortDesc, site } from '@/lib/articles';

export const dynamic = 'force-static';

function xml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export function GET() {
  const items = sortDesc(site.articles).map((article) => {
    const link = SITE_URL + '/posts/' + article.slug + '.html';
    const pubDate = new Date(article.date + 'T00:00:00Z').toUTCString();
    return [
      '<item>',
      '<title>' + xml(article.title) + '</title>',
      '<link>' + xml(link) + '</link>',
      '<guid isPermaLink="true">' + xml(link) + '</guid>',
      '<pubDate>' + pubDate + '</pubDate>',
      '<description>' + xml(article.excerpt) + '</description>',
      '</item>',
    ].join('');
  }).join('');
  const body = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<rss version="2.0"><channel>' +
    '<title>出海实操教程</title>' +
    '<link>' + xml(SITE_URL) + '</link>' +
    '<description>手把手实操笔记：域名、支付、税号、eSIM 与 AI 工具。</description>' +
    '<language>zh-CN</language>' + items + '</channel></rss>' + '\n';
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
