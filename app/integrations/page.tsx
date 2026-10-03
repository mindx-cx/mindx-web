import { CTABand } from '@/components/layout/CTABand';
import { IntegrationCard } from '@/components/sections/IntegrationCards';
import { IntegrationRoadmap } from '@/components/sections/IntegrationRoadmap';
import { PageHero } from '@/components/sections/PageHero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import {
  byLevel,
  integrationsCta,
  integrationsHero,
  integrationsStart,
  integrationsTrust,
  levels,
  type Level,
} from '@/content/integrations';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.integrations);

function LevelHeader({ level }: { level: Level }) {
  return (
    <div className="max-w-text">
      <h2 className="t-h2 text-fg">{levels[level].title}</h2>
      <p className="mt-3 text-[16px] text-muted-fg">{levels[level].body}</p>
    </div>
  );
}

// Integrations (B8). CHANGED 3 Oct 2026 (Rajesh): three honest levels from an
// audit of the AWS product -- the Brain reads it (Shopify), AI support replies
// (beta), and on the way -- in place of one 42-card directory where 8 were
// marked live. Light cream page like Home.
export default function IntegrationsPage() {
  const [shopify] = byLevel('brain');

  return (
    <>
      <Breadcrumbs name="Integrations" path={seo.integrations.path} />

      <PageHero
        eyebrow={integrationsHero.eyebrow}
        title={integrationsHero.title}
        subtitle={integrationsHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={integrationsHero.secondaryCta}
      />

      {/* Level 1: the Brain reads it */}
      <Section theme="cream" className="pt-0 md:pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <LevelHeader level="brain" />
          <ul>
            <IntegrationCard item={shopify} large />
          </ul>
        </div>
      </Section>

      {/* Level 2: AI support replies (beta) */}
      <Section theme="cream2" className="border-t border-line">
        <LevelHeader level="support" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {byLevel('support').map((item) => (
            <IntegrationCard key={item.name} item={item} />
          ))}
        </ul>
      </Section>

      {/* How to start */}
      <Section theme="cream" className="border-t border-line">
        <h2 className="t-h2 text-fg">{integrationsStart.title}</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {integrationsStart.steps.map((step, i) => (
            <li key={step.title} className="rounded-card border border-line bg-white p-6 shadow-card">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-brand text-[14px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[17px] font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-[15px] text-muted-fg">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-small text-muted-fg">{integrationsTrust}</p>
      </Section>

      {/* Level 3: on the way, and the request form */}
      <Section theme="cream2" className="border-t border-line">
        <LevelHeader level="soon" />
        <div className="mt-10">
          <IntegrationRoadmap />
        </div>
      </Section>

      <CTABand heading={integrationsCta.heading} body={integrationsCta.body} secondaryCta={null} />
    </>
  );
}
