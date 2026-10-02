// Company pages copy (spec B9.1 About, B9.2 Design Partners).
// CHANGED (29 Sep 2026): no Careers page; the About page has no team,
// company facts or team-size note.
import { launch } from './waitlist';

export const about = {
  eyebrow: 'About MindX AI',
  title: "We're building the brain every ecommerce business will run on",
  mission: 'Give every merchant the operating team of a billion-dollar brand.',
  missionLabel: 'Our mission',
  storyTitle: 'Why we started MindX',
  story:
    "Running an online store means living in 20 tabs. Your orders are in Shopify, your customers' questions in your helpdesk, your shipments with the carrier and your returns somewhere else. Big brands pay teams to join it all up. Small brands pay with their evenings. We started MindX to give every merchant one brain that understands the whole business, and AI workers that do the repetitive work inside the merchant's own rules.",
  beliefsTitle: 'What we believe',
  beliefs: [
    { title: 'Own the outcome.', body: 'We get paid when the work is done, not when a chatbot replies.' },
    { title: 'Context beats cleverness.', body: 'The best AI is the one that knows your business.' },
    { title: 'Autonomy is earned.', body: 'Workers start supervised and earn more freedom with evidence.' },
    { title: 'Merchant profit is our success.', body: 'We measure dollars kept, not messages sent.' },
  ],
  cta: { label: 'Become a design partner', href: '/signup' },
} as const;

export const designPartners = {
  eyebrow: 'Design Partner Program',
  title: 'Build MindX with us',
  subtitle: "We're partnering with [25] US Shopify brands to prove one measurable outcome together in 30 days.",
  whoTitle: "Who it's for",
  who: 'US Shopify brands with [300+] orders a month, a real support queue, and an owner who wants their numbers to move.',
  getTitle: 'What you get',
  get: [
    'Growth plan at [$199/month], locked for 12 months (outcome fees apply)',
    'A weekly call with our founders',
    'Workflows built around your store',
    // CHANGED: the spec says "First access to MindX Convert"; Convert is live.
    'First access to MindX Grow',
  ],
  askTitle: 'What we ask',
  ask: [
    'One named owner on your side',
    'Access to Shopify and your helpdesk',
    'An honest baseline and a monthly review',
    "Permission to share results anonymously, and a case study if you're happy",
  ],
  planTitle: 'The 30-day plan',
  plan: [
    { title: 'Week 1', body: 'Pick one outcome (for example, cut where-is-my-order tickets 20%) and record the baseline' },
    { title: 'Week 2', body: 'Resolve runs in draft mode; you approve replies' },
    { title: 'Week 3', body: 'Safe requests switch to automatic' },
    { title: 'Week 4', body: 'Review the result together and choose the next outcome' },
  ],
  formTitle: 'Apply now',
  // ADDED: ties the program to the confirmed launch date.
  formNote: `Founding partners start before MindX opens to everyone on ${launch.dateLabel}.`,
} as const;
