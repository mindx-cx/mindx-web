// Browser-safe. Imported by client components; there is no server to proxy
// through once the site is a static export.
//
// The HubSpot Forms Submission API takes the portal id and the form id and no
// token at all -- both are public values that also appear in HubSpot's own
// embed snippet -- so the same call the route handlers used to make works
// straight from the page. Only NEXT_PUBLIC_ variables are read here: anything
// else is stripped from the client bundle at build time and would silently
// become undefined.

export type HubSpotFormKey =
  "waitlist" | "designPartner" | "newsletter" | "integrationRequest";

export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "247553422";
// The portal lives in HubSpot's NA2 data center (embed code: data-region="na2").
export const HUBSPOT_REGION = "na2";
const API_BASE =
  process.env.NEXT_PUBLIC_HUBSPOT_FORMS_API_BASE ||
  "https://api-na2.hsforms.com";

const WAITLIST =
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_WAITLIST ||
  "b5253b45-b45f-404d-90d8-03be9814a641";
const DESIGN_PARTNER =
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_DESIGN_PARTNER ||
  "d8213d15-0e98-404b-bf7a-fa849776a857";
const NEWSLETTER =
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_NEWSLETTER ||
  "653bee33-0663-4e15-a44c-b66914851985";

const FORM_IDS: Record<HubSpotFormKey, string> = {
  waitlist: WAITLIST,
  designPartner: DESIGN_PARTNER,
  newsletter: NEWSLETTER,
  // There is no dedicated HubSpot form for integration requests yet. Until one
  // exists and NEXT_PUBLIC_HUBSPOT_FORM_INTEGRATION points at it, these land in
  // the newsletter form so the email is still captured -- the requested tool is
  // dropped, because the newsletter form has no field to hold it.
  integrationRequest:
    process.env.NEXT_PUBLIC_HUBSPOT_FORM_INTEGRATION || NEWSLETTER,
};

export const hubspotFormId = (form: HubSpotFormKey) => FORM_IDS[form];

/**
 * Our field -> HubSpot field internal name, per form. A field the form does not
 * have is dropped rather than sent, because HubSpot rejects the whole
 * submission over one unknown field.
 */
export const FIELD_MAP: Record<HubSpotFormKey, Record<string, string>> = {
  waitlist: {
    email: "email",
    shopDomain: "website",
    firstname: "firstname",
    lastname: "lastname",
    ordersPerMonth: "orders_per_month",
    helpdesk: "helpdesk",
    wantsDemo: "wants_demo",
  },
  designPartner: {
    email: "email",
    firstname: "firstname",
    lastname: "lastname",
    shopDomain: "website",
    ordersPerMonth: "orders_per_month",
    conversationsPerMonth: "conversations_per_month",
    helpdesk: "helpdesk",
    topProblem: "top_support_problem",
  },
  newsletter: {
    email: "email",
  },
  integrationRequest: {
    email: "email",
  },
};

/** "Rajesh Dayalan" -> { firstname, lastname }; a single word is the first name. */
export function splitName(full?: string): {
  firstname?: string;
  lastname?: string;
} {
  const parts = (full ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstname: parts[0] };
  return {
    firstname: parts.slice(0, -1).join(" "),
    lastname: parts[parts.length - 1],
  };
}

/**
 * Submits one form. Throws 'serverError' -- a key in content/messages -- so the
 * callers' existing catch blocks show the same wording they always did.
 */
export async function submitHubSpotForm(
  form: HubSpotFormKey,
  values: Record<string, string | number | boolean | undefined>,
): Promise<void> {
  const map = FIELD_MAP[form];
  const fields = Object.entries(values)
    .filter(([key, value]) => map[key] && value !== undefined && value !== "")
    .map(([key, value]) => ({
      objectTypeId: "0-1",
      name: map[key],
      value: String(value),
    }));

  if (fields.length === 0) throw new Error("serverError");

  let res: Response;
  try {
    res = await fetch(
      `${API_BASE}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${FORM_IDS[form]}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            pageUri:
              typeof window === "undefined" ? undefined : window.location.href,
            pageName:
              typeof document === "undefined" ? undefined : document.title,
          },
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
  } catch {
    // Network failure or timeout. The caller shows the generic error and the
    // visitor can try again; nothing has been recorded.
    throw new Error("serverError");
  }
  if (!res.ok) throw new Error("serverError");
}
