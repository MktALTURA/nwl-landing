import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { BECAS_CACHE_TAG } from '@/lib/becas/catalog';

/**
 * Worker → site webhook: a cupo changed (approval, expiry, admin edit), drop
 * the cached catalog so the counter is immediate instead of up to 60 s late.
 * Signed exactly like the site → worker calls (see lib/becas/contract.ts).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.BECAS_API_SECRET;
  if (!secret) return NextResponse.json({ error: 'becas_no_configurado' }, { status: 503 });

  const ts = req.headers.get('x-becas-timestamp') || '';
  const sig = req.headers.get('x-becas-signature') || '';
  if (!/^\d+$/.test(ts) || Math.abs(Date.now() - Number(ts)) > 5 * 60_000) {
    return NextResponse.json({ error: 'firma_expirada' }, { status: 401 });
  }

  const raw = await req.text();
  const bodyHash = createHash('sha256').update(raw, 'utf8').digest('hex');
  const canonical = `${ts}.POST.${req.nextUrl.pathname}${req.nextUrl.search}.${bodyHash}`;
  const expected = createHmac('sha256', secret).update(canonical, 'utf8').digest('hex');
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return NextResponse.json({ error: 'firma_invalida' }, { status: 401 });
  }

  revalidateTag(BECAS_CACHE_TAG);
  revalidatePath('/becas');
  return NextResponse.json({ ok: true, revalidated: ['becas', '/becas'] });
}
