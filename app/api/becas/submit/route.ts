import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { BECAS_CACHE_TAG } from '@/lib/becas/catalog';
import { CAMPUS_WORKER_SLUG, type BecaCategoria } from '@/lib/becas/contract';
import { errorResponse, guardErrorResponse, guardJson } from '@/lib/becas/guard';
import { submitSchema } from '@/lib/becas/schemas';
import { BecasApiError, submitApplication } from '@/lib/becas/worker-client';

/** Final submit. Idempotent on the worker side (same token → same folio). */
export async function POST(req: NextRequest) {
  let body;
  try {
    body = await guardJson(req, submitSchema, { bucket: 'submit', max: 10 });
  } catch (err) {
    return guardErrorResponse(err) ?? errorResponse(500, 'upstream');
  }
  const { data, ip, ua } = body;

  try {
    const res = await submitApplication(data.token, {
      campus: CAMPUS_WORKER_SLUG[data.campus],
      ciclo: data.ciclo,
      grado: data.grado,
      categoria: data.categoria as BecaCategoria,
      alumno: data.alumno,
      padre: data.padre,
      declarado: data.declarado,
      consent: { version: data.consent.version, aceptado: true },
      referido: data.referido,
      client: { ip, ua },
    });

    // A new application may reserve cupo; drop the cached catalog so the
    // counter on the next render is current.
    try {
      revalidateTag(BECAS_CACHE_TAG);
    } catch {
      /* not fatal */
    }

    return NextResponse.json({ ok: true, folio: res.folio, token: res.token, statusUrl: res.statusUrl });
  } catch (err) {
    if (err instanceof BecasApiError) {
      return errorResponse(err.status >= 500 ? 502 : err.status, err.code, err.detail, err.fields);
    }
    console.error('[becas] submit failed:', err);
    return errorResponse(502, 'upstream');
  }
}
