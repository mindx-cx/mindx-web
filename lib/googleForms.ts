// Browser-safe. The site keeps its own forms and design; when one is submitted
// the answers are posted straight to the matching Google Form (the one in
// mindx.digitalmarketing@gmail.com), so they show up in that form's Responses
// tab and its linked Google Sheet. Nothing is stored on this site.
//
// How it works: a Google Form accepts a plain POST to its /formResponse address,
// one `entry.<id>` field per question. The browser is not allowed to read
// Google's reply from another site (no-cors), so this can tell when the network
// failed but not when Google refused the answers. That is why every required
// Google question is also required on our own form.
//
// Each form's address can be overridden with NEXT_PUBLIC_GOOGLE_FORM_* (the
// form's public /viewform link). Only NEXT_PUBLIC_ variables written out in
// full are inlined by Next.js, hence each one is spelled out below.

export type GoogleFormKey = "waitlist" | "designPartner" | "newsletter" | "integrationRequest";

const WAITLIST =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_WAITLIST ||
  "https://docs.google.com/forms/d/e/1FAIpQLSfcGJjh1JyYDjEcUjrFWlMl5LbI3ZbqLFupLFH1BAM44rRzNw/viewform";
const DESIGN_PARTNER =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_DESIGN_PARTNER ||
  "https://docs.google.com/forms/d/e/1FAIpQLSemsCYb3Q1WKU6ONOMXlNrwc1gS5j8Hs9Dd86Rr3BJWg6HzxA/viewform";
const NEWSLETTER =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_NEWSLETTER ||
  "https://docs.google.com/forms/d/e/1FAIpQLSekq5csmYKlhB678WfMENugnXmhw-2IjAJtno0SrBgcPOtNbg/viewform";

const FORM_URLS: Record<GoogleFormKey, string> = {
  waitlist: WAITLIST,
  designPartner: DESIGN_PARTNER,
  newsletter: NEWSLETTER,
  // There is no integration-request form: those emails go to the newsletter form.
  integrationRequest: NEWSLETTER,
};

/**
 * Our field -> Google question ("entry.<id>"), per form. A field the form does
 * not have is dropped. The ids come from each form's public page.
 */
export const FIELD_MAP: Record<GoogleFormKey, Record<string, string>> = {
  waitlist: {
    email: "entry.149056745", // Email
    shopDomain: "entry.1327888921", // Store URL (required in the form)
    name: "entry.1218725758", // Name
    ordersPerMonth: "entry.301675178", // Order Per month
    helpdesk: "entry.1866834130", // HelpDesk You USE
    wantsDemo: "entry.222561091", // Try a Demo? (Yes / No)
  },
  designPartner: {
    name: "entry.1710820902", // Name (required in the form)
    shopDomain: "entry.197544930", // StoreURL
    ordersPerMonth: "entry.409084001", // Orders Per Month
    conversationsPerMonth: "entry.1892281994", // Conversation Per Month
    helpdesk: "entry.1520616588", // Helpdesk you use
    topProblem: "entry.1740000520", // Biggest Support Problem
    // The Google form has no Email question yet. Once it has one, set its
    // entry id here (or in this setting) and the applicant's email is sent too.
    ...(process.env.NEXT_PUBLIC_GOOGLE_ENTRY_DESIGN_PARTNER_EMAIL
      ? { email: process.env.NEXT_PUBLIC_GOOGLE_ENTRY_DESIGN_PARTNER_EMAIL }
      : {}),
  },
  newsletter: {
    email: "entry.221147136", // EmailID
  },
  integrationRequest: {
    email: "entry.221147136",
  },
};

/** "Rajesh Dayalan" -> { firstname, lastname }; a single word is the first name. */
export function splitName(full?: string): { firstname?: string; lastname?: string } {
  const parts = (full ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstname: parts[0] };
  return { firstname: parts.slice(0, -1).join(" "), lastname: parts[parts.length - 1] };
}

/** The form's POST address, or undefined if its link is not a Google Forms link. */
function responseUrl(form: GoogleFormKey): string | undefined {
  try {
    const url = new URL(FORM_URLS[form]);
    if (url.protocol !== "https:" || url.hostname !== "docs.google.com") return undefined;
    url.pathname = url.pathname.replace(/\/viewform$/, "/formResponse");
    url.search = "";
    return url.toString();
  } catch {
    return undefined;
  }
}

/**
 * Submits one form. Throws 'serverError' -- a key in content/messages -- so the
 * callers' existing catch blocks show the same wording they always did.
 */
export async function submitGoogleForm(
  form: GoogleFormKey,
  values: Record<string, string | number | boolean | undefined>,
): Promise<void> {
  const map = FIELD_MAP[form];
  const url = responseUrl(form);
  if (!url) throw new Error("serverError");

  // The forms split a name in two; the Google forms have one Name question.
  const merged: Record<string, string | number | boolean | undefined> = { ...values };
  if ("firstname" in merged || "lastname" in merged) {
    merged.name = [merged.firstname, merged.lastname].filter(Boolean).join(" ") || undefined;
    delete merged.firstname;
    delete merged.lastname;
  }

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (!map[key] || value === undefined || value === "") continue;
    body.append(map[key], typeof value === "boolean" ? (value ? "Yes" : "No") : String(value));
  }
  if ([...body.keys()].length === 0) throw new Error("serverError");

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors", // Google sends no CORS headers; the reply is opaque by design
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // Network failure or timeout. The caller shows the generic error and the
    // visitor can try again; nothing has been recorded.
    throw new Error("serverError");
  }
}
