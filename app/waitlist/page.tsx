import type { Metadata } from 'next';
import { WaitlistSignup } from '@/components/forms/WaitlistSignup';
import { CheckList } from '@/components/sections/CheckList';
import { Countdown } from '@/components/sections/Countdown';
import { HeroBackdrop } from '@/components/sections/Hero';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { pageMetadata } from '@/content/seo';
import { launch, waitlistPage as copy } from '@/content/waitlist';

export const metadata: Metadata = pageMetadata({
  path: '/waitlist',
  title: 'Get Early Access — MindX, the Ecommerce Brain',
  description: `Join the first Shopify brands to hire MindX AI workers. Free early access, no credit card. Opens ${launch.dateLabel}.`,
});

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

// Waitlist / early access (decision 29 Sep 2026). Every main CTA lands here
// while NEXT_PUBLIC_LAUNCH_MODE is "waitlist"; ?intent=demo comes from "Book a demo".
export default async function WaitlistPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const intent = params.intent === 'demo' ? 'demo' : undefined;
  const launchDate = new Date(launch.isoDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  });

  return (
    <section className="relative overflow-hidden bg-hero pb-32 pt-36 text-white md:pb-40 md:pt-44">
      <HeroBackdrop />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="t-eyebrow inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[.06] px-3 py-1 text-mint-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-pill bg-mint-400" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h1 className="t-display mt-5">{copy.title}</h1>
          <p className="t-body-l mx-auto mt-5 max-w-xl text-blue-50">{copy.subtitle}</p>

          <div className="mt-8">
            <Countdown
              isoDate={launch.isoDate}
              labels={copy.countdownLabels}
              doneLabel={copy.countdownDone}
              srLabel={`MindX opens ${launchDate}.`}
            />
          </div>

          <div className="relative mt-10 rounded-card bg-white p-5 text-ink-950 shadow-mock md:p-7">
            {intent === 'demo' && (
              <p className="mb-5 rounded-btn bg-blue-50 px-4 py-3 text-left text-small font-medium text-info-strong">
                {copy.demoNote}
              </p>
            )}
            <WaitlistSignup intent={intent} />
            <div className="mt-6 border-t border-gray-200 pt-5 text-left">
              <div className="mb-4 flex gap-2" aria-hidden="true">
                <WorkerTile worker="brain" size="sm" />
                <WorkerTile worker="resolve" size="sm" />
                <WorkerTile worker="convert" size="sm" />
              </div>
              <CheckList items={copy.perks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
