// Global FAQ (spec B10.1). The home page shows the first four.

export const faqPage = {
  eyebrow: 'FAQ',
  title: 'MindX FAQ',
  subtitle: 'Answers about MindX Brain, MindX Resolve, pricing, setup and data security.',
} as const;

export const globalFaq = [
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
    // CHANGED: spec also names Gmail and Shopify Inbox (not confirmed yet).
    a: 'No. MindX works with Gorgias and Zendesk. Hand-offs land in the tool your team already uses.',
  },
  {
    id: 'which-stores',
    q: 'Which stores is MindX for?',
    a: 'US Shopify brands with a steady support queue, typically 300 to 10,000 orders a month.',
  },
  {
    id: 'how-fast',
    q: 'How fast can I start?',
    a: 'Connect in minutes, see your Brain Scan the same day, and start Resolve in draft mode that afternoon.',
  },
  {
    id: 'data-safe',
    q: 'Is my data safe?',
    a: 'Yes. Read-only for the scan, least-access permissions, encryption and a full audit log. See our Trust & security page.',
  },
  {
    id: 'who',
    q: 'Who is behind MindX?',
    // CHANGED: company name is "MindX AI" (decision 29 Sep 2026).
    a: 'MindX AI, founded by Rajesh Dayalan and Sharmila Kabilar. See our About page.',
  },
];
