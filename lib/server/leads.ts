// Server-only: import from route handlers, never from client components.
//
// One delivery path for every form (A9):
// 1. The matching HubSpot form (Forms Submission API), when there is one.
// 2. Optional extras through the private-app token (utm, lead type…), if set.
// 3. A Slack alert, if a webhook is set; also the backup if HubSpot fails.
// With nothing enabled, development logs the lead (not saved) and production
// refuses it, so a visitor is never told a lead was saved when it wasn't.
import type { MessageKey } from '@/content/messages';
import { createDeal, crmConfigured, upsertContact, type LeadProperties } from './crm';
import { hubspotFormsEnabled, submitHubSpotForm, type HubSpotFormKey } from './hubspotForms';
import { postLeadAlert, slackConfigured, type LeadAlert } from './slack';

export type DeliveryResult = { ok: true } | { ok: false; error: MessageKey; status: number };

type Delivery = {
  email: string;
  /** Extra contact properties, sent only with the private-app token. */
  properties: LeadProperties;
  /** The HubSpot form to submit to, with our field values (see FIELD_MAP). */
  form?: { key: HubSpotFormKey; values: Record<string, string | undefined>; pageUri?: string; ipAddress?: string };
  /** Slack alert; omit to skip (e.g. a step with nothing new). */
  alert?: LeadAlert;
  /** Create a HubSpot deal for this contact (design partners, token only). */
  deal?: { name: string; pipelineId?: string; stageId?: string };
};

export async function deliverLead({ email, properties, form, alert, deal }: Delivery): Promise<DeliveryResult> {
  const useForm = Boolean(form) && hubspotFormsEnabled();

  if (!useForm && !crmConfigured() && !slackConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        `[lead] Development mode: accepted but NOT saved${form ? ` (HubSpot form "${form.key}" is off locally; set HUBSPOT_FORMS_ENABLED=true to send)` : ''}.`,
        { email, ...(form ? { hubspotFields: form.values } : {}), ...properties },
      );
      return { ok: true };
    }
    console.error('[lead] Nothing configured to receive this lead; refused.');
    return { ok: false, error: 'serverError', status: 503 };
  }

  let saved = false;
  let failed = false;

  if (useForm && form) {
    try {
      await submitHubSpotForm(form.key, form.values, { pageUri: form.pageUri, ipAddress: form.ipAddress });
      saved = true;
    } catch (err) {
      failed = true;
      console.error('[lead] HubSpot form submission failed', err);
    }
  }

  if (crmConfigured()) {
    try {
      const contactId = await upsertContact(email, properties);
      saved = true;
      if (deal?.pipelineId && deal.stageId) await createDeal(contactId, deal.name, deal.pipelineId, deal.stageId);
    } catch (err) {
      // Extras only: the form submission above (if any) already holds the lead.
      if (!saved) failed = true;
      console.error('[lead] HubSpot contact update failed', err);
    }
  }

  // Without a saved copy or Slack as a backup, the lead would be lost: tell the visitor.
  if (!saved && !slackConfigured()) return { ok: false, error: 'serverError', status: 502 };

  if (alert) {
    await postLeadAlert(!saved && failed ? { ...alert, leadType: `${alert.leadType} · NOT SAVED IN HUBSPOT` } : alert);
  }
  return { ok: true };
}
