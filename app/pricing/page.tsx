import { CTABand } from '@/components/layout/CTABand';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Hero } from '@/components/sections/Hero';
import { PricingTable } from '@/components/sections/PricingTable';
import { SavingsCalculator } from '@/components/sections/SavingsCalculator';
import { WorkerPriceTable } from '@/components/sections/WorkerPriceTable';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { Section, SectionHeader } from '@/components/ui/Section';
import { foundingOffer, pricingFaq, pricingFaqTitle, pricingHero, pricingSections } from '@/content/pricing';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';
import { softwareApplicationLd } from '@/lib/structuredData';

export const metadata = pageMetadata(seo.pricing);

// Pricing (A8 row 7, B6).
export default function PricingPage() {
  return (
    <>
      <Breadcrumbs name="Pricing" path={seo.pricing.path} />
      <JsonLd data={softwareApplicationLd} />
      <Hero
        size="page"
        eyebrow={pricingHero.eyebrow}
        title={pricingHero.title}
        subtitle={pricingHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={ctas.demo}
      />

      <Section theme="gray" reveal>
        <SectionHeader align="center" title={pricingSections.plansTitle} />
        <div className="mt-8">
          <PricingTable />
        </div>
      </Section>

      <Section theme="light" reveal>
        <SectionHeader title={pricingSections.workersTitle} body={pricingSections.workersSubtitle} />
        <div className="mt-10">
          <WorkerPriceTable />
        </div>
        <p className="mt-6 inline-flex rounded-pill bg-success-soft px-4 py-2 font-semibold text-success-strong">
          {pricingSections.escalated}
        </p>
      </Section>

      <Section theme="gray" id="calculator" reveal>
        <div className="mx-auto max-w-3xl">
          <SavingsCalculator />
        </div>
      </Section>

      <Section theme="light" reveal>
        <div className="relative overflow-hidden rounded-card bg-navy-950 px-6 py-12 text-white md:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-pill bg-blue-500/30 blur-3xl" />
          <div className="relative max-w-text">
            <h2 className="t-h2">{foundingOffer.title}</h2>
            <p className="t-body-l mt-4 text-gray-300">{withPlaceholders(foundingOffer.body)}</p>
            <Button href={foundingOffer.href} className="mt-8">
              {foundingOffer.button}
            </Button>
          </div>
        </div>
      </Section>

      <Section theme="gray" id="faq" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={pricingFaqTitle} />
          <FAQAccordion items={pricingFaq} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
