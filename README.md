# mindx-web

Marketing website for **MindX** ([themindx.ai](https://themindx.ai)), the Ecommerce Brain for Shopify merchants.
The product app at app.themindx.ai lives in a separate repo.

The build follows `MindX_Website_Build_Specification.docx` (v1.0, 28 Sep 2026), with the deviations listed below.

## Setup

Requires **Node 22.18+** (Node 20 reached end of life in April 2026; the tests use Node 22's built-in TypeScript support) and pnpm or npm.

```bash
npm install -g pnpm
pnpm install
cp .env.example .env.local   # then fill in values
pnpm dev                     # http://localhost:3000
```

Checks:

```bash
pnpm lint
pnpm typecheck
pnpm test      # savings calculator unit tests (node:test)
pnpm build
```

On this machine the system Node is 18, so local preview uses a portable Node 22 in `.tools/` (git-ignored):
`.tools\node\node.exe .tools\dev.mjs`.

## Pages

| Route | Notes |
|---|---|
| `/` | Home: rotating headline, auto-playing worker demos, inbox, Brain diagram, ledger, calculator |
| `/brain`, `/workers/resolve`, `/workers/convert`, `/workers/grow` | Product pages (Grow has its waitlist form) |
| `/waitlist` | Early access: countdown to 9 Nov 2026, 2-step signup; `?intent=demo` for demo requests |
| `/pricing` | Plans with monthly/annual toggle, worker pricing, calculator, founding offer |
| `/trust`, `/integrations`, `/about`, `/design-partners`, `/faq` | Company and trust pages (no Careers page) |
| `/brain-scan`, `/demo` | Live-mode pages; redirect to `/waitlist` in waitlist mode |
| `/terms`, `/privacy` | Carried over from the current site; old `.html` URLs redirect here |
| `/dpa`, `/subprocessors`, `/acceptable-use` | Shells waiting for the lawyer's text |

Also: `sitemap.xml`, `robots.txt`, `llms.txt`, per-page Open Graph images, JSON-LD (Organization, SoftwareApplication, BreadcrumbList, FAQPage), a 404 page, and `/styleguide` (internal, not indexed).

## Forms and backend

Every form posts to a route handler with Zod validation, a honeypot, a 5/min rate limit and Turnstile (when keys are set). Our forms keep their design and submit to the matching **HubSpot forms** through the Forms Submission API (portal `247553422`, NA2): waitlist and Grow waitlist → the Waitlist form, design-partner application → the Design Partner form, footer newsletter → the Subscription form. No private token is needed. Field mapping lives in `lib/server/hubspotForms.ts` (`FIELD_MAP`).

HubSpot submission is **on in production and off in development**, so local tests don't create contacts. Set `HUBSPOT_FORMS_ENABLED=true` in `.env.local` to send from your machine.

| Route | Form |
|---|---|
| `POST /api/waitlist` | Waitlist (step 2 needs the signed token from step 1) and the Grow waitlist |
| `POST /api/lead` | Design partner (plus an optional HubSpot deal), demo, Brain Scan pre-capture |
| `POST /api/integration-request` | Integrations page request form |
| `POST /api/newsletter` | Footer newsletter (double opt-in via a HubSpot workflow on `newsletter_status = pending`) |

Demo and Brain Scan requests and integration requests have no HubSpot form yet; they use the optional private-app token and/or Slack. With nothing enabled, development prints leads to the server log (not saved) and production refuses them, so no one is told a signup was saved when it was not.

**Only if you add the optional private-app token**, create these contact properties first: `shop_domain`, `orders_per_month`, `conversations_per_month`, `helpdesk`, `lead_type`, `wants_demo`, `email_type`, `top_support_problem`, `requested_integration`, `newsletter_status`, `utm_source`, `utm_medium`, `utm_campaign`, `landing_page`.

## Analytics

PostHog (`NEXT_PUBLIC_POSTHOG_KEY`) loads only after the visitor clicks "Accept all" in the cookie banner. Events from spec A10 are sent from `lib/analytics.ts` and `components/layout/AnalyticsProvider.tsx`.

## Structure

- `app/`: routes (App Router)
- `components/layout/`: header, mobile menu, footer, CTA band, announcement bar, cookie banner, analytics, attribution
- `components/sections/`: page sections (hero, demos, tables, directory, calculator…)
- `components/forms/`: waitlist, lead and request forms, fields, schemas, Turnstile
- `components/ui/`: Button, Chip, Card, Section, Placeholder, Illustrative, WorkerTile
- `content/`: all page copy. Pages read from here; don't hard-code copy in components.
- `lib/`: config, consent, analytics, pricing math, structured data; `lib/server/` for route-handler code only

## Rules (from the spec)

- Use the copy in the spec exactly. Never invent stats, logos, quotes or badges.
- Wrap `[placeholder]` text in `<Placeholder>` (or `withPlaceholders()`). Set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` in preview to highlight them.
- Every mock showing sample data carries the `<Illustrative />` label.
- Ask before adding a dependency not listed in spec A2.
- Copy that differs from the spec is marked `CHANGED`, `ADDED` or `DRAFT` in `content/`.

## Deviations from the spec (agreed 28–29 Sep 2026)

- **Colors**: the current themindx.ai blue brand replaces the spec's ink, lime and violet. Primary buttons are `#1358D0` with white text (6.3:1 contrast); bright `#1A6FFF` only for large text, icons and glows; mint `#6EE7B7` highlights on dark. Token roles are documented in `tailwind.config.ts`.
- **Atlassian-style system**: navy-tinted neutrals (text `#0F1A3A`), a worker color family (Brain blue, Resolve teal, Convert orange, Grow purple) shown as `<WorkerTile>`, and separate semantic status colors. Headlines use **Inter Tight**; body stays Inter.
- **Gradients**: the home hero and closing CTA use the current site's gradients (`bg-hero`, `bg-cta`); inner-page heroes use a deeper navy (`bg-hero-page`) so their buttons stay visible on short heroes.
- **Header** is the current site's floating pill nav.
- **Naming**: keep "MindX · The Ecommerce Brain" (founder decision). The competitor EcomBrain (ecombrain.io) uses a similar name; worth a trademark check before launch.
- **MindX Convert is live**, not "coming 2027". Its page copy is marked `DRAFT` pending product confirmation.
- **Waitlist launch mode**: while `NEXT_PUBLIC_LAUNCH_MODE=waitlist` (default), main CTAs read "Get early access" and open `/waitlist`; "Book a demo" joins the waitlist as a demo request. Set `live` at launch (9 Nov 2026) to restore the spec's CTAs and turn off the redirects.
- **Brain Scan redirect** sends only `?shop=` to the app install flow, not the email (the email is already saved with the lead).
- **Log in** links to `app.themindx.ai/signin` (the app's real path).
- **Integration statuses** reflect the product code (Shopify, Gorgias, Zendesk and five messaging channels live), not the spec's planned list.
- **Legal**: Privacy and Terms carry over the current site's published text.

## Open items before launch

- Add keys: HubSpot, Slack, Turnstile, `LEAD_SIGNING_SECRET`, PostHog, Cal.com.
- Company name on the site is **MindX AI** (logo, footer, structured data). The carried-over policies still say "MindX Digital Softwares Inc."; legal to confirm the registered entity and update them.
- Lawyer: final DPA, Subprocessors and Acceptable Use text; review the carried-over Terms (old plan names) and add the `mx_utm` cookie to the Privacy Policy.
- Confirm placeholders (shown in `[brackets]`): launch time, annual discount, "resolved" window, Convert attribution window, founding program size and price, SOC 2 status, encryption and deletion details, which mailboxes exist.
- Confirm Convert capabilities (`content/convert.ts`) and integration statuses (`content/integrations.ts`).
- Blog and Help center (phase 2 per spec A15) stay hidden in the footer.
