'use client';

import type { InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const control = (invalid?: string) =>
  cn(
    'mt-1.5 w-full rounded-input border bg-white px-4 text-ink-950 placeholder:text-gray-500',
    invalid ? 'border-danger' : 'border-gray-200',
  );

type FieldShell = { id: string; label: string; hint?: ReactNode; error?: string; children: ReactNode };

/** Label, control, hint and error with the aria wiring (A12: labels, not placeholders). */
export function Field({ id, label, hint, error, children }: FieldShell) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-ink-950">
        {label}
        {hint && <span className="ml-1 font-normal text-ink-700">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

// React 19 passes ref as a regular prop to function components.
type TextProps = { id: string; error?: string; ref?: Ref<HTMLInputElement> } & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ id, error, className, ...rest }: TextProps) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(control(error), 'h-12', className)}
      {...rest}
    />
  );
}

type SelectProps = { id: string; error?: string; options: readonly string[]; placeholder: string } & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({ id, error, options, placeholder, className, ...rest }: SelectProps) {
  return (
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(control(error), 'h-12', className)}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

type TextareaProps = { id: string; error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ id, error, className, ...rest }: TextareaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(control(error), 'min-h-28 py-3', className)}
      {...rest}
    />
  );
}

/** Hidden field that only bots fill in (A9). */
export function Honeypot({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
