import type { Metadata } from 'next';
import Script from 'next/script';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jianyunyi.gv.uy'),
  title: '出海实操教程 · Going Global Tutorials',
  description:
    '手把手实操笔记：域名、支付、税号、eSIM 与 AI 工具 —— 全部当天实测，照着做就能上线。',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Fonts are self-hosted via @font-face in styles/globals.css
            (/fonts/*.woff2) — no Google Fonts request, so nothing on the page
            blocks on fonts.googleapis.com (unreachable from mainland China). */}
      </head>
      <body>
        {/* Google AdSense — lazyOnload (2026-10-22 perf pass): the library now
            loads after the page itself, so a stalled Google domain can no longer
            hold up first paint, especially for mainland-China visitors. */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2161791874458915"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Cloudflare Web Analytics — afterInteractive: the beacon loads after
            hydration, so it never blocks first paint (same rationale as the
            AdSense script above). data-cf-beacon carries the JSON config from
            Cloudflare's official snippet. */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "08863491a9a84e9db813d1bb4d82cbdf"}'
          strategy="afterInteractive"
        />
        {/* Blog chrome (SiteHeader/main/SiteFooter) lives in app/posts/layout.tsx;
            the Growlio landing page at / renders its own header/footer. */}
        {children}
      </body>
    </html>
  );
}
