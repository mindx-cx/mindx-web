'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { resetTurnstile, Turnstile } from '@/components/forms/Turnstile';
import { Button } from '@/components/ui/Button';
import { messages, type MessageKey } from '@/content/messages';
import { footer } from '@/content/site';
import { submitHubSpotForm } from '@/lib/hubspotForms';

type Status = 'idle' | 'loading' | 'success';

// Same rule as the server's Zod schema; kept inline so the footer (on every
// page) doesn't pull the validation library into the shared bundle.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  // Load the bot check only once someone starts using the form, not on every page view.
  const [engaged, setEngaged] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return setError(messages.required);
    if (!EMAIL_PATTERN.test(value)) return setError(messages.invalidEmail);

    setError('');
    setStatus('loading');
    try {
      await submitHubSpotForm('newsletter', { email: value });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setError(messages[err instanceof Error && err.message in messages ? (err.message as MessageKey) : 'serverError']);
      resetTurnstile();
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="text-small text-white">
        {messages.newsletterSuccess}
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={() => setEngaged(true)} noValidate className="w-full max-w-md">
      <label htmlFor={`${id}-email`} className="block font-semibold text-white">
        {footer.newsletter.label}
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={footer.newsletter.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 min-w-0 flex-1 rounded-input border border-navy-700 bg-navy-900 px-4 text-white placeholder:text-gray-300/70"
        />
        <Button type="submit" disabled={status === 'loading'}>
          {footer.newsletter.button}
        </Button>
      </div>
      {engaged && (
        <div className="mt-2">
          <Turnstile />
        </div>
      )}
      <p id={`${id}-error`} aria-live="polite" className="mt-2 min-h-[22px] text-small text-gray-300">
        {error}
      </p>
    </form>
  );
}
