// Site-wide copy: nav, footer, CTA labels and company facts (spec B1, B10).
import { appUrl, isWaitlist } from '@/lib/config';

export type WorkerId = 'brain' | 'resolve' | 'convert' | 'grow';

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Shows the worker's icon tile next to the link. */
  worker?: WorkerId;
  /** false = page not built yet; the link is hidden until it is. */
  live?: boolean;
};

export type FooterLink = NavLink & { action?: 'cookie-settings' };

export const site = {
  name: 'MindX',
  // Company name shown on the site (founder decision 29 Sep 2026).
  // [The privacy policy and terms still name "MindX Digital Softwares Inc."; legal to confirm the registered entity.]
  legalName: 'MindX AI',
  tagline: 'The Ecommerce Brain for Shopify merchants.',
  taglineSecondary: 'Find. Understand. Decide. Act.',
  oneLiner:
    'MindX is the Ecommerce Brain for Shopify merchants. It connects your business, understands what is happening, and powers AI Workers that do the work.',
  contactEmail: 'founders@themindx.com',
} as const;

// B10.4 labels, switched by launch mode. CHANGED (29 Sep 2026): while in
// waitlist mode the main CTA is "Get early access" and every CTA, including
// "Book a demo", opens the waitlist.
export const ctas = {
  brainScan: isWaitlist
    ? { label: 'Get My Free Brain Scan', href: '/signup' }
    : { label: 'Get My Free Brain Scan', href: '/signup' },
  demo: { label: 'Book a demo', href: isWaitlist ? '/waitlist?intent=demo' : '/demo' },
  login: { label: 'Log in', href: `${appUrl}/signin` },
  waitlist: 'Join the waitlist',
  apply: 'Apply now',
} as const;

export const announcement = {
  id: 'founding-2026-v2',
  text: 'Founding Merchant Program — 25 US Shopify brands.',
  linkLabel: 'Apply →',
  href: '/design-partners',
} as const;

export const productNav: NavLink[] = [];

export const mainNav: NavLink[] = [
  { label: 'Brain', href: '/brain' },
  { label: 'Integrations', href: '/integrations' },
];

export const companyNav: NavLink[] = [
  { label: 'About', href: '/about' },
];

export const footer = {
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'MindX Brain', href: '/brain' },
        { label: 'Integrations', href: '/integrations' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/demo' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie settings', href: '#', action: 'cookie-settings' },
      ],
    },
  ] satisfies { title: string; links: FooterLink[] }[],
  newsletter: {
    label: 'Get one practical ecommerce-AI idea a week.',
    placeholder: 'you@yourstore.com',
    button: 'Subscribe',
  },
  copyright: '© 2026 MindX Digital Softwares Inc. All rights reserved.',
} as const;

// Default CTA band (B10.4 heading, B2.12 body).
export const ctaBand = {
  heading: 'Give your team the operating power of a billion-dollar brand',
  body: "Start with a free Brain Scan. Hire MindX Resolve when you're ready.",
} as const;

// B10.6
export const cookieBanner = {
  text: "We use cookies to run this site and understand how it's used.",
  acceptAll: 'Accept all',
  necessaryOnly: 'Only necessary',
  settings: 'Settings',
  // Settings panel labels are not in the spec; kept short and literal.
  necessaryLabel: 'Necessary (always on)',
  analyticsLabel: 'Analytics',
  save: 'Save choices',
} as const;

export const isLive = (link: NavLink) => link.live !== false;
