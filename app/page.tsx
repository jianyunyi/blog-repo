"use client";

import HeaderGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Header Growlio";
import AboutUsGrowlio from "@/components/templates/smm-agency-landing-page-growlio/About Us Growlio";
import OurServicesGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Our Services Growlio";
import CaseStudiesGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Case Studies Growlio";
import WhyChooseUsGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Why Choose Us Growlio";
import OurProcessGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Our Process Growlio";
import PricingGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Pricing Growlio";
import TestimonialsGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Testimonials Growlio";
import FAQGrowlio from "@/components/templates/smm-agency-landing-page-growlio/FAQ Growlio";
import FooterGrowlio from "@/components/templates/smm-agency-landing-page-growlio/Footer Growlio";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeaderGrowlio />
      <AboutUsGrowlio />
      <OurServicesGrowlio />
      <CaseStudiesGrowlio />
      <WhyChooseUsGrowlio />
      <OurProcessGrowlio />
      <PricingGrowlio />
      <TestimonialsGrowlio />
      <FAQGrowlio />
      <FooterGrowlio />
    </main>
  );
}
