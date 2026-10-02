import { ArrowRight, PackageX, TrendingDown, Truck } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { brainScanDemo } from '@/content/home';
import { cn } from '@/lib/cn';

// One colour per kind of problem, so the card is readable before the words are.
// These are the only places these colours appear, which is what keeps them
// meaning something.
const KIND: Record<string, { icon: typeof TrendingDown; fg: string; bg: string }> = {
  revenue: { icon: TrendingDown, fg: 'text-signal-revenue', bg: 'bg-signal-revenue/10' },
  fulfilment: { icon: Truck, fg: 'text-signal-fulfilment', bg: 'bg-signal-fulfilment/10' },
  product: { icon: PackageX, fg: 'text-signal-product', bg: 'bg-signal-product/10' },
};

const FALLBACK = { icon: TrendingDown, fg: 'text-signal-product', bg: 'bg-signal-product/10' };

export function ProblemCards() {
  return (
    <Section theme="cream" reveal>
      <SectionHeader title={brainScanDemo.title} body={brainScanDemo.intro} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {brainScanDemo.findings.map((finding) => {
          const kind = KIND[finding.category.toLowerCase()] ?? FALLBACK;
          const Icon = kind.icon;
          return (
            <article
              key={finding.problem}
              className="flex flex-col rounded-card border border-line bg-white p-4 shadow-card"
            >
              <div className="flex items-start gap-3">
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-row', kind.bg)}>
                  <Icon className={cn('h-[18px] w-[18px]', kind.fg)} aria-hidden="true" />
                </span>
                <h3 className="text-[15px] font-semibold leading-snug text-fg">{finding.problem}</h3>
              </div>
              <p className="mt-3 flex-1 text-small text-muted-fg">{finding.evidence}</p>
              <p className={cn('mt-4 text-xs font-semibold', kind.fg)}>{finding.impact}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-small font-semibold text-brand">
                Investigate
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </article>
          );
        })}
      </div>
      {/* Said plainly: these are not a real merchant's figures. The product
          computes every number it shows, and the marketing page should not be
          the one place that quietly does not. */}
      <p className="mt-6 text-small text-subtle-fg">{brainScanDemo.disclaimer}</p>
    </Section>
  );
}
