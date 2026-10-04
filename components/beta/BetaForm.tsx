'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import { submitGoogleForm } from '@/lib/googleForms';
import { currentCampaign } from '@/lib/utm';
import { betaForm as copy } from '@/content/beta';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// A store address: yourstore.myshopify.com, a custom domain, with or without https://.
const STORE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

const inputClass =
  'h-12 w-full rounded-ctl border border-line bg-white px-4 text-[16px] text-fg outline-none transition-shadow placeholder:text-subtle-fg focus:border-brand/60 focus:shadow-[0_0_0_4px_rgba(0,98,255,0.10)]';

/**
 * The beta request: work email and Shopify store URL, nothing else. Sent to
 * the existing waitlist Google Form (Email, Store URL), with the ad campaign
 * written into the form's spare text question so every signup in the sheet
 * shows which ad brought it.
 */
export function BetaForm() {
  const [email, setEmail] = useState('');
  const [store, setStore] = useState('');
  const [errors, setErrors] = useState<{ email?: string; store?: string; server?: string }>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track('beta_form_started', currentCampaign());
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL.test(email.trim())) next.email = copy.errors.email;
    if (!STORE.test(store.trim())) next.store = copy.errors.store;
    setErrors(next);
    if (next.email || next.store) return;

    const campaign = currentCampaign();
    const source = [
      'Beta page',
      campaign.utm_source && `source: ${campaign.utm_source}`,
      campaign.utm_medium && `medium: ${campaign.utm_medium}`,
      campaign.utm_campaign && `campaign: ${campaign.utm_campaign}`,
      campaign.utm_content && `content: ${campaign.utm_content}`,
    ]
      .filter(Boolean)
      .join(' · ');

    setSending(true);
    try {
      await submitGoogleForm('waitlist', {
        email: email.trim(),
        shopDomain: store.trim(),
        // The waitlist form's spare text question ("HelpDesk You USE").
        helpdesk: source,
      });
      track('beta_shopify_url_submitted', campaign);
      track('beta_form_completed', campaign);
      track('mindx_beta_signup', campaign);
      setDone(true);
    } catch {
      setErrors({ server: copy.errors.server });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div role="status" className="rounded-card border border-line bg-white p-7 text-left shadow-card md:p-8">
        <p className="font-display text-[28px] leading-tight text-fg">{copy.success.title}</p>
        <p className="mt-3 text-[16px] leading-relaxed text-muted-fg">{copy.success.body}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      onFocusCapture={markStarted}
      className="rounded-card border border-line bg-white p-6 text-left shadow-card md:p-8"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="beta-email" className="mb-1.5 block text-[14px] font-medium text-fg">
            {copy.email}
          </label>
          <input
            id="beta-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'beta-email-error' : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="beta-email-error" className="mt-1.5 text-[13px] text-signal-revenue">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="beta-store" className="mb-1.5 block text-[14px] font-medium text-fg">
            {copy.store}
          </label>
          <input
            id="beta-store"
            name="store"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder={copy.storePlaceholder}
            aria-invalid={Boolean(errors.store)}
            aria-describedby={errors.store ? 'beta-store-error' : undefined}
            className={inputClass}
          />
          {errors.store && (
            <p id="beta-store-error" className="mt-1.5 text-[13px] text-signal-revenue">
              {errors.store}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="mt-1 h-12 w-full rounded-ctl bg-brand text-[16px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {sending ? copy.sending : copy.submit}
        </button>

        {errors.server && (
          <p role="alert" className="text-[14px] text-signal-revenue">
            {errors.server}
          </p>
        )}

        <p className="text-[13px] leading-relaxed text-muted-fg">
          Early access for Shopify merchants. By requesting access you agree to our{' '}
          <Link href="/terms/" className="underline underline-offset-2 hover:text-fg">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy/" className="underline underline-offset-2 hover:text-fg">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
