import { NextRequest, NextResponse } from 'next/server';
import { getSession, canEditBeneficios } from '@/lib/auth';
import { getPartnerIds, reorderPartners } from '@/lib/db/beneficios';
import { reorderSchema } from '@/lib/validations/beneficios';
import { revalidateBeneficios } from '@/lib/beneficios/revalidate';

/**
 * Replace the display order. The client sends the whole ordered id list.
 *
 * If the set of ids doesn't match what's stored, someone added or deleted a
 * partner while this list was on screen — 409 instead of writing an order that
 * would drop or resurrect a card.
 */
export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const parsed = reorderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Lista inválida' }, { status: 400 });
  }

  const current = await getPartnerIds();
  const submitted = parsed.data.ids;
  const same =
    current.length === submitted.length &&
    new Set(current).size === new Set(submitted).size &&
    current.every((id) => submitted.includes(id));

  if (!same) {
    return NextResponse.json(
      { error: 'La lista cambió mientras ordenabas. Recarga la página e intenta de nuevo.' },
      { status: 409 }
    );
  }

  await reorderPartners(submitted);
  revalidateBeneficios();
  return NextResponse.json({ success: true });
}
