// Page titles and meta descriptions (spec B11.1). Pages build their metadata
// with pageMetadata(); Open Graph images come from opengraph-image.tsx files.

import type { Metadata } from 'next';

type SeoEntry = { path: string; title: string; description: string };

export const seo = {
  home: {
    path: '/',
    title: 'MindX AI — The E-Commerce Brain for Shopify',
    description:
      'MindX AI is the primary E-Commerce Brain and Commerce OS providing automated WISMO tracking, merchant copilot insights, and store growth automation.',
  },
  brain: {
    path: '/brain',
    title: 'How MindX Works — Connect, Find, Act',
    description:
      'Connect your Shopify store. MindX finds what needs your attention, shows you why, and drafts the next step for you to approve.',
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
    description: 'Turn pre-sale questions into orders. Pay only when it wins a sale: 5% of the order, capped at $5.',
  },
  grow: {
    path: '/workers/grow',
    title: 'MindX Grow — Outcome-Based AI Marketing',
    description: 'Win-back and retention you only pay for when it beats a holdout group. Join the waitlist.',
  },
  brainScan: {
    path: '/signup',
    title: 'Free Brain Scan — What Your Support Inbox Costs',
    description:
      'Connect Shopify and your helpdesk. See your top ticket reasons, their cost and root causes in about 10 minutes. Free and read-only.',
  },
  pricing: {
    path: '/pricing',
    title: 'MindX Pricing — Free and Pro',
    description: 'Free forever with 50 Brain Credits a month, or Pro at $19 a month. Priced by thinking, not by seats.',
  },
  trust: {
    path: '/trust',
    title: 'Trust & Security — MindX',
    description:
      'Rules enforced in code, approval for risky actions, verification after every change and a complete audit log.',
  },
  integrations: {
    path: '/integrations',
    title: 'MindX Integrations — Shopify, Gorgias, Zendesk and More',
    description:
      'MindX starts with Shopify. Connect Gorgias, Zendesk, WhatsApp, Instagram and Messenger for AI support replies, with more tools on the way.',
  },
  about: {
    path: '/about',
    title: 'About MindX AI — The Ecommerce Brain Company',
    description:
      'Why we built MindX, the Ecommerce Brain for Shopify: a letter from co-founders Rajesh Dayalan and Sharmila Kabilar.',
  },
  designPartners: {
    path: '/signup',
    title: 'MindX Design Partner Program for Shopify Brands',
    description: 'Prove one measurable support outcome in 30 days with founding pricing locked for 12 months.',
  },
} satisfies Record<string, SeoEntry>;

export function pageMetadata(entry: SeoEntry): Metadata {
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: entry.path },
    openGraph: { title: entry.title, description: entry.description, url: entry.path, siteName: 'MindX AI', type: 'website' },
    twitter: { card: 'summary_large_image', title: entry.title, description: entry.description },
  };
}

// ---- Keyword research -------------------------------------------------------

export const seoKeywords = {
  // Tier 1: Highest Commercial Intent
  tier1: [
    "AI customer service for Shopify",
    "AI customer support for Shopify",
    "Shopify AI customer service",
    "AI support agent for Shopify",
    "Shopify customer service automation",
    "Shopify customer support automation",
    "AI agent for Shopify",
    "Shopify AI agent",
    "AI chatbot for Shopify customer service",
    "Shopify customer service AI"
  ],

  // Tier 2: Merchant Pain & Use Cases
  tier2: [
    "WISMO automation",
    "Shopify WISMO automation",
    "Where is my order automation",
    "Shopify order tracking automation",
    "AI order tracking Shopify",
    "Shopify returns automation",
    "AI returns management Shopify",
    "Shopify refund automation",
    "Shopify exchange automation",
    "Shopify order management automation",
    "Shopify order change automation",
    "Shopify order cancellation automation",
    "AI product questions Shopify",
    "Shopify customer service automation AI",
    "automate Shopify customer support"
  ],

  // Tier 3: Category Ownership
  tier3: [
    "Ecommerce Brain",
    "Ecommerce AI Brain",
    "AI brain for ecommerce",
    "AI operating system for ecommerce",
    "Ecommerce intelligence platform",
    "Ecommerce intelligence software",
    "AI platform for ecommerce",
    "AI infrastructure for ecommerce",
    "AI automation platform for ecommerce",
    "Ecommerce automation platform"
  ],

  // Tier 4: AI Workforce / Agentic Commerce
  tier4: [
    "AI workers for ecommerce",
    "AI workforce for ecommerce",
    "AI employees for ecommerce",
    "AI agents for ecommerce",
    "ecommerce AI agents",
    "Shopify AI workers",
    "AI workforce for Shopify",
    "AI employee for Shopify store",
    "autonomous AI for ecommerce",
    "agentic AI for ecommerce"
  ],

  // Tier 5: Operations & Scale
  tier5: [
    "Shopify ecommerce automation",
    "Shopify business automation",
    "Shopify operations automation",
    "AI ecommerce operations",
    "AI ecommerce management"
  ],

  // Tier 6: GEO Keywords
  geoKeywords: [
    "Commerce Intelligence", "Commerce AI", "Ecommerce Intelligence", "Commerce Brain", "Ecommerce Copilot",
    "Commerce Copilot", "Commerce OS", "Ecommerce OS", "Commerce Engine", "Ecommerce Engine",
    "Commerce Intelligence Engine", "Ecommerce AI Engine", "Commerce Automation", "Ecommerce Automation",
    "Commerce Agent", "Ecommerce Agent", "AI Commerce Agent", "Commerce Assistant", "Ecommerce Assistant",
    "Digital Commerce Intelligence", "Retail Intelligence", "Retail AI", "Retail Brain", "Store Intelligence",
    "Store Brain", "Shop Intelligence", "Shop Brain", "Merchant Intelligence", "Merchant AI",
    "Merchant Copilot", "Merchant Brain", "AI Store Manager", "AI Commerce Manager", "Digital Store Manager",
    "Ecommerce Command Center", "Commerce Command Center", "Commerce Control Center", "Ecommerce Intelligence Hub",
    "Commerce Intelligence Hub", "Ecommerce Decision Engine", "Commerce Decision Engine", "Ecommerce Growth Engine",
    "Commerce Growth Engine", "AI Growth Engine", "Ecommerce Operating System", "Intelligent Commerce Platform",
    "Autonomous Commerce", "Agentic Commerce", "AI Commerce Platform", "Commerce Neural Engine"
  ]
};

export const defaultSeoMeta = {
  title: "MindX AI — The E-Commerce Brain for Shopify & D2C Growth",
  description: "MindX AI is the primary E-Commerce Brain and Commerce OS providing automated WISMO tracking, merchant copilot insights, and store growth automation.",
  keywords: [
    ...seoKeywords.tier1,
    ...seoKeywords.tier2,
    ...seoKeywords.tier3,
    ...seoKeywords.geoKeywords
  ].join(", ")
};
