import { NextResponse, type NextRequest } from 'next/server';
import { getCatalogSafe } from '@/lib/becas/catalog';
import { clientIp, mintFormToken, rateLimit } from '@/lib/becas/guard';

/**
 * Live counter + form token. The page HTML is ISR (60 s); the browser calls
 * this on mount so the number is never staler than the cache, and gets the
 * token every POST must carry. Never returns prices.
 */
export async function GET(req: NextRequest) {
  try {
    await rateLimit('live', clientIp(req), 600, 3600);
  } catch {
    return NextResponse.json({ ok: false, code: 'rate_limited' }, { status: 429, headers: { 'Cache-Control': 'no-store' } });
  }

  const catalog = await getCatalogSafe();
  const actual = catalog?.ciclos.find((c) => c.tipo === 'actual')?.key;
  const cupos: Record<string, number | null> = {};
  for (const c of catalog?.campuses ?? []) {
    const cupo = actual ? c.ciclos[actual]?.cupo : undefined;
    cupos[c.slug] = cupo && cupo.visible ? cupo.restante : null;
  }

  return NextResponse.json(
    {
      ok: true,
      open: catalog?.open ?? false,
      cuposTotal: catalog?.cuposTotal ?? null,
      cupos,
      ft: mintFormToken(),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
