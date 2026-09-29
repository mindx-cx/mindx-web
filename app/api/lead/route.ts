import { isFreeMail, leadSchema } from '@/components/forms/schemas';
import { splitName } from '@/lib/server/crm';
import { guardRequest, reply, turnstileFailed, validationError } from '@/lib/server/forms';
import { deliverLead } from '@/lib/server/leads';

/**
 * POST /api/lead (A9): Brain Scan pre-capture, demo request and
 * design-partner application. Design partners also get a HubSpot deal when
 * HUBSPOT_DESIGN_PARTNER_PIPELINE_ID and HUBSPOT_DESIGN_PARTNER_STAGE_ID are set.
 */
export async function POST(request: Request) {
  const guard = await guardRequest(request, 'lead');
  if (!guard.ok) return guard.response;

  const parsed = leadSchema.safeParse(guard.body);
  if (!parsed.success) return validationError(parsed.error);
  const input = parsed.data;
  if (await turnstileFailed(input.turnstileToken, guard.ip)) return reply({ ok: false, error: 'serverError' }, 400);

  const email = input.email.toLowerCase();
  const name = 'name' in input ? input.name : undefined;
  const ordersPerMonth = 'ordersPerMonth' in input ? input.ordersPerMonth : undefined;
  const conversationsPerMonth = 'conversationsPerMonth' in input ? input.conversationsPerMonth : undefined;
  const topProblem = 'topProblem' in input ? input.topProblem : undefined;

  const { firstname, lastname } = splitName(name);
  const result = await deliverLead({
    email,
    // Only the design-partner application has a HubSpot form; demo and Brain
    // Scan requests (live mode) go through the token and Slack paths.
    form:
      input.type === 'design_partner'
        ? {
            key: 'designPartner',
            values: {
              email,
              firstname,
              lastname,
              shopDomain: input.shopDomain,
              ordersPerMonth,
              conversationsPerMonth,
              helpdesk: input.helpdesk,
              topProblem,
            },
            pageUri: request.headers.get('referer') ?? undefined,
            ipAddress: guard.ip,
          }
        : undefined,
    properties: {
      firstname,
      lastname,
      lead_type: input.type,
      shop_domain: input.shopDomain,
      orders_per_month: ordersPerMonth,
      conversations_per_month: conversationsPerMonth,
      helpdesk: input.helpdesk,
      top_support_problem: topProblem,
      email_type: isFreeMail(email) ? 'free' : 'work',
      utm_source: input.utmSource,
      utm_medium: input.utmMedium,
      utm_campaign: input.utmCampaign,
      landing_page: input.landingPage,
    },
    alert: {
      leadType: input.type.replace('_', ' '),
      name,
      email,
      shopDomain: input.shopDomain,
      ordersPerMonth,
      helpdesk: input.helpdesk,
      topProblem,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      landingPage: input.landingPage,
    },
    deal:
      input.type === 'design_partner'
        ? {
            name: `Design partner: ${input.shopDomain}`,
            pipelineId: process.env.HUBSPOT_DESIGN_PARTNER_PIPELINE_ID,
            stageId: process.env.HUBSPOT_DESIGN_PARTNER_STAGE_ID,
          }
        : undefined,
  });
  if (!result.ok) return reply({ ok: false, error: result.error }, result.status);
  return reply({ ok: true });
}
