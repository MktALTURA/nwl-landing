import { NextResponse, type NextRequest } from 'next/server';
import { errorResponse, guardErrorResponse, guardJson } from '@/lib/becas/guard';
import { startSchema } from '@/lib/becas/schemas';
import { BecasApiError, startApplication } from '@/lib/becas/worker-client';
import { CAMPUS_WORKER_SLUG } from '@/lib/becas/contract';
import { writeAttributionToContact } from '@/lib/ghl';

/**
 * Step 1 of the application: contact + consent. Creates the draft in the
 * worker (which upserts the GHL contact) and returns the token the rest of
 * the flow uses. This is the moment the one Lead conversion fires in the
 * browser, after this responds 2xx.
 */
export async function POST(req: NextRequest) {
  let body;
  try {
    body = await guardJson(req, startSchema, { bucket: 'start', max: 10 });
  } catch (err) {
    return guardErrorResponse(err) ?? errorResponse(500, 'upstream');
  }
  const { data, ip, ua } = body;

  try {
    const res = await startApplication({
      idempotencyKey: data.idempotencyKey,
      campus: CAMPUS_WORKER_SLUG[data.campus],
      ciclo: data.ciclo,
      grado: data.grado,
      padre: data.padre,
      consent: { version: data.consent.version },
      referido: data.referido,
      attribution: data.attribution,
      fromToken: data.fromToken,
      eventId: data.eventId,
      client: { ip, ua },
    });

    // GHL's native attribution can't be written through the API, but the
    // custom attribution fields can. The site already owns that writer.
    if (res.contactId && data.attribution) {
      const a = data.attribution;
      const clickIds: Record<string, string> = {};
      for (const [k, v] of Object.entries(a.clickIds ?? {})) if (v) clickIds[k] = v;
      void writeAttributionToContact(res.contactId, {
        token: `beca-${res.token}`,
        clickedAt: Date.now(),
        landing_page: a.landing_page,
        ft_landing_page: a.ft_landing_page,
        fbclid: a.fbclid,
        fbclidTs: a.fbclidTs,
        clickIds,
        utm: a.utm,
        ft_utm: a.ft_utm,
        source_path: a.source_path,
      }).catch((e) => console.error('[becas] attribution write-back failed:', e));
    }

    return NextResponse.json({ ok: true, token: res.token, contactRecognized: res.contactRecognized, prefill: res.prefill ?? null });
  } catch (err) {
    if (err instanceof BecasApiError) {
      return errorResponse(err.status >= 500 ? 502 : err.status, err.code, err.detail, err.fields);
    }
    console.error('[becas] start failed:', err);
    return errorResponse(502, 'upstream');
  }
}
