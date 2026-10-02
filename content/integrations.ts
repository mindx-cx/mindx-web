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
  title: 'Connect the tools your store already runs on.',
  subtitle:
    'MindX brings your Shopify, customer service, shipping, returns and marketing data together so your Brain can understand what is happening across your business.',
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
    oneLine: 'Orders, products, customers and store activity.',
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
    oneLine: 'Customer conversations, tickets and service issues.',
    reads: 'Tickets, messages, tags',
    changes: 'Replies, tags, ticket status',
  },
  {
    name: 'Zendesk',
    category: 'Helpdesk and inbox',
    status: 'live',
    oneLine: 'Customer conversations, tickets and service issues.',
    reads: 'Tickets, messages, tags',
    changes: 'Replies, tags, ticket status',
  },
  { name: 'Gmail', category: 'Helpdesk and inbox', status: 'soon', ...planned('customer email context from your Gmail support inbox.') },
  { name: 'Shopify Inbox', category: 'Helpdesk and inbox', status: 'soon', ...planned('customer chat context from Shopify Inbox.') },
  { name: 'Intercom', category: 'Helpdesk and inbox', status: 'soon', ...planned('customer conversation context from Intercom.') },
  { name: 'Re:amaze', category: 'Helpdesk and inbox', status: 'soon', ...planned('customer conversation context from Re:amaze.') },
  { name: 'Richpanel', category: 'Helpdesk and inbox', status: 'soon', ...planned('customer conversation context from Richpanel.') },

  // Channels
  {
    name: 'Website chat',
    category: 'Channels',
    status: 'live',
    oneLine: 'Customer conversations on your store chat widget.',
    reads: 'Chat messages',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'Email',
    category: 'Channels',
    status: 'live',
    oneLine: 'Customer emails to your support address.',
    reads: 'Incoming support emails',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'WhatsApp',
    category: 'Channels',
    status: 'live',
    oneLine: 'Customer messages on your WhatsApp business number.',
    reads: 'WhatsApp messages',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'Instagram',
    category: 'Channels',
    status: 'live',
    oneLine: 'Customer direct messages from Instagram.',
    reads: 'Direct messages',
    changes: 'Replies, hand-offs to your team',
  },
  {
    name: 'Facebook Messenger',
    category: 'Channels',
    status: 'live',
    oneLine: 'Customer messages from your Facebook page.',
    reads: 'Messenger messages',
    changes: 'Replies, hand-offs to your team',
  },

  // Shipping and tracking
  { name: 'AfterShip', category: 'Shipping and tracking', status: 'soon', ...planned('shipments, tracking and delivery context for the Brain.') },
  { name: 'ShipStation', category: 'Shipping and tracking', status: 'soon', ...planned('shipping labels and shipment context for the Brain.') },
  { name: 'UPS', category: 'Shipping and tracking', status: 'soon', ...planned('live UPS tracking and delivery context.') },
  { name: 'FedEx', category: 'Shipping and tracking', status: 'soon', ...planned('live FedEx tracking and delivery context.') },
  { name: 'USPS', category: 'Shipping and tracking', status: 'soon', ...planned('live USPS tracking and delivery context.') },

  // Returns
  { name: 'Loop Returns', category: 'Returns', status: 'soon', ...planned('returns, exchanges and return reason context.') },
  { name: 'Shopify Returns', category: 'Returns', status: 'soon', ...planned('returns and refund context in Shopify.') },

  // Subscriptions
  { name: 'Recharge', category: 'Subscriptions', status: 'soon', ...planned('subscription orders and customer context.') },
  { name: 'Skio', category: 'Subscriptions', status: 'soon', ...planned('subscription orders and customer context.') },

  // Marketing
  { name: 'Klaviyo', category: 'Marketing', status: 'soon', ...planned('marketing campaigns and customer engagement context.') },
  { name: 'Attentive', category: 'Marketing', status: 'soon', ...planned('SMS marketing and customer engagement context.') },
  { name: 'Postscript', category: 'Marketing', status: 'soon', ...planned('SMS marketing and customer engagement context.') },

  // Reviews and loyalty
  { name: 'Okendo', category: 'Reviews and loyalty', status: 'later', ...planned('reviews feed product insights in the Brain.') },
  { name: 'Yotpo', category: 'Reviews and loyalty', status: 'later', ...planned('reviews and loyalty signals in the Brain.') },
  { name: 'Judge.me', category: 'Reviews and loyalty', status: 'later', ...planned('reviews feed product insights in the Brain.') },

  // Ads and analytics
  { name: 'Meta', category: 'Ads and analytics', status: 'later', ...planned('ad spend and campaign context in the Brain.') },
  { name: 'Google Ads', category: 'Ads and analytics', status: 'later', ...planned('ad spend and performance context in the Brain.') },
  { name: 'GA4', category: 'Ads and analytics', status: 'later', ...planned('site analytics and traffic context in the Brain.') },
  { name: 'Triple Whale', category: 'Ads and analytics', status: 'later', ...planned('attribution and revenue context in the Brain.') },

  // Payments and finance
  { name: 'Shopify Payments', category: 'Payments and finance', status: 'later', ...planned('payouts and payment context in the Brain.') },
  { name: 'Stripe', category: 'Payments and finance', status: 'later', ...planned('payment context in the Brain.') },
  { name: 'PayPal', category: 'Payments and finance', status: 'later', ...planned('payment context in the Brain.') },
  { name: 'QuickBooks', category: 'Payments and finance', status: 'later', ...planned('costs and margin context in the Brain.') },

  // Team and AI tools
  { name: 'Slack', category: 'Team and AI tools', status: 'soon', ...planned('Brain summaries and alerts in Slack.') },
  { name: 'Claude (via MCP)', category: 'Team and AI tools', status: 'soon', ...planned('ask MindX Brain from Claude.') },
  { name: 'ChatGPT (via MCP)', category: 'Team and AI tools', status: 'soon', ...planned('ask MindX Brain from ChatGPT.') },
];

