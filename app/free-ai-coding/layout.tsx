import HeaderGrowlio from '@/components/templates/smm-agency-landing-page-growlio/Header Growlio';
import FooterGrowlio from '@/components/templates/smm-agency-landing-page-growlio/Footer Growlio';

/**
 * Chrome for /free-ai-coding — identical to app/categories/layout.tsx
 * (the Growlio template Header/Footer the homepage uses), so the
 * section inherits the main site's look with zero new chrome code.
 */
export default function FreeAiCodingLayout({
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
