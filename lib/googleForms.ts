// Browser-safe. The three site forms are Google Forms embedded as iframes, so a
// submission goes from the visitor straight to Google and lands in the form's
// Responses tab (and the linked Google Sheet). Nothing is stored on this site.
//
// Each value is the form's embed link from Google Forms -> Send -> <> (embed),
// e.g. https://docs.google.com/forms/d/e/1FAIpQ.../viewform?embedded=true
// They are public values. Next.js only inlines NEXT_PUBLIC_ variables that are
// written out in full, which is why each one is spelled out below.

export type GoogleFormKey = "waitlist" | "designPartner" | "newsletter";

const RAW: Record<GoogleFormKey, string | undefined> = {
  waitlist: process.env.NEXT_PUBLIC_GOOGLE_FORM_WAITLIST,
  designPartner: process.env.NEXT_PUBLIC_GOOGLE_FORM_DESIGN_PARTNER,
  newsletter: process.env.NEXT_PUBLIC_GOOGLE_FORM_NEWSLETTER,
};

/** Embed height in px per form: Google Forms cannot size an iframe to its content. */
export const GOOGLE_FORM_HEIGHT: Record<GoogleFormKey, number> = {
  waitlist: 760,
  designPartner: 1050,
  newsletter: 420,
};

/** The iframe address, or undefined while the form's link has not been set. */
export function googleFormUrl(form: GoogleFormKey): string | undefined {
  const value = RAW[form]?.trim();
  if (!value) return undefined;
  // Only docs.google.com / forms.gle links are accepted, so a typo in a setting
  // can never point the iframe at some other site.
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:" || !["docs.google.com", "forms.gle"].includes(url.hostname)) {
    return undefined;
  }
  if (url.hostname === "docs.google.com") url.searchParams.set("embedded", "true");
  return url.toString();
}
