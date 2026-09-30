'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { email as emailSchema, shopDomain as shopDomainSchema } from '@/components/forms/schemas';
import { messages, type MessageKey } from '@/content/messages';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { submitHubSpotForm } from '@/lib/hubspotForms';
import { resetTurnstile, Turnstile } from './Turnstile';

type WaitlistFormProps = {
  worker: 'convert' | 'grow';
  labels: {
    emailLabel: string;
    emailPlaceholder: string;
    storeLabel: string;
    storePlaceholder: string;
    submit: string;
    success: string;
  };
};

/** Worker waitlist (A9: email*, shopDomain, worker*). Success replaces the form. */
export function WaitlistForm({ worker, labels }: WaitlistFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [store, setStore] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ email?: string; store?: string; form?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: typeof errors = {};
    const checkedEmail = emailSchema.safeParse(email);
    if (!checkedEmail.success) next.email = messages[checkedEmail.error.issues[0].message as MessageKey] ?? messages.invalidEmail;
    let shopDomain: string | undefined;
    if (store.trim()) {
      const checkedStore = shopDomainSchema.safeParse(store);
      if (checkedStore.success) shopDomain = checkedStore.data;
      else next.store = messages.invalidStore;
    }
    setErrors(next);
    if (next.email || next.store) return;

    setStatus('loading');
    try {
      // The honeypot is a hidden field only a bot fills in. Show the success
      // state without submitting, so a bot learns nothing from the difference.
      if (!honeypot) await submitHubSpotForm('waitlist', { email: email.trim(), shopDomain });
      track('waitlist_join', { worker });
      setStatus('success');
    } catch (err) {
      const key = err instanceof Error && err.message in messages ? (err.message as MessageKey) : 'serverError';
      setErrors({ form: messages[key] });
      setStatus('idle');
      resetTurnstile();
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex items-start gap-3 rounded-card border border-success/30 bg-success-soft p-5 text-success-strong">
        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="font-semibold">{labels.success}</p>
      </div>
    );
  }

  const field = 'mt-2 h-12 w-full rounded-input border bg-white px-4 text-ink-950 placeholder:text-gray-500';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div>
        <label htmlFor={`${id}-email`} className="block font-semibold text-ink-950">
          {labels.emailLabel}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={cn(field, errors.email ? 'border-danger' : 'border-gray-200')}
        />
        {errors.email && (
          <p id={`${id}-email-error`} className="mt-1 text-small text-danger">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={`${id}-store`} className="block font-semibold text-ink-950">
          {labels.storeLabel}
        </label>
        <input
          id={`${id}-store`}
          type="text"
          inputMode="url"
          autoComplete="url"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          placeholder={labels.storePlaceholder}
          aria-invalid={errors.store ? true : undefined}
          aria-describedby={errors.store ? `${id}-store-error` : undefined}
          className={cn(field, errors.store ? 'border-danger' : 'border-gray-200')}
        />
        {errors.store && (
          <p id={`${id}-store-error`} className="mt-1 text-small text-danger">
            {errors.store}
          </p>
        )}
      </div>
      {/* Honeypot: hidden from people, filled in by bots (A9). */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <Turnstile />
      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {labels.submit}
      </Button>
      <p aria-live="polite" className="min-h-[22px] text-small text-danger">
        {errors.form}
      </p>
    </form>
  );
}
