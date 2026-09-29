'use client';

import Link from 'next/link';
import { useId, useRef, useState, type FormEvent } from 'react';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { email as emailSchema, shopDomain as shopDomainSchema } from '@/components/forms/schemas';
import { messages, type MessageKey } from '@/content/messages';
import { ctas } from '@/content/site';
import { helpdeskOptions, ordersOptions, waitlistForm as copy } from '@/content/waitlist';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { readAttribution } from '@/lib/utm';
import { readTurnstileToken, resetTurnstile, Turnstile } from './Turnstile';

type Step = 'signup' | 'details' | 'done';
type Errors = Partial<Record<'email' | 'store' | 'form', string>>;

async function post(payload: Record<string, unknown>): Promise<{ token?: string }> {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; token?: string; error?: MessageKey };
  if (!res.ok || !data.ok) throw new Error(data.error && data.error in messages ? data.error : 'serverError');
  return data;
}

const errorMessage = (err: unknown) =>
  messages[err instanceof Error && err.message in messages ? (err.message as MessageKey) : 'serverError'];

const fieldClass = (invalid?: string) =>
  cn(
    'mt-1.5 h-12 w-full rounded-input border bg-white px-4 text-ink-950 placeholder:text-gray-500',
    invalid ? 'border-danger' : 'border-gray-200',
  );

/**
 * Waitlist signup in two steps: work email + store URL (the only required
 * step; the store is the best lead qualifier), then optional details: name,
 * orders, helpdesk and demo interest. Shares validation with POST /api/waitlist.
 */
export function WaitlistSignup({ intent }: { intent?: 'demo' }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<Step>('signup');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState<string>();

  const [email, setEmail] = useState('');
  const [store, setStore] = useState('');
  const [shopDomain, setShopDomain] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [name, setName] = useState('');
  const [orders, setOrders] = useState('');
  const [helpdesk, setHelpdesk] = useState('');
  const [wantsDemo, setWantsDemo] = useState(intent === 'demo');

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    const checkedEmail = emailSchema.safeParse(email);
    if (!checkedEmail.success) next.email = messages[checkedEmail.error.issues[0].message as MessageKey] ?? messages.invalidEmail;
    let domain = '';
    if (!store.trim()) next.store = messages.required;
    else {
      const checkedStore = shopDomainSchema.safeParse(store);
      if (checkedStore.success) domain = checkedStore.data;
      else next.store = messages.invalidStore;
    }
    setErrors(next);
    if (next.email || next.store) return;

    setLoading(true);
    try {
      const data = await post({
        step: 1,
        email: email.trim(),
        shopDomain: domain,
        worker: 'mindx',
        intent,
        website: honeypot,
        turnstileToken: formRef.current ? readTurnstileToken(formRef.current) : undefined,
        ...readAttribution(),
      });
      setToken(data.token);
      setShopDomain(domain);
      track('waitlist_join', { worker: 'mindx', intent });
      setStep('details');
    } catch (err) {
      setErrors({ form: errorMessage(err) });
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await post({
        step: 2,
        email: email.trim(),
        token,
        name: name.trim() || undefined,
        ordersPerMonth: orders || undefined,
        helpdesk: helpdesk || undefined,
        wantsDemo,
      });
      setStep('done');
    } catch (err) {
      setErrors({ form: errorMessage(err) });
    } finally {
      setLoading(false);
    }
  }

  if (step === 'done') {
    return (
      <div role="status" className="flex items-start gap-3 text-left">
        <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="t-h3">{copy.doneTitle}</p>
          <p className="mt-1 text-ink-700">{copy.doneBody}</p>
        </div>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <form onSubmit={submitDetails} noValidate className="text-left">
        <div role="status" className="flex items-start gap-3">
          <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-success" aria-hidden="true" />
          <div>
            <p className="t-h3">{copy.successTitle}</p>
            <p className="mt-1 text-ink-700">{copy.successBody(shopDomain)}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor={`${id}-name`} className="block font-semibold">
              {copy.nameLabel}
            </label>
            <input
              id={`${id}-name`}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.namePlaceholder}
              className={fieldClass()}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-orders`} className="block font-semibold">
                {copy.ordersLabel}
              </label>
              <select id={`${id}-orders`} value={orders} onChange={(e) => setOrders(e.target.value)} className={fieldClass()}>
                <option value="">{copy.selectPlaceholder}</option>
                {ordersOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-helpdesk`} className="block font-semibold">
                {copy.helpdeskLabel}
              </label>
              <select id={`${id}-helpdesk`} value={helpdesk} onChange={(e) => setHelpdesk(e.target.value)} className={fieldClass()}>
                <option value="">{copy.selectPlaceholder}</option>
                {helpdeskOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={wantsDemo}
              onChange={(e) => setWantsDemo(e.target.checked)}
              className="h-5 w-5 accent-blue-600"
            />
            <span>{copy.demoLabel}</span>
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={loading}>
            {copy.saveDetails}
          </Button>
          <button type="button" onClick={() => setStep('done')} className="rounded-sm px-2 py-2 font-semibold text-blue-600">
            {copy.skip}
          </button>
        </div>
        <p aria-live="polite" className="mt-2 min-h-[22px] text-small text-danger">
          {errors.form}
        </p>
      </form>
    );
  }

  return (
    <form ref={formRef} onSubmit={submitSignup} noValidate className="text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-email`} className="block text-small font-semibold">
            {copy.emailLabel}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={fieldClass(errors.email)}
          />
          {errors.email && (
            <p id={`${id}-email-error`} className="mt-1 text-small text-danger">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-store`} className="block text-small font-semibold">
            {copy.storeLabel}
          </label>
          <input
            id={`${id}-store`}
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            required
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder={copy.storePlaceholder}
            aria-invalid={errors.store ? true : undefined}
            aria-describedby={errors.store ? `${id}-store-error` : undefined}
            className={fieldClass(errors.store)}
          />
          {errors.store && (
            <p id={`${id}-store-error`} className="mt-1 text-small text-danger">
              {errors.store}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from people, filled in by bots (A9). */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="mt-3">
        <Turnstile />
      </div>

      <Button type="submit" disabled={loading} arrow className="mt-3 w-full">
        {copy.submit}
      </Button>
      <p aria-live="polite" className="mt-2 min-h-[22px] text-center text-small text-danger">
        {errors.form}
      </p>
      <p className="text-center text-small text-ink-700">
        {copy.smallPrint} · {copy.signInPrompt}{' '}
        <Link href={ctas.login.href} className="rounded-sm font-semibold text-blue-600 underline underline-offset-2">
          {copy.signInLabel}
        </Link>
      </p>
    </form>
  );
}
