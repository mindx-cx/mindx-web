import { CTABand } from '@/components/layout/CTABand';
import { Hero } from '@/components/sections/Hero';
import { IntegrationDirectory } from '@/components/sections/IntegrationDirectory';
import { StepList } from '@/components/sections/StepList';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  integrationsCta,
  integrationsContext,
  integrationsDepth,
  integrationsHero,
  integrationsPrinciple,
  integrationsSources,
  integrationsStartShopify,
} from '@/content/integrations';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.integrations);

export default function IntegrationsPage() {
  return (
    <>
      <Breadcrumbs name="Integrations" path={seo.integrations.path} />

      {/* Section 1: Hero */}
      <Hero
        size="page"
        eyebrow={integrationsHero.eyebrow}
        title={integrationsHero.title}
        subtitle={integrationsHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={{ label: 'Request an integration', href: '#request-integration' }}
      />

      {/* Section 2: Core Message */}
      <Section theme="gray" reveal>
        <SectionHeader title={integrationsContext.title} body={integrationsContext.body} />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {integrationsSources.map((source) => (
            <span
              key={source}
              className="rounded-card border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-sm"
            >
              {source}
            </span>
          ))}
        </div>
      </Section>

      {/* Section 3: Integration Directory */}
      <Section theme="light" id="integrations-directory">
        <IntegrationDirectory />
      </Section>

      {/* Section 4: Start with Shopify */}
      <Section theme="gray" reveal>
        <SectionHeader title={integrationsStartShopify.title} body={integrationsStartShopify.body} />
        <div className="mt-12">
          <StepList
            steps={integrationsStartShopify.steps.map((s) => ({
              title: s.label,
              body: s.note,
            }))}
          />
        </div>
        <div className="mt-10 text-center">
          <a
            href={ctas.brainScan.href}
            className="inline-flex items-center justify-center rounded-pill bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {ctas.brainScan.label}
          </a>
        </div>
      </Section>

      {/* Section 5: More Context, Better Understanding */}
      <Section theme="light" reveal>
        <SectionHeader title={integrationsDepth.title} body={integrationsDepth.body} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {integrationsDepth.examples.map((ex) => (
            <div key={ex.combo} className="rounded-card border border-gray-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{ex.combo}</p>
              <p className="mt-2 font-medium text-ink-950">{ex.result}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 6: Integration Principle */}
      <Section theme="gray" reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2 text-ink-950">{integrationsPrinciple.title}</h2>
          <p className="mt-4 text-body text-ink-700">{integrationsPrinciple.body}</p>
        </div>
      </Section>

      {/* Section 7: Final CTA */}
      <CTABand heading={integrationsCta.heading} body={integrationsCta.body} secondaryCta={null} />
    </>
  );
}
