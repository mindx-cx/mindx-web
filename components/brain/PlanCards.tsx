import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { plans } from '@/content/brainPricing';
import { cn } from '@/lib/cn';

/**
 * Two plans, side by side. Pro is marked by a brand border and a label rather
 * than by being bigger -- a card that physically dwarfs the free one makes the
 * free plan look like a consolation prize, and the free plan is the one we
 * actually want people to start on.
 */
export function PlanCards() {
  return (
    <div className="mx-auto grid max-w-[920px] gap-4 md:grid-cols-2">
      {plans.map((plan) => (
        <article
          key={plan.id}
          className={cn(
            'relative flex flex-col rounded-card bg-white p-6 shadow-card',
            plan.featured ? 'border-2 border-brand' : 'border border-line',
          )}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-6 rounded-pill bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              Most popular
            </span>
          )}

          <h3 className="text-h3 font-semibold text-fg">{plan.name}</h3>
          <p className="mt-1 text-small text-muted-fg">{plan.for}</p>

          <p className="mt-6 flex items-baseline gap-2">
            <span className="text-stat font-bold tracking-tight text-fg">{plan.price}</span>
            <span className="text-small text-subtle-fg">{plan.cadence}</span>
          </p>

          <Button
            href={plan.cta.href}
            variant={plan.featured ? 'brand' : 'secondary'}
            tone="light"
            arrow={false}
            className={cn('mt-6 w-full', !plan.featured && 'h-[46px] rounded-ctl border border-line text-[15px]')}
          >
            {plan.cta.label}
          </Button>
          {plan.note && <p className="mt-2 text-center text-xs text-subtle-fg">{plan.note}</p>}

          <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
            {plan.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-small text-fg">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-live" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
