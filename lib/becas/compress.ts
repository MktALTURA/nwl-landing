/**
 * Client-side preparation of a document before upload.
 *
 * Photos of a boleta from a phone are 4–12 MB; re-encoding to JPEG at a sane
 * size makes them ~0.5–1.5 MB without losing legibility. PDFs pass through.
 * JPEG, not WebP: Safari has historically ignored `image/webp` in
 * canvas.toBlob and returned PNG, which can be larger than the original.
 */
export const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export interface PreparedFile {
  blob: Blob;
  filename: string;
  contentType: 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/webp' | 'image/heic';
}

const MAX_EDGE = 2000;
const QUALITY = 0.82;
const RETRY_EDGE = 1600;
const RETRY_QUALITY = 0.65;
const TARGET = 1.5 * 1024 * 1024;

function sniff(buf: ArrayBuffer): PreparedFile['contentType'] | null {
  const b = new Uint8Array(buf.slice(0, 12));
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return 'application/pdf';
  if (b[0] === 0xff && b[1] === 0xd8) return 'image/jpeg';
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45) return 'image/webp';
  // HEIC/HEIF: "ftyp" box at offset 4 AND an image brand at offset 8. Any
  // other ISO-BMFF file (MP4/MOV video, AVIF) is rejected here.
  if (b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) {
    const brand = String.fromCharCode(b[8], b[9], b[10], b[11]);
    if (['heic', 'heix', 'hevc', 'hevx', 'heif', 'mif1', 'msf1'].includes(brand)) return 'image/heic';
  }
  return null;
}

async function encode(bitmap: ImageBitmap, maxEdge: number, quality: number): Promise<Blob | null> {
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0, w, h);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

export async function prepareFile(file: File): Promise<PreparedFile | { error: 'bad_type' | 'too_large' }> {
  const head = await file.slice(0, 16).arrayBuffer();
  const type = sniff(head) ?? (ACCEPTED_TYPES.includes(file.type) ? (file.type as PreparedFile['contentType']) : null);
  if (!type) return { error: 'bad_type' };

  if (type === 'application/pdf') {
    if (file.size > 10 * 1024 * 1024) return { error: 'too_large' };
    return { blob: file, filename: file.name, contentType: 'application/pdf' };
  }

  // Images: try to re-encode. HEIC can't be decoded by canvas on most
  // browsers; iOS Safari hands us JPEG already when accept lists it. If
  // decoding fails, send the original as long as it is within the limit.
  try {
    const bitmap = await createImageBitmap(file);
    let blob = await encode(bitmap, MAX_EDGE, QUALITY);
    if (blob && blob.size > TARGET) blob = (await encode(bitmap, RETRY_EDGE, RETRY_QUALITY)) ?? blob;
    bitmap.close();
    if (blob) {
      const base = file.name.replace(/\.[^.]+$/, '') || 'documento';
      return { blob, filename: `${base}.jpg`, contentType: 'image/jpeg' };
    }
  } catch {
    /* fall through */
  }
  if (file.size > 10 * 1024 * 1024) return { error: 'too_large' };
  return { blob: file, filename: file.name, contentType: type === 'image/heic' ? 'image/heic' : type };
}
