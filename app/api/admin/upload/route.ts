import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';
import { getSession, canEditBeneficios } from '@/lib/auth';
import { slugify } from '@/lib/validations/beneficios';

/** Logos are small; flyers are the big ones. Both are pre-compressed in the browser. */
const LIMITS = { logo: 2 * 1024 * 1024, promo: 4 * 1024 * 1024 } as const;

/**
 * Magic-byte signatures. `file.type` is client-controlled, so it can't be
 * trusted to decide what we store.
 *
 * SVG is rejected: the browser-side canvas step can't process it, and it keeps
 * markup out of the upload path entirely. Existing committed .svg logos are
 * unaffected — they're served from /public.
 */
function sniff(bytes: Uint8Array): 'image/png' | 'image/jpeg' | 'image/webp' | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  const ascii = (i: number, s: string) =>
    s.split('').every((ch, k) => bytes[i + k] === ch.charCodeAt(0));
  if (ascii(0, 'RIFF') && ascii(8, 'WEBP')) return 'image/webp';
  return null;
}

const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' } as const;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!canEditBeneficios(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Falta configurar el almacenamiento de imágenes (BLOB_READ_WRITE_TOKEN).' },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const file = form.get('file');
  const kind = form.get('kind') === 'promo' ? 'promo' : 'logo';
  const nameHint = String(form.get('name') ?? 'imagen');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No se recibió ninguna imagen' }, { status: 400 });
  }
  if (file.size > LIMITS[kind]) {
    return NextResponse.json(
      { error: `La imagen pesa demasiado (máximo ${LIMITS[kind] / 1024 / 1024}MB)` },
      { status: 413 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = sniff(new Uint8Array(buffer.subarray(0, 12)));
  if (!contentType) {
    return NextResponse.json(
      { error: 'Formato no válido. Sube una imagen PNG, JPG o WebP.' },
      { status: 415 }
    );
  }

  // addRandomSuffix: Blob serves its own long cache TTL, so reusing a fixed
  // pathname would leave a replaced logo stuck in browsers. A fresh URL per
  // upload sidesteps the whole stale-image class of bug.
  const pathname = `beneficios/${kind}/${slugify(nameHint) || 'imagen'}.${EXT[contentType]}`;

  try {
    const blob = await put(pathname, buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType,
    });
    return NextResponse.json({ url: blob.url, size: file.size, contentType }, { status: 201 });
  } catch (err) {
    console.error('[beneficios] upload failed', err);
    return NextResponse.json({ error: 'No se pudo subir la imagen' }, { status: 500 });
  }
}
