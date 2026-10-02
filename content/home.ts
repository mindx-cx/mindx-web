// Home page copy (spec B2). Changes from the spec are marked "CHANGED" or
// "ADDED" with the reason, so they are easy to review. Numbers inside
// Illustrative mocks are sample data and are always labeled on the page.
import type { WorkerId } from './site';

export const hero = {
  eyebrow: 'MindX AI · The Ecommerce Brain',
  title: "Your Shopify store has problems you can't see. MindX finds them.",
  titleLead: "Your Shopify store has problems you can't see.",
  titleRotatingPrefix: 'MindX',
  titleRotating: ['finds them.'],
  subtitle: 'Connect your Shopify store. MindX scans your business and shows you the 3 things worth your attention right now.',
  trustLine: 'Read-only access · No customer messages · No credit card',
  trustLineWaitlist: 'Read-only access · No customer messages · No credit card',
} as const;

export type DemoStep =
  | { kind: 'message'; from: 'customer' | 'merchant' | 'worker'; text: string }
  | { kind: 'action'; text: string; system: string }
  | { kind: 'chart'; title: string; bars: { label: string; value: number }[] }
  | { kind: 'approval' };

export type DemoScenario = {
  id: string;
  worker: WorkerId;
  tab: string;
  workerName: string;
  header: string;
  mode: 'Ask' | 'Work';
  steps: DemoStep[];
  result: string[];
};

// ADDED (Hybrid C, "dynamic content"): three auto-playing scenarios. The first
// is the spec's B2.1 ChatActionMock script; the third is the spec's B3.5
// "Ask anything" example. All are labeled Illustrative.
export const heroDemo = {
  actionLogLabel: 'Action log',
  composerPlaceholder: 'Ask about your store…',
  modes: ['Ask', 'Work'] as const,
  scenarios: [
    {
      id: 'resolve',
      worker: 'resolve',
      tab: 'Resolve a return',
      workerName: 'MindX Resolve',
      header: 'Store chat · Order #1043',
      mode: 'Work',
      steps: [
        { kind: 'message', from: 'customer', text: 'Hi! The jacket I ordered is too small. Can I return it?' },
        { kind: 'action', text: 'Read order #1043', system: 'Shopify' },
        { kind: 'action', text: 'Checked policy: 30-day free exchange', system: 'MindX Brain' },
        { kind: 'action', text: 'Checked stock: size L, 12 available', system: 'Shopify' },
        {
          kind: 'message',
          from: 'worker',
          text: "Sorry about that, Maya! I can swap it for a size L. It's in stock and ships today, free. Or I can refund $89 to your card. Which would you like?",
        },
        { kind: 'message', from: 'customer', text: 'Exchange please!' },
        { kind: 'action', text: 'Created exchange order #1044', system: 'Shopify' },
        // CHANGED: spec names Loop Returns and AfterShip; not confirmed live.
        { kind: 'action', text: 'Generated return label', system: 'Shopify' },
        { kind: 'action', text: 'Sent tracking to customer', system: 'Email' },
        {
          kind: 'message',
          from: 'worker',
          text: "Done! Your size L ships today and tracking is on its way to your email. Here's your free return label for the size M.",
        },
      ],
      result: ['38 sec to resolve', '$0.90 MindX fee', '$89 revenue kept'],
    },
    {
      id: 'convert',
      worker: 'convert',
      tab: 'Win a sale',
      workerName: 'MindX Convert',
      header: 'Store chat · Product page',
      mode: 'Work',
      steps: [
        { kind: 'message', from: 'customer', text: "Does the Alpine Jacket run small? I'm usually a size M." },
        { kind: 'action', text: 'Read product: Alpine Jacket', system: 'Shopify' },
        { kind: 'action', text: 'Checked size chart and reviews', system: 'MindX Brain' },
        { kind: 'action', text: 'Checked stock: size L, ships today', system: 'Shopify' },
        {
          kind: 'message',
          from: 'worker',
          text: 'Good question! It runs about one size small, so most customers who wear M choose L. Size L is in stock and ships today. Want me to add it to your cart?',
        },
        { kind: 'message', from: 'customer', text: 'Yes please!' },
        { kind: 'action', text: 'Added Alpine Jacket, size L to cart', system: 'Shopify' },
        {
          kind: 'message',
          from: 'worker',
          text: "Added! Here's your checkout link. Free exchanges within 30 days if the fit isn't right.",
        },
      ],
      // Convert pricing from spec B6.3: 5% of the order, capped at $5.
      result: ['Sale won: $89', '$4.45 Convert fee (5%, max $5)', 'Right size, first time'],
    },
    {
      id: 'brain',
      worker: 'brain',
      tab: 'Ask the Brain',
      workerName: 'MindX Brain',
      header: 'Ask MindX · Your store',
      mode: 'Ask',
      steps: [
        { kind: 'message', from: 'merchant', text: 'Why did refunds go up last week, and what did it cost me?' },
        { kind: 'action', text: 'Read 7 days of refunds', system: 'Shopify' },
        { kind: 'action', text: 'Matched refunds to conversations', system: 'MindX Brain' },
        {
          kind: 'chart',
          title: 'Refund reasons, last 7 days',
          bars: [
            { label: 'Size too small', value: 62 },
            { label: 'Arrived late', value: 17 },
            { label: 'Damaged', value: 12 },
            { label: 'Changed mind', value: 9 },
          ],
        },
        {
          kind: 'message',
          from: 'worker',
          text: "Refunds rose 18%. 62% were 'size too small' on the Alpine Jacket, after last week's new supplier batch. Cost: $3,420 in refunds. Resolve also turned 41 more requests into exchanges, keeping $3,650 in sales. Suggested fix: update the size chart and flag the batch to your supplier. Approve?",
        },
        { kind: 'action', text: 'Drafted size chart update', system: 'MindX Brain' },
        { kind: 'approval' },
      ],
      result: ['Refunds +18%', '$3,420 refunded', '$3,650 kept by exchanges'],
    },
  ] satisfies DemoScenario[],
} as const;

