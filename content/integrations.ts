// Integrations page (spec B8, C7).
//
// CHANGED (3 Oct 2026, Rajesh): three honest levels, from an audit of the AWS
// product code (`test-aws`) on 3 Oct 2026:
//   brain   -- the Brain reads it today. Only Shopify.
//   support -- connects today and MindX AI answers customers there (beta). The
//              Brain does not read these conversations yet.
//   soon    -- planned. "Coming later" tools are dropped from the page.
// Email moved from live to soon: its AI reply path is not wired up yet.
// Re-check these levels with engineering whenever the product changes.

export type Level = 'brain' | 'support' | 'soon';

export type Integration = {
  name: string;
  level: Level;
  category: string;
  /** File in /public/logos (Simple Icons, CC0). Without one, a letter badge shows. */
  logo?: string;
  /** lucide icon name for our own channels that have no brand logo. */
  icon?: 'chat' | 'mail';
  oneLine?: string;
  reads?: string;
};

export const integrationsHero = {
  eyebrow: 'Integrations',
  title: 'Connect the tools your store already runs on.',
  subtitle:
    'MindX starts with Shopify. Your helpdesk and messaging channels connect today for AI support replies, and more tools are on the way.',
  secondaryCta: { label: 'Request an integration', href: '#request-integration' },
} as const;

export const levels: Record<Level, { label: string; title: string; body: string }> = {
  brain: {
    label: 'Live',
    title: 'The Brain reads it',
    body: 'Connect Shopify and the Brain starts working straight away. It reads your store, finds what needs attention and answers your questions. Read-only to start.',
  },
  support: {
    label: 'Beta',
    title: 'AI support replies',
    body: "Connect your helpdesk or messaging channels and MindX AI answers your customers there. The Brain doesn't read these conversations yet. That's next.",
  },
  soon: {
    label: 'Coming soon',
    title: 'On the way',
    body: "Tools we're building next. Choose Notify me and we'll email you when yours is ready.",
  },
};

export const cardLabels = {
  reads: 'Reads',
  connect: 'Connect',
  notify: 'Notify me',
} as const;

export const integrations: Integration[] = [
  // The Brain reads it
  {
    name: 'Shopify',
    level: 'brain',
    category: 'Store',
    logo: 'shopify',
    oneLine: 'Your orders, customers, products and fulfilments, in one live picture.',
    reads: 'Orders, customers, products, fulfilments',
  },

  // AI support replies (beta)
  { name: 'Gorgias', level: 'support', category: 'Helpdesk', oneLine: 'Answers tickets, as a reply or an internal note for your team.' },
  { name: 'Zendesk', level: 'support', category: 'Helpdesk', logo: 'zendesk', oneLine: 'Answers tickets, as a reply or an internal note for your team.' },
  { name: 'WhatsApp', level: 'support', category: 'Messaging', logo: 'whatsapp', oneLine: 'Answers customer messages on your WhatsApp business number.' },
  { name: 'Instagram', level: 'support', category: 'Messaging', logo: 'instagram', oneLine: 'Answers direct messages, and replies privately to comments.' },
  { name: 'Facebook Messenger', level: 'support', category: 'Messaging', logo: 'messenger', oneLine: 'Answers messages sent to your Facebook page.' },
  { name: 'Website chat', level: 'support', category: 'Messaging', icon: 'chat', oneLine: 'A chat widget on your store that answers shoppers.' },

  // On the way
  { name: 'Email', level: 'soon', category: 'Support and inbox', icon: 'mail' },
  { name: 'Gmail', level: 'soon', category: 'Support and inbox', logo: 'gmail' },
  { name: 'Shopify Inbox', level: 'soon', category: 'Support and inbox', logo: 'shopify' },
  { name: 'Intercom', level: 'soon', category: 'Support and inbox', logo: 'intercom' },
  { name: 'Re:amaze', level: 'soon', category: 'Support and inbox' },
  { name: 'Richpanel', level: 'soon', category: 'Support and inbox' },
  { name: 'AfterShip', level: 'soon', category: 'Shipping and tracking', logo: 'aftership' },
  { name: 'ShipStation', level: 'soon', category: 'Shipping and tracking' },
  { name: 'UPS', level: 'soon', category: 'Shipping and tracking', logo: 'ups' },
  { name: 'FedEx', level: 'soon', category: 'Shipping and tracking', logo: 'fedex' },
  { name: 'USPS', level: 'soon', category: 'Shipping and tracking', logo: 'usps' },
  { name: 'Loop Returns', level: 'soon', category: 'Returns' },
  { name: 'Shopify Returns', level: 'soon', category: 'Returns', logo: 'shopify' },
  { name: 'Recharge', level: 'soon', category: 'Subscriptions' },
  { name: 'Skio', level: 'soon', category: 'Subscriptions' },
  { name: 'Klaviyo', level: 'soon', category: 'Marketing' },
  { name: 'Attentive', level: 'soon', category: 'Marketing' },
  { name: 'Postscript', level: 'soon', category: 'Marketing' },
  { name: 'Slack', level: 'soon', category: 'Team and AI tools' },
  { name: 'Claude (via MCP)', level: 'soon', category: 'Team and AI tools', logo: 'claude' },
  { name: 'ChatGPT (via MCP)', level: 'soon', category: 'Team and AI tools' },
];

export const byLevel = (level: Level) => integrations.filter((i) => i.level === level);
export const soonCategories = Array.from(new Set(byLevel('soon').map((i) => i.category)));

export const integrationsStart = {
  title: 'How to start',
  steps: [
    { title: 'Connect Shopify', body: 'One click, read-only. Your Brain starts reading your store.' },
    { title: 'Get your Brain Scan', body: 'MindX shows you the 3 things worth your attention.' },
    { title: 'Add your support channels', body: 'Connect your helpdesk or messaging when you want AI replies.' },
  ],
} as const;

export const integrationsTrust = 'Shopify connects read-only to start. You choose which channels MindX answers on.';

export const integrationsCta = {
  heading: 'Connect your Shopify store. See what MindX finds.',
  body: "Start with Shopify. Add your support channels when you're ready.",
} as const;
