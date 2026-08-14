import { NextRequest, NextResponse } from 'next/server';
import { getSession, canEditBeneficios } from '@/lib/auth';
import { getPartner, updatePartner, deletePartner, getIdBySlug, loadCatalog } from '@/lib/db/beneficios';
import { partnerSchema } from '@/lib/validations/beneficios';
import { revalidateBeneficios } from '@/lib/beneficios/revalidate';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const partner = await getPartner(id);
  if (!partner) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(partner);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;

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

  // Renaming into a slug another partner already owns would break both cards.
  const owner = await getIdBySlug(parsed.data.slug);
  if (owner && owner !== id) {
    return NextResponse.json(
      { error: 'Ya existe otro aliado con ese nombre.' },
      { status: 409 }
    );
  }

  const { categories } = await loadCatalog();
  if (!categories.some((c) => c.key === parsed.data.categoryKey)) {
    return NextResponse.json({ error: 'Esa categoría no existe' }, { status: 400 });
  }

  const updated = await updatePartner(id, parsed.data);
  if (!updated) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  revalidateBeneficios();
  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;

  const deleted = await deletePartner(id);
  if (!deleted) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  // Uploaded images are deliberately left in Blob: a cached render may still
  // reference them, and a 404'd logo on the live site costs more than the KBs.
  revalidateBeneficios();
  return NextResponse.json({ success: true });
}
