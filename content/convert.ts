// MindX Convert page copy. The spec (B4.2) only has waitlist copy because it
// assumed "Coming 2027"; Convert is live (decision 28 Sep 2026). Hero copy and
// pricing are the spec's; everything marked DRAFT is new copy in the spec's
// voice. Confirm each capability with the product team before launch.

export const convertHero = {
  eyebrow: 'MindX Convert · AI sales worker',
  title: 'Turn questions into sales',
  subtitle:
    'Many support conversations are really pre-sale questions. Convert answers them with the right product, size and offer, using everything MindX Brain knows about the shopper. You pay only when it wins a sale: 5% of the order, capped at $5.',
} as const;

// DRAFT
export const convertHandles = {
  title: 'What Convert handles',
  columns: ['Shopper asks', 'What Convert does'],
  rows: [
    ['Does this run small?', 'Recommends the right size from your size chart, reviews and past returns'],
    ['Which one should I buy?', 'Compares products from your catalog and recommends one, with the reason'],
    ['Is it in stock? When will it arrive?', 'Checks live stock and delivery times in Shopify'],
    ['Can I return it if it doesn\'t fit?', 'Explains your return and exchange policy before the purchase'],
    ['Do you have a discount?', 'Offers only the offers you have approved, never more'],
  ],
} as const;

// DRAFT
export const convertFlow = {
  title: 'It answers like your best salesperson',
  intro: 'A basic chatbot links to a FAQ page. Convert closes the question:',
  steps: [
    { title: 'Understand', body: 'Understands what the shopper wants and what is holding them back' },
    { title: 'Check', body: 'Checks product, stock, reviews and policies in MindX Brain' },
    { title: 'Recommend', body: 'Recommends the right product and size, with the reason' },
    { title: 'Add to cart', body: 'Adds it to the cart when the shopper says yes' },
    { title: 'Record', body: 'Records the sale in your outcome ledger' },
  ],
} as const;

// DRAFT
export const convertRules = {
  title: 'Selling inside your rules',
  rules: [
    'Recommends only products that are in stock',
    'Offers only the discounts you approve, with a limit you set',
    'Hands high-value or unusual requests to your team with full context',
    'Every recommendation and sale is logged in your outcome ledger',
  ],
} as const;

export const convertPricing = {
  // From spec B6.3.
  text: '5% of the order, capped at $5, only when Convert wins a sale. Plus your MindX Brain plan from $49 a month.',
  link: { label: 'See pricing', href: '/pricing' },
} as const;

export const convertFaqTitle = 'Questions about Convert';

// DRAFT
export const convertFaq = [
  {
    id: 'sale-won',
    q: 'What counts as a sale won by Convert?',
    a: 'An order placed after a Convert conversation that recommended the product, within the attribution window. [Confirm the attribution window before launch.]',
  },
  {
    id: 'discounts',
    q: 'Will Convert give away discounts?',
    a: 'No. It only offers discounts you have approved, up to the limit you set.',
  },
  {
    id: 'where',
    q: 'Where does Convert talk to shoppers?',
    a: 'In the same channels as Resolve: website chat, email, WhatsApp, Instagram and Messenger.',
  },
  {
    id: 'with-resolve',
    q: 'Does Convert work with Resolve?',
    a: 'Yes. Both use MindX Brain, so a shopper who asks about sizing and later asks about delivery gets one consistent answer.',
  },
];

export const convertCta = {
  heading: 'Turn more questions into orders',
} as const;