export const problem = {
  title: 'Your support inbox asks the same five questions all day',
  body: 'Each one means opening Shopify, the carrier site and the returns app, then typing the same answer again.',
  stats: [
    {
      value: '~$4,850',
      unit: 'a month',
      label: 'Fully loaded cost of one US support agent.',
      footnote: 'Median wage $44,770 (BLS, May 2025) plus 30% for benefits and taxes.',
    },
    {
      value: '~$4',
      unit: 'per conversation',
      label: 'What a human-handled ticket costs at about 1,200 conversations a month.',
    },
    {
      value: '20+',
      unit: 'tools',
      label: 'What a growing Shopify brand stitches together, none of which talk to each other.',
    },
  ],
} as const;

export type InboxRow = {
  question: string;
  count: number;
  withMindx: { tone: 'success' | 'warning'; status: string; detail: string };
};

// ADDED: interactive "Today vs With MindX" inbox for the five questions in B2.2.
// Counts are sample data (Illustrative); outcomes follow the Resolve table in B4.1.
export const inbox = {
  title: 'Your inbox',
  tabs: ['Today', 'With MindX'] as const,
  todaySummary: '76 open · about 5 hours of typing',
  withSummary: '72 resolved · 4 need you',
  openLabel: 'Open',
  rows: [
    {
      question: 'Where is my order?',
      count: 38,
      withMindx: { tone: 'success', status: 'Resolved', detail: 'Live tracking sent' },
    },
    {
      question: 'Can I change my address?',
      count: 9,
      withMindx: { tone: 'success', status: 'Resolved', detail: 'Order updated before fulfillment' },
    },
    {
      question: 'I want to return this.',
      count: 14,
      withMindx: { tone: 'success', status: 'Resolved', detail: 'Exchange offered first, label sent' },
    },
    {
      question: 'Where is my refund?',
      count: 11,
      withMindx: { tone: 'success', status: 'Resolved', detail: 'Refund status shown' },
    },
    {
      question: 'It arrived damaged.',
      count: 4,
      withMindx: { tone: 'warning', status: 'Needs approval', detail: 'Photos collected, replacement ready' },
    },
  ] satisfies InboxRow[],
} as const;

export type WorkerCard = {
  worker: WorkerId;
  name: string;
  status: 'live' | 'later';
  statusLabel: string;
  description: string;
  cta: { label: string; href: string };
};

