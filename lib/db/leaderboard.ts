import { Redis } from '@upstash/redis';

/**
 * Outback Run (homepage easter-egg game) — school-wide leaderboard.
 * A Redis sorted set: member = player name, score = best score.
 * `gt: true` keeps only a player's personal best.
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY = 'outback-run:leaderboard';

export interface ScoreEntry {
  name: string;
  score: number;
}

export async function getTopScores(limit = 20): Promise<ScoreEntry[]> {
  const raw = await redis.zrange<(string | number)[]>(KEY, 0, limit - 1, {
    rev: true,
    withScores: true,
  });
  const out: ScoreEntry[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    out.push({ name: String(raw[i]), score: Number(raw[i + 1]) });
  }
  return out;
}

export async function submitScore(name: string, score: number): Promise<void> {
  await redis.zadd(KEY, { gt: true }, { score, member: name });
}
