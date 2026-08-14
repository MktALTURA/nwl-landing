import { NextRequest, NextResponse } from 'next/server';
import { getSession, isAdmin } from '@/lib/auth';
import { seedBeneficios } from '@/lib/db/beneficios';
import { revalidateBeneficios } from '@/lib/beneficios/revalidate';

/**
 * Copy the committed catalog (lib/beneficios-data.ts) into Redis.
 *
 * Explicit and admin-only rather than lazy-on-read: a prerendered page must
 * never perform writes, and seeding on read would resurrect a catalog someone
 * emptied on purpose. `?force=1` re-seeds — the "reset to the file" button.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const force = request.nextUrl.searchParams.get('force') === '1';

  try {
    const result = await seedBeneficios(force);
    if (result.seeded) revalidateBeneficios();
    return NextResponse.json(
      result.seeded
        ? { success: true, count: result.count }
        : { success: false, message: 'El catálogo ya estaba cargado. Usa ?force=1 para reemplazarlo.' }
    );
  } catch (err) {
    console.error('[beneficios] seed failed', err);
    return NextResponse.json({ error: 'No se pudo cargar el catálogo' }, { status: 500 });
  }
}
