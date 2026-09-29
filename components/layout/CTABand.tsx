import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { ctaBand, ctas } from '@/content/site';

type Cta = { label: string; href: string };

type CTABandProps = {
  heading?: string;
  body?: string;
  primaryCta?: Cta;
  /** Pass null to show only the primary button. */
  secondaryCta?: Cta | null;
};

/**
 * Closing CTA at the bottom of every page except legal (A6). Uses the current
 * site's reverse gradient (light blue into navy) so it flows into the footer.
 */
export function CTABand({
  heading = ctaBand.heading,
  body = ctaBand.body,
  primaryCta = ctas.brainScan,
  secondaryCta = ctas.demo,
}: CTABandProps) {
  return (
    <Section theme="cta" className="md:py-[140px]">
      {/* Top padding keeps the text below the light top of the gradient. */}
      <div className="mx-auto max-w-text pt-16 text-center md:pt-20">
        <h2 className="t-h2">{heading}</h2>
        {body && <p className="t-body-l mt-4 text-blue-50">{body}</p>}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href={primaryCta.href} variant="inverse">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
