import { createHmac, timingSafeEqual } from 'crypto';
import { Redis } from '@upstash/redis';
import { NextResponse, type NextRequest } from 'next/server';
import type { ZodType } from 'zod';

/* ------------------------------------------------------------------ */
/*  Shared protection for the public becas API routes.                 */
/*                                                                     */
/*  These routes are reachable by anyone on the internet, write to the */
/*  CRM and a database, and sit behind paid traffic. The guard stacks  */
/*  cheap checks before the expensive worker call:                     */
/*   1. same-origin Origin header (browsers always send it on POST)    */
/*   2. JSON body size cap                                             */
/*   3. honeypot field must be empty                                   */
/*   4. form token minted by /api/becas/live (age 4 s .. 6 h)          */
/*   5. per-IP limits in Upstash, failing OPEN with a log              */
/*   6. zod validation                                                 */
/* ------------------------------------------------------------------ */

export type GuardErrorCode = 'validation' | 'bot' | 'rate_limited' | 'too_large' | 'bad_json';

export class GuardError extends Error {
  constructor(public readonly status: number, public readonly code: GuardErrorCode, public readonly fields?: Record<string, string>) {
    super(code);
  }
}

export function errorResponse(status: number, code: string, detail?: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, code, detail, fields }, { status });
}

const MAX_BODY = 20 * 1024;
const TOKEN_MIN_AGE_MS = 4_000;
const TOKEN_MAX_AGE_MS = 6 * 60 * 60_000;

function secret(): string {
  // Reuse the worker secret for the browser form token; it never leaves the server.
  return process.env.BECAS_API_SECRET || process.env.JWT_SECRET || 'becas-dev-secret';
}

/** Form token: `${ts}.${hmac(ts)}`. Proves the page was loaded and some seconds passed. */
export function mintFormToken(): string {
  const ts = String(Date.now());
  const mac = createHmac('sha256', secret()).update(ts).digest('hex').slice(0, 32);
  return `${ts}.${mac}`;
}

export function verifyFormToken(token: unknown): boolean {
  if (typeof token !== 'string') return false;
  const [ts, mac] = token.split('.');
  if (!ts || !mac || !/^\d+$/.test(ts)) return false;
  const expected = createHmac('sha256', secret()).update(ts).digest('hex').slice(0, 32);
  if (mac.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
  const age = Date.now() - Number(ts);
  return age >= TOKEN_MIN_AGE_MS && age <= TOKEN_MAX_AGE_MS;
}

export function clientIpFromHeaders(h: Headers): string {
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return h.get('x-real-ip') || '0.0.0.0';
}

export function clientIp(req: NextRequest): string {
  return clientIpFromHeaders(req.headers);
}

export function userAgent(req: NextRequest): string {
  return (req.headers.get('user-agent') || '').slice(0, 300);
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';
  try {
    const o = new URL(origin);
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
    return o.host === host;
  } catch {
    return false;
  }
}

/* ── rate limiting (lazy client; a missing KV never breaks the build or the route) ── */

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function rateLimit(bucket: string, ip: string, max: number, windowSeconds: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const key = `rl:becas:${bucket}:${ip}`;
    // incr + expire in one pipeline, expire on every hit: a lost expire can
    // never leave a key (and an IP) locked forever.
    const [n] = (await redis.multi().incr(key).expire(key, windowSeconds).exec()) as [number, unknown];
    if (n > max) throw new GuardError(429, 'rate_limited');
  } catch (err) {
    if (err instanceof GuardError) throw err;
    console.error('[becas] rate limit unavailable, failing open:', err);
  }
}

/* ── the guard ── */

export interface GuardedBody<T> {
  data: T;
  ip: string;
  ua: string;
}

export async function guardJson<T>(
  req: NextRequest,
  schema: ZodType<T>,
  opts: { bucket: string; max: number; windowSeconds?: number; requireToken?: boolean },
): Promise<GuardedBody<T>> {
  if (!sameOrigin(req)) throw new GuardError(403, 'bot');

  const raw = await req.text();
  if (raw.length > MAX_BODY) throw new GuardError(413, 'too_large');

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new GuardError(400, 'bad_json');
  }
  if (!json || typeof json !== 'object') throw new GuardError(400, 'bad_json');
  const obj = json as Record<string, unknown>;

  // Honeypot: a hidden field real browsers leave empty.
  if (typeof obj.website === 'string' && obj.website.trim() !== '') throw new GuardError(403, 'bot');

  if (opts.requireToken !== false && !verifyFormToken(obj.ft)) throw new GuardError(403, 'bot');

  const ip = clientIp(req);
  await rateLimit(opts.bucket, ip, opts.max, opts.windowSeconds ?? 3600);

  const parsed = schema.safeParse(obj);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || '_';
      if (!fields[path]) fields[path] = issue.message;
    }
    throw new GuardError(422, 'validation', fields);
  }

  return { data: parsed.data, ip, ua: userAgent(req) };
}

export function guardErrorResponse(err: unknown) {
  if (err instanceof GuardError) {
    return errorResponse(err.status, err.code, undefined, err.fields);
  }
  return null;
}
