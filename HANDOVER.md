# Handover: themindx.ai website

For Jeyasri, from Rajesh (29 Sep 2026). Read this first, then `README.md`.

## In one minute

- **What this is:** the new marketing site for MindX AI, "The Ecommerce Brain for Shopify". It replaces the static site in `mindx-cx/mindx-website`, which is still live on Hostinger.
- **Status:** all pages are built and tested (desktop, laptop, tablet, phone). It is **not live yet**. Four things block launch (see "Before launch").
- **Launch day:** Monday **9 November 2026**, 9:00 a.m. US Pacific. Until then the site runs in **waitlist mode**: every main button says "Get early access" and opens `/waitlist`.
- **Background docs** (ask Rajesh): `MindX_Website_Build_Specification.docx` (the master plan) and `SMB_Shopify_Problems_Report1.docx` (merchant research).

## Run it locally

Install Git, **Node.js 22 LTS** and VS Code, then:

```bash
git clone https://github.com/mindx-cx/mindx-web.git
cd mindx-web
npm install
npm run dev          # http://localhost:3000 (first load of each page is slow in dev)
```

Before pushing, run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`.

## Where things live

| To change… | Edit |
|---|---|
| Any wording on any page | `content/*.ts` (pages read all copy from here) |
| Nav, footer, button labels, company name | `content/site.ts` |
| Launch date and waitlist copy | `content/waitlist.ts` |
| Prices and plans | `content/pricing.ts` |
| Integration list and statuses | `content/integrations.ts` |
| Colors, fonts, spacing (design tokens) | `tailwind.config.ts` |
| HubSpot form IDs and field mapping | `lib/server/hubspotForms.ts` |
| Page titles and descriptions (SEO) | `content/seo.ts` |

Copy that differs from the spec is marked `CHANGED`, `ADDED` or `DRAFT` in `content/`, with the reason.

## Decisions already made (don't re-open without Rajesh)

- **Brand:** logo is the MX icon + "MindX AI". Footer: "© 2026 MindX AI. All rights reserved." No Shopify trademark line.
- **Colors:** current themindx.ai blue brand (not the spec's lime/violet), Atlassian-style system, worker colors: Brain blue, Resolve teal, Convert orange, Grow purple.
- **Workers:** Resolve and **Convert are live**; Grow is "coming later" (waitlist).
- **Pages removed:** Careers. About has no team section and no company facts.
- **Waitlist form:** step 1 = work email + store URL (required); step 2 = name, orders, helpdesk, demo (optional). "Book a demo" also goes to the waitlist (`/waitlist?intent=demo`).
- **Forms → HubSpot (option B):** our own forms, submitted to the HubSpot forms through the Forms API (portal `247553422`, NA2). No private token needed.
- **Hero demo:** currently the original chat card (3 tabs, chat + action log). Rajesh tried a phone + console version and a desktop two-block layout, then chose to go back to this one for now.
- **Legal:** Privacy Policy and Terms are carried over word for word from the current site; old `.html` URLs redirect.

## Before launch (blocking)

1. **HubSpot field names.** `FIELD_MAP` in `lib/server/hubspotForms.ts` uses guesses (`email`, `website`, `firstname`, `lastname`, `orders_per_month`, `helpdesk`, `wants_demo`, `conversations_per_month`, `top_support_problem`). Open each form in HubSpot (Waitlist, Design Partner, Subscription), check every field's **internal name** and which are **required**, and update the map. Then set `HUBSPOT_FORMS_ENABLED=true` in `.env.local`, send **one test** per form, and delete the test contacts in HubSpot.
   - HubSpot sending is **off in development** by default, so normal local testing never creates contacts. It is **on in production**.
2. **`[Bracketed]` placeholders** show to visitors as-is. Get real values from Rajesh or hide the item: annual discount (`content/pricing.ts`), founding program size and price (`content/pricing.ts`, `content/company.ts`), "resolved" window (`content/resolve.ts`, `content/pricing.ts`), Convert attribution window (`content/convert.ts`), trust details (`content/trust.ts`), mailboxes (`content/scanDemo.ts`), launch time (`content/waitlist.ts`). Search the repo for `[` in `content/`.
3. **Legal text.** The policies name "MindX Digital Softwares Inc." and the Terms list old plans (Starter/Growth/Scale). A lawyer needs to update them (`content/legal/*.html`) and draft the DPA, Subprocessors and Acceptable Use pages. Add the `mx_utm` attribution cookie to the Privacy Policy.
4. **Deploy and switch the domain** (see below).

## Recommended

- Add **Turnstile** keys (spam protection; today it's only a hidden honeypot field and a 5/min rate limit), **Slack** webhook (lead alerts to #leads, and a backup if HubSpot fails), **PostHog** key (analytics after cookie consent).
- Confirm with the product team what Convert really does: the Convert page copy is marked `DRAFT` (`content/convert.ts`).
- Confirm integration statuses with engineering (`content/integrations.ts`; only Shopify, Gorgias, Zendesk and 5 messaging channels are marked live).
- Trademark check on "Ecommerce Brain": a competitor, EcomBrain (ecombrain.io), uses a similar name.

## Deploy (Vercel)

1. On vercel.com (MindX team account): **Add New → Project → Import `mindx-cx/mindx-web`**. It builds on every push; each pull request gets a preview link.
2. **Settings → Environment Variables:** add the values from `.env.example` that you have (never commit keys; `.env*.local` is git-ignored).
3. Test everything on the `*.vercel.app` link: every page, the waitlist (steps 1 and 2), design partner form, newsletter, phone and desktop.
4. **Settings → Domains:** add `www.themindx.ai` and `themindx.ai`, then update the DNS records **at Hostinger** to the ones Vercel shows. The old Hostinger site stays live until DNS switches.

## On launch day (9 Nov)

Set `NEXT_PUBLIC_LAUNCH_MODE=live` in Vercel and redeploy. Buttons switch back to "Get your free Brain Scan" and the `/brain-scan` and `/demo` redirects turn off. Only do this once the Brain Scan and Cal.com booking (`NEXT_PUBLIC_CAL_LINK`) are ready; otherwise keep waitlist mode.

## Good to know

- After 5 form submissions in a minute you'll see "Too many tries". That's the rate limit.
- `/styleguide` is an internal page showing all colors and components (not indexed).
- Leads with no HubSpot form yet (demo, Brain Scan, integration requests) go to Slack or the optional private-app token only.
- Contact for decisions: Rajesh (founders@themindx.com).
