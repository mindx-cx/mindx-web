import { CTABand } from '@/components/layout/CTABand';
import { Hero } from '@/components/sections/Hero';
import { IntegrationDirectory } from '@/components/sections/IntegrationDirectory';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { integrationsHero } from '@/content/integrations';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.integrations);

// Integrations (A8 row 9, B8). Primary CTA: Request integration (in the directory).
export default function IntegrationsPage() {
  return (
    <>
      <Breadcrumbs name="Integrations" path={seo.integrations.path} />
      <Hero
        size="page"
        eyebrow={integrationsHero.eyebrow}
        title={integrationsHero.title}
        subtitle={integrationsHero.subtitle}
        primaryCta={{ label: 'Request an integration', href: '#request-integration' }}
        secondaryCta={ctas.brainScan}
      />
      <Section theme="gray">
        <IntegrationDirectory />
      </Section>
      <CTABand />
    </>
  );
}
