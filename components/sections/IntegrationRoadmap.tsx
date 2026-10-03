'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { CircleCheck } from 'lucide-react';
import { Field, Honeypot, TextInput } from '@/components/forms/fields';
import { email as emailSchema, integrationRequestSchema } from '@/components/forms/schemas';
import { resetTurnstile, Turnstile } from '@/components/forms/Turnstile';
import { Button } from '@/components/ui/Button';
import { IntegrationLogo } from '@/components/sections/IntegrationCards';
import { fieldLabels, integrationRequest as req } from '@/content/forms';
import { byLevel, cardLabels, soonCategories } from '@/content/integrations';
import { messages, type MessageKey } from '@/content/messages';
import { track } from '@/lib/analytics';
import { submitGoogleForm } from '@/lib/googleForms';

/**
 * "On the way": planned integrations as a compact list grouped by category,
 * then the request form (B8.4). "Notify me" fills the form with that tool.
 */
export function IntegrationRoadmap() {
  const [tool, setTool] = useState('');
  const toolRef = useRef<HTMLInputElement>(null);
  const soon = byLevel('soon');

  function notify(name: string) {
    setTool(name);
    document.getElementById('request-integration')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => toolRef.current?.focus({ preventScroll: true }), 400);
  }

  return (
    <div>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {soonCategories.map((category) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-fg">{category}</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {soon
                .filter((i) => i.category === category)
                .map((i) => (
                  <li key={i.name} className="flex items-center gap-3 py-2.5">
                    <IntegrationLogo item={i} size={32} />
                    <span className="flex-1 text-[15px] text-fg">{i.name}</span>
                    <button
                      type="button"
                      onClick={() => notify(i.name)}
                      className="rounded-ctl px-2 py-1 text-[13px] font-medium text-brand hover:bg-surface"
                    >
                      {cardLabels.notify}
                      <span className="sr-only"> about {i.name}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <RequestForm tool={tool} setTool={setTool} toolRef={toolRef} />
    </div>
  );
}

function RequestForm({
  tool,
  setTool,
  toolRef,
}: {
  tool: string;
  setTool: (v: string) => void;
  toolRef: React.RefObject<HTMLInputElement | null>;
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [store, setStore] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'tool' | 'email' | 'store' | 'form', string>>>({});
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = { tool, email, shopDomain: store.trim() || undefined };
    const checked = integrationRequestSchema.safeParse(data);
    if (!checked.success) {
      const next: typeof errors = {};
      for (const issue of checked.error.issues) {
        const field = issue.path[0] === 'shopDomain' ? 'store' : (issue.path[0] as 'tool' | 'email');
        if (!next[field]) next[field] = issue.message in messages ? messages[issue.message as MessageKey] : messages.required;
      }
      if (!next.email && !emailSchema.safeParse(email).success) next.email = messages.invalidEmail;
      setErrors(next);
      return;
    }
    setErrors({});
    setState('loading');
    try {
      // Hidden field only a bot fills in: report success without submitting.
      //
      // Only the email is sent. There is no integration-request form, so these
      // land in the newsletter Google Form and the requested tool is dropped --
      // it has no question to go in. The analytics event below records it.
      if (!honeypot) await submitGoogleForm('integrationRequest', { email: data.email });
      track('integration_request', { tool });
      setState('success');
    } catch (err) {
      setErrors({ form: messages[err instanceof Error && err.message in messages ? (err.message as MessageKey) : 'serverError'] });
      setState('idle');
      resetTurnstile();
    }
  }

  return (
    <section id="request-integration" aria-labelledby={`${id}-title`} className="mt-16 scroll-mt-28 rounded-card border border-line bg-white p-6 shadow-card md:p-8">
      <h2 id={`${id}-title`} className="t-h2 text-fg">
        {req.title}
      </h2>
      <p className="mt-2 max-w-text text-muted-fg">{req.body}</p>
      {state === 'success' ? (
        <div role="status" className="mt-6 flex items-start gap-3 rounded-card border border-success/30 bg-success-soft p-5 text-success-strong">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-semibold">{req.success}</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate className="relative mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Field id={`${id}-tool`} label={req.tool} error={errors.tool}>
              <TextInput
                ref={toolRef}
                id={`${id}-tool`}
                type="text"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                placeholder={req.toolPlaceholder}
                error={errors.tool}
              />
            </Field>
            <Field id={`${id}-email`} label={fieldLabels.email} error={errors.email}>
              <TextInput
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={fieldLabels.emailPlaceholder}
                error={errors.email}
              />
            </Field>
            <Field id={`${id}-store`} label={fieldLabels.store} hint={fieldLabels.optional} error={errors.store}>
              <TextInput
                id={`${id}-store`}
                type="text"
                inputMode="url"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder={fieldLabels.storePlaceholder}
                error={errors.store}
              />
            </Field>
          </div>
          <Honeypot id={`${id}-website`} value={honeypot} onChange={setHoneypot} />
          <Turnstile />
          <Button type="submit" disabled={state === 'loading'}>
            {req.submit}
          </Button>
          <p aria-live="polite" className="min-h-[22px] text-small text-danger">
            {errors.form}
          </p>
        </form>
      )}
    </section>
  );
}
