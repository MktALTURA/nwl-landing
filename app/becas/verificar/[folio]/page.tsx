import type { Metadata } from 'next';
import { headers } from 'next/headers';
import BecasVerifyView from '@/components/becas/BecasVerifyView';
import { rateLimit } from '@/lib/becas/guard';
import { fetchVerify } from '@/lib/becas/worker-client';

export const metadata: Metadata = {
  title: 'Verificación de carta de beca',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * QR target printed on the carta de beca. Folios are sequential, so the QR
 * also carries a short HMAC code (`c`); without a matching code the worker
 * answers 404, the same as for a folio that never existed.
 */
export default async function VerificarPage({
  params,
  searchParams,
}: {
  params: Promise<{ folio: string }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { folio } = await params;
  const { c } = await searchParams;
  const h = await headers();
  const ip = (h.get('x-forwarded-for') || '').split(',')[0].trim() || h.get('x-real-ip') || '0.0.0.0';

  let limited = false;
  try {
    await rateLimit('verify', ip, 60, 3600);
  } catch {
    limited = true;
  }

  const clean = folio.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  let result = null;
  let error = false;
  if (!limited && /^BECA-[A-Z]{3}-\d{2}-\d{6}$/.test(clean)) {
    try {
      result = await fetchVerify(clean, (c ?? '').slice(0, 16));
    } catch (err) {
      console.error('[becas] verify failed:', err);
      error = true;
    }
  }
  return <BecasVerifyView folio={clean} result={result} unavailable={error || limited} />;
}
