// Integrations directory (spec B8, C7). Statuses reflect what exists in the
// product code on 28 Sep 2026, not the spec's planned list: only Shopify,
// Gorgias, Zendesk and the messaging channels are live. [Engineering to
// confirm statuses before launch.]

export type Status = 'live' | 'beta' | 'soon' | 'later';

export type Integration = {
  name: string;
  category: string;
  status: Status;
  oneLine: string;
  reads?: string;
  changes?: string;
};

export const integrationsHero = {
  eyebrow: 'Integrations',
  title: 'Connects to everything. Replaces nothing.',
  subtitle:
    'Keep the tools you already use. MindX Brain joins them into one picture, so your AI Workers can act across all of them.',
  searchPlaceholder: 'Search integrations (e.g. Gorgias, AfterShip)',
  searchLabel: 'Search integrations',
  categoryLabel: 'Category',
  statusLabel: 'Status',
  all: 'All',
  empty: 'No integrations match. Request it below.',
} as const;

export const statusLabels: Record<Status, string> = {
  live: 'Live',
  beta: 'Beta',
  soon: 'Coming soon',
  later: 'Coming later',
};

export const cardLabels = {
  reads: 'Reads',
  changes: 'Changes',
  connect: 'Connect',
  notify: 'Notify me',
} as const;

const planned = (what: string): Pick<Integration, 'oneLine'> => ({ oneLine: `Planned: ${what}` });

