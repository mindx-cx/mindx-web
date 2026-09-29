// Server-only: import from route handlers, never from client components.
//
// Sends our custom forms to the matching HubSpot forms through the Forms
// Submission API (option B, 29 Sep 2026). No private token needed: portal and
// form IDs are public. Submissions appear under each form in HubSpot and run
// its notifications and workflows.

export type HubSpotFormKey = 'waitlist' | 'designPartner' | 'newsletter';

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '247553422';
// The portal lives in HubSpot's NA2 data center (embed code: data-region="na2").
const API_BASE = process.env.HUBSPOT_FORMS_API_BASE || 'https://api-na2.hsforms.com';

const FORM_IDS: Record<HubSpotFormKey, string> = {
  waitlist: process.env.HUBSPOT_FORM_WAITLIST || 'b5253b45-b45f-404d-90d8-03be9814a641',
  designPartner: process.env.HUBSPOT_FORM_DESIGN_PARTNER || 'd8213d15-0e98-404b-bf7a-fa849776a857',
  newsletter: process.env.HUBSPOT_FORM_NEWSLETTER || '653bee33-0663-4e15-a44c-b66914851985',
};

/**
 * Our field → HubSpot field internal name, per form.
 * [Confirm each internal name in HubSpot (form editor → field → internal name).
 * Fields a form doesn't have should be removed from its map.]
 */
export const FIELD_MAP: Record<HubSpotFormKey, Record<string, string>> = {
  waitlist: {
    email: 'email',
    shopDomain: 'website',
    firstname: 'firstname',
    lastname: 'lastname',
    ordersPerMonth: 'orders_per_month',
    helpdesk: 'helpdesk',
    wantsDemo: 'wants_demo',
  },
  designPartner: {
    email: 'email',
    firstname: 'firstname',
    lastname: 'lastname',
    shopDomain: 'website',
    ordersPerMonth: 'orders_per_month',
    conversationsPerMonth: 'conversations_per_month',
    helpdesk: 'helpdesk',
    topProblem: 'top_support_problem',
  },
  newsletter: {
    email: 'email',
  },
};

/**
 * On in production. Off in development unless HUBSPOT_FORMS_ENABLED=true, so
 * local testing doesn't create real contacts. HUBSPOT_FORMS_ENABLED=false
 * turns it off everywhere.
 */
export function hubspotFormsEnabled(): boolean {
  const flag = process.env.HUBSPOT_FORMS_ENABLED;
  if (flag === 'false') return false;
  if (flag === 'true') return true;
  return process.env.NODE_ENV === 'production';
}

type SubmitContext = { pageUri?: string; pageName?: string; ipAddress?: string; hutk?: string };

/** Submits one form. Throws with HubSpot's error message if it's rejected. */
export async function submitHubSpotForm(
  form: HubSpotFormKey,
  values: Record<string, string | undefined>,
  context: SubmitContext = {},
): Promise<void> {
  const map = FIELD_MAP[form];
  const fields = Object.entries(values)
    .filter(([key, value]) => map[key] && value !== undefined && value !== '')
    .map(([key, value]) => ({ objectTypeId: '0-1', name: map[key], value: String(value) }));

  const ctx = Object.fromEntries(Object.entries(context).filter(([, v]) => v && v !== 'unknown'));
  const res = await fetch(`${API_BASE}/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_IDS[form]}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields, context: ctx }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HubSpot form "${form}" rejected the submission (${res.status}): ${detail.slice(0, 400)}`);
  }
}
