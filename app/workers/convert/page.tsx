import { CTABand } from '@/components/layout/CTABand';
import { CheckList } from '@/components/sections/CheckList';
import { DataTable } from '@/components/sections/DataTable';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { FlowSteps } from '@/components/sections/FlowSteps';
import { Hero } from '@/components/sections/Hero';
import { HeroDemo } from '@/components/sections/HeroDemo';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  convertCta,
  convertFaq,
  convertFaqTitle,
  convertFlow,
  convertHandles,
  convertHero,
  convertPricing,
  convertRules,
} from '@/content/convert';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.convert);

// MindX Convert. The spec (A8 row 4) planned a waitlist page; Convert is live,
// so this follows the Resolve page structure. Sections marked DRAFT in
// content/convert.ts need product confirmation.
export default function ConvertPage() {
  return (
    <>
      <Breadcrumbs name="MindX Convert" path={seo.convert.path} />
      <Hero
        size="page"
        eyebrow={convertHero.eyebrow}
        title={convertHero.title}
        subtitle={convertHero.subtitle}
        primaryCta={ctas.demo}
        secondaryCta={ctas.brainScan}
        visual={<HeroDemo only={['convert']} />}
      />

      <Section theme="light" reveal>
        <SectionHeader title={convertHandles.title} />
        <div className="mt-10">
          <DataTable caption={convertHandles.title} columns={convertHandles.columns} rows={convertHandles.rows} />
        </div>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={convertFlow.title} body={convertFlow.intro} />
        <div className="mt-10">
          <FlowSteps steps={convertFlow.steps} />
        </div>
      </Section>

      <Section theme="light" reveal>
        <SectionHeader title={convertRules.title} />
        <CheckList items={convertRules.rules} className="mt-8 max-w-text" />
      </Section>

      {/* Pricing strip */}
      <Section theme="light" className="pt-0 md:pt-0" reveal>
        <div className="flex flex-col gap-4 rounded-card bg-navy-950 px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-10">
          <p className="t-body-l max-w-3xl">{convertPricing.text}</p>
          <Button href={convertPricing.link.href} variant="ghost" className="shrink-0">
            {convertPricing.link.label}
          </Button>
        </div>
      </Section>

      <Section theme="gray" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={convertFaqTitle} />
          <FAQAccordion items={convertFaq} />
        </div>
      </Section>

      <CTABand heading={convertCta.heading} body="" primaryCta={ctas.demo} secondaryCta={ctas.brainScan} />
    </>
  );
}
