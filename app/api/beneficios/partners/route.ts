import { NextRequest, NextResponse } from 'next/server';
import { getSession, canEditBeneficios } from '@/lib/auth';
import { loadCatalog, createPartner, getIdBySlug } from '@/lib/db/beneficios';
import { partnerSchema } from '@/lib/validations/beneficios';
import { revalidateBeneficios } from '@/lib/beneficios/revalidate';

/** Admin list. Uses the uncached read so the editor never sees stale rows. */
export async function GET() {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { partners, categories, source } = await loadCatalog();
  return NextResponse.json({ partners, categories, source });
}

export async function POST(request: NextRequest) {
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

  const parsed = partnerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Revisa los campos marcados', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // The slug is the card's identity — two partners can't share one.
  const taken = await getIdBySlug(parsed.data.slug);
  if (taken) {
    return NextResponse.json(
      { error: 'Ya existe un aliado con ese nombre. Cambia el nombre o el identificador.' },
      { status: 409 }
    );
  }

  // A category that doesn't exist would silently render the wrong color.
  const { categories } = await loadCatalog();
  if (!categories.some((c) => c.key === parsed.data.categoryKey)) {
    return NextResponse.json({ error: 'Esa categoría no existe' }, { status: 400 });
  }

  const partner = await createPartner(parsed.data);
  revalidateBeneficios();
  return NextResponse.json(partner, { status: 201 });
}
