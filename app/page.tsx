import type { Metadata } from 'next';
import HeaderGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Header Growlio";
import AboutUsGrowlio from "@/components/templates/smm-agency-landing-page-growlio/About Us Growlio";
import CsToolBanner from "@/components/cs-tool-banner";
import OurServicesGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Our Services Growlio";
import CaseStudiesGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Case Studies Growlio";
import WhyChooseUsGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Why Choose Us Growlio";
import OurProcessGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Our Process Growlio";
import PricingGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Pricing Growlio";
import TestimonialsGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Testimonials Growlio";
import FAQGrowlio from "@/components/templates/smm-agency-landing-page-growlio/FAQ Growlio";
import FooterGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Footer Growlio";
import { JsonLd } from '@/components/json-ld';
import { SITE_URL } from '@/lib/articles';
import { HOT_POSTS, postHref } from '@/lib/site-content';

/**
 * Server component (was "use client") so the homepage can export metadata
 * and JSON-LD. The eight Growlio sections below are client components
 * (framer-motion), each carrying its own "use client" directive — the page
 * itself only composes them.
 */
export const metadata: Metadata = {
  title: '出海实操教程 · Going Global Tutorials',
  description:
    '出海实操教程：免费域名、免费 VPS、eSIM 保号、跨境收款、税号与 AI 工具——每篇当天亲手实测，域名邮箱、服务器、手机卡与支付全流程图文，零基础照着做就能上线。',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: '出海实操教程 · Going Global Tutorials',
    description:
      '免费域名、免费 VPS、eSIM 保号、跨境收款、税号与 AI 工具——每篇当天亲手实测，照着做就能上线。',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: '出海实操教程 · Going Global Tutorials',
    description:
      '免费域名、免费 VPS、eSIM 保号、跨境收款、税号与 AI 工具——每篇当天亲手实测，照着做就能上线。',
  },
};

const webSiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '出海实操教程',
  alternateName: 'Going Global Tutorials',
  url: SITE_URL,
  inLanguage: 'zh-CN',
  description:
    '手把手实操笔记：域名、支付、税号、eSIM 与 AI 工具 —— 全部当天实测，照着做就能上线。',
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '出海实操教程',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo-mark.svg`,
  },
};

/** The flip-card hot posts shown on the homepage (one per topic). */
const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '热门教程',
  itemListElement: HOT_POSTS.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}${postHref(a)}`,
    name: a.title,
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteLd} />
      <JsonLd data={organizationLd} />
      <JsonLd data={itemListLd} />
      <main className="min-h-screen">
        <HeaderGrowlio />
        <AboutUsGrowlio />
        <CsToolBanner />
        <OurServicesGrowlio />
        <CaseStudiesGrowlio />
        <WhyChooseUsGrowlio />
        <OurProcessGrowlio />
        <PricingGrowlio />
        <TestimonialsGrowlio />
        <FAQGrowlio />
        <FooterGrowlio />
      </main>
    </>
  );
}
