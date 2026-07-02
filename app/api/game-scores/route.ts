import { NextResponse } from 'next/server';
import { getTopScores, submitScore } from '@/lib/db/leaderboard';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const top = await getTopScores(20);
    return NextResponse.json({ top });
  } catch {
    return NextResponse.json({ top: [], offline: true });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 18)
      .toUpperCase();
    const score = Math.floor(Number(body?.score));
    if (name.length < 2 || !Number.isFinite(score) || score < 1 || score > 99999) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    await submitScore(name, score);
    const top = await getTopScores(20);
    return NextResponse.json({ top });
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
