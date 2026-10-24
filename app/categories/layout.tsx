import HeaderGrowlio from '@/components/templates/smm-agency-landing-page-growlio/Header Growlio';
import FooterGrowlio from '@/components/templates/smm-agency-landing-page-growlio/Footer Growlio';

/**
 * Chrome for /categories — the Growlio template Header/Footer the
 * homepage (app/page.tsx) uses, replacing the old blog chrome
 * (SiteHeader / <main class="container"> / SiteFooter) so the page
 * matches the homepage visually. DOM structure is unchanged:
 * Header / <main class="container"> / Footer.
 * anchorPrefix='/' rewrites the template's in-page anchors ('#faq')
 * to point home ('/#faq') from this route; the homepage passes
 * nothing and keeps its in-page anchors.
 */
export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderGrowlio anchorPrefix="/" showHero={false} />
      <main className="container">{children}</main>
      <FooterGrowlio anchorPrefix="/" />
    </>
  );
}
