import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const WINDOW_SECONDS = 900; // 15 minutes
const MAX_ATTEMPTS = 5;

export async function checkRateLimit(ip: string): Promise<{ success: boolean; remaining: number }> {
  const key = `rl:login:${ip}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  return {
    success: current <= MAX_ATTEMPTS,
    remaining: Math.max(0, MAX_ATTEMPTS - current),
  };
}
