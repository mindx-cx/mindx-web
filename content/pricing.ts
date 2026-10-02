// Pricing data (spec C5). Pages and the calculator read from here.

export const brainPlans = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 49,
    orders: 'Up to 500 orders a month',
    features: ['3 integrations', 'Brain Scan', 'Ask mode', 'Outcome ledger', 'Email support'],
    cta: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 199,
    orders: 'Up to 2,500 orders a month',
    popular: true,
    features: ['10 integrations', 'Dashboards on demand', 'Policies and approvals', '3 team seats'],
    cta: 'Start with Growth',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 499,
    orders: 'Up to 10,000 orders a month',
    features: ['All integrations', 'Advanced policies', 'Unlimited seats', 'Priority support'],
    cta: 'Start with Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    orders: '10,000+ orders or multiple stores',
    features: ['SSO', 'Data residency', 'Custom connectors', 'Dedicated success manager'],
    cta: 'Talk to sales',
  },
] as const;

export const ANNUAL_DISCOUNT = 0.15; // 

export const workerPrices = [
  { worker: 'MindX Resolve', price: '$0.90 per resolved conversation', when: 'Resolve completes the request', status: 'Live' },
  // CHANGED: Convert is live (decision 28 Sep 2026); spec said "Coming 2027".
  { worker: 'MindX Convert', price: '5% of the order, capped at $5', when: 'Convert wins a sale', status: 'Live' },
  { worker: 'MindX Grow', price: 'A share of extra revenue', when: 'A campaign beats the holdout group', status: 'Coming later' },
] as const;

// B6.1 hero and toggle.
export const pricingHero = {
  eyebrow: 'Pricing',
  title: 'Pay for the Brain. Pay workers only for results.',
  subtitle:
    'A simple monthly plan for MindX Brain. MindX Resolve costs $0.90 per resolved conversation, and nothing when it goes to a human.',
  monthly: 'Monthly',
  annual: 'Annual',
  annualSave: 'save 15% [confirm the discount]',
  perMonth: '/month',
  billedAnnually: 'billed annually',
  custom: 'Custom',
  popular: 'Most popular',
} as const;

// ADDED: headings for B6.2 / B6.3 (the spec gives tables only).
export const pricingSections = {
  plansTitle: 'MindX Brain plans',
  workersTitle: 'AI Worker pricing',
  workersSubtitle: 'On top of any plan.',
  workerColumns: ['Worker', 'Price', 'You pay when', 'Status'],
  escalated: 'Escalated to a human? You pay $0.',
} as const;

// B6.5, shown while the program is open.
export const foundingOffer = {
  title: 'Founding merchant pricing',
  body: 'The first [25] US Shopify brands get the Growth plan at [$199/month] locked for 12 months, weekly calls with our founders and first access to MindX Grow. Outcome fees apply.',
  // CHANGED: the spec offers "first access to MindX Convert"; Convert is live, so Grow is the next worker.
  button: 'Apply to be a design partner',
  href: '/signup',
} as const;

// B6.6
export const pricingFaqTitle = 'Pricing questions';
export const pricingFaq = [
  {
    id: 'resolved-conversation',
    q: 'What is a "resolved conversation"?',
    a: 'One customer request that Resolve completed without a human, where the customer did not come back about the same issue within 72 hours. [Confirm the window.]',
  },
  { id: 'handoff', q: 'What if Resolve hands off to my team?', a: 'You pay nothing for that conversation.' },
  {
    id: 'order-limit',
    q: "What happens if I go over my plan's order limit?",
    a: "We'll let you know and suggest the next plan. We never cut you off mid-month.",
  },
  {
    id: 'trial',
    q: 'Is there a free trial?',
    a: 'The Brain Scan is free. Paid plans are month to month, and you can cancel anytime.',
  },
  {
    id: 'cap',
    q: 'Can I cap my monthly spend?',
    a: 'Yes. Set a monthly budget for Resolve. When you reach it, Resolve pauses automation and sends conversations to your team.',
  },
  { id: 'seats', q: 'Do you charge per seat?', a: 'No. Starter and Growth include seats; Pro has unlimited seats.' },
];

// B6.4 savings calculator copy.
export const calculatorCopy = {
  title: 'What would MindX cost you?',
  conversations: 'Conversations per month',
  share: 'Share Resolve handles',
  humanCost: 'Your cost per human conversation',
  plan: 'MindX Brain plan',
  bill: 'Your MindX bill',
  human: 'Human cost for the same work',
  savings: 'You save each month',
  negativeNote: 'At this volume a human is cheaper; try a lower plan',
  footnote:
    'Human cost is based on the $44,770 median US customer service wage (BLS, May 2025) plus 30% for taxes and benefits, at about 1,200 conversations a month. Your numbers will vary.',
} as const;
