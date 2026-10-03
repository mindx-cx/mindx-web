// "How it works" page (route /brain). CHANGED 3 Oct 2026 (Rajesh): rebuilt as
// Connect / Find / Act with product cards, a "what it keeps an eye on" grid,
// trust promises and an FAQ.
//
// Honesty rule from the 3 Oct audit of the AWS product: the Brain reads
// Shopify only. Every example below uses Shopify data (orders, returns,
// inventory, discount codes), never support tickets, and the page says so.

export const howHero = {
  eyebrow: 'How it works',
  titleLead: 'Connect. Find.',
  titleBrand: 'Act.',
  subtitle:
    'Connect your Shopify store. MindX works out what needs your attention, shows you why, and drafts what to do about it.',
  secondaryCta: { label: 'See integrations', href: '/integrations' },
} as const;

export const howConnect = {
  title: 'Connect. Start with your Shopify store.',
  body: [
    'Connect Shopify in one click. That alone lets MindX read your orders, customers, products and fulfilments, and start finding what matters. It connects read-only.',
    'Your helpdesk and messaging channels connect too, so MindX AI can answer your customers there. More tools are on the way.',
  ],
  cardTitle: 'Connected to aurora-outdoor',
  cardNote: 'Example store',
} as const;


export const howFind = {
  title: 'Find. MindX surfaces what needs attention, without being asked.',
  body: [
    "The moment your store connects, MindX looks for what's worth a minute: products selling less, orders running late, good customers going quiet, stock running low.",
    "It keeps checking in the background. When something matters, it's waiting for you. On a quiet week, it says so and leaves you alone.",
  ],
  cardTitle: '5 things worth a look',
  rows: [
    { kind: 'revenue', title: 'Alpine Jacket', pill: 'Selling less', body: 'Units fell from 142 to 98 this week, and returns doubled.', source: 'Orders and returns', action: 'Show me' },
    { kind: 'fulfilment', title: '47 orders', pill: 'Running late', body: '31 of them shipped with the same carrier and have no new tracking for 4 days.', source: 'Fulfilments', action: 'See orders' },
    { kind: 'customer', title: 'Maya Chen', pill: 'Gone quiet', body: 'A top-5 customer, $2,140 lifetime. No order in 4 months, and her last one was a return.', source: 'Customer history', action: 'Draft a note' },
    { kind: 'product', title: 'Linen Shirt · M', pill: 'Running out', body: 'About 6 days of stock at this pace. Your last reorder took 14 days.', source: 'Inventory', action: 'Draft a reorder' },
    { kind: 'revenue', title: 'WELCOME20', pill: 'Leaking', body: '64 returning customers used your first-order code this month.', source: 'Orders and discount codes', action: 'Look closer' },
  ],
} as const;

export const howAct = {
  title: 'Act. See why it matters, then decide.',
  body: [
    'Every answer shows its numbers and where they came from. MindX suggests the next step and drafts it: a note to a customer, a reorder, a fix to a product page.',
    'Nothing goes out until you approve it. Ask a follow-up in plain English whenever you want more.',
  ],
  question: 'Why are sales down this week?',
  answer: [
    'Revenue is $4,200 under a normal week, down 18%. Most of the gap is three products, led by the Alpine Jacket: units fell from 142 to 98 and returns doubled.',
    'The Linen Shirt in M sold out on Tuesday, which added the rest. I drafted a reorder for it.',
  ],
  source: 'From your Shopify orders, returns and inventory.',
  action: 'Open the draft',
} as const;

export const howWatch = {
  title: 'What it keeps an eye on',
  body: 'Everything here comes from your Shopify data today. Support and marketing join as those tools connect to the Brain.',
  areas: [
    { icon: 'revenue', title: 'Sales and revenue', examples: ['Revenue below a normal week', 'Products selling less', 'Discount codes giving away margin'] },
    { icon: 'fulfilment', title: 'Orders and delivery', examples: ['Orders past their delivery window', 'Paid but not shipped', 'One carrier causing most delays'] },
    { icon: 'customer', title: 'Customers', examples: ['Good customers who went quiet', 'New regulars worth a thank-you', 'Customers with repeat returns'] },
    { icon: 'product', title: 'Products and stock', examples: ['Stock running out before you can reorder', 'Products not moving', 'Return spikes on one product'] },
  ],
} as const;

export const howTrust = {
  title: 'What you can count on',
  items: [
    { title: 'Reads first.', body: 'MindX starts with read-only access to your store. It can tell you a product page is losing sales; it changes nothing on its own.' },
    { title: 'Nothing goes out without you.', body: 'Anything that would reach a customer or change your store arrives as a draft. You approve, edit or dismiss it.' },
    { title: 'Shows its working.', body: 'Every answer carries its numbers and where they came from, so you can check it in Shopify.' },
    { title: "Says when it doesn't know.", body: "If a question needs data MindX can't see yet, like support tickets, it tells you instead of guessing." },
    { title: 'Quiet on a quiet week.', body: 'When nothing needs your attention, it says so once and leaves you alone.' },
  ],
} as const;

export const howFaqTitle = 'Questions';
export const howFaq = [
  { id: 'how-stores', q: 'Which stores does MindX work with?', a: 'Shopify stores, today.' },
  {
    id: 'how-changes',
    q: 'Can MindX change my store?',
    a: 'It starts read-only. Anything that would change your store or reach a customer arrives as a draft, and nothing happens until you approve it.',
  },
  {
    id: 'how-tickets',
    q: 'Does the Brain read my support tickets?',
    a: "Not yet. Today the Brain reads Shopify. Your helpdesk and messaging channels connect for AI support replies, and the Brain will read those conversations next.",
  },
  { id: 'how-cost', q: 'What does it cost?', a: 'MindX Free is $0 with 50 Brain Credits a month. MindX Pro is $19 a month.' },
] as const;

export const howCta = {
  heading: 'See what MindX finds in your store.',
  body: 'Start with a free Brain Scan. Read-only, and no credit card.',
} as const;
