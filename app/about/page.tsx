import { Bot, Handshake, Heart, Target } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Hero } from '@/components/sections/Hero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Section, SectionHeader } from '@/components/ui/Section';
import { about } from '@/content/company';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.about);

const beliefIcons = [Target, Bot, Handshake, Heart];

// About (A8 row 10, B9.1). CHANGED: no team, company facts or careers link
// (decision 29 Sep 2026).
export default function AboutPage() {
  return (
    <>
      <Breadcrumbs name="About" path={seo.about.path} />
      <Hero
        size="page"
        eyebrow={about.eyebrow}
        title={about.title}
        subtitle={`${about.missionLabel}: ${about.mission}`}
        primaryCta={about.cta}
        secondaryCta={ctas.brainScan}
      />

      <Section theme="light" reveal>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SectionHeader title={about.storyTitle} />
          <p className="t-body-l text-ink-700">{about.story}</p>
        </div>
      </Section>

      <Section theme="gray" reveal>
        <SectionHeader title={about.beliefsTitle} />
        <div className="mt-10">
          <FeatureGrid
            columns={4}
            items={about.beliefs.map((b, i) => ({ icon: beliefIcons[i], title: b.title, body: b.body }))}
          />
        </div>
      </Section>

      <CTABand primaryCta={about.cta} secondaryCta={ctas.brainScan} />
    </>
  );
}
