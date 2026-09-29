'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { brainPlans, calculatorCopy as copy } from '@/content/pricing';
import { track } from '@/lib/analytics';
import { CALCULATOR_DEFAULTS, RESOLVE_PRICE, calculate, formatUsd } from '@/lib/pricing';

const plans = brainPlans.filter((p) => p.monthly !== null);
const number = new Intl.NumberFormat('en-US');

/** Savings calculator (A7.1, B6.4). Updates live as inputs change. */
export function SavingsCalculator() {
  const id = useId();
  const [conversations, setConversations] = useState<number>(CALCULATOR_DEFAULTS.conversations);
  const [sharePct, setSharePct] = useState<number>(CALCULATOR_DEFAULTS.share * 100);
  const [humanCost, setHumanCost] = useState<number>(CALCULATOR_DEFAULTS.humanCost);
  const [planPrice, setPlanPrice] = useState<number>(CALCULATOR_DEFAULTS.planPrice);

  // A10: pricing_calculator_used, debounced 1 s, skipped on first render.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = window.setTimeout(
      () => track('pricing_calculator_used', { conversations, share: sharePct, plan: planPrice }),
      1000,
    );
    return () => window.clearTimeout(t);
  }, [conversations, sharePct, planPrice]);

  const safeHumanCost = Number.isFinite(humanCost) && humanCost > 0 ? humanCost : 0;
  const { resolved, bill, human, savings } = calculate(conversations, sharePct / 100, safeHumanCost, planPrice);
  const planName = plans.find((p) => p.monthly === planPrice)?.name ?? '';

  return (
    <div className="rounded-card border border-gray-200 bg-white p-6 md:p-8">
      <h3 className="t-h3">{copy.title}</h3>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${id}-c`} className="font-semibold">
              {copy.conversations}
            </label>
            <span className="font-semibold tabular-nums">{number.format(conversations)}</span>
          </div>
          <input
            id={`${id}-c`}
            type="range"
            min={100}
            max={10000}
            step={100}
            value={conversations}
            onChange={(e) => setConversations(Number(e.target.value))}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${id}-s`} className="font-semibold">
              {copy.share}
            </label>
            <span className="font-semibold tabular-nums">{sharePct}%</span>
          </div>
          <input
            id={`${id}-s`}
            type="range"
            min={30}
            max={90}
            step={5}
            value={sharePct}
            onChange={(e) => setSharePct(Number(e.target.value))}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-h`} className="block font-semibold">
              {copy.humanCost}
            </label>
            <div className="mt-2 flex h-12 items-center rounded-input border border-gray-200 px-3 focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-blue-500">
              <span className="text-gray-500">$</span>
              <input
                id={`${id}-h`}
                type="number"
                inputMode="decimal"
                min={0.5}
                max={50}
                step={0.01}
                value={humanCost}
                onChange={(e) => setHumanCost(e.target.valueAsNumber)}
                className="w-full bg-transparent pl-1 tabular-nums outline-none focus-visible:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-p`} className="block font-semibold">
              {copy.plan}
            </label>
            <select
              id={`${id}-p`}
              value={planPrice}
              onChange={(e) => setPlanPrice(Number(e.target.value))}
              className="mt-2 h-12 w-full rounded-input border border-gray-200 bg-white px-3"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.monthly ?? 0}>
                  {p.name} · {formatUsd(p.monthly ?? 0)}/mo
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <dl aria-live="polite" className="mt-8 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-small text-ink-700">{copy.bill}</dt>
          <dd className="mt-1 text-h3 font-bold tabular-nums">{formatUsd(bill)}</dd>
        </div>
        <div>
          <dt className="text-small text-ink-700">{copy.human}</dt>
          <dd className="mt-1 text-h3 font-bold tabular-nums">{formatUsd(human)}</dd>
        </div>
        <div className="rounded-btn bg-success-soft p-3">
          <dt className="text-small text-success-strong">{copy.savings}</dt>
          <dd className="mt-1 text-h3 font-bold tabular-nums text-success-strong">
            {savings === null ? '—' : formatUsd(savings)}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-small text-ink-700">
        {savings === null
          ? copy.negativeNote
          : `${planName} plan ${formatUsd(planPrice)} + ${number.format(resolved)} × $${RESOLVE_PRICE.toFixed(2)} = ${formatUsd(bill)} a month.`}
      </p>
      <p className="mt-3 text-xs text-gray-500">{copy.footnote}</p>
    </div>
  );
}
