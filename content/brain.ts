// MindX Brain page copy — rebuilt around Brain-first positioning.

export const brainHero = {
  eyebrow: 'MindX Brain',
  title: 'The Ecommerce Brain for your Shopify store.',
  subtitle:
    "MindX connects the tools you already use and builds a living understanding of your business — what happened, what's changing, and what needs attention.",
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
} as const;

export const brainConnect = {
  title: 'Your apps have the data. MindX connects the dots.',
  body: 'Your business is spread across Shopify, customer service, shipping, returns, marketing and other tools. MindX connects the context so you can understand what is happening across your business.',
  sources: ['Shopify', 'Customer Service', 'Shipping', 'Returns', 'Marketing'],
  output: 'One understanding of your business',
} as const;

export const brainUnderstands = {
  title: 'One Brain. Your whole business.',
  areas: [
    { title: 'Customers', body: 'Who bought, returned, contacted and came back.' },
    { title: 'Products', body: "What's selling, slowing down or causing problems." },
    { title: 'Orders', body: "What's happening from purchase to delivery." },
    { title: 'Revenue', body: "What's changing and where the movement comes from." },
    { title: 'Operations', body: 'Shipping, fulfillment, returns and exceptions.' },
    { title: 'Customer Service', body: 'What customers are asking and why.' },
    { title: 'Your Store', body: 'Your goals, policies and business rules.' },
  ],
} as const;

export const brainAsk = {
  title: 'Ask a question. Get an answer grounded in your business.',
  body: 'Ask MindX questions in plain English. It connects the relevant data, explains what happened, and shows you the evidence.',
  example: {
    question: 'Why did sales fall last week?',
    answer:
      'Revenue fell 14% compared with the previous week. The main driver was a drop in Alpine Jacket sales — units sold down 31% after a supplier batch change. Refunds on that product also increased during the same period.',
    evidence: ['Shopify Orders', 'Product data', 'Returns'],
  },
  otherQuestions: [
    'What changed in my business this week, and why?',
    'Which products are causing the most returns?',
    'Which customers are at risk after a bad delivery?',
    'Which carrier or region is causing late orders?',
  ],
} as const;

export const brainMemory = {
  title: 'MindX remembers the context behind your business.',
  body: "Your business isn't just numbers. MindX can build context around your policies, goals, customers, products, orders and decisions so answers become relevant to your business.",
  contexts: [
    'Business goals',
    'Policies',
    'Customers',
    'Products',
    'Orders',
    'Decisions',
    'History',
  ],
} as const;

export const brainLoop = {
  title: 'Find. Understand. Decide. Act.',
  steps: [
    { title: 'Find', body: 'MindX finds what deserves your attention.' },
    { title: 'Understand', body: 'Ask what happened and why.' },
    { title: 'Decide', body: 'Choose what should happen next.' },
    { title: 'Act', body: 'Turn the decision into action.' },
  ],
} as const;

export const brainCta = {
  heading: 'See what MindX finds in your Shopify store.',
  body: 'Read-only during your scan · No customer messages',
} as const;
