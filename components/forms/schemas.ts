// Shared validation (spec C8). The same schemas run in the browser and in the
// route handlers, so both give the same answer.
import { z } from 'zod';
import { helpdeskOptions, ordersOptions } from '@/content/waitlist';

/** "https://Brand.com/shop" → "brand.com" (A9). */
export function normalizeShopDomain(value: string): string {
  return value.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
}

export const shopDomain = z
  .string()
  .transform(normalizeShopDomain)
  .refine((v) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(v), { message: 'invalidStore' });

export const email = z.string().trim().min(1, 'required').email('invalidEmail').max(254);

export const helpdesk = z.enum(helpdeskOptions);
export const orders = z.enum(ordersOptions);

const utm = {
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  landingPage: z.string().max(500).optional(),
};

/**
 * Waitlist signup. Step 1 is work email + store URL (the store is optional
 * only on the Grow waitlist); step 2 adds optional details, including the
 * name, for the same email.
 */
export const waitlistSchema = z
  .object({
    step: z.union([z.literal(1), z.literal(2)]).default(1),
    name: z.string().trim().max(120).optional(),
    email,
    shopDomain: shopDomain.optional(),
    ordersPerMonth: orders.optional(),
    helpdesk: helpdesk.optional(),
    wantsDemo: z.boolean().optional(),
    worker: z.enum(['mindx', 'convert', 'grow']).default('mindx'),
    intent: z.enum(['demo']).optional(),
    turnstileToken: z.string().max(4096).optional(),
    /** Signed token from step 1, required for step 2. */
    token: z.string().max(512).optional(),
    /** Honeypot. The route handler returns a silent 200 when it's filled (A9). */
    website: z.string().max(500).optional(),
    ...utm,
  })
  .superRefine((v, ctx) => {
    if (v.step === 1 && v.worker === 'mindx' && !v.shopDomain) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['shopDomain'], message: 'required' });
    }
  });

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const conversationsOptions = ['Under 200', '200-1,000', '1,000-3,000', '3,000+'] as const;
export const conversations = z.enum(conversationsOptions);

const requiredText = (max: number) => z.string().trim().min(1, 'required').max(max);
const common = { turnstileToken: z.string().max(4096).optional(), website: z.string().max(500).optional(), ...utm };

/** POST /api/lead: Brain Scan pre-capture, demo request, design-partner application (A9, C8). */
export const leadSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('brain_scan'),
    email,
    shopDomain: z.string().min(1, 'required').pipe(shopDomain),
    helpdesk: helpdesk.optional(),
    ...common,
  }),
  z.object({
    type: z.literal('demo'),
    name: requiredText(120),
    email,
    shopDomain: z.string().min(1, 'required').pipe(shopDomain),
    ordersPerMonth: orders,
    helpdesk: helpdesk.optional(),
    ...common,
  }),
  z.object({
    type: z.literal('design_partner'),
    name: requiredText(120),
    email,
    shopDomain: z.string().min(1, 'required').pipe(shopDomain),
    ordersPerMonth: orders,
    conversationsPerMonth: conversations,
    helpdesk,
    topProblem: z.string().trim().min(5, 'required').max(500),
    ...common,
  }),
]);

export type LeadInput = z.infer<typeof leadSchema>;

/** POST /api/integration-request (A9). */
export const integrationRequestSchema = z.object({
  tool: requiredText(100),
  email,
  shopDomain: z.string().optional().transform((v) => (v ? v : undefined)).pipe(shopDomain.optional()),
  ...common,
});

/** POST /api/newsletter (A9). */
export const newsletterSchema = z.object({ email, ...common });

/** Free-mail domains get tagged in the CRM (A9). */
const FREE_MAIL = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
]);

export function isFreeMail(address: string): boolean {
  return FREE_MAIL.has(address.split('@')[1]?.toLowerCase() ?? '');
}
