// Server-only: import from route handlers, never from client components.
//
// Shared request handling for every form route (A9): rate limit, JSON body,
// honeypot, Zod validation errors mapped to B10.5 message keys, Turnstile.
import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';
import { messages, type MessageKey } from '@/content/messages';
import { clientIp, rateLimited } from './rateLimit';
import { verifyTurnstile } from './turnstile';

export type FormReply = { ok: true; token?: string } | { ok: false; error: MessageKey };

export function reply(body: FormReply, status = 200) {
  return NextResponse.json(body, { status });
}

type Guarded = { ok: true; body: Record<string, unknown>; ip: string } | { ok: false; response: NextResponse };

/** Rate limit, parse JSON and check the honeypot. */
export async function guardRequest(request: Request, route: string): Promise<Guarded> {
  const ip = clientIp(request.headers);
  if (rateLimited(`${route}:${ip}`)) return { ok: false, response: reply({ ok: false, error: 'rateLimited' }, 429) };

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { ok: false, response: reply({ ok: false, error: 'serverError' }, 400) };
  }
  if (!body || typeof body !== 'object') return { ok: false, response: reply({ ok: false, error: 'serverError' }, 400) };

  const record = body as Record<string, unknown>;
  // Honeypot filled: pretend it worked so bots learn nothing (A9).
  if (typeof record.website === 'string' && record.website) return { ok: false, response: reply({ ok: true }) };

  return { ok: true, body: record, ip };
}

export function validationError(error: ZodError) {
  const key = error.issues[0]?.message;
  return reply({ ok: false, error: key && key in messages ? (key as MessageKey) : 'serverError' }, 400);
}

export async function turnstileFailed(token: unknown, ip: string): Promise<boolean> {
  return !(await verifyTurnstile(typeof token === 'string' ? token : undefined, ip));
}
