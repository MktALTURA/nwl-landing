import { NextResponse, type NextRequest } from 'next/server';
import { isMockMode } from '@/lib/becas/worker-client';

/** Sink for document PUTs in mock mode only. Reads and discards the body. */
export async function PUT(req: NextRequest) {
  if (!isMockMode()) return NextResponse.json({ error: 'no_encontrada' }, { status: 404 });
  const buf = await req.arrayBuffer();
  return NextResponse.json({ docId: `mockdoc-${Date.now().toString(36)}`, status: 'uploaded', size: buf.byteLength });
}
