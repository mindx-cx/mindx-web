import { HubSpotEmbed } from '@/components/forms/HubSpotEmbed';
import { CheckList } from '@/components/sections/CheckList';
import { Hero } from '@/components/sections/Hero';
import { StepList } from '@/components/sections/StepList';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { Section, SectionHeader } from '@/components/ui/Section';
import { designPartners as copy } from '@/content/company';
import { pageMetadata, seo } from '@/content/seo';

export const metadata = pageMetadata(seo.designPartners);

// Design Partner Program (A8 row 11, B9.2). Primary CTA: Apply now.
export default function DesignPartnersPage() {
  return (
    <>
      <Breadcrumbs name="Design Partners" path={seo.designPartners.path} />
      <Hero
        size="page"
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={withPlaceholders(copy.subtitle)}
        primaryCta={{ label: copy.formTitle, href: '#apply' }}
      />

      <Section theme="light" reveal>
        <div className="max-w-text">
          <SectionHeader title={copy.whoTitle} />
          <p className="t-body-l mt-4 text-ink-700">{withPlaceholders(copy.who)}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="t-h3">{copy.getTitle}</h2>
            <CheckList items={copy.get} className="mt-5" />
          </div>
          <div className="rounded-card border border-gray-200 bg-gray-50 p-6 md:p-8">
            <h2 className="t-h3">{copy.askTitle}</h2>
            <CheckList items={copy.ask} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={copy.planTitle} />
        <div className="mt-10">
          <StepList steps={copy.plan} />
        </div>
      </Section>

      <Section theme="light" id="apply" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader title={copy.formTitle} body={copy.formNote} />
          <div className="mt-8 rounded-card border border-gray-200 bg-white p-6 shadow-mock md:p-8">
            <HubSpotEmbed form="designPartner" />
          </div>
        </div>
      </Section>
    </>
  );
}
