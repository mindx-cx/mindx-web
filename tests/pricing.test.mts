// Savings calculator math (spec A7.1, C6). Runs with Node's built-in test
// runner, which runs TypeScript directly on Node 22.18+: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CALCULATOR_DEFAULTS, calculate, formatUsd, RESOLVE_PRICE } from '../lib/pricing.ts';

test('default case matches the spec: $829 bill vs $2,828 human, saves about $2,000', () => {
  const { conversations, share, humanCost, planPrice } = CALCULATOR_DEFAULTS;
  const result = calculate(conversations, share, humanCost, planPrice);
  assert.equal(result.resolved, 700);
  assert.equal(result.bill, 829);
  assert.equal(Math.round(result.human), 2828);
  assert.equal(Math.round(result.savings ?? 0), 1999);
  assert.equal(formatUsd(result.bill), '$829');
});

test('smallest volume at the highest share on Growth', () => {
  const result = calculate(100, 0.9, 4.04, 199);
  assert.equal(result.resolved, 90);
  assert.equal(result.bill, 199 + 90 * RESOLVE_PRICE);
  assert.equal(Math.round(result.human * 100) / 100, 363.6);
  // $363.60 of human work vs a $280 bill: saves about $84.
  assert.equal(Math.round(result.savings ?? 0), 84);
});

test('savings is null when the bill is higher, never negative', () => {
  const result = calculate(100, 0.3, 1, 499);
  assert.equal(result.savings, null);
});

test('resolved conversations are rounded', () => {
  assert.equal(calculate(1001, 0.7, 4.04, 199).resolved, 701);
});

test('USD formatting has no decimals', () => {
  assert.equal(formatUsd(1999.2), '$1,999');
  assert.equal(formatUsd(2828.4), '$2,828');
});
