import { CircleCheck, Lock, MessageCircle, Plug, ScrollText, SlidersHorizontal, UserCheck } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Hero } from '@/components/sections/Hero';
import { HeroDemo } from '@/components/sections/HeroDemo';
import { InboxBeforeAfter } from '@/components/sections/InboxBeforeAfter';
import { OutcomeLedger } from '@/components/sections/OutcomeLedger';
import { SavingsCalculator } from '@/components/sections/SavingsCalculator';
import { StatCards } from '@/components/sections/StatCards';
import { StepList } from '@/components/sections/StepList';
import { WorkerCards } from '@/components/sections/WorkerCards';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  brainScanCallout,
  hero,
  homeCta,
  homeFaq,
  homeFaqTitle,
  howItWorks,
  meetMindx,
  pricingTeaser,
  problem,
  profit,
  resolveInAction,
  trustStrip,
} from '@/content/home';
import { ctas } from '@/content/site';
import { isWaitlist } from '@/lib/config';

// Home (A8 row 1, B2). Hybrid C rhythm: gradient hero, calm light sections,
// gradient CTA into the navy footer. Every section points back to the Brain Scan.
export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleLead={hero.titleLead}
        titleRotatingPrefix={hero.titleRotatingPrefix}
        titleRotating={hero.titleRotating}
        subtitle={hero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={ctas.demo}
        trustLine={isWaitlist ? hero.trustLineWaitlist : hero.trustLine}
        visual={<HeroDemo />}
      />

      {/* B2.2 Problem strip, with the five questions as a live inbox */}
      <Section theme="light" id="problem" reveal>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title={problem.title} body={problem.body} />
          </div>
          <InboxBeforeAfter />
        </div>
        <div className="mt-12">
          <StatCards items={problem.stats} />
        </div>
      </Section>

      {/* B2.3 Meet MindX: the Brain diagram, then the workers */}
      <Section theme="gray" id="workers" reveal>
        <SectionHeader title={meetMindx.title} body={meetMindx.body} />
        <div className="mt-12">
          <ArchitectureDiagram
            tools={meetMindx.diagram.tools}
            brainChips={meetMindx.diagram.brainChips}
            caption={meetMindx.diagram.caption}
          />
        </div>
        <div className="mt-14">
          <WorkerCards items={meetMindx.workers} />
        </div>
        <div className="mt-8 flex flex-col gap-2 text-small text-ink-700 sm:flex-row sm:gap-8">
          <p className="flex items-center gap-2">
            <Plug className="h-4 w-4 text-blue-600" aria-hidden="true" />
            {meetMindx.integrations}
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-blue-600" aria-hidden="true" />
            {meetMindx.channels}
          </p>
        </div>
      </Section>

      {/* B2.4 How it works */}
      <Section theme="light" id="how-it-works" reveal>
        <SectionHeader title={howItWorks.title} />
        <div className="mt-12">
          <StepList steps={howItWorks.steps} />
        </div>
      </Section>

      {/* B2.5 Resolve in action */}
      <Section theme="gray" reveal>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title={resolveInAction.title} body={resolveInAction.body} />
            <Button href={resolveInAction.link.href} variant="ghost" tone="light" className="mt-6">
              {resolveInAction.link.label}
            </Button>
          </div>
          <ol className="space-y-3 rounded-card border border-gray-200 bg-white p-6">
            {resolveInAction.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-worker-resolve" aria-hidden="true" />
                <span className="text-ink-950">
                  <span className="sr-only">{i + 1}. </span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* B2.6 Profit, not vanity metrics: animated sample ledger */}
      <Section theme="light" reveal>
        <SectionHeader title={profit.title} body={profit.body} />
        <div className="mt-12">
          <OutcomeLedger label={profit.ledgerLabel} tiles={profit.tiles} />
        </div>
      </Section>

      {/* B2.7 Brain Scan callout */}
      <Section theme="light" className="pt-0 md:pt-0" reveal>
        <div className="relative overflow-hidden rounded-card bg-navy-950 px-6 py-12 text-white md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-pill bg-blue-500/30 blur-3xl"
          />
          <div className="relative max-w-text">
            <h2 className="t-h2">{brainScanCallout.title}</h2>
            <p className="t-body-l mt-4 text-gray-300">{brainScanCallout.body}</p>
            <Button href={ctas.brainScan.href} className="mt-8">
              {ctas.brainScan.label}
            </Button>
            <p className="mt-4 text-small text-gray-300">{brainScanCallout.smallPrint}</p>
          </div>
        </div>
      </Section>

      {/* B2.8 Pricing teaser with the live calculator (B6.4) */}
      <Section theme="gray" reveal>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeader title={pricingTeaser.title} body={pricingTeaser.body} />
            <Button href={pricingTeaser.link.href} variant="ghost" tone="light" className="mt-6">
              {pricingTeaser.link.label}
            </Button>
          </div>
          <SavingsCalculator />
        </div>
      </Section>

      {/* B2.9 Trust strip */}
      <Section theme="light" reveal>
        <SectionHeader title={trustStrip.title} />
        <div className="mt-10">
          <FeatureGrid
            columns={4}
            items={[
              { icon: SlidersHorizontal, title: trustStrip.points[0] },
              { icon: UserCheck, title: trustStrip.points[1] },
              { icon: ScrollText, title: trustStrip.points[2] },
              { icon: Lock, title: trustStrip.points[3] },
            ]}
          />
        </div>
        <Button href={trustStrip.link.href} variant="ghost" tone="light" className="mt-8">
          {trustStrip.link.label}
        </Button>
      </Section>

      {/* B2.10 Social proof stays hidden until real quotes exist (content/home.ts). */}

      {/* B2.11 FAQ */}
      <Section theme="gray" id="faq" reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <SectionHeader title={homeFaqTitle} />
          <FAQAccordion items={homeFaq} />
        </div>
      </Section>

      <CTABand heading={homeCta.heading} body={homeCta.body} />
    </>
  );
}
