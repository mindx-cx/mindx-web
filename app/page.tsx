import Link from 'next/link';
import { BrainHero } from '@/components/brain/BrainHero';
import { BuildsItself } from '@/components/brain/BuildsItself';
import { DraftCard } from '@/components/brain/DraftCard';
import { IntegrationStrip } from '@/components/brain/IntegrationStrip';
import { KnowsYourStore } from '@/components/brain/KnowsYourStore';
import { ProblemCards } from '@/components/brain/ProblemCards';
import { CTABand } from '@/components/layout/CTABand';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { brainFaq, brainFaqTitle, howTeaser } from '@/content/brainHome';
import { brainExplanation, homeCta } from '@/content/home';

/**
 * Home, prototype v3 (2 Oct 2026).
 *
 * The order is the argument: show the brain, say what it is for, show it
 * finding something on its own, point to how it works, show the merchant
 * still holding the pen, then answer the objections.
 *
 * CHANGED 3 Oct 2026: sections alternate cream and cream-2 so the page has a
 * rhythm instead of one flat colour, and a short "See how it works" teaser
 * replaces the four text steps that repeated the How it works page.
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

      <ProblemCards theme="cream2" />

      <Section theme="cream" reveal>
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <h2 className="t-h2 max-w-text text-fg">{howTeaser.title}</h2>
          <Link href={howTeaser.link.href} className="text-[15px] font-medium text-brand hover:underline">
            {howTeaser.link.label} →
          </Link>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {howTeaser.steps.map((step) => (
            <li key={step.title} className="rounded-card border border-line bg-white p-6 shadow-card">
              <p className="font-display text-[22px] text-fg">{step.title}</p>
              <p className="mt-2 text-[15px] text-muted-fg">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <BuildsItself theme="cream2" />
      <DraftCard />

      <Section theme="cream2" id="faq" className="border-y border-line" reveal>
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
