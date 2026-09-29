// MindX Resolve page copy (spec B4.1). Changes are marked CHANGED / ADDED.

export const resolveHero = {
  eyebrow: 'MindX Resolve · AI customer-service worker',
  title: 'The AI support worker that finishes the job',
  subtitle:
    'Resolve answers your customers 24/7 and takes the action in Shopify: returns, exchanges, cancellations, order edits and refunds. It checks the result and logs every step. You pay $0.90 per resolved conversation, and nothing when it hands off to your team.',
} as const;

export const resolveHandles = {
  title: 'What Resolve handles',
  columns: ['Request', 'What Resolve does'],
  rows: [
    ['Where is my order?', 'Live tracking, delay explanations, carrier claims. Warns customers before they ask when a shipment is late'],
    ['Change my order', 'Updates address, size, color or items before fulfillment'],
    ['Cancel my order', 'Cancels unfulfilled orders within your rules, or offers a swap first'],
    ['I want to return this', 'Checks eligibility, offers an exchange or store credit first, creates the return and label'],
    ['Where is my refund?', 'Shows refund status, or issues the refund within your limit'],
    ['It arrived damaged', 'Collects photos, sends a replacement or refund within your rules'],
    ['Product questions', 'Answers from your catalog, policies and past answers'],
  ],
} as const;

export const resolveFlow = {
  title: "It doesn't just answer. It resolves.",
  intro: 'A basic AI chat tells a customer to wait for an agent. Resolve works like your best team member:',
  steps: [
    { title: 'Understand', body: 'Understands the request and who is asking' },
    { title: 'Check', body: 'Checks the order, shipment, policy and customer history in MindX Brain' },
    { title: 'Decide', body: 'Decides the right action inside your rules' },
    { title: 'Act', body: 'Acts in Shopify and your other tools' },
    { title: 'Verify', body: 'Verifies the change actually happened' },
    { title: 'Learn', body: 'Learns from the outcome for next time' },
  ],
} as const;

export const resolveProactive = {
  title: 'Built to prevent tickets, not just answer them',
  body: 'When a carrier falls behind, Resolve spots it, messages the affected customers first, and records how many follow-up tickets that saved. A chatbot waits for the complaint. Resolve gets ahead of it.',
  // ADDED: illustrative visual for this section (sample numbers, labeled).
  mock: [
    { label: 'Carrier delay spotted', detail: 'USPS · 2-day scan gap · 38 orders', tone: 'warning' },
    { label: 'Customers told first', detail: '38 delay notices sent with new dates', tone: 'info' },
    { label: 'Tickets prevented', detail: '31 follow-up tickets avoided', tone: 'success' },
  ],
} as const;

export const resolveAutonomy = {
  title: 'Autonomy you turn up over time',
  columns: ['Mode', 'What happens', 'Best for'],
  levels: [
    { mode: 'Draft', what: 'Resolve writes the reply and action; your team clicks send', best: 'Week 1' },
    { mode: 'Approve', what: 'Resolve acts on safe requests; asks you for anything risky', best: 'Weeks 2 to 4' },
    { mode: 'Automatic', what: 'Resolve handles the request types you choose, within your limits', best: 'Once you trust the results' },
  ],
} as const;

export const resolveRules = {
  title: 'Your rules, enforced every time',
  rules: [
    'Set limits in plain English, for example "auto-refund under $50 if unopened"',
    'Anything outside your rules goes to a human with full context',
    'Every action is logged with the reason, the rule and the result',
    // CHANGED: spec also names Gmail; not a confirmed integration yet.
    'Hand-offs land in your helpdesk (Gorgias or Zendesk) with a summary, so nobody asks the customer twice',
  ],
} as const;

export const resolveChannels = {
  title: 'Channels',
  // CHANGED: the spec says "[Update to match what is live.]" These are the
  // channels and helpdesks found in the product code (28 Sep 2026).
  channels: ['Website chat', 'Email', 'WhatsApp', 'Instagram', 'Facebook Messenger'],
  helpdesks: 'Works inside Gorgias and Zendesk.',
} as const;

export const resolvePricing = {
  text: '$0.90 per resolved conversation. $0 when it goes to a human. Plus your MindX Brain plan from $49 a month.',
  link: { label: 'See pricing', href: '/pricing' },
} as const;

// ADDED: the page FAQ has no heading in the spec.
export const resolveFaqTitle = 'Questions about Resolve';

export const resolveFaq = [
  {
    id: 'resolved',
    q: 'What counts as "resolved"?',
    a: 'A conversation where the customer\'s request was completed by Resolve and the customer did not come back about the same issue within 72 hours. [Confirm the window before launch.]',
  },
  {
    id: 'replace-team',
    q: 'Will it replace my support team?',
    a: 'No. It takes the repetitive work so your team handles the conversations that need a person.',
  },
  {
    id: 'mistakes',
    q: 'Can it make mistakes?',
    a: 'Any AI can. That\'s why Resolve works inside your rules, verifies its actions and hands anything uncertain to a human.',
  },
  {
    id: 'setup',
    q: 'How long does setup take?',
    a: 'Most stores connect in under an hour and start in draft mode the same day.',
  },
];

export const resolveCta = {
  heading: 'Hire your first AI worker',
} as const;
