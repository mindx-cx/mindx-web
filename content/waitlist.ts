// Waitlist / early access page copy (decision 29 Sep 2026). Not in the spec:
// written in the spec's voice (B1 brand voice).

export const launch = {
  // Confirmed launch day: Monday 9 November 2026 (decision 29 Sep 2026).
  // Time is 9:00 a.m. US Pacific (PST, UTC-8; daylight saving ends 1 Nov),
  // since the first customers are US merchants. [Confirm the launch time.]
  isoDate: '2026-11-09T09:00:00-08:00',
  dateLabel: 'November 9',
} as const;

export const waitlistPage = {
  eyebrow: 'MindX AI · The Ecommerce Brain',
  title: `The Ecommerce Brain opens ${launch.dateLabel}`,
  subtitle:
    'Join the first Shopify brands to put AI workers on their store: one brain that knows your business, and workers that resolve, sell and report profit.',
  // Shown when someone arrives from a "Book a demo" button.
  demoNote: "Want a demo? Join the list and we'll book a 20-minute walkthrough on your own store.",
  countdownLabels: ['Days', 'Hours', 'Min', 'Sec'],
  countdownDone: 'MindX is opening now.',
  perks: [
    'Early access to MindX Brain, Resolve and Convert',
    'Your free Brain Scan the day we open',
    'Founding merchant pricing, locked for 12 months [confirm]',
  ],
} as const;

// B9.2 / A9 dropdown options.
export const ordersOptions = ['Under 300', '300-1,000', '1,000-2,500', '2,500-10,000', '10,000+'] as const;
export const helpdeskOptions = ['Gorgias', 'Zendesk', 'Gmail', 'Shopify Inbox', 'Other', 'None'] as const;

// Step 1 asks for work email + store URL (decision 29 Sep 2026: the store is
// the best lead qualifier); the name moves to optional step 2.
export const waitlistForm = {
  emailLabel: 'Work email',
  emailPlaceholder: 'you@yourstore.com',
  storeLabel: 'Store URL',
  storePlaceholder: 'yourstore.myshopify.com',
  submit: 'Get early access',
  smallPrint: 'Free · No credit card',
  signInPrompt: 'Already invited?',
  signInLabel: 'Log in',
  // Step 2 (optional details)
  successTitle: "You're on the list!",
  successBody: (store: string) => `Tell us a little more and we'll prepare the Brain for ${store} first.`,
  nameLabel: 'Your name',
  namePlaceholder: 'Maya Chen',
  ordersLabel: 'Orders a month',
  helpdeskLabel: 'Helpdesk',
  selectPlaceholder: 'Choose one',
  demoLabel: "I'd like a 20-minute demo on my store",
  saveDetails: 'Save my spot',
  skip: 'Skip for now',
  doneTitle: "All set. We'll prepare your Brain first.",
  doneBody: `We'll email you before we open on ${launch.dateLabel}.`,
} as const;
