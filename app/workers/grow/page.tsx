import { GoogleFormEmbed } from '@/components/forms/GoogleFormEmbed';
import { Hero } from '@/components/sections/Hero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { growHero, growWaitlist } from '@/content/grow';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';

export const metadata = pageMetadata(seo.grow);

// MindX Grow (A8 row 5, B4.3): hero plus waitlist form. The spec's primary CTA
// is the waitlist, so the hero buttons point to the Brain Scan as a secondary path.
export default function GrowPage() {
  return (
    <>
    <Breadcrumbs name="MindX Grow" path={seo.grow.path} />
    <Hero
      size="page"
      eyebrow={growHero.eyebrow}
      title={growHero.title}
      subtitle={growHero.body}
      primaryCta={ctas.brainScan}
      visual={
        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[32px] bg-worker-grow/30 blur-3xl" />
          <div className="relative rounded-card border border-white/20 bg-white p-6 text-ink-950 shadow-mock md:p-8">
            <div className="flex items-center gap-3">
              <WorkerTile worker="grow" />
              <div>
                <p className="font-semibold">MindX Grow</p>
                <p className="text-small text-ink-700">{growWaitlist.submit}</p>
              </div>
            </div>
            <div className="mt-6">
              <GoogleFormEmbed form="waitlist" />
            </div>
          </div>
        </div>
      }
    />
    </>
  );
}
