import { ctas } from './site';
// Pricing, prototype v3 (2 Oct 2026). Two plans, priced on Brain capacity
// rather than seats: a merchant who asks more questions pays more, a merchant
// who adds a colleague does not.

export const brainPricingHero = {
  eyebrow: 'Pricing',
  title: 'Priced by thinking, not by seats.',
  subtitle:
    'One question costs one credit. Invite whoever you like at no extra cost — the bill follows how much work the Brain does, not how many people watch it.',
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
    cadence: 'per month, forever',
    for: 'Merchants who want to see what the Brain finds.',
    cta: ctas.brainScan,
    featured: false,
    note: 'No credit card.',
    includes: [
      '50 Brain Credits a month',
      'Connect your Shopify store',
      'A free Brain Scan',
      'The 3 things worth your attention',
      'Ask MindX questions in plain English',
      'Basic business insights',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    cadence: 'per month',
    for: 'Merchants who want MindX working on the business every day.',
    cta: { label: 'Start with MindX Pro', href: '/signup?plan=pro' },
    featured: true,
    includes: [
      'Everything in Free',
      'Continuous monitoring, not just on demand',
      'Deeper investigations with evidence',
      'Cross-system analysis',
      'Business recommendations',
      'Approval workflows',
      'AI actions, once you approve them',
      'More Brain Credits',
      'Priority support',
    ],
  },
] as const;

export const creditsNote = {
  title: 'What is a Brain Credit?',
  body: 'One question, one credit. A follow-up in the same conversation is part of the same question. An investigation that reads several systems costs more, and MindX tells you how much before it starts — you never find out after the fact.',
} as const;

export const brainPricingFaqTitle = 'Pricing questions';

export const brainPricingFaq = [
  {
    id: 'credits-run-out',
    q: 'What happens when I run out of credits?',
    a: 'MindX stops and tells you. It does not quietly bill you for more. You can wait for the monthly reset or move up a plan.',
  },
  {
    id: 'seats',
    q: 'Do you charge per user?',
    a: 'No. Invite your whole team. The price follows how much the Brain is asked to do, which is the thing that actually costs us money to run.',
  },
  {
    id: 'cancel',
    q: 'Can I cancel?',
    a: 'Any time, from inside the product. You keep access until the end of the period you have already paid for.',
  },
  {
    id: 'shopify-billing',
    q: 'How am I billed?',
    a: 'If you installed MindX from the Shopify App Store, it goes on your Shopify invoice. If you signed up directly, we take card payment. You are never billed through both.',
  },
] as const;
