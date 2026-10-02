// Public runtime settings (spec A4). NEXT_PUBLIC_* values are inlined at build time.
//
// `||`, not `??`: a GitHub Actions expression for a repository variable that
// has not been set arrives as an empty string rather than as undefined, and ??
// keeps the empty string. That built fine locally, where the variable is simply
// absent, and failed in CI with "TypeError: Invalid URL, input: ''" the moment
// metadataBase tried to parse it.

// themindx.com is the canonical home now: one domain, marketing at the root
// and the product at /app. This feeds canonical URLs and OpenGraph images, so
// leaving it on .ai pointed every share preview and every search result at the
// old site.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://themindx.com';

// Relative, because the product now lives at /app on this same domain.
//
// It used to be an absolute https://app.themindx.ai, which sent anyone
// clicking "Log in" on themindx.com to a different environment's front end --
// it then built a Google auth URL on themindx.ai and 404ed. One domain means
// one origin, and a relative path cannot point at the wrong one.
//
// Still overridable: a preview deployment on another host sets
// NEXT_PUBLIC_APP_URL to an absolute URL.
export const appUrl = process.env.NEXT_PUBLIC_APP_URL || '/app';

/** Highlight [placeholders] in preview builds. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === 'true';

/**
 * Launch mode (decision 29 Sep 2026).
 * - "waitlist" (default): every main CTA reads "Get early access" and opens
 *   /waitlist; "Book a demo" joins the waitlist as a demo request.
 * - "live": CTAs follow the spec ("Get your free Brain Scan" → /brain-scan, /demo).
 */
export const launchMode: 'waitlist' | 'live' = process.env.NEXT_PUBLIC_LAUNCH_MODE === 'live' ? 'live' : 'waitlist';

export const isWaitlist = launchMode === 'waitlist';

/** Cloudflare Turnstile site key; the widget only renders when this is set. */
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
