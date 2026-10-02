import { CTABand } from '@/components/layout/CTABand';
import { Hero } from '@/components/sections/Hero';
import { StepList } from '@/components/sections/StepList';
import { Illustrative } from '@/components/ui/Illustrative';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';
import {
  brainAsk,
  brainConnect,
  brainCta,
  brainHero,
  brainLoop,
  brainMemory,
  brainUnderstands,
} from '@/content/brain';

export const metadata = pageMetadata(seo.brain);

export default function BrainPage() {
  return (
    <>
      <Breadcrumbs name="MindX Brain" path={seo.brain.path} />

      {/* Section 1: Hero */}
      <Hero
        size="page"
        eyebrow={brainHero.eyebrow}
        title={brainHero.title}
        subtitle={brainHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={brainHero.secondaryCta}
      />

      {/* Section 2: Connect the Dots */}
      <Section theme="gray" id="how-it-works" reveal>
        <SectionHeader title={brainConnect.title} body={brainConnect.body} />
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Source pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {brainConnect.sources.map((source) => (
              <span
                key={source}
                className="rounded-card border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-sm"
              >
                {source}
              </span>
            ))}
          </div>
          {/* Connector */}
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <div className="h-5 w-px bg-gray-300" />
            <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Brain node */}
          <div className="inline-flex items-center gap-2 rounded-pill border-2 border-blue-500 bg-navy-950 px-8 py-3.5 shadow-lg ring-4 ring-blue-500/20">
            <span className="text-sm font-semibold text-blue-200">MindX</span>
            <span className="h-4 w-px bg-blue-400/50" />
            <span className="text-sm font-bold text-white">Brain</span>
          </div>
          {/* Connector */}
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <div className="h-5 w-px bg-gray-300" />
            <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Output */}
          <div className="rounded-card border border-blue-200 bg-blue-50 px-6 py-3">
            <p className="text-sm font-semibold text-blue-900">{brainConnect.output}</p>
          </div>
        </div>
      </Section>

      {/* Section 3: What the Brain Understands */}
      <Section theme="light" reveal>
        <SectionHeader title={brainUnderstands.title} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brainUnderstands.areas.map((area) => (
            <div key={area.title} className="rounded-card border border-gray-200 bg-white p-5">
              <p className="font-semibold text-ink-950">{area.title}</p>
              <p className="mt-2 text-small text-ink-700">{area.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 4: Ask the Brain */}
      <Section theme="gray" reveal>
        <SectionHeader title={brainAsk.title} body={brainAsk.body} />
        <div className="relative mt-10 overflow-hidden rounded-card bg-navy-950 px-6 py-10 text-white md:px-10 md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-pill bg-blue-500/20 blur-3xl"
          />
          <Illustrative />
          <div className="relative max-w-2xl">
            {/* Question bubble */}
            <div className="inline-block rounded-card border border-white/10 bg-white/10 px-5 py-3">
              <p className="text-sm text-white">"{brainAsk.example.question}"</p>
            </div>
            {/* Answer */}
            <div className="mt-5 rounded-card border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">MindX Brain</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-200">{brainAsk.example.answer}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {brainAsk.example.evidence.map((item) => (
                  <span
                    key={item}
                    className="rounded-pill border border-white/10 bg-white/10 px-3 py-1 text-xs text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Other questions */}
          <div className="relative mt-8 border-t border-white/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">More questions you can ask</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {brainAsk.otherQuestions.map((q) => (
                <li key={q} className="text-sm text-gray-400">
                  "{q}"
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Section 5: Business Memory */}
      <Section theme="light" reveal>
        <div className="max-w-text">
          <SectionHeader title={brainMemory.title} body={brainMemory.body} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {brainMemory.contexts.map((ctx) => (
            <span
              key={ctx}
              className="rounded-pill border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-ink-700"
            >
              {ctx}
            </span>
          ))}
        </div>
      </Section>

      {/* Section 6: Find. Understand. Decide. Act. */}
      <Section theme="gray" reveal>
        <SectionHeader title={brainLoop.title} />
        <div className="mt-12">
          <StepList steps={brainLoop.steps} />
        </div>
      </Section>

      {/* Section 7: Final CTA */}
      <CTABand heading={brainCta.heading} body={brainCta.body} secondaryCta={null} />
    </>
  );
}
