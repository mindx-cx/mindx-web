import { newsletterSchema } from '@/components/forms/schemas';
import { guardRequest, reply, turnstileFailed, validationError } from '@/lib/server/forms';
import { deliverLead } from '@/lib/server/leads';

/**
 * POST /api/newsletter (A9). Saves the contact as "pending" with no Slack
 * alert. The double opt-in confirmation email is sent by a HubSpot workflow
 * on newsletter_status = pending (set up in HubSpot).
 */
export async function POST(request: Request) {
  const guard = await guardRequest(request, 'newsletter');
  if (!guard.ok) return guard.response;

  const parsed = newsletterSchema.safeParse(guard.body);
  if (!parsed.success) return validationError(parsed.error);
  const input = parsed.data;
  if (await turnstileFailed(input.turnstileToken, guard.ip)) return reply({ ok: false, error: 'serverError' }, 400);

  const email = input.email.toLowerCase();
  const result = await deliverLead({
    email,
    form: {
      key: 'newsletter',
      values: { email },
      pageUri: request.headers.get('referer') ?? undefined,
      ipAddress: guard.ip,
    },
    properties: {
      newsletter_status: 'pending',
      utm_source: input.utmSource,
      utm_medium: input.utmMedium,
      utm_campaign: input.utmCampaign,
      landing_page: input.landingPage,
    },
  });
  if (!result.ok) return reply({ ok: false, error: result.error }, result.status);
  return reply({ ok: true });
}
