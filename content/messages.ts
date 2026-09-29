// Form and system messages (spec B10.5). Route handlers return these keys.

export const messages = {
  required: 'Please fill this in.',
  invalidEmail: "That email doesn't look right. Try name@yourstore.com.",
  invalidStore: 'Enter your store as yourstore.myshopify.com.',
  shopifyConnectFailed:
    "We couldn't connect to your store. Check you're a store owner or staff with app permissions, then try again.",
  scanSlow: "Big stores take a little longer. We'll email your report when it's ready.",
  serverError: "Something went wrong on our side. We've been alerted and will email you within a day.",
  rateLimited: 'Too many tries. Please wait a minute and try again.',
  waitlistSuccess: "You're on the list. We'll be in touch.",
  demoSuccess: 'Booked! Check your inbox for the calendar invite.',
  // Not in the spec: newsletter uses double opt-in (A9), so the visitor must confirm.
  newsletterSuccess: 'Almost done. Check your inbox to confirm your subscription.',
  notFound: "This page doesn't exist, but your Brain Scan can.",
} as const;

export type MessageKey = keyof typeof messages;
