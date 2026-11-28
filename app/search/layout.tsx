import HeaderGrowlio from '@/components/templates/smm-agency-landing-page-growlio/Header Growlio';
import FooterGrowlio from '@/components/templates/smm-agency-landing-page-growlio/Footer Growlio';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <><HeaderGrowlio anchorPrefix="/" showHero={false} /><main className="container">{children}</main><FooterGrowlio anchorPrefix="/" /></>;
}
