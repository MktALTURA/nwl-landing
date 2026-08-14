import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, canEditBeneficios } from '@/lib/auth';
import { getCategories, saveCategories, loadCatalog } from '@/lib/db/beneficios';
import { categorySchema } from '@/lib/validations/beneficios';
import { revalidateBeneficios } from '@/lib/beneficios/revalidate';

/**
 * Categories are read and written as one ordered list — nine records, edited
 * rarely, and the array order *is* the filter-chip order.
 */
export async function GET() {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(await getCategories());
}

const payloadSchema = z.object({ categories: z.array(categorySchema).min(1) });

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

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Revisa las categorías', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const next = parsed.data.categories;

  const keys = next.map((c) => c.key);
  if (new Set(keys).size !== keys.length) {
    return NextResponse.json({ error: 'Hay dos categorías con el mismo identificador' }, { status: 400 });
  }

  // Removing a category that partners still use would leave those cards
  // showing a raw key with a fallback color — block it and say who's affected.
  const { partners } = await loadCatalog();
  const removed = (await getCategories()).filter((c) => !keys.includes(c.key));
  for (const cat of removed) {
    const users = partners.filter((p) => p.categoryKey === cat.key);
    if (users.length) {
      return NextResponse.json(
        {
          error: `No puedes borrar "${cat.label.es}": ${users.length} aliado(s) la usan (${users
            .map((p) => p.name)
            .slice(0, 3)
            .join(', ')}${users.length > 3 ? '…' : ''}). Cámbialos de categoría primero.`,
        },
        { status: 409 }
      );
    }
  }

  await saveCategories(next);
  revalidateBeneficios();
  return NextResponse.json({ success: true });
}
