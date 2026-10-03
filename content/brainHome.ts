// Home page copy, prototype v3 (2 Oct 2026). Replaces the Resolve/Convert/Grow
// worker story with the Brain: the page now says what MindX notices about a
// store, not what seats it sells.
//
// The order: show the thing, show it finding something, show the merchant
// still holding the pen, then answer the four objections.

export const brainHero = {
  // Headline, subtitle and trust line come from content/home.ts -- they are
  // Rajesh's words and that file owns them. What lives here is only what the
  // prototype's hero adds: the entity ring.
  /**
   * What the Brain reads, framing the MX mark: "all of this, in one place".
   * CHANGED 3 Oct 2026: Shopify and the parts of a store it reads, in place of
   * tool names (Klaviyo, AfterShip, Stripe, Meta Ads) the Brain cannot read
   * yet, per the audit of the AWS product.
   */
  entities: [
    'SHOPIFY',
    'ORDERS',
    'CUSTOMERS',
    'PRODUCTS',
    'RETURNS',
    'INVENTORY',
    'FULFILMENT',
    'REFUNDS',
    'DISCOUNTS',
  ],
} as const;

// CHANGED 3 Oct 2026: honest about what connects today, matching the
// Integrations page (the Brain reads Shopify; support channels are beta).
export const integrationStrip = {
  label: 'Starts with Shopify',
  live: 'Shopify',
  liveTag: 'Live',
  beta: ['Gorgias', 'Zendesk', 'WhatsApp', 'Instagram', 'Messenger'],
  betaTag: 'Beta: AI replies',
  more: { label: 'More on the way', href: '/integrations' },
} as const;

export const buildsItself = {
  title: 'Ask your store anything.',
  body: 'No dashboards to configure, no reports to set up. Connect Shopify and ask in plain English.',
  questions: [
    'How did revenue do last month compared to the month before?',
    'Which products have gone quiet in the last 30 days?',
    'How many orders are still waiting to ship?',
    'What is coming back, and why?',
    'Which repeat customers have stopped buying?',
  ],
} as const;

export const draftSection = {
  title: 'You approve every message.',
  body: 'MindX writes the message, names who it goes to and shows you the evidence. You approve it, edit it, or throw it away. It never acts on your store behind your back.',
  draft: {
    to: '47 customers with orders over 5 days old',
    subject: 'A quick update on your order',
    lines: [
      'Hi {{first_name}},',
      'Your order is taking longer than it should, and that is on us. It is packed and leaves our warehouse this week.',
      'If you would rather not wait, reply to this email and we will refund you in full today.',
    ],
    primary: 'Send to 47 customers',
    secondary: 'Edit',
  },
} as const;

export const knowsYourStore = {
  // The heading is composed in the component so the second sentence can carry
  // the brand colour; kept here too for anything that needs it as one string.
  title: 'ChatGPT knows ecommerce. MindX knows your store.',
  lead: 'ChatGPT knows ecommerce.',
  brand: 'MindX knows your store.',
  body: 'A general model can tell you what a good return rate looks like. MindX can tell you yours, which SKU is driving it, and which customers it cost you — because every number it gives you is computed from your data, not guessed.',
} as const;

// Replaces the four text steps (Find. Understand. Decide. Act.), which
// repeated the How it works page; this points there instead (3 Oct 2026).
export const howTeaser = {
  title: 'From a connected store to a fix you approve.',
  steps: [
    { title: 'Connect', body: 'Shopify, in one click. Read-only to start.' },
    { title: 'Find', body: 'MindX surfaces what needs your attention.' },
    { title: 'Act', body: 'See why it matters, then approve the fix.' },
  ],
  link: { label: 'See how it works', href: '/brain' },
} as const;

export const brainFaqTitle = 'Questions merchants ask us';

export const brainFaq = [
  {
    id: 'what-is-mindx',
    q: 'What is MindX, exactly?',
    a: 'A brain for your store. It connects to your Shopify store, keeps one live model of what is happening, and answers questions about it in plain English. It also tells you, unprompted, when something has moved enough to be worth looking at.',
  },
  {
    id: 'cost',
    q: 'What does it cost?',
    a: 'There is a free plan with 50 Brain Credits a month — one question costs one credit — and no card. Pro is $19 a month for continuous monitoring, deeper investigations and approval workflows. Pricing is based on how much thinking you use, not how many seats you have.',
  },
  {
    id: 'data',
    q: 'What data does it read?',
    a: 'Only what you connect, and only the read scopes needed to answer. On Shopify that is orders, products and customers. It does not write to your store unless you approve a specific action, one at a time.',
  },
  {
    id: 'replace-apps',
    q: 'Do I need to replace the apps I already use?',
    a: 'No. MindX starts with Shopify, and your helpdesk, email tool and shipping app carry on exactly as they are. Support channels connect today for AI replies, and the Brain will read more of your tools as those connections arrive.',
  },
] as const;

export const brainCta = {
  heading: 'Connect your store. See what MindX finds.',
  body: 'The first scan takes a few minutes and costs nothing.',
} as const;
