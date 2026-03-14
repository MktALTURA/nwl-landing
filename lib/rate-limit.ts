import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const WINDOW_SECONDS = 900; // 15 minutes
const MAX_ATTEMPTS = 5;

/**
 * Check if the IP is rate-limited (read-only — does NOT increment).
 * Call this BEFORE password verification.
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rl:login:${ip}`;
  const current = (await redis.get<number>(key)) ?? 0;
  return current >= MAX_ATTEMPTS;
}

/**
 * Record a failed login attempt. Call this AFTER password verification fails.
 */
export async function recordFailedAttempt(ip: string): Promise<void> {
  const key = `rl:login:${ip}`;
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }
}

/**
 * Clear rate limit on successful login so the counter resets.
 */
export async function clearRateLimit(ip: string): Promise<void> {
  const key = `rl:login:${ip}`;
  await redis.del(key);
}
