'use client';

import { usePathname } from 'next/navigation';

/**
 * Sticky segmented header — ported 1:1 from the old site.
 * Nav behaviour is identical to the old build_site.py output:
 *   - homepage (/)  → in-page anchors 中文 / English (#zh / #en)
 *   - article pages → single "← 首页 Home" link back to the index
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/">
          <img
            className="brand-logo"
            src="/logo-mark.svg"
            alt=""
            aria-hidden="true"
            width={34}
            height={34}
          />
          <span className="brand-name">出海实操教程</span>
          <span className="brand-en">Going Global Tutorials</span>
        </a>
        <span className="v-div" aria-hidden="true"></span>
        <nav className="site-nav">
          {isHome ? (
            <>
              <a href="#zh">中文</a>
              <a href="#en">English</a>
            </>
          ) : (
            <a href="/">← 首页 Home</a>
          )}
        </nav>
      </div>
    </header>
  );
}
