import { CTABand } from '@/components/layout/CTABand';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Hero } from '@/components/sections/Hero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { faqPage, globalFaq } from '@/content/faq';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.faq);

// FAQ (A8 row 14, B10.1).
export default function FaqPage() {
  return (
    <>
      <Breadcrumbs name="FAQ" path={seo.faq.path} />
      <Hero
        size="page"
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        subtitle={faqPage.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={ctas.demo}
      />
      <Section theme="gray">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={globalFaq} />
        </div>
      </Section>
      <CTABand />
    </>
  );
}
