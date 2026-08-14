'use client';

import { useRef, useState } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';

/**
 * Pick an image, shrink it in the browser, upload it, hand back the URL.
 *
 * The downscale is the point: partners send 600KB WhatsApp flyers, and putting
 * those on the page straight through would hurt load time on a marketing page.
 * Resizing to a sane edge and re-encoding as WebP typically lands under 150KB
 * without any visible loss at the sizes the card actually renders.
 */
const MAX_EDGE = { logo: 800, promo: 1600 } as const;

async function compress(file: File, kind: 'logo' | 'promo'): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const maxEdge = MAX_EDGE[kind];
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/webp', 0.85)
  );
  // If WebP encoding isn't available, send the original and let the server sniff it.
  return blob ?? file;
}

interface ImageUploadFieldProps {
  label: string;
  help: string;
  kind: 'logo' | 'promo';
  /** Used to name the uploaded file so the blob is recognizable later. */
  nameHint: string;
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUploadField({
  label,
  help,
  kind,
  nameHint,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setError('');
    setBusy(true);
    try {
      const body = new FormData();
      body.append('file', await compress(file, kind), file.name.replace(/\.\w+$/, '.webp'));
      body.append('kind', kind);
      body.append('name', nameHint || 'imagen');

      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'No se pudo subir la imagen');
      } else {
        onChange(data.url);
      }
    } catch {
      setError('No se pudo procesar la imagen');
    }
    setBusy(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80">{label}</label>
      <p className="text-xs text-charcoal/50 mt-0.5 mb-2">{help}</p>

      {value ? (
        <div className="flex items-center gap-3">
          <div className="h-20 w-32 rounded-lg ring-1 ring-gray-200 bg-white flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="max-h-16 max-w-[90%] object-contain" />
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700"
          >
            <FiX size={14} /> Quitar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="w-full flex flex-col items-center justify-center gap-2 py-6 border-2 border-dashed border-gray-300 rounded-xl text-charcoal/50 hover:border-wine hover:text-wine transition-colors disabled:opacity-60"
        >
          <FiUploadCloud size={22} />
          <span className="text-sm">{busy ? 'Subiendo…' : 'Haz clic para subir una imagen'}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
