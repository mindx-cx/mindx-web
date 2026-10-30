import { ctas } from './site';
// Pricing, 30 Oct 2026 (owner's plans, while MindX Brain is in testing): Free, Pro, Max and Ultra,
// the same plans and credits as the app's Billing page. One answered question is one credit; every
// plan has every feature, so the cards differ by credits only. Nothing here promises a feature the
// Brain does not have today.

export const brainPricingHero = {
  eyebrow: 'Pricing',
  title: 'Start free. Pay only for the answers you use.',
  subtitle:
    'One answered question is one credit. Every plan has every MindX feature; the plans differ only in how many credits you get each month.',
} as const;

export type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  for: string;
  cta: { label: string; href: string };
  featured: boolean;
  /** `note` sits under the button, e.g. "No credit card". */
  note?: string;
  includes: readonly string[];
};

export const plans: readonly Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'per month',
    for: 'For trying MindX on your own store.',
    cta: ctas.brainScan,
    featured: false,
    note: 'No credit card.',
    includes: [
      '100 credits each month',
      'Every MindX feature, nothing locked',
      'No plan or card needed to start',
      'Every number shows the orders behind it',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$10',
    cadence: 'per month',
    for: 'For stores that check in every day.',
    cta: { label: 'Start with Pro', href: '/signup?plan=pro' },
    featured: true,
    includes: [
      '1,000 credits each month',
      'Everything in Free',
      'Ask, find and explain on your Shopify data',
      'Read-only: MindX never changes your store',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    price: '$50',
    cadence: 'per month',
    for: 'For busy stores with many questions.',
    cta: { label: 'Start with Max', href: '/signup?plan=max' },
    featured: false,
    includes: [
      '5,000 credits each month',
      'Everything in Pro',
      'Room for the whole month, every day',
      'Read-only: MindX never changes your store',
    ],
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: '$100',
    cadence: 'per month',
    for: 'For the busiest stores.',
    cta: { label: 'Start with Ultra', href: '/signup?plan=ultra' },
    featured: false,
    includes: [
      '10,000 credits each month',
      'Everything in Max',
      'The most credits, for heavy daily use',
      'Read-only: MindX never changes your store',
    ],
  },
] as const;

export const creditsNote = {
  title: 'What is a credit?',
  body: "One answered question uses one credit. Greetings, follow-up choices and questions MindX can't answer are free. Your plan's credits renew every month; extra credits you buy carry over until you use them.",
} as const;

export const brainPricingFaqTitle = 'Pricing questions';

export const brainPricingFaq = [
  {
    id: 'credits-run-out',
    q: 'What happens when I run out of credits?',
    a: 'MindX stops and tells you. It never quietly bills you for more. Buy extra credits, move up a plan, or wait for your credits to renew next month.',
  },
  {
    id: 'seats',
    q: 'Do you charge per user?',
    a: 'No. The price follows how many questions MindX answers, not how many people use it.',
  },
  {
    id: 'cancel',
    q: 'Can I cancel?',
    a: 'Any time, from Billing inside MindX. You move to the Free plan and keep 100 credits a month.',
  },
  {
    id: 'shopify-billing',
    q: 'How am I billed?',
    a: 'Through Shopify, on your Shopify invoice. You approve every charge on Shopify\'s own page, and you can change your plan at any time.',
  },
] as const;
