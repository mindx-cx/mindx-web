// /beta: the landing page for the ChatGPT Ads beta test (4 Oct 2026).
//
// Pre-approval page. Shopify approval is pending, so nothing here may say or
// imply that MindX is Shopify-approved, in the Shopify App Store, available
// now, or that a merchant can connect a store today. The example is
// illustrative and labelled as such. Copy is Rajesh's campaign brief.

export const betaSeo = {
  title: 'MindX — The Ecommerce Brain for Shopify Merchants',
  description:
    'MindX is building the Ecommerce Brain for Shopify merchants — helping businesses find the problems worth their attention and understand what is happening.',
  path: '/beta',
} as const;

export const betaCta = { label: 'Join the MindX Beta', href: '#beta' } as const;

export const betaNav = [
  { label: 'Brain', href: '#brain' },
  { label: 'How it works', href: '#how' },
  { label: 'Beta', href: '#beta' },
] as const;

export const betaHero = {
  titleLead: "Your Shopify store has problems you can't see.",
  titleBrand: 'MindX finds them.',
  subtitle:
    'The Ecommerce Brain for Shopify merchants. MindX is being built to connect the dots across your business, find what deserves your attention, and help you understand what is happening.',
  secondary: { label: 'See how it works', href: '#how' },
  trust: 'Built for Shopify merchants · Early access',
} as const;

export const betaProblem = {
  title: 'Your store generates thousands of signals every day.',
  signals: ['Orders', 'Products', 'Customers', 'Fulfillment', 'Returns', 'Revenue'],
  lead: 'Your Shopify store has the data.',
  butLabel: 'But data doesn’t tell you',
  question: 'What actually matters right now?',
} as const;

export const betaIdea = {
  title: 'Your apps have the data. MindX connects the dots.',
  body: [
    'MindX is building an Ecommerce Brain that understands your business context across the systems that run your store.',
    'Instead of giving you another dashboard to watch, MindX is designed to surface the things that deserve your attention.',
  ],
  steps: [
    { title: 'Find', body: 'Discover problems and unusual changes.' },
    { title: 'Understand', body: 'Investigate the evidence and understand why something is happening.' },
    { title: 'Decide', body: 'Get a clear recommendation about what deserves your attention next.' },
  ],
} as const;

export const betaExample = {
  title: 'Imagine MindX telling you this:',
  badge: 'Demo',
  finding: 'Sales are down 18% this week.',
  why: 'Why?',
  evidence: [
    'Traffic is stable.',
    'Orders are down 12%.',
    'Three products account for most of the decline.',
    'Inventory is available.',
  ],
  conclusion:
    'The decline appears concentrated in those products rather than being caused by a broad traffic drop.',
  caption: 'This is the kind of business understanding MindX is being built to provide.',
  label: 'Illustrative example — not customer data.',
} as const;

export const betaWhy = {
  title: 'Not another dashboard. Not another chatbot.',
  body: [
    'MindX is being built around a simple idea: the merchant shouldn’t have to search through dozens of dashboards to figure out what matters.',
    'MindX aims to become the intelligence layer that understands the business context behind the numbers.',
  ],
} as const;

export const betaWho = {
  title: 'Built for Shopify merchants who want to understand their business better.',
  bullets: [
    'Growing Shopify brands',
    'DTC businesses',
    'Small ecommerce teams',
    'Merchants dealing with too much data and too little clarity',
    'Founders who want to know what deserves their attention',
  ],
} as const;

export const betaForm = {
  title: 'What would MindX find in your Shopify store?',
  subtitle: 'We’re looking for a small group of Shopify merchants to help us shape the Ecommerce Brain.',
  email: 'Work email',
  emailPlaceholder: 'you@yourstore.com',
  store: 'Shopify store URL',
  storePlaceholder: 'yourstore.myshopify.com',
  submit: 'Request Beta Access',
  sending: 'Sending…',
  note: 'Early access for Shopify merchants. By requesting access you agree to our Terms and Privacy Policy.',
  errors: {
    email: 'Enter your work email.',
    store: 'Enter your Shopify store URL, for example yourstore.myshopify.com.',
    server: 'That didn’t go through. Please try again in a moment.',
  },
  success: {
    title: 'You’re on the list.',
    body: 'Thanks. We’re building MindX with Shopify merchants, not just for them. We will contact you when beta access becomes available.',
  },
} as const;

export const betaFinal = {
  titleLead: 'Your Shopify store already has the data.',
  titleBrand: 'The question is: what are you missing?',
} as const;
