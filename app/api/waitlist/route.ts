import { isFreeMail, waitlistSchema, type WaitlistInput } from '@/components/forms/schemas';
import { splitName } from '@/lib/server/crm';
import { guardRequest, reply, turnstileFailed, validationError } from '@/lib/server/forms';
import { createLeadToken, verifyLeadToken } from '@/lib/server/leadToken';
import { deliverLead } from '@/lib/server/leads';

function leadType(input: WaitlistInput): string {
  if (input.worker === 'grow') return 'waitlist_grow';
  if (input.worker === 'convert') return 'waitlist_convert';
  return 'waitlist';
}

/**
 * POST /api/waitlist. Step 1: work email + store URL → HubSpot contact +
 * Slack alert, returns a signed token. Step 2: optional details (name, orders,
 * helpdesk, demo) for the same email, accepted only with that token.
 */
export async function POST(request: Request) {
  const guard = await guardRequest(request, 'waitlist');
  if (!guard.ok) return guard.response;

  const parsed = waitlistSchema.safeParse(guard.body);
  if (!parsed.success) return validationError(parsed.error);
  const input = parsed.data;
  const email = input.email.toLowerCase();

  if (input.step === 1) {
    if (await turnstileFailed(input.turnstileToken, guard.ip)) return reply({ ok: false, error: 'serverError' }, 400);
  } else if (!verifyLeadToken(input.token, email)) {
    return reply({ ok: false, error: 'serverError' }, 400);
  }

  const wantsDemo = input.wantsDemo ?? (input.intent === 'demo' ? true : undefined);
  const type = leadType(input);
  const hasDetails = Boolean(input.name || input.shopDomain || input.ordersPerMonth || input.helpdesk || wantsDemo);

  const { firstname, lastname } = splitName(input.name);
  const result = await deliverLead({
    email,
    // Step 2 resubmits the same form for the same email, which updates the contact.
    form: {
      key: 'waitlist',
      values: {
        email,
        shopDomain: input.shopDomain,
        firstname,
        lastname,
        ordersPerMonth: input.ordersPerMonth,
        helpdesk: input.helpdesk,
        wantsDemo: wantsDemo === undefined ? undefined : String(wantsDemo),
      },
      pageUri: request.headers.get('referer') ?? undefined,
      ipAddress: guard.ip,
    },
    properties: {
      // Step 1 sends the store; the name arrives (optionally) in step 2.
      firstname,
      lastname,
      lead_type: type,
      shop_domain: input.shopDomain,
      orders_per_month: input.ordersPerMonth,
      helpdesk: input.helpdesk,
      wants_demo: wantsDemo === undefined ? undefined : String(wantsDemo),
      email_type: isFreeMail(email) ? 'free' : 'work',
      utm_source: input.utmSource,
      utm_medium: input.utmMedium,
      utm_campaign: input.utmCampaign,
      landing_page: input.landingPage,
    },
    alert:
      input.step === 1 || hasDetails
        ? {
            leadType: `${type}${wantsDemo ? ' (wants demo)' : ''}${input.step === 2 ? ' · details added' : ''}`,
            name: input.name,
            email,
            shopDomain: input.shopDomain,
            ordersPerMonth: input.ordersPerMonth,
            helpdesk: input.helpdesk,
            utmSource: input.utmSource,
            utmMedium: input.utmMedium,
            utmCampaign: input.utmCampaign,
            landingPage: input.landingPage,
          }
        : undefined,
  });
  if (!result.ok) return reply({ ok: false, error: result.error }, result.status);

  return reply({ ok: true, token: input.step === 1 ? createLeadToken(email) : undefined });
}
