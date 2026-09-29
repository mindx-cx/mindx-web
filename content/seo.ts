// Page titles and meta descriptions (spec B11.1). Pages build their metadata
// with pageMetadata(); Open Graph images and JSON-LD come in Phase 7.
import type { Metadata } from 'next';

type SeoEntry = { path: string; title: string; description: string };

export const seo = {
  home: {
    path: '/',
    title: 'MindX — The Ecommerce Brain for Shopify',
    description:
      "One brain for your whole store, plus AI workers that resolve returns, exchanges, cancellations and refunds. Pay only when it's resolved.",
  },
  brain: {
    path: '/brain',
    title: 'MindX Brain — One Live Model of Your Store',
    description:
      'MindX Brain connects Shopify, your helpdesk, shipping and returns into one live model your AI workers act on.',
  },
  resolve: {
    path: '/workers/resolve',
    title: 'MindX Resolve — AI Customer Service for Shopify',
    description:
      'AI support that takes the action in Shopify: returns, exchanges, edits, cancellations, refunds. $0.90 per resolved conversation.',
  },
  convert: {
    path: '/workers/convert',
    title: 'MindX Convert — AI Sales Worker for Shopify',
    // CHANGED: spec ends with "Join the waitlist."; Convert is live.
    description: 'Turn pre-sale questions into orders. Pay only when it wins a sale: 5% of the order, capped at $5.',
  },
  grow: {
    path: '/workers/grow',
    title: 'MindX Grow — Outcome-Based AI Marketing',
    description: 'Win-back and retention you only pay for when it beats a holdout group. Join the waitlist.',
  },
  brainScan: {
    path: '/brain-scan',
    title: 'Free Brain Scan — What Your Support Inbox Costs',
    description:
      'Connect Shopify and your helpdesk. See your top ticket reasons, their cost and root causes in about 10 minutes. Free and read-only.',
  },
  pricing: {
    path: '/pricing',
    title: 'MindX Pricing — Brain Plans + Outcome-Based AI Workers',
    description: 'MindX Brain from $49 a month. MindX Resolve $0.90 per resolved conversation, $0 when it goes to a human.',
  },
  trust: {
    path: '/trust',
    title: 'Trust & Security — MindX',
    description:
      'Rules enforced in code, approval for risky actions, verification after every change and a complete audit log.',
  },
  integrations: {
    path: '/integrations',
    title: 'MindX Integrations — Shopify, Gorgias, Klaviyo and More',
    description: 'MindX connects to the tools you already use and replaces none of them.',
  },
  about: {
    path: '/about',
    title: 'About MindX AI — The Ecommerce Brain Company',
    // CHANGED: no team on the About page (decision 29 Sep 2026).
    description: "We're building the brain every ecommerce business will run on. Here's why we started MindX AI.",
  },
  designPartners: {
    path: '/design-partners',
    title: 'MindX Design Partner Program for Shopify Brands',
    description: 'Prove one measurable support outcome in 30 days with founding pricing locked for 12 months.',
  },
  demo: {
    path: '/demo',
    title: 'Book a MindX Demo',
    description: 'See MindX on your own store in 20 minutes.',
  },
  faq: {
    path: '/faq',
    title: 'MindX FAQ',
    description: 'Answers about MindX Brain, MindX Resolve, pricing, setup and data security.',
  },
} satisfies Record<string, SeoEntry>;

export function pageMetadata(entry: SeoEntry): Metadata {
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: entry.path },
    openGraph: { title: entry.title, description: entry.description, url: entry.path, siteName: 'MindX', type: 'website' },
    twitter: { card: 'summary_large_image', title: entry.title, description: entry.description },
  };
}
