import { CTABand } from '@/components/layout/CTABand';
import { PlanCards } from '@/components/brain/PlanCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  brainPricingFaq,
  brainPricingFaqTitle,
  brainPricingHero,
  creditsNote,
} from '@/content/brainPricing';
import { pageMetadata, seo } from '@/content/seo';
import { softwareApplicationLd } from '@/lib/structuredData';

export const metadata = pageMetadata(seo.pricing);

/**
 * Pricing, prototype v3. Two plans and one idea: you pay for thinking, not for
 * seats.
 *
 * The old page sold four AI Workers with per-resolution pricing and a savings
 * calculator. Those components are untouched and still serve /workers -- but a
 * merchant arriving at /pricing today is choosing between Free and Pro, and
 * making them read a worker price table first was asking them to price a
 * product we are not currently selling them.
 */
export default function PricingPage() {
  return (
    <>
      <Breadcrumbs name="Pricing" path={seo.pricing.path} />
      <JsonLd data={softwareApplicationLd} />

      <section className="bg-cream pb-12 pt-16 md:pb-16 md:pt-20">
        <div className="container-x mx-auto max-w-text text-center">
          <p className="t-eyebrow text-brand">{brainPricingHero.eyebrow}</p>
          <h1 className="t-h1 mt-3 text-fg">{brainPricingHero.title}</h1>
          <p className="t-body-l mt-5 text-muted-fg">{brainPricingHero.subtitle}</p>
        </div>
      </section>

      <Section theme="cream" className="pt-0 md:pt-0" reveal>
        <PlanCards />
      </Section>

      <Section theme="cream" className="pt-0 md:pt-0" reveal>
        <div className="mx-auto max-w-[920px] rounded-card border border-line bg-white p-6 shadow-card">
          <h2 className="text-h3 font-semibold text-fg">{creditsNote.title}</h2>
          <p className="mt-3 text-muted-fg">{creditsNote.body}</p>
        </div>
      </Section>

      <Section theme="cream" id="faq" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={brainPricingFaqTitle} />
          <FAQAccordion items={brainPricingFaq} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
