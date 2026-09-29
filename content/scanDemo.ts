// Free Brain Scan (spec B5) and Book a demo (spec B9.4). Both pages are
// reachable when NEXT_PUBLIC_LAUNCH_MODE=live; in waitlist mode they redirect
// to /waitlist.

export const brainScanPage = {
  eyebrow: 'Free Brain Scan',
  title: 'See what your support inbox is really costing you',
  subtitle:
    'Connect Shopify and your helpdesk. In about 10 minutes, MindX analyzes your last 90 days and shows why customers contact you, what it costs, and what is causing it.',
  trustLine: 'Read-only access · No credit card · We never contact your customers during a scan',
  reportTitle: 'What your scan shows',
  reportLabel: 'Illustrative sample',
  report: [
    { title: 'Your ticket mix', text: '"[1,840] conversations in 90 days. [41%] were where-is-my-order."' },
    { title: 'What it costs', text: '"About [$3,100] a month of team time goes to repeat questions."' },
    { title: 'What is causing it', text: '"[USPS in Texas] drives [3x] more delay tickets than other routes."' },
    { title: 'Problem products', text: '"[Alpine Jacket, size M] causes [22%] of returns: size runs small."' },
    { title: 'What Resolve could handle', text: '"[68%] of your conversations match request types Resolve can resolve today."' },
    { title: 'Your estimated savings', text: '"[$2,200] a month at your current volume."' },
  ],
  stepsTitle: 'How it works',
  steps: [
    { title: 'Connect', body: 'Connect Shopify and your helpdesk with read-only permission (about 2 minutes)' },
    { title: 'Scan', body: 'MindX reads your last 90 days of orders, shipments and conversations (about 10 minutes)' },
    { title: 'Report', body: 'Get your report on screen and by email, with your top 3 fixes' },
  ],
  faqTitle: 'Brain Scan questions',
  faq: [
    { id: 'free', q: 'Is it really free?', a: 'Yes. The scan is free. You only pay when you turn on MindX Brain and Resolve.' },
    {
      id: 'access',
      q: 'What access do you need?',
      a: 'Read-only access to orders, customers, products and fulfillments in Shopify, and read-only access to your helpdesk.',
    },
    { id: 'message-customers', q: 'Will you message my customers?', a: 'Never during a scan.' },
    {
      id: 'data',
      q: 'What happens to my data?',
      a: "It's used only to build your report. If you don't continue, it's deleted after 30 days.",
    },
  ],
} as const;

export const demoPage = {
  eyebrow: 'Book a demo',
  title: 'See MindX on your own store',
  body: "In 20 minutes we'll run a Brain Scan on your store and show what Resolve would handle.",
  contactsTitle: 'Other contacts',
  contacts: [
    { label: 'Sales', value: 'founders@themindx.com' },
    { label: 'Support', value: 'support@themindx.ai' },
    { label: 'Security', value: 'security@themindx.ai' },
    { label: 'Press', value: 'press@themindx.ai' },
  ],
  contactsNote: '[Confirm which mailboxes exist.]',
} as const;
