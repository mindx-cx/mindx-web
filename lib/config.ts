// Public runtime settings (spec A4). NEXT_PUBLIC_* values are inlined at build time.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://themindx.ai';

export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.themindx.ai';

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
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
