// content/seo.ts - MindX AI Primary SEO Keywords & Meta Mapping

export const seoKeywords = {
  // Tier 1: Highest Commercial Intent (Capture Existing Demand)
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

  // Tier 2: Merchant Pain & Use Cases (High Traffic Focus)
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

  // Tier 3: Category Ownership (The Ecommerce Brain)
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
  ]
};

export const defaultSeoMeta = {
  title: "MindX AI — The Ecommerce Brain for Shopify",
  description: "Automate Shopify customer service, WISMO order tracking, returns, and support with MindX AI Workers. One Brain. Autonomous resolution.",
  keywords: [
    ...seoKeywords.tier1,
    ...seoKeywords.tier2,
    ...seoKeywords.tier3
  ].join(", ")
};
