'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { conversationsOptions, leadSchema } from '@/components/forms/schemas';
import { fieldLabels as L, leadForms } from '@/content/forms';
import { messages, type MessageKey } from '@/content/messages';
import { helpdeskOptions, ordersOptions } from '@/content/waitlist';
import { track } from '@/lib/analytics';
import { appUrl } from '@/lib/config';
import { splitName, submitGoogleForm } from '@/lib/googleForms';
import { Field, Honeypot, SelectInput, TextArea, TextInput } from './fields';
import { resetTurnstile, Turnstile } from './Turnstile';

type LeadType = 'brain_scan' | 'demo' | 'design_partner';
type Values = Record<'name' | 'email' | 'shopDomain' | 'ordersPerMonth' | 'conversationsPerMonth' | 'helpdesk' | 'topProblem', string>;

const empty: Values = { name: '', email: '', shopDomain: '', ordersPerMonth: '', conversationsPerMonth: '', helpdesk: '', topProblem: '' };

const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

/**
 * LeadForm (A7, A9): Brain Scan pre-capture, demo request or design-partner
 * application. Validates with the same Zod schema as POST /api/lead; the
 * success state replaces the form.
 */
export function LeadForm({ type }: { type: LeadType }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Values | 'form', string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const set = (key: keyof Values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const has = {
    name: type !== 'brain_scan',
    orders: type !== 'brain_scan',
    conversations: type === 'design_partner',
    topProblem: type === 'design_partner',
  };

  function payload() {
    const base: Record<string, unknown> = { type, email: values.email, shopDomain: values.shopDomain };
    if (has.name) base.name = values.name;
    if (has.orders) base.ordersPerMonth = values.ordersPerMonth || undefined;
    if (has.conversations) base.conversationsPerMonth = values.conversationsPerMonth || undefined;
    if (has.topProblem) base.topProblem = values.topProblem;
    base.helpdesk = values.helpdesk || undefined;
    return base;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = payload();
    const checked = leadSchema.safeParse(data);
    if (!checked.success) {
      const next: typeof errors = {};
      for (const issue of checked.error.issues) {
        const field = issue.path[0] as keyof Values;
        if (!next[field]) {
          next[field] =
            issue.message in messages ? messages[issue.message as MessageKey] : messages.required;
        }
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus('loading');
    try {
      // The honeypot is a hidden field only a bot fills in. Carry on to the
      // success path without submitting, so a bot learns nothing from the
      // difference between a real submission and a rejected one.
      if (!honeypot) {
        const { name, ...lead } = data as Record<string, string | undefined>;
        await submitGoogleForm('designPartner', { ...lead, ...splitName(name) });
      }

      if (type === 'brain_scan') {
        track('brain_scan_form_submit', { helpdesk: values.helpdesk || undefined });
        track('shopify_connect_start', { page: window.location.pathname });
        // CHANGED from A9: only the shop goes in the URL; the email is already
        // saved with the lead and shouldn't sit in URLs and server logs.
        const shop = checked.data.shopDomain;
        window.location.assign(`${appUrl}/install?shop=${encodeURIComponent(shop)}`);
        return;
      }
      if (type === 'design_partner') {
        track('design_partner_apply', {
          orders_per_month: values.ordersPerMonth,
          helpdesk: values.helpdesk,
        });
      }
      setStatus('success');
    } catch (err) {
      setErrors({ form: messages[err instanceof Error && err.message in messages ? (err.message as MessageKey) : 'serverError'] });
      setStatus('idle');
      resetTurnstile();
    }
  }

  if (status === 'success') {
    if (type === 'demo') {
      if (calLink) {
        const src = `https://cal.com/${calLink}?embed=true&name=${encodeURIComponent(values.name)}&email=${encodeURIComponent(values.email)}`;
        return (
          <div>
            <p className="font-semibold">{leadForms.demo.pickTime}</p>
            <iframe title="Book a demo" src={src} className="mt-4 h-[640px] w-full rounded-card border border-gray-200" />
          </div>
        );
      }
      return <Success text={leadForms.demo.noCalendar} />;
    }
    return <Success text={leadForms.design_partner.success} />;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-4 text-left">
      {has.name && (
        <Field id={`${id}-name`} label={L.name} error={errors.name}>
          <TextInput id={`${id}-name`} type="text" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
        </Field>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-email`} label={L.email} error={errors.email}>
          <TextInput
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder={L.emailPlaceholder}
            value={values.email}
            onChange={set('email')}
            error={errors.email}
          />
        </Field>
        <Field id={`${id}-shop`} label={L.store} error={errors.shopDomain}>
          <TextInput
            id={`${id}-shop`}
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder={L.storePlaceholder}
            value={values.shopDomain}
            onChange={set('shopDomain')}
            error={errors.shopDomain}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {has.orders && (
          <Field id={`${id}-orders`} label={L.orders} error={errors.ordersPerMonth}>
            <SelectInput
              id={`${id}-orders`}
              options={ordersOptions}
              placeholder={L.choose}
              value={values.ordersPerMonth}
              onChange={set('ordersPerMonth')}
              error={errors.ordersPerMonth}
            />
          </Field>
        )}
        {has.conversations && (
          <Field id={`${id}-conv`} label={L.conversations} error={errors.conversationsPerMonth}>
            <SelectInput
              id={`${id}-conv`}
              options={conversationsOptions}
              placeholder={L.choose}
              value={values.conversationsPerMonth}
              onChange={set('conversationsPerMonth')}
              error={errors.conversationsPerMonth}
            />
          </Field>
        )}
        <Field
          id={`${id}-helpdesk`}
          label={L.helpdesk}
          hint={type === 'design_partner' ? undefined : L.optional}
          error={errors.helpdesk}
        >
          <SelectInput
            id={`${id}-helpdesk`}
            options={helpdeskOptions}
            placeholder={L.choose}
            value={values.helpdesk}
            onChange={set('helpdesk')}
            error={errors.helpdesk}
          />
        </Field>
      </div>
      {has.topProblem && (
        <Field
          id={`${id}-problem`}
          label={L.topProblem}
          hint={<span className="text-small">({values.topProblem.length}/500)</span>}
          error={errors.topProblem}
        >
          <TextArea id={`${id}-problem`} maxLength={500} value={values.topProblem} onChange={set('topProblem')} error={errors.topProblem} />
        </Field>
      )}

      <Honeypot id={`${id}-website`} value={honeypot} onChange={setHoneypot} />
      <Turnstile />

      <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
        {leadForms[type].submit}
      </Button>
      {type === 'brain_scan' && <p className="text-small text-ink-700">{leadForms.brain_scan.consent}</p>}
      <p aria-live="polite" className="min-h-[22px] text-small text-danger">
        {errors.form}
      </p>
    </form>
  );
}

function Success({ text }: { text: string }) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-card border border-success/30 bg-success-soft p-5 text-success-strong">
      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="font-semibold">{text}</p>
    </div>
  );
}
