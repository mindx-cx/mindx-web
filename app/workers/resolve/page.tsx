import { MessageCircle } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { AutonomyTable } from '@/components/sections/AutonomyTable';
import { CheckList } from '@/components/sections/CheckList';
import { DataTable } from '@/components/sections/DataTable';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { FlowSteps } from '@/components/sections/FlowSteps';
import { Hero } from '@/components/sections/Hero';
import { HeroDemo } from '@/components/sections/HeroDemo';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Illustrative } from '@/components/ui/Illustrative';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  resolveAutonomy,
  resolveChannels,
  resolveCta,
  resolveFaq,
  resolveFaqTitle,
  resolveFlow,
  resolveHandles,
  resolveHero,
  resolvePricing,
  resolveProactive,
  resolveRules,
} from '@/content/resolve';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';
import { softwareApplicationLd } from '@/lib/structuredData';

export const metadata = pageMetadata(seo.resolve);

// MindX Resolve (A8 row 3, B4.1). Primary CTA: Book a demo.
export default function ResolvePage() {
  return (
    <>
      <Breadcrumbs name="MindX Resolve" path={seo.resolve.path} />
      <JsonLd data={softwareApplicationLd} />
      <Hero
        size="page"
        eyebrow={resolveHero.eyebrow}
        title={resolveHero.title}
        subtitle={resolveHero.subtitle}
        primaryCta={ctas.demo}
        secondaryCta={ctas.brainScan}
        visual={<HeroDemo only={['resolve']} />}
      />

      <Section theme="light" reveal>
        <SectionHeader title={resolveHandles.title} />
        <div className="mt-10">
          <DataTable caption={resolveHandles.title} columns={resolveHandles.columns} rows={resolveHandles.rows} />
        </div>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={resolveFlow.title} body={resolveFlow.intro} />
        <div className="mt-10">
          <FlowSteps steps={resolveFlow.steps} />
        </div>
      </Section>

      <Section theme="light" reveal>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader title={resolveProactive.title} body={resolveProactive.body} />
          <ol className="relative space-y-3 rounded-card border border-gray-200 bg-white p-6">
            <Illustrative />
            {resolveProactive.mock.map((item, i) => (
              <li key={item.label} className="flex items-start gap-4 pt-1">
                <span className="flex flex-col items-center self-stretch">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-gray-50 text-small font-semibold text-ink-700"
                  >
                    {i + 1}
                  </span>
                  {i < resolveProactive.mock.length - 1 && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-gray-200" />}
                </span>
                <span className="pb-3">
                  <Chip tone={item.tone as 'warning' | 'info' | 'success'}>{item.label}</Chip>
                  <span className="mt-1.5 block text-ink-950">{item.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={resolveAutonomy.title} />
        <div className="mt-10">
          <AutonomyTable
            caption={resolveAutonomy.title}
            columns={resolveAutonomy.columns}
            levels={resolveAutonomy.levels.map((l) => ({ name: l.mode, cells: [l.what, l.best] }))}
          />
        </div>
      </Section>

      <Section theme="light" reveal>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title={resolveRules.title} />
            <CheckList items={resolveRules.rules} className="mt-8" />
          </div>
          <div>
            <SectionHeader title={resolveChannels.title} />
            <ul className="mt-8 flex flex-wrap gap-2">
              {resolveChannels.channels.map((channel) => (
                <li
                  key={channel}
                  className="inline-flex items-center gap-2 rounded-pill border border-gray-200 bg-white px-4 py-2 font-medium"
                >
                  <MessageCircle className="h-4 w-4 text-worker-resolve" aria-hidden="true" />
                  {channel}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-ink-700">{resolveChannels.helpdesks}</p>
          </div>
        </div>
      </Section>

      {/* Pricing strip */}
      <Section theme="light" className="pt-0 md:pt-0" reveal>
        <div className="flex flex-col gap-4 rounded-card bg-navy-950 px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-10">
          <p className="t-body-l max-w-3xl">{resolvePricing.text}</p>
          <Button href={resolvePricing.link.href} variant="ghost" className="shrink-0">
            {resolvePricing.link.label}
          </Button>
        </div>
      </Section>

      <Section theme="gray" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={resolveFaqTitle} />
          <FAQAccordion items={resolveFaq} />
        </div>
      </Section>

      <CTABand heading={resolveCta.heading} body="" primaryCta={ctas.demo} secondaryCta={ctas.brainScan} />
    </>
  );
}
