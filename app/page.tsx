import { CTABand } from '@/components/layout/CTABand';
import { Hero } from '@/components/sections/Hero';
import { StepList } from '@/components/sections/StepList';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeader } from '@/components/ui/Section';
import {
  brainExplanation,
  brainScanDemo,
  hero,
  homeCta,
  productLoop,
} from '@/content/home';
import { ctas } from '@/content/site';

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
        trustLine={hero.trustLine}
        centered
      />

      {/* Section 2: Brain Scan product demo */}
      <Section theme="light" id="brain-scan" reveal>
        <div className="relative overflow-hidden rounded-card bg-navy-950 px-6 py-12 text-white md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-pill bg-blue-500/30 blur-3xl"
          />
          <div className="relative">
            <h2 className="t-h2">{brainScanDemo.title}</h2>
            <p className="t-body-l mt-4 text-gray-300">{brainScanDemo.intro}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brainScanDemo.findings.map((finding) => (
                <div
                  key={finding.problem}
                  className="flex flex-col rounded-card border border-white/10 bg-white/5 p-6"
                >
                  <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
                    {finding.category}
                  </span>
                  <p className="font-semibold text-white">{finding.problem}</p>
                  <p className="mt-2 text-small text-gray-400">{finding.evidence}</p>
                  <p className="mt-1 text-small font-semibold text-blue-300">{finding.impact}</p>
                  <span className="mt-auto pt-4 text-small text-gray-400">Investigate →</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500">{brainScanDemo.disclaimer}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={ctas.brainScan.href}>{ctas.brainScan.label}</Button>
              <p className="text-small text-gray-400">{brainScanDemo.smallPrint}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: What MindX is */}
      <Section theme="gray" reveal>
        <div className="max-w-text">
          <SectionHeader title={brainExplanation.title} body={brainExplanation.body} />
        </div>
      </Section>

      {/* Section 4: The product loop */}
      <Section theme="light" id="how-it-works" reveal>
        <SectionHeader title={productLoop.title} />
        <div className="mt-12">
          <StepList steps={productLoop.steps} />
        </div>
      </Section>

<CTABand heading={homeCta.heading} body={homeCta.body} secondaryCta={null} />
    </>
  );
}
