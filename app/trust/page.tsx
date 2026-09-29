import { ClipboardCheck, Code2, Eye, Power, ScrollText, UserCheck } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { AutonomyTable } from '@/components/sections/AutonomyTable';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Hero } from '@/components/sections/Hero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { Section, SectionHeader } from '@/components/ui/Section';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';
import { compliance, safeguards, trustCta, trustHero, trustLevels, whenUnsure, yourData } from '@/content/trust';

export const metadata = pageMetadata(seo.trust);

const safeguardIcons = [Code2, ClipboardCheck, Eye, UserCheck, ScrollText, Power];

// Trust & security (A8 row 8, B7).
export default function TrustPage() {
  return (
    <>
      <Breadcrumbs name="Trust & security" path={seo.trust.path} />
      <Hero
        size="page"
        eyebrow={trustHero.eyebrow}
        title={trustHero.title}
        subtitle={trustHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={{ label: trustCta.button.label, href: trustCta.button.href }}
      />

      <Section theme="light" reveal>
        <SectionHeader title={trustLevels.title} />
        <div className="mt-10">
          <AutonomyTable caption={trustLevels.title} columns={trustLevels.columns} levels={trustLevels.levels} />
        </div>
        <p className="mt-6 font-semibold text-ink-950">{trustLevels.note}</p>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={safeguards.title} />
        <div className="mt-10">
          <FeatureGrid items={safeguards.items.map((item, i) => ({ icon: safeguardIcons[i], title: item.title, body: item.body }))} />
        </div>
      </Section>

      <Section theme="light" reveal>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title={whenUnsure.title} />
            <ul className="mt-8 space-y-3">
              {whenUnsure.items.map((item) => (
                <li key={item.when} className="rounded-btn border border-gray-200 bg-white px-4 py-3">
                  <span className="font-semibold text-ink-950">{item.when}</span>
                  <span aria-hidden="true" className="mx-2 text-blue-600">
                    →
                  </span>
                  <span className="sr-only">: </span>
                  <span className="text-ink-700">{item.then}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader title={yourData.title} />
            <ul className="mt-8 space-y-4">
              {yourData.items.map((item) => (
                <li key={item.title}>
                  <span className="font-semibold text-ink-950">{item.title}</span>{' '}
                  <span className="text-ink-700">{withPlaceholders(item.body)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section theme="gray" reveal>
        <div className="rounded-card border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="t-h3">{compliance.title}</h2>
          <p className="mt-3 text-ink-700">{withPlaceholders(compliance.body)}</p>
        </div>
      </Section>

      <CTABand heading={trustCta.heading} body={trustCta.body} primaryCta={trustCta.button} secondaryCta={ctas.brainScan} />
    </>
  );
}
