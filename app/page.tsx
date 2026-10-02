import { BrainHero } from '@/components/brain/BrainHero';
import { BuildsItself } from '@/components/brain/BuildsItself';
import { DraftCard } from '@/components/brain/DraftCard';
import { IntegrationStrip } from '@/components/brain/IntegrationStrip';
import { KnowsYourStore } from '@/components/brain/KnowsYourStore';
import { ProblemCards } from '@/components/brain/ProblemCards';
import { CTABand } from '@/components/layout/CTABand';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { brainCta, brainFaq, brainFaqTitle } from '@/content/brainHome';

/**
 * Home, prototype v3 (2 Oct 2026).
 *
 * The order is the argument: show the brain, show it answering, show it finding
 * something on its own, show the merchant still holding the pen, then answer
 * the four objections. The old worker-led page (Resolve / Convert / Grow, the
 * savings calculator, the outcome ledger) sold seats; this one sells the thing
 * that actually works today.
 *
 * Those components are still in the repo and still used by /workers and
 * /pricing, so nothing is deleted here -- the home page simply stops being the
 * place that story is told.
 */
export default function HomePage() {
  return (
    <>
      <BrainHero />
      <IntegrationStrip />
      <BuildsItself />
      <ProblemCards />
      <DraftCard />

      <Section theme="cream" id="faq" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={brainFaqTitle} />
          <FAQAccordion items={brainFaq} />
        </div>
      </Section>

      <KnowsYourStore />
      <CTABand heading={brainCta.heading} body={brainCta.body} />
    </>
  );
}
