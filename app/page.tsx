import { BrainHero } from '@/components/brain/BrainHero';
import { BuildsItself } from '@/components/brain/BuildsItself';
import { DraftCard } from '@/components/brain/DraftCard';
import { IntegrationStrip } from '@/components/brain/IntegrationStrip';
import { KnowsYourStore } from '@/components/brain/KnowsYourStore';
import { ProblemCards } from '@/components/brain/ProblemCards';
import { CTABand } from '@/components/layout/CTABand';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { StepList } from '@/components/sections/StepList';
import { Section, SectionHeader } from '@/components/ui/Section';
import { brainFaq, brainFaqTitle } from '@/content/brainHome';
import { brainExplanation, homeCta, productLoop } from '@/content/home';

/**
 * Home, prototype v3 (2 Oct 2026).
 *
 * The order is the argument: show the brain, say what it is for, show it
 * finding something on its own, show the loop that follows, show the merchant
 * still holding the pen, then answer the objections.
 *
 * Layout and design tokens are the prototype's; the words are the ones Rajesh
 * wrote in content/home.ts, which stays the single owner of them. The old
 * worker-led page (Resolve / Convert / Grow, the savings calculator, the
 * outcome ledger) is gone from here -- those components still serve /workers,
 * so nothing is deleted.
 */
export default function HomePage() {
  return (
    <>
      <BrainHero />
      <IntegrationStrip />

      <Section theme="cream" reveal>
        <SectionHeader title={brainExplanation.title} body={brainExplanation.body} />
      </Section>

      <ProblemCards />

      <Section theme="cream" reveal>
        <SectionHeader title={productLoop.title} />
        <div className="mt-12">
          <StepList steps={productLoop.steps} />
        </div>
      </Section>

      <BuildsItself />
      <DraftCard />

      <Section theme="cream" id="faq" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={brainFaqTitle} />
          <FAQAccordion items={brainFaq} />
        </div>
      </Section>

      <KnowsYourStore />
      <CTABand heading={homeCta.heading} body={homeCta.body} />
    </>
  );
}
