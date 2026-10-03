import { isWaitlist } from '@/lib/config';
// Form labels and confirmations (spec B5.4, B9.2, B9.4, B8.4).

export const fieldLabels = {
  name: 'Name',
  email: 'Work email',
  emailPlaceholder: 'you@yourstore.com',
  store: 'Store URL',
  storePlaceholder: 'yourstore.myshopify.com',
  orders: 'Monthly orders',
  conversations: 'Monthly support conversations',
  helpdesk: 'Helpdesk',
  topProblem: "What's the one support problem you'd fix first?",
  choose: 'Choose one',
  optional: '(optional)',
} as const;

export const leadForms = {
  brain_scan: {
    // CHANGED 3 Oct 2026. Waitlist mode (until Shopify approves the app): the
    // form saves the lead and confirms. Live mode: it leads on to sign-up.
    // The old note promised scan data deletion after 30 days, which nothing
    // enforces yet, so it is gone.
    submit: isWaitlist ? 'Get early access' : 'Continue',
    consent: isWaitlist
      ? "We'll email you when your store can connect. By continuing you agree to our Terms and Privacy Policy."
      : "Next, you'll create your free MindX account and connect Shopify. By continuing you agree to our Terms and Privacy Policy.",
    success:
      "You're on the list. We'll email you as soon as your store can connect, and you'll be among the first to get your Brain Scan.",
  },
  demo: {
    submit: 'Book my demo',
    // Shown after the form when a Cal.com link is set; the calendar confirms the booking.
    pickTime: 'Pick a time that works for you.',
    // ADDED: shown when no Cal.com link is configured yet.
    noCalendar: "Thanks. We'll email you within one business day to pick a time.",
  },
  design_partner: {
    submit: 'Apply now',
    success: "Thanks! We'll review your store and reply within 2 business days.",
  },
} as const;

export const integrationRequest = {
  title: "Don't see your tool?",
  body: 'Tell us what you use. We build connectors in the order merchants ask for them.',
  tool: 'Tool name',
  toolPlaceholder: 'e.g. Gorgias',
  submit: 'Request integration',
  success: "Thanks. We'll let you know when it's ready.",
} as const;
