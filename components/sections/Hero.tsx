import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { RotatingText } from './RotatingText';

type Cta = { label: string; href: string };

type HeroProps = {
  eyebrow: string;
  /** Full headline, read by screen readers and search engines. */
  title: string;
  /** Optional visual headline: a lead line, then a prefix with rotating endings. */
  titleLead?: string;
  titleRotatingPrefix?: string;
  titleRotating?: readonly string[];
  subtitle: ReactNode;
  primaryCta: Cta;
  secondaryCta?: Cta;
  trustLine?: string;
  visual?: ReactNode;
  /** display = home (60/64 px); page = inner-page H1 (48/56 px, A5). */
  size?: 'display' | 'page';
};

/** Faint grid that fades out toward the edges, plus a soft blue glow. Parent must be relative. */
export function HeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-pill bg-blue-500/25 blur-[120px]"
      />
    </>
  );
}

/**
 * Hero (A7): two columns on lg+ (text left, visual right), stacked on mobile
 * with the visual below the buttons. Signature gradient with a faint grid and
 * glow; the text sits in the gradient's dark upper part.
 */
export function Hero({
  eyebrow,
  title,
  titleLead,
  titleRotatingPrefix,
  titleRotating,
  subtitle,
  primaryCta,
  secondaryCta,
  trustLine,
  visual,
  size = 'display',
}: HeroProps) {
  const rotating = titleLead && titleRotatingPrefix && titleRotating?.length;

  return (
    <section
      className={cn(
        'relative overflow-hidden pt-20 text-white md:pt-24',
        size === 'display' ? 'bg-hero pb-24 md:pb-32' : 'bg-hero-page pb-20 md:pb-28',
      )}
    >
      <HeroBackdrop />

      <div className="container-x relative">
        <div
          className={cn(
            'grid items-start gap-12 lg:gap-14',
            visual ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]' : 'max-w-text',
          )}
        >
          <div className="lg:pt-4">
            <p className="t-eyebrow inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[.06] px-3 py-1 text-mint-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-pill bg-mint-400" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className={cn('mt-5', size === 'display' ? 't-display' : 't-h1')}>
              {rotating ? (
                <>
                  <span className="sr-only">{title}</span>
                  <span aria-hidden="true" className="block">
                    {titleLead}
                  </span>
                  <span aria-hidden="true" className="block">
                    {titleRotatingPrefix}{' '}
                  </span>
                  <RotatingText phrases={titleRotating} className="text-mint-400" />
                </>
              ) : (
                title
              )}
            </h1>
            <p className="t-body-l mt-6 max-w-[560px] text-blue-50">{subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
            {trustLine && <p className="mt-4 text-small text-gray-300">{trustLine}</p>}
          </div>
          {visual}
        </div>
      </div>
    </section>
  );
}
