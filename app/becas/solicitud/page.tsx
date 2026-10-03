import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import BecasStatusView from '@/components/becas/BecasStatusView';
import { fetchStatus } from '@/lib/becas/worker-client';

export const metadata: Metadata = {
  title: 'Estatus de tu beca',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const STATUS_COOKIE = 'nwl_becas_app';

export default async function SolicitudPage() {
  const token = (await cookies()).get(STATUS_COOKIE)?.value ?? null;
  let status = null;
  let error = false;
  if (token) {
    try {
      status = await fetchStatus(token);
    } catch (err) {
      console.error('[becas] status fetch failed:', err);
      error = true;
    }
  }
  return <BecasStatusView status={status} unavailable={error} />;
}
