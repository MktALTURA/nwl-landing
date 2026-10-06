import { NextResponse, type NextRequest } from 'next/server';
import { errorResponse, guardErrorResponse, guardJson } from '@/lib/becas/guard';
import { documentSchema } from '@/lib/becas/schemas';
import { BecasApiError, requestDocumentTicket } from '@/lib/becas/worker-client';

/**
 * Asks the worker for a single-use upload ticket. The browser then PUTs the
 * file straight to the worker, which validates, stores it in private R2 and
 * links it to the application. Nothing binary passes through Vercel, so
 * phone photos up to 10 MB are fine.
 */
export async function POST(req: NextRequest) {
  let body;
  try {
    body = await guardJson(req, documentSchema, { bucket: 'documents', max: 30 });
  } catch (err) {
    return guardErrorResponse(err) ?? errorResponse(500, 'upstream');
  }
  const { data } = body;

  try {
    const ticket = await requestDocumentTicket(data.token, {
      kind: data.kind,
      filename: data.filename,
      contentType: data.contentType,
      size: data.size,
    });
    return NextResponse.json({ ok: true, ...ticket });
  } catch (err) {
    if (err instanceof BecasApiError) {
      return errorResponse(err.status >= 500 ? 502 : err.status, err.code, err.detail, err.fields);
    }
    console.error('[becas] document ticket failed:', err);
    return errorResponse(502, 'upstream');
  }
}
