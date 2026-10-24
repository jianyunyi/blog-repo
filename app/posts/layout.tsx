import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

/**
 * Blog chrome for /posts/* article routes. Moved here from the root layout
 * so the Growlio landing page (app/page.tsx) renders without the blog
 * header/footer, while article pages keep the original DOM structure
 * (SiteHeader / <main class="container"> / SiteFooter).
 */
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container">{children}</main>
      <SiteFooter />
    </>
  );
}
