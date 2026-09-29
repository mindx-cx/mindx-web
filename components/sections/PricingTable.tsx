'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { ANNUAL_DISCOUNT, brainPlans, pricingHero as copy } from '@/content/pricing';
import { ctas } from '@/content/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/** MindX Brain plans (A7 PricingTable): 4 cards, Growth highlighted, monthly/annual toggle. */
export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  function choose(value: boolean) {
    setAnnual(value);
    track('pricing_toggle', { value: value ? 'annual' : 'monthly' });
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div role="group" aria-label="Billing period" className="inline-flex rounded-pill border border-gray-200 bg-white p-1 font-semibold">
          {[false, true].map((isAnnual) => (
            <button
              key={String(isAnnual)}
              type="button"
              aria-pressed={annual === isAnnual}
              onClick={() => choose(isAnnual)}
              className={cn(
                'rounded-pill px-5 py-2 text-small transition-colors',
                annual === isAnnual ? 'bg-navy-950 text-white' : 'text-ink-700 hover:text-ink-950',
              )}
            >
              {isAnnual ? copy.annual : copy.monthly}
            </button>
          ))}
        </div>
        <p className="text-small text-ink-700">{withPlaceholders(`${copy.annual}: ${copy.annualSave}`)}</p>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {brainPlans.map((plan) => {
          const popular = 'popular' in plan && plan.popular;
          const price =
            plan.monthly === null ? null : annual ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)) : plan.monthly;
          const href = plan.monthly === null ? ctas.demo.href : ctas.brainScan.href;
          return (
            <li
              key={plan.id}
              className={cn(
                'relative flex flex-col rounded-card border p-6',
                popular ? 'border-navy-950 bg-navy-950 text-white shadow-mock' : 'border-gray-200 bg-white',
              )}
            >
              {popular && (
                <span className="absolute -top-3 left-6 rounded-pill bg-mint-400 px-3 py-0.5 text-xs font-bold text-navy-950">
                  {copy.popular}
                </span>
              )}
              <h3 className="t-h3">{plan.name}</h3>
              <p className={cn('mt-1 text-small', popular ? 'text-gray-300' : 'text-ink-700')}>{plan.orders}</p>
              <p className="mt-6">
                <span className="t-stat tabular-nums">{price === null ? copy.custom : `$${price}`}</span>
                {price !== null && <span className={cn('ml-1', popular ? 'text-gray-300' : 'text-ink-700')}>{copy.perMonth}</span>}
              </p>
              <p className={cn('min-h-[22px] text-small', popular ? 'text-gray-300' : 'text-ink-700')}>
                {price !== null && annual ? copy.billedAnnually : ''}
              </p>
              <ul className="mt-6 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-small">
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', popular ? 'text-mint-400' : 'text-success')} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href={href}
                variant={popular ? 'inverse' : 'secondary'}
                tone={popular ? 'dark' : 'light'}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
