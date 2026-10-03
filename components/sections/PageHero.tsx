import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

type Cta = { label: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  /** Headline. Wrap the phrase to highlight in <span className="text-brand">. */
  title: ReactNode;
  subtitle?: ReactNode;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  trustLine?: string;
};

/**
 * Light inner-page hero in the prototype's style, matching Home: cream ground,
 * centred serif headline, one blue button and a quiet text link. Replaces the
 * old dark-navy Hero on the pages moved to the new look.
 */
export function PageHero({ eyebrow, title, subtitle, primaryCta, secondaryCta, trustLine }: PageHeroProps) {
  return (
    <section className="bg-cream pb-16 pt-14 text-fg md:pb-20 md:pt-20">
      <div className="container-x">
        <div className="mx-auto flex max-w-[780px] flex-col items-center text-center">
          <p className="t-eyebrow text-muted-fg">{eyebrow}</p>
          <h1 className="t-h1 mt-3">{title}</h1>
          {subtitle && <p className="t-body-l mt-5 max-w-[620px] text-muted-fg">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href} variant="brand" arrow={false}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="text-[15px] font-medium text-fg hover:text-brand">
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
          {trustLine && <p className="mt-4 text-small text-muted-fg">{trustLine}</p>}
        </div>
      </div>
    </section>
  );
}