export const integrations: Integration[] = [
  // Store
  {
    name: 'Shopify',
    category: 'Store',
    status: 'live',
    oneLine: 'Resolve reads orders and makes changes in Shopify.',
    reads: 'Orders, customers, products, fulfillments',
    changes: 'Order edits, cancellations, refunds, returns (with your permission)',
  },
  { name: 'WooCommerce', category: 'Store', status: 'later', ...planned('the Brain for WooCommerce stores.') },
  { name: 'Magento / Adobe Commerce', category: 'Store', status: 'later', ...planned('the Brain for Adobe Commerce stores.') },
  { name: 'BigCommerce', category: 'Store', status: 'later', ...planned('the Brain for BigCommerce stores.') },

  // Helpdesk and inbox
  {
    name: 'Gorgias',
    category: 'Helpdesk and inbox',
    status: 'live',
    oneLine: 'Resolve answers tickets and hands off with a summary.',
    reads: 'Tickets, messages, tags',
    changes: 'Replies, tags, ticket status',
  },
  {
    name: 'Zendesk',
    category: 'Helpdesk and inbox',
    status: 'live',
    oneLine: 'Resolve answers tickets and hands off with a summary.',
    reads: 'Tickets, messages, tags',
    changes: 'Replies, tags, ticket status',
  },
  { name: 'Gmail', category: 'Helpdesk and inbox', status: 'soon', ...planned('Resolve replies from your Gmail support inbox.') },
  { name: 'Shopify Inbox', category: 'Helpdesk and inbox', status: 'soon', ...planned('Resolve answers Shopify Inbox chats.') },
  { name: 'Intercom', category: 'Helpdesk and inbox', status: 'soon', ...planned('Resolve answers Intercom conversations.') },
  { name: 'Re:amaze', category: 'Helpdesk and inbox', status: 'soon', ...planned('Resolve answers Re:amaze conversations.') },
  { name: 'Richpanel', category: 'Helpdesk and inbox', status: 'soon', ...planned('Resolve answers Richpanel tickets.') },

  // Channels (ADDED: live in the product, not in the spec's list)
  {
    name: 'Website chat',
    category: 'Channels',
    status: 'live',
    oneLine: 'MindX answers shoppers in a chat widget on your store.',
    reads: 'Chat messages',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'Email',
    category: 'Channels',
    status: 'live',
    oneLine: 'MindX answers customers who email your support address.',
    reads: 'Incoming support emails',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'WhatsApp',
    category: 'Channels',
    status: 'live',
    oneLine: 'MindX answers customers on your WhatsApp business number.',
    reads: 'WhatsApp messages',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'Instagram',
    category: 'Channels',
    status: 'live',
    oneLine: 'MindX answers Instagram direct messages.',
    reads: 'Direct messages',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'Facebook Messenger',
    category: 'Channels',
    status: 'live',
    oneLine: 'MindX answers Messenger conversations on your Facebook page.',
    reads: 'Messenger messages',
    changes: 'Replies, hand-offs to your team',
  },

  // Shipping and tracking
  { name: 'AfterShip', category: 'Shipping and tracking', status: 'soon', ...planned('the Brain sees every shipment and delay.') },
  { name: 'ShipStation', category: 'Shipping and tracking', status: 'soon', ...planned('the Brain sees labels and shipments.') },
  { name: 'UPS', category: 'Shipping and tracking', status: 'soon', ...planned('live UPS tracking and delay alerts.') },
  { name: 'FedEx', category: 'Shipping and tracking', status: 'soon', ...planned('live FedEx tracking and delay alerts.') },
  { name: 'USPS', category: 'Shipping and tracking', status: 'soon', ...planned('live USPS tracking and delay alerts.') },

  // Returns
  { name: 'Loop Returns', category: 'Returns', status: 'soon', ...planned('Resolve creates returns and exchanges in Loop.') },
  { name: 'Shopify Returns', category: 'Returns', status: 'soon', ...planned('Resolve creates returns in Shopify.') },

  // Subscriptions
  { name: 'Recharge', category: 'Subscriptions', status: 'soon', ...planned('Resolve skips, swaps and pauses subscriptions.') },
  { name: 'Skio', category: 'Subscriptions', status: 'soon', ...planned('Resolve skips, swaps and pauses subscriptions.') },

  // Marketing
  { name: 'Klaviyo', category: 'Marketing', status: 'soon', ...planned('Grow runs win-back flows with what the Brain learns.') },
  { name: 'Attentive', category: 'Marketing', status: 'soon', ...planned('Grow sends SMS win-back and retention.') },
  { name: 'Postscript', category: 'Marketing', status: 'soon', ...planned('Grow sends SMS win-back and retention.') },

  // Reviews and loyalty
  { name: 'Okendo', category: 'Reviews and loyalty', status: 'later', ...planned('reviews feed product insights in the Brain.') },
  { name: 'Yotpo', category: 'Reviews and loyalty', status: 'later', ...planned('reviews and loyalty in the Brain.') },
  { name: 'Judge.me', category: 'Reviews and loyalty', status: 'later', ...planned('reviews feed product insights in the Brain.') },

  // Ads and analytics
  { name: 'Meta', category: 'Ads and analytics', status: 'later', ...planned('ad spend and results in the Brain.') },
  { name: 'Google Ads', category: 'Ads and analytics', status: 'later', ...planned('ad spend and results in the Brain.') },
  { name: 'GA4', category: 'Ads and analytics', status: 'later', ...planned('site analytics in the Brain.') },
  { name: 'Triple Whale', category: 'Ads and analytics', status: 'later', ...planned('attribution data in the Brain.') },

  // Payments and finance
  { name: 'Shopify Payments', category: 'Payments and finance', status: 'later', ...planned('payouts and disputes in the Brain.') },
  { name: 'Stripe', category: 'Payments and finance', status: 'later', ...planned('payments and disputes in the Brain.') },
  { name: 'PayPal', category: 'Payments and finance', status: 'later', ...planned('payments and disputes in the Brain.') },
  { name: 'QuickBooks', category: 'Payments and finance', status: 'later', ...planned('costs and margins in the Brain.') },

  // Team and AI tools
  { name: 'Slack', category: 'Team and AI tools', status: 'soon', ...planned('hand-offs and daily summaries in Slack.') },
  { name: 'Claude (via MCP)', category: 'Team and AI tools', status: 'soon', ...planned('ask MindX Brain from Claude.') },
  { name: 'ChatGPT (via MCP)', category: 'Team and AI tools', status: 'soon', ...planned('ask MindX Brain from ChatGPT.') },
];

export const categories = Array.from(new Set(integrations.map((i) => i.category)));
