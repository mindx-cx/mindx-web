// Home page copy, prototype v3 (2 Oct 2026). Replaces the Resolve/Convert/Grow
// worker story with the Brain: the page now says what MindX notices about a
// store, not what seats it sells.
//
// The page order mirrors YouSpot's, because that order works: show the thing,
// show it finding something, show the merchant still holding the pen, then
// answer the four objections. Copy is ours.

export const brainHero = {
  // The accessible headline is the whole sentence; the visual splits it over
  // two lines with the second half in brand colour.
  title: 'The AI-Native Ecommerce Brain Built for Shopify.',
  titleLead: 'The AI-Native Ecommerce Brain',
  titleAccent: 'Built for Shopify.',
  subtitle:
    'MindX connects to your store, learns how it actually runs, and tells you what needs your attention today — before you go looking.',
  trustLine: 'Cancel anytime. No ONE question asked.',
  /**
   * The systems a store's context is scattered across. They orbit the MX mark
   * in the hero: the picture is "all of this, in one place", made before the
   * visitor has read a word.
   */
  entities: [
    'SHOPIFY',
    'GORGIAS',
    'KLAVIYO',
    'AFTERSHIP',
    'STRIPE',
    'RETURNS',
    'META ADS',
    'EMAIL',
    'PRODUCTS',
  ],
} as const;

export const integrationStrip = {
  label: 'Reads from the tools you already run',
  items: ['Shopify', 'Gorgias', 'Klaviyo', 'AfterShip', 'Stripe', 'Meta Ads'],
} as const;

export const buildsItself = {
  title: 'The second brain builds itself.',
  body: 'No dashboards to configure, no reports to set up. Connect Shopify and ask in plain English.',
  questions: [
    'How did revenue do last month compared to the month before?',
    'Which products have gone quiet in the last 30 days?',
    'How many orders are still waiting to ship?',
    'What is coming back, and why?',
    'Which repeat customers have stopped buying?',
  ],
} as const;

export const keepsTrack = {
  title: 'It keeps track of what matters.',
  body: 'MindX watches the numbers every day and surfaces only the few that moved enough to be worth your time.',
  // Illustrative, not a customer's real figures -- the caption says so on the
  // page. Making up a merchant's numbers and presenting them as measured would
  // be a claim we cannot stand behind.
  caption: 'Example of a first scan. Your own numbers come from your store.',
  cards: [
    {
      kind: 'revenue',
      title: 'Sales are down 18% this month',
      body: 'Revenue fell from $42,100 to $34,500 against the previous 30 days. Most of the gap is in one channel.',
      meta: 'Measured · last 30 days',
    },
    {
      kind: 'fulfilment',
      title: '47 orders have not shipped',
      body: 'They have been paid and unfulfilled for more than 5 days. The oldest is 19 days old.',
      meta: 'Measured · last 60 days',
    },
    {
      kind: 'product',
      title: 'Alpine Jacket is down 31%',
      body: 'It sold 58 units last month and 40 this month, while the rest of the catalogue held steady.',
      meta: 'Measured · last 30 days',
    },
  ],
} as const;

export const draftSection = {
  title: 'Nothing sends until you do.',
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
  title: 'Your AI knows the world. MindX knows your store.',
  body: 'A general model can tell you what a good return rate looks like. MindX can tell you yours, which SKU is driving it, and which customers it cost you — because every number it gives you is computed from your data, not guessed.',
} as const;

export const brainFaqTitle = 'Questions merchants ask us';

export const brainFaq = [
  {
    id: 'what-is-mindx',
    q: 'What is MindX, exactly?',
    a: 'A brain for your store. It connects to Shopify and the tools around it, keeps one live model of what is happening, and answers questions about it in plain English. It also tells you, unprompted, when something has moved enough to be worth looking at.',
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
    a: 'No. MindX reads from them. Your helpdesk, your email tool and your shipping app carry on exactly as they are — MindX is the layer that sees across all of them at once.',
  },
] as const;

export const brainCta = {
  heading: 'Connect your store. See what MindX finds.',
  body: 'The first scan takes a few minutes and costs nothing.',
} as const;