export const meetMindx = {
  title: 'One brain. Every tool. AI workers on top.',
  body: 'MindX Brain builds one live model of your business from the tools you already use. AI Workers use it to do real jobs, and every job they finish makes the Brain smarter.',
  // Spec A7 ArchitectureDiagram labels.
  diagram: {
    tools: ['Shopify', 'Helpdesk', 'Shipping', 'Returns', 'Email and ads'],
    brainChips: [
      'Business model',
      'Memory and policies',
      'Reasoning and planning',
      'Guardrails and verification',
      'Outcome ledger',
    ],
    caption: "Workers act inside the Brain's rules, and every outcome is written back into it.",
  },
  workers: [
    {
      worker: 'resolve',
      name: 'MindX Resolve',
      status: 'live',
      statusLabel: 'Live now',
      description:
        'Your AI customer-service worker. Resolves order, return, refund and change requests end to end.',
      cta: { label: 'Meet Resolve', href: '/workers/resolve' },
    },
    {
      worker: 'convert',
      name: 'MindX Convert',
      // CHANGED: Convert is live (decision 28 Sep 2026); spec said "Coming 2027".
      status: 'live',
      statusLabel: 'Live now',
      description: 'Your AI sales worker. Answers pre-sale questions and recommends the right product.',
      cta: { label: 'Meet Convert', href: '/workers/convert' },
    },
    {
      worker: 'grow',
      name: 'MindX Grow',
      status: 'later',
      statusLabel: 'Coming later',
      description: 'Your AI marketing worker. Win-back and retention you only pay for when it works.',
      cta: { label: 'Join the waitlist', href: '/workers/grow' },
    },
  ] satisfies WorkerCard[],
  // CHANGED: only tools and channels confirmed in the product code are named.
  integrations: 'Connects to Shopify · Gorgias · Zendesk',
  channels: 'Answers on web chat, email, WhatsApp, Instagram and Messenger',
} as const;

export const howItWorks = {
  title: 'Live in an afternoon, not a quarter',
  steps: [
    {
      title: 'Connect',
      body: 'Install MindX from the Shopify App Store and connect your helpdesk. Read-only to start.',
    },
    {
      title: 'See your Brain Scan',
      body: 'In minutes, MindX shows what your customers ask about, what it costs you and what is causing it.',
    },
    {
      title: 'Set your rules',
      body: 'Choose what Resolve can do alone (for example, refunds under $50) and what needs your approval.',
    },
    {
      title: 'Let Resolve work',
      body: 'Start in draft mode, approve replies with one click, then switch safe requests to automatic.',
    },
  ],
} as const;

export const resolveInAction = {
  title: "It doesn't just answer. It resolves.",
  body: 'A basic chatbot tells a customer to wait. Resolve checks the order, the policy and the stock, makes the change in Shopify, confirms it worked, and tells the customer, in under a minute.',
  link: { label: 'See everything Resolve can do', href: '/workers/resolve' },
  steps: [
    'Understands the request and who is asking',
    'Checks the order, shipment, policy and customer history in MindX Brain',
    'Decides the right action inside your rules',
    'Acts in Shopify and your other tools',
    'Verifies the change actually happened',
    'Learns from the outcome for next time',
  ],
} as const;

export const profit = {
  title: 'Everyone reports revenue. MindX reports profit.',
  body: 'Every action MindX takes lands in your outcome ledger: conversations resolved, hours saved, refunds turned into exchanges, cancellations saved. You see the dollars, not a chart of "engagement".',
  // ADDED: animated sample ledger. The 41 exchanges and $3,650 come from the
  // spec's B3.5 example; hours assume about 4 minutes per conversation.
  ledgerLabel: 'Outcome ledger · last 7 days',
  tiles: [
    { label: 'Conversations resolved', value: 1087 },
    { label: 'Human hours saved', value: 72 },
    { label: 'Refunds turned into exchanges', value: 41 },
    { label: 'Revenue kept', value: 3650, prefix: '$' },
  ],
} as const;

export const brainScanCallout = {
  title: 'See what your support inbox is costing you, free',
  body: 'Connect Shopify and your helpdesk. In minutes, MindX analyzes your last 90 days and shows your top ticket reasons, what they cost, and which products, carriers or regions cause them.',
  smallPrint: 'Read-only. We never message your customers during a scan.',
} as const;

