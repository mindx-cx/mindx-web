// Server-only: import from route handlers, never from client components.

// Fixed-window limiter: 5 requests per minute per IP per route (A9).
// In-memory, so each server instance counts separately. Good enough for
// launch; move to a shared store (e.g. Upstash) if abuse shows up.
const WINDOW_MS = 60_000;
const LIMIT = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}
