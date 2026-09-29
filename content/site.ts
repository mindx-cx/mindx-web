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
  tagline: 'One brain. Every tool. AI workers that pay for themselves.',
  oneLiner:
    'MindX is the Ecommerce Brain for Shopify merchants. It connects your business, understands what is happening, and powers AI Workers that do the work.',
  contactEmail: 'founders@themindx.com',
} as const;

// B10.4 labels, switched by launch mode. CHANGED (29 Sep 2026): while in
// waitlist mode the main CTA is "Get early access" and every CTA, including
// "Book a demo", opens the waitlist.
export const ctas = {
  brainScan: isWaitlist
    ? { label: 'Get early access', href: '/waitlist' }
    : { label: 'Get your free Brain Scan', href: '/brain-scan' },
  demo: { label: 'Book a demo', href: isWaitlist ? '/waitlist?intent=demo' : '/demo' },
  login: { label: 'Log in', href: `${appUrl}/signin` },
  waitlist: 'Join the waitlist',
  apply: 'Apply now',
} as const;

export const announcement = {
  // Change the id when the text changes so dismissed visitors see the new message.
  id: 'founding-2026',
  text: 'Founding merchant program: 25 US Shopify brands, pricing locked for 12 months.',
  linkLabel: 'Apply →',
  href: '/design-partners',
} as const;

export const productNav: NavLink[] = [
  { label: 'MindX Brain', href: '/brain', description: 'One live model of your whole store', worker: 'brain' },
  {
    label: 'MindX Resolve',
    href: '/workers/resolve',
    description: 'AI customer service that finishes the job',
    worker: 'resolve',
  },
  // Convert is live (decision 28 Sep 2026); the spec's "(coming 2027)" is removed.
  {
    label: 'MindX Convert',
    href: '/workers/convert',
    description: 'AI sales worker that turns questions into sales',
    worker: 'convert',
  },
  { label: 'MindX Grow', href: '/workers/grow', description: 'AI marketing worker (coming later)', worker: 'grow' },
];

export const mainNav: NavLink[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Trust', href: '/trust' },
];

export const companyNav: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Design Partners', href: '/design-partners' },
];

export const footer = {
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'MindX Brain', href: '/brain' },
        { label: 'MindX Resolve', href: '/workers/resolve' },
        { label: 'MindX Convert', href: '/workers/convert' },
        { label: 'MindX Grow', href: '/workers/grow' },
        { label: 'Free Brain Scan', href: '/brain-scan' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Design Partners', href: '/design-partners' },
        { label: 'Contact', href: '/demo' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Trust & security', href: '/trust' },
        { label: 'Blog', href: '/blog', live: false },
        { label: 'Help center', href: '/help', live: false },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Data Processing Agreement', href: '/dpa' },
        { label: 'Subprocessors', href: '/subprocessors' },
        { label: 'Acceptable Use', href: '/acceptable-use' },
        { label: 'Cookie settings', href: '#', action: 'cookie-settings' },
      ],
    },
  ] satisfies { title: string; links: FooterLink[] }[],
  newsletter: {
    label: 'Get one practical ecommerce-AI idea a week.',
    placeholder: 'you@yourstore.com',
    button: 'Subscribe',
  },
  copyright: '© 2026 MindX AI. All rights reserved.',
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
