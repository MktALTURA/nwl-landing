import { NextResponse } from 'next/server';

// Liveness + deploy identity for ALTURA Monitor (monitor.marketingaltura.com).
// Public, no secrets: only which commit/deployment is serving www.nwl.com.mx.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'nwl-landing',
      sha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      deployment: process.env.VERCEL_DEPLOYMENT_ID ?? null,
      env: process.env.VERCEL_ENV ?? 'local',
      region: process.env.VERCEL_REGION ?? null,
      ts: new Date().toISOString(),
    },
    { headers: { 'cache-control': 'no-store' } },
  );
}
