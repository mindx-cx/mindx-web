// Savings calculator math (spec A7.1, C6). Unit tests land with Phase 4.

export const RESOLVE_PRICE = 0.9;

export const CALCULATOR_DEFAULTS = {
  conversations: 1000, // slider 100 to 10,000
  share: 0.7, // slider 30% to 90%
  humanCost: 4.04,
  planPrice: 199, // Growth
} as const;

export function calculate(conversations: number, share: number, humanCost: number, planPrice: number) {
  const resolved = Math.round(conversations * share);
  const bill = planPrice + resolved * RESOLVE_PRICE;
  const human = resolved * humanCost;
  const savings = human - bill;
  return { resolved, bill, human, savings: savings > 0 ? savings : null };
}

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** USD with no decimals (A7). */
export function formatUsd(value: number): string {
  return usd.format(value);
}
