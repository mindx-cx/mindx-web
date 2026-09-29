// Server-only: import from route handlers, never from client components.
//
// Short-lived signed token returned by waitlist step 1 and required by step 2,
// so nobody can add or overwrite details on someone else's signup.
import { createHmac, timingSafeEqual } from 'node:crypto';

const TTL_MS = 60 * 60 * 1000; // 1 hour to finish step 2

/**
 * Must be stable across server instances and reloads, or step 2 fails when it
 * reaches a different instance than step 1. Uses a dedicated secret, else one
 * of the backend secrets. The development fallback only applies when no
 * backend is configured, which production refuses anyway (see the route).
 */
function secret(): string {
  return (
    process.env.LEAD_SIGNING_SECRET ||
    process.env.HUBSPOT_PRIVATE_APP_TOKEN ||
    process.env.SLACK_LEADS_WEBHOOK_URL ||
    'mindx-development-only-lead-token-secret'
  );
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createLeadToken(email: string): string {
  const expires = Date.now() + TTL_MS;
  const payload = `${email.toLowerCase()}|${expires}`;
  return `${expires}.${sign(payload)}`;
}

export function verifyLeadToken(token: string | undefined, email: string): boolean {
  if (!token) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(`${email.toLowerCase()}|${expires}`));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