export const pricingTeaser = {
  title: 'Pay for the Brain. Pay workers only for results.',
  body: 'MindX Brain starts at $49 a month. MindX Resolve costs $0.90 per resolved conversation, and nothing when a conversation goes to a human.',
  link: { label: 'See pricing', href: '/pricing' },
} as const;

export const trustStrip = {
  title: 'Autonomy you control',
  points: [
    'You set the rules',
    'Approval for anything risky',
    'Every action logged and reversible where possible',
    'Your data stays yours',
  ],
  link: { label: 'How we keep MindX safe', href: '/trust' },
} as const;

// B2.10: hidden until real merchant quotes exist.
export const socialProof = {
  show: false,
  title: 'Shopify brands using MindX',
} as const;

// ADDED: B2.11 has no heading; the section needs one for structure.
export const homeFaqTitle = 'Questions merchants ask';

// B2.11: first four items of the global FAQ (B10.1).
export const homeFaq = [
  {
    id: 'what-is-mindx',
    q: 'What is MindX?',
    a: 'The Ecommerce Brain for Shopify merchants. It connects your tools into one live model of your business and runs AI Workers that do real work, starting with customer service.',
  },
  {
    id: 'vs-chatbot',
    q: 'How is MindX different from a chatbot?',
    a: 'A chatbot answers. MindX Resolve takes the action (a return, exchange, cancellation, edit or refund), checks it worked and logs it.',
  },
  {
    id: 'replace-helpdesk',
    q: 'Do I have to replace my helpdesk?',
    // CHANGED: spec also names Gmail and Shopify Inbox, which aren't confirmed integrations yet.
    a: 'No. MindX works with Gorgias and Zendesk. Hand-offs land in the tool your team already uses.',
  },
  {
    id: 'which-stores',
    q: 'Which stores is MindX for?',
    a: 'US Shopify brands with a steady support queue, typically 300 to 10,000 orders a month.',
  },
];

export const brainScanDemo = {
  title: 'MindX found 3 things worth looking at.',
  intro: 'We scanned your store and prioritized what deserves your attention first.',
  findings: [
    {
      category: 'Revenue',
      problem: 'Sales dropped 18% this week',
      evidence: 'Compared with the previous 30 days.',
      impact: '$4,200 below trend',
    },
    {
      category: 'Fulfilment',
      problem: '47 orders are still undelivered',
      evidence: '12 are beyond the expected delivery window.',
      impact: 'Rising support volume likely',
    },
    {
      category: 'Product',
      problem: 'Alpine Jacket sales are falling',
      evidence: 'Units sold down 31% over the last 14 days.',
      impact: '$1,800 at-risk revenue',
    },
  ] as const,
  disclaimer: "Illustrative. Numbers shown are sample data, not your store's data.",
  smallPrint: 'Read-only access. We never message your customers during a scan.',
} as const;

export const brainExplanation = {
  title: 'Shopify shows the data. MindX finds what matters.',
  body: 'Your store generates thousands of signals across orders, customers, products, fulfillment and more. MindX connects the dots and brings the things worth your attention to the surface.',
} as const;

export const productLoop = {
  title: 'Find. Understand. Decide. Act.',
  steps: [
    {
      title: 'Find',
      body: 'MindX finds what deserves your attention.',
    },
    {
      title: 'Understand',
      body: 'Ask what happened and why.',
    },
    {
      title: 'Decide',
      body: 'Choose what should happen next.',
    },
    {
      title: 'Act',
      body: 'Turn the decision into action.',
    },
  ],
} as const;

export const homeCta = {
  heading: 'See what MindX finds in your store.',
  body: 'Connect your Shopify store and get your first Brain Scan.',
} as const;

export const trustSection = {
  title: 'You stay in control.',
  items: [
    {
      heading: 'Read-only Shopify access',
      body: 'MindX reads your store data. It never writes orders or messages your customers.',
    },
    {
      heading: 'You approve every action',
      body: 'AI Workers do nothing without your go-ahead.',
    },
    {
      heading: 'Your data stays yours',
      body: 'We never sell or share your store data with third parties.',
    },
    {
      heading: 'Cancel any time',
      body: 'No lock-in, no minimum commitment.',
    },
  ],
  link: null,
} as const;