export const categories = Array.from(new Set(integrations.map((i) => i.category)));

// Brain-first page section content.

export const integrationsContext = {
  title: 'Your tools hold the data. MindX connects the context.',
  body: 'Your business is spread across the systems you already use. Shopify knows your orders. Customer service knows your conversations. Shipping knows your deliveries. Marketing knows your campaigns. MindX connects the context across them.',
} as const;

export const integrationsSources = [
  'Shopify',
  'Customer Service',
  'Shipping',
  'Returns',
  'Marketing',
] as const;

export const integrationsStartShopify = {
  title: 'Start with Shopify.',
  body: 'Connect Shopify first. MindX can start understanding your store immediately. Add more systems when you want deeper business context.',
  steps: [
    { label: 'Shopify', note: 'Connect your store.' },
    { label: 'Brain Scan', note: 'MindX reads your data.' },
    { label: 'Find what needs attention', note: 'Discover what deserves your focus.' },
    { label: 'Connect more context', note: 'Add customer service, shipping or marketing.' },
    { label: 'Deeper understanding', note: 'The Brain sees more of your business.' },
  ],
} as const;

export const integrationsDepth = {
  title: 'More context. Better understanding.',
  body: 'Each connected system gives MindX another piece of the picture. Together, they help the Brain understand what is happening across your business.',
  examples: [
    { combo: 'Shopify + Customer Service', result: 'See whether a product problem is driving support volume.' },
    { combo: 'Shopify + Shipping', result: 'Connect late deliveries with customer issues.' },
    { combo: 'Shopify + Marketing', result: 'Understand changes in sales alongside campaign activity.' },
    { combo: 'Shopify + Returns', result: 'Connect returns to products, customers and order patterns.' },
  ],
} as const;

export const integrationsPrinciple = {
  title: 'MindX works with the tools you already use.',
  body: "You don't need to replace your ecommerce stack. MindX sits across it and connects the context your business needs.",
} as const;

export const integrationsCta = {
  heading: 'Connect your Shopify store. See what MindX finds.',
  body: "Start with Shopify. Add more context when you're ready.",
} as const;
