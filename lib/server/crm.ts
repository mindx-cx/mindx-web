// Server-only: import from route handlers, never from client components.

// HubSpot contact upsert (A9, C10). Custom properties (shop_domain,
// orders_per_month, helpdesk, lead_type, utm_*, landing_page,
// wants_demo, email_type) must exist in the HubSpot portal first.

export type LeadProperties = Record<string, string | undefined>;

export function crmConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN);
}

/** Creates or updates the contact, keyed by email. Returns its id. Throws on failure. */
export async function upsertContact(email: string, properties: LeadProperties): Promise<string> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HubSpot is not configured');

  // Only send fields we have, so step 2 never blanks out step 1's data.
  const filled = Object.fromEntries(Object.entries({ email, ...properties }).filter(([, v]) => v !== undefined && v !== ''));

  const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: [{ idProperty: 'email', id: email, properties: filled }] }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HubSpot upsert failed (${res.status}): ${detail.slice(0, 300)}`);
  }
  const data = (await res.json()) as { results?: { id: string }[] };
  const id = data.results?.[0]?.id;
  if (!id) throw new Error('HubSpot upsert returned no contact id');
  return id;
}

/** Creates a deal in the given pipeline, associated with the contact (A9 design partners). */
export async function createDeal(contactId: string, name: string, pipelineId: string, stageId: string): Promise<void> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HubSpot is not configured');
  const res = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: { dealname: name, pipeline: pipelineId, dealstage: stageId },
      // 3 = HubSpot-defined "deal to contact" association.
      associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] }],
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HubSpot deal failed (${res.status}): ${detail.slice(0, 300)}`);
  }
}

/** "Maya Chen" → { firstname: "Maya", lastname: "Chen" } (C10: split on first space). */
export function splitName(name: string | undefined): { firstname?: string; lastname?: string } {
  if (!name) return {};
  const trimmed = name.trim();
  const i = trimmed.indexOf(' ');
  return i === -1 ? { firstname: trimmed } : { firstname: trimmed.slice(0, i), lastname: trimmed.slice(i + 1) };
}
