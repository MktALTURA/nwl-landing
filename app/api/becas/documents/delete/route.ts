import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { errorResponse, guardErrorResponse, guardJson } from '@/lib/becas/guard';
import { guardFields } from '@/lib/becas/schemas';
import { BecasApiError, deleteDocument } from '@/lib/becas/worker-client';

const schema = z.object({
  ...guardFields,
  token: z.string().min(8).max(64),
  docId: z.string().min(4).max(64),
});

/** A family removed an uploaded document before submitting; unlink it on the worker too. */
export async function POST(req: NextRequest) {
  let body;
  try {
    body = await guardJson(req, schema, { bucket: 'documents', max: 30 });
  } catch (err) {
    return guardErrorResponse(err) ?? errorResponse(500, 'upstream');
  }
  try {
    await deleteDocument(body.data.token, body.data.docId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof BecasApiError) return errorResponse(err.status >= 500 ? 502 : err.status, err.code, err.detail);
    return errorResponse(502, 'upstream');
  }
}
