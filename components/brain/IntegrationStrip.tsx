import Link from 'next/link';
import { integrationStrip as strip } from '@/content/brainHome';

/**
 * A quiet band between the hero and the first real section: what connects
 * today. Shopify is live (the Brain reads it); the support channels are beta.
 */
export function IntegrationStrip() {
  return (
    <section className="border-y border-line bg-white/60 py-6">
      <div className="container-x flex flex-col items-center gap-x-8 gap-y-3 text-center lg:flex-row lg:justify-center lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle-fg">{strip.label}</p>
        <p className="flex items-center gap-2 text-[15px] font-semibold text-fg">
          {strip.live}
          <span className="rounded-pill bg-signal-live/10 px-2 py-px text-[11px] font-semibold text-signal-live">{strip.liveTag}</span>
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] font-medium text-muted-fg">
          {strip.beta.join(' · ')}
          <span className="rounded-pill bg-brand/10 px-2 py-px text-[11px] font-semibold text-brand">{strip.betaTag}</span>
        </p>
        <Link href={strip.more.href} className="text-[14px] font-medium text-brand hover:underline">
          {strip.more.label} →
        </Link>
      </div>
    </section>
  );
}
