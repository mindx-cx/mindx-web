import { LeadForm } from '@/components/forms/LeadForm';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { HeroBackdrop } from '@/components/sections/Hero';
import { StepList } from '@/components/sections/StepList';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Illustrative } from '@/components/ui/Illustrative';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { Section, SectionHeader } from '@/components/ui/Section';
import { brainScanPage as copy } from '@/content/scanDemo';
import { pageMetadata, seo } from '@/content/seo';

export const metadata = pageMetadata(seo.brainScan);

// Free Brain Scan (A8 row 6, B5). Reachable in live mode; in waitlist mode
// next.config.mjs redirects /brain-scan to /waitlist.
export default function BrainScanPage() {
  return (
    <>
      <Breadcrumbs name="Free Brain Scan" path={seo.brainScan.path} />
      <section className="relative overflow-hidden bg-hero-page pb-24 pt-36 text-white md:pb-32 md:pt-44">
        <HeroBackdrop />
        <div className="container-x relative grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:pt-4">
            <p className="t-eyebrow text-mint-400">{copy.eyebrow}</p>
            <h1 className="t-h1 mt-4">{copy.title}</h1>
            <p className="t-body-l mt-5 text-blue-50">{copy.subtitle}</p>
            <p className="mt-6 text-small text-gray-300">{copy.trustLine}</p>
          </div>
          <div className="rounded-card bg-white p-6 text-ink-950 shadow-mock md:p-8">
            <LeadForm type="brain_scan" />
          </div>
        </div>
      </section>

      <Section theme="light" reveal>
        <SectionHeader title={copy.reportTitle} />
        <ul className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.report.map((card) => (
            <li key={card.title} className="relative rounded-card border border-gray-200 bg-white p-6">
              <Illustrative label={copy.reportLabel} />
              <p className="t-eyebrow text-blue-600">{card.title}</p>
              <p className="mt-3 text-ink-950">{withPlaceholders(card.text)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={copy.stepsTitle} />
        <div className="mt-10">
          <StepList steps={copy.steps} />
        </div>
      </Section>

      <Section theme="light" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={copy.faqTitle} />
          <FAQAccordion items={copy.faq} />
        </div>
      </Section>
    </>
  );
}
