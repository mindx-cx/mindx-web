import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { brainHero } from '@/content/brainHome';
import { hero } from '@/content/home';
import { ctas } from '@/content/site';

// The labels live in the hero's left and right gutters, vertically spread, so
// they frame the headline instead of queueing up underneath it. Positioning
// them on a ring below the text pushed the whole picture off the first screen,
// which defeats the point of having it.
const LEFT = ['top-[6%]', 'top-[30%]', 'top-[55%]', 'top-[79%]'];
const RIGHT = ['top-[2%]', 'top-[25%]', 'top-[48%]', 'top-[70%]', 'top-[90%]'];

const labelClass =
  'rounded-pill border border-line bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-muted-fg shadow-card';

export function BrainHero() {
  const left = brainHero.entities.slice(0, LEFT.length);
  const right = brainHero.entities.slice(LEFT.length);

  return (
    <section className="relative overflow-hidden bg-cream pb-20 pt-16 md:pb-24 md:pt-20">
      {/* A soft brand glow behind the mark, so the centre of the hero has some
          depth without introducing a second background colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-pill bg-brand/10 blur-[120px]"
      />

      <div className="container-x relative">
        {/* lg+ only: below it the gutters are too narrow and the labels would
            sit on top of the headline. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          {left.map((entity, i) => (
            <span key={entity} className={`absolute left-0 ${LEFT[i]} ${labelClass}`}>
              {entity}
            </span>
          ))}
          {right.map((entity, i) => (
            <span key={entity} className={`absolute right-0 ${RIGHT[i]} ${labelClass}`}>
              {entity}
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-[760px] text-center">
          {/* The brain at the centre of the integrations: the real MX mark, white
              on the brand circle. */}
          <span className="mx-auto mb-8 flex h-[88px] w-[88px] items-center justify-center rounded-pill bg-brand shadow-[0_18px_50px_-12px_rgba(0,98,255,0.55)]">
            <Image src="/brand/mindx-ai-mark-white.svg" alt="" width={52} height={33} className="h-auto w-[52px]" />
          </span>

          <h1 className="t-display text-fg">
            {/* The sentence screen readers and search engines get is whole; the
                split into two coloured lines is presentational only. */}
            <span className="sr-only">{hero.title}</span>
            <span aria-hidden="true" className="block">
              {hero.titleLead}
            </span>
            <span aria-hidden="true" className="block text-brand">
              {hero.titleRotatingPrefix} {hero.titleRotating[0]}
            </span>
          </h1>

          <p className="t-body-l mx-auto mt-6 max-w-[560px] text-muted-fg">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={ctas.brainScan.href} variant="brand" arrow={false}>
              {ctas.brainScan.label}
            </Button>
            <Button
              href={ctas.demo.href}
              variant="secondary"
              tone="light"
              className="h-[46px] rounded-ctl border border-line bg-white text-[15px]"
            >
              {ctas.demo.label}
            </Button>
          </div>

          <p className="mt-4 text-small text-subtle-fg">{hero.trustLine}</p>
        </div>

        {/* Below lg the labels become a plain wrapped row: same information,
            no collisions, no absolute positioning to go wrong. */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2 lg:hidden">
          {brainHero.entities.map((entity) => (
            <li key={entity} className={labelClass}>
              {entity}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
