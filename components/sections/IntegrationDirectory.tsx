'use client';

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { CircleCheck, Search } from 'lucide-react';
import { Field, Honeypot, TextInput } from '@/components/forms/fields';
import { email as emailSchema, integrationRequestSchema } from '@/components/forms/schemas';
import { readTurnstileToken, resetTurnstile, Turnstile } from '@/components/forms/Turnstile';
import { Button } from '@/components/ui/Button';
import { Chip, type ChipTone } from '@/components/ui/Chip';
import { fieldLabels, integrationRequest as req } from '@/content/forms';
import {
  cardLabels,
  categories,
  integrations,
  integrationsHero as copy,
  statusLabels,
  type Status,
} from '@/content/integrations';
import { messages, type MessageKey } from '@/content/messages';
import { ctas } from '@/content/site';
import { track } from '@/lib/analytics';
import { readAttribution } from '@/lib/utm';

const statusTone: Record<Status, ChipTone> = { live: 'live', beta: 'beta', soon: 'soon', later: 'neutral' };
const statusOrder: Status[] = ['live', 'beta', 'soon', 'later'];

/**
 * Integrations directory (A7 IntegrationGrid): search, category and status
 * filters, one card per tool, and the request form (B8.4). "Notify me" fills
 * the request form with that tool.
 */
export function IntegrationDirectory() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [tool, setTool] = useState('');
  const toolRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) return;
    const t = window.setTimeout(() => track('integration_search', { query: query.trim() }), 800);
    return () => window.clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return integrations
      .filter((i) => (!q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)))
      .filter((i) => !category || i.category === category)
      .filter((i) => !status || i.status === status)
      .sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
  }, [query, category, status]);

  function notify(name: string) {
    setTool(name);
    document.getElementById('request-integration')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => toolRef.current?.focus({ preventScroll: true }), 400);
  }

  const selectClass = 'h-12 w-full rounded-input border border-gray-200 bg-white px-3 text-ink-950';

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative">
          <label htmlFor={`${id}-q`} className="sr-only">
            {copy.searchLabel}
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="h-12 w-full rounded-input border border-gray-200 bg-white pl-12 pr-4 text-ink-950 placeholder:text-gray-500"
          />
        </div>
        <div>
          <label htmlFor={`${id}-cat`} className="sr-only">
            {copy.categoryLabel}
          </label>
          <select id={`${id}-cat`} value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
            <option value="">
              {copy.categoryLabel}: {copy.all}
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-status`} className="sr-only">
            {copy.statusLabel}
          </label>
          <select id={`${id}-status`} value={status} onChange={(e) => setStatus(e.target.value as Status | '')} className={selectClass}>
            <option value="">
              {copy.statusLabel}: {copy.all}
            </option>
            {statusOrder.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-small text-ink-700">
        {results.length} {results.length === 1 ? 'integration' : 'integrations'}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-card border border-dashed border-gray-200 bg-white p-8 text-center text-ink-700">{copy.empty}</p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((i) => {
            const connectable = i.status === 'live' || i.status === 'beta';
            return (
              <li key={i.name} className="flex flex-col rounded-card border border-gray-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-gray-50 font-bold text-ink-700"
                    >
                      {i.name.charAt(0)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink-950">{i.name}</h3>
                      <p className="text-xs text-gray-500">{i.category}</p>
                    </div>
                  </div>
                  <Chip tone={statusTone[i.status]}>{statusLabels[i.status]}</Chip>
                </div>
                <p className="mt-4 flex-1 text-small text-ink-700">{i.oneLine}</p>
                {(i.reads || i.changes) && (
                  <dl className="mt-4 space-y-1 rounded-btn bg-gray-50 p-3 text-xs">
                    {i.reads && (
                      <div>
                        <dt className="inline font-semibold text-ink-950">{cardLabels.reads}: </dt>
                        <dd className="inline text-ink-700">{i.reads}</dd>
                      </div>
                    )}
                    {i.changes && (
                      <div>
                        <dt className="inline font-semibold text-ink-950">{cardLabels.changes}: </dt>
                        <dd className="inline text-ink-700">{i.changes}</dd>
                      </div>
                    )}
                  </dl>
                )}
                {connectable ? (
                  <Button href={ctas.brainScan.href} variant="secondary" tone="light" className="mt-4 h-10 w-full">
                    {cardLabels.connect}
                    <span className="sr-only"> {i.name}</span>
                  </Button>
                ) : (
                  <Button variant="secondary" tone="light" className="mt-4 h-10 w-full" onClick={() => notify(i.name)}>
                    {cardLabels.notify}
                    <span className="sr-only"> about {i.name}</span>
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}

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
      const res = await fetch('/api/integration-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypot,
          turnstileToken: formRef.current ? readTurnstileToken(formRef.current) : undefined,
          ...readAttribution(),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: MessageKey };
      if (!res.ok || !body.ok) throw new Error(body.error ?? 'serverError');
      track('integration_request', { tool });
      setState('success');
    } catch (err) {
      setErrors({ form: messages[err instanceof Error && err.message in messages ? (err.message as MessageKey) : 'serverError'] });
      setState('idle');
      resetTurnstile();
    }
  }

  return (
    <section id="request-integration" aria-labelledby={`${id}-title`} className="mt-16 scroll-mt-28 rounded-card border border-gray-200 bg-white p-6 md:p-8">
      <h2 id={`${id}-title`} className="t-h2">
        {req.title}
      </h2>
      <p className="mt-2 max-w-text text-ink-700">{req.body}</p>
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
