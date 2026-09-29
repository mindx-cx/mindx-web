// Server-only: import from route handlers, never from client components.

// Lead alert to #leads (A9, C9 template).

export function slackConfigured(): boolean {
  return Boolean(process.env.SLACK_LEADS_WEBHOOK_URL);
}

export type LeadAlert = {
  leadType: string;
  name?: string;
  email: string;
  shopDomain?: string;
  ordersPerMonth?: string;
  helpdesk?: string;
  topProblem?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
};

const dash = (v?: string) => (v && v.trim() ? v : '—');

export function formatLeadAlert(a: LeadAlert): string {
  return [
    `:brain: New ${a.leadType} lead`,
    `*Name:* ${dash(a.name)}  *Email:* ${a.email}`,
    `*Store:* ${dash(a.shopDomain)}  *Orders/mo:* ${dash(a.ordersPerMonth)}  *Helpdesk:* ${dash(a.helpdesk)}`,
    `*Top problem:* ${dash(a.topProblem)}`,
    `*Source:* ${dash(a.utmSource)} / ${dash(a.utmMedium)} / ${dash(a.utmCampaign)}  *Page:* ${dash(a.landingPage)}`,
  ].join('\n');
}

/** Posts the alert. Never throws: a Slack outage must not lose the lead. */
export async function postLeadAlert(alert: LeadAlert): Promise<void> {
  const url = process.env.SLACK_LEADS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: formatLeadAlert(alert) }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error('[slack] lead alert failed', err);
  }
}
