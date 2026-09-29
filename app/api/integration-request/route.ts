import { integrationRequestSchema, isFreeMail } from '@/components/forms/schemas';
import { guardRequest, reply, turnstileFailed, validationError } from '@/lib/server/forms';
import { deliverLead } from '@/lib/server/leads';

/** POST /api/integration-request (A9): save and alert Slack. */
export async function POST(request: Request) {
  const guard = await guardRequest(request, 'integration-request');
  if (!guard.ok) return guard.response;

  const parsed = integrationRequestSchema.safeParse(guard.body);
  if (!parsed.success) return validationError(parsed.error);
  const input = parsed.data;
  if (await turnstileFailed(input.turnstileToken, guard.ip)) return reply({ ok: false, error: 'serverError' }, 400);

  const email = input.email.toLowerCase();
  const result = await deliverLead({
    email,
    properties: {
      lead_type: 'integration_request',
      requested_integration: input.tool,
      shop_domain: input.shopDomain,
      email_type: isFreeMail(email) ? 'free' : 'work',
      utm_source: input.utmSource,
      utm_medium: input.utmMedium,
      utm_campaign: input.utmCampaign,
      landing_page: input.landingPage,
    },
    alert: {
      leadType: `integration request: ${input.tool}`,
      email,
      shopDomain: input.shopDomain,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      landingPage: input.landingPage,
    },
  });
  if (!result.ok) return reply({ ok: false, error: result.error }, result.status);
  return reply({ ok: true });
}
