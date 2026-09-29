import { Ban, CircleDollarSign, Headset, Package, ShoppingCart, Store, Truck, Users } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Hero } from '@/components/sections/Hero';
import { HeroDemo } from '@/components/sections/HeroDemo';
import { TypingPrompts } from '@/components/sections/TypingPrompts';
import { Chip } from '@/components/ui/Chip';
import { Illustrative } from '@/components/ui/Illustrative';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { Section, SectionHeader } from '@/components/ui/Section';
import { WorkerTile } from '@/components/ui/WorkerTile';
import {
  brainAiTools,
  brainCta,
  brainHero,
  brainHow,
  brainIsNot,
  brainLedger,
  brainModes,
  brainQuestions,
  brainUnderstands,
} from '@/content/brain';
import { meetMindx } from '@/content/home';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.brain);

const areaIcons = [Store, Users, Package, ShoppingCart, Headset, Truck, CircleDollarSign];

// MindX Brain (A8 row 2, B3).
export default function BrainPage() {
  return (
    <>
      <Breadcrumbs name="MindX Brain" path={seo.brain.path} />
      <Hero
        size="page"
        eyebrow={brainHero.eyebrow}
        title={brainHero.title}
        subtitle={brainHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={brainHero.secondaryCta}
        visual={<HeroDemo only={['brain']} />}
      />

      {/* B3.2 How the Brain works */}
      <Section theme="gray" id="how-it-works" reveal>
        <SectionHeader title={brainHow.title} body={brainHow.body} />
        <div className="mt-12">
          <ArchitectureDiagram
            tools={meetMindx.diagram.tools}
            brainChips={meetMindx.diagram.brainChips}
            caption={meetMindx.diagram.caption}
          />
        </div>
      </Section>

      {/* B3.3 What the Brain understands */}
      <Section theme="light" reveal>
        <SectionHeader title={brainUnderstands.title} />
        <div className="mt-10">
          <FeatureGrid
            columns={4}
            items={brainUnderstands.rows.map((row, i) => ({ icon: areaIcons[i], title: row.area, body: row.knows }))}
          />
        </div>
      </Section>

      {/* B3.4 Three ways to use it */}
      <Section theme="gray" reveal>
        <SectionHeader title={brainModes.title} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {brainModes.modes.map((mode) => (
            <li key={mode.name} className="flex flex-col rounded-card border border-gray-200 bg-white p-6">
              <p className="t-h3">{mode.name}</p>
              <p className="mt-2 flex-1 text-ink-700">{mode.body}</p>
              <p className="mt-5 rounded-btn border border-gray-200 bg-gray-50 px-4 py-3 text-small text-ink-950">
                <span className="sr-only">Example: </span>“{mode.example}”
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* B3.6 Questions the Brain answers */}
      <Section theme="light" reveal>
        <SectionHeader title={brainQuestions.title} />
        <div className="mt-10 max-w-4xl">
          <TypingPrompts questions={brainQuestions.questions} />
        </div>
      </Section>

      {/* B3.7 The outcome ledger */}
      <Section theme="gray" reveal>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader title={brainLedger.title} body={brainLedger.body} />
          <div className="relative rounded-card border border-gray-200 bg-white p-6">
            <Illustrative />
            <div className="flex items-center gap-3">
              <WorkerTile worker="resolve" size="sm" />
              <p className="font-semibold">Outcome ledger</p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {brainLedger.example.map((item, i) => (
                <div
                  key={item.label}
                  className={i === brainLedger.example.length - 1 ? 'rounded-btn bg-success-soft p-3' : 'rounded-btn bg-gray-50 p-3'}
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-700">{item.label}</dt>
                  <dd className={i === brainLedger.example.length - 1 ? 'mt-1 font-semibold text-success-strong' : 'mt-1 font-semibold'}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-small text-ink-700">{withPlaceholders(brainLedger.placeholder)}</p>
          </div>
        </div>
      </Section>

      {/* B3.8 What MindX Brain is not */}
      <Section theme="light" reveal>
        <SectionHeader title={brainIsNot.title} />
        <ul className="mt-8 flex flex-wrap gap-3">
          {brainIsNot.nots.map((not) => (
            <li
              key={not}
              className="inline-flex items-center gap-2 rounded-pill border border-gray-200 bg-gray-50 px-4 py-2 text-ink-700"
            >
              <Ban className="h-4 w-4 text-danger" aria-hidden="true" />
              {not}
            </li>
          ))}
        </ul>
        <p className="t-h3 mt-8 max-w-text">{brainIsNot.is}</p>
      </Section>

      {/* B3.9 Built for AI tools you already use */}
      <Section theme="gray" reveal>
        <div className="rounded-card border border-gray-200 bg-white p-8 md:p-10">
          <Chip tone="soon">{withPlaceholders(brainAiTools.status)}</Chip>
          <h2 className="t-h2 mt-4">{brainAiTools.title}</h2>
          <p className="mt-4 max-w-text text-ink-700">{brainAiTools.body}</p>
        </div>
      </Section>

      <CTABand heading={brainCta.heading} body="" secondaryCta={null} />
    </>
  );
}
