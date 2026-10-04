'use client';

import { useRef } from 'react';
import { FiUploadCloud, FiFileText, FiX, FiRefreshCw, FiCheck } from 'react-icons/fi';
import type { BecaDocKind } from '@/lib/becas/contract';
import type { UploadItem } from './state';

/**
 * Picker + list for one document kind. The heavy lifting (compress, ticket,
 * PUT) lives in the container so the state survives step changes.
 * `accept` lists image/* and PDF; no `capture`, so iOS offers camera and
 * library and hands over JPEG for HEIC photos.
 */
export default function FileDrop({
  kind,
  title,
  hint,
  buttonLabel,
  items,
  max,
  onPick,
  onRemove,
  onRetry,
  stateLabels,
  removeLabel,
  retryLabel,
  error,
}: {
  kind: BecaDocKind;
  title: string;
  hint: string;
  buttonLabel: string;
  items: UploadItem[];
  max: number;
  onPick: (files: FileList) => void;
  onRemove: (localId: string) => void;
  onRetry: (localId: string) => void;
  stateLabels: Record<UploadItem['status'], string>;
  removeLabel: string;
  retryLabel: string;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canAdd = items.filter((u) => u.status !== 'error').length < max;

  return (
    <div className={`rounded-2xl border-2 border-dashed p-5 ${error ? 'border-[#77011B]/50 bg-[#77011B]/[0.03]' : 'border-n-300 bg-n-50'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-navy">{title}</div>
          <div className="text-sm text-n-500 mt-0.5">{hint}</div>
        </div>
        <FiUploadCloud className="text-gold shrink-0" size={22} />
      </div>

      {items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {items.map((u) => (
            <li key={u.localId} className="flex items-center gap-3 rounded-xl bg-white border border-n-200 px-3 py-2.5">
              <FiFileText className="text-n-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-navy">{u.name}</div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-n-500">
                  <span>{u.sizeKb} KB</span>
                  <span>·</span>
                  <span className={u.status === 'error' ? 'text-[#77011B]' : u.status === 'done' ? 'text-[#2E7D52]' : ''}>{stateLabels[u.status]}</span>
                </div>
                {(u.status === 'uploading' || u.status === 'compressing') && (
                  <div className="mt-1.5 h-1 rounded-full bg-n-200 overflow-hidden">
                    <div className="h-full bg-gold transition-[width] duration-200" style={{ width: `${Math.round(u.progress * 100)}%` }} />
                  </div>
                )}
              </div>
              {u.status === 'done' && <FiCheck className="text-[#2E7D52] shrink-0" />}
              {u.status === 'error' && (
                <button type="button" onClick={() => onRetry(u.localId)} className="text-gold-600 hover:text-gold text-sm inline-flex items-center gap-1" aria-label={retryLabel}>
                  <FiRefreshCw /> {retryLabel}
                </button>
              )}
              <button type="button" onClick={() => onRemove(u.localId)} className="text-n-400 hover:text-navy p-1" aria-label={removeLabel}>
                <FiX />
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
        multiple={max > 1}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files && e.target.files.length) onPick(e.target.files);
          e.target.value = '';
        }}
        data-kind={kind}
      />
      {canAdd && (
        <button type="button" onClick={() => inputRef.current?.click()} className="btn-secondary mt-4 text-sm inline-flex items-center gap-2">
          <FiUploadCloud /> {buttonLabel}
        </button>
      )}
      {error && (
        <p className="mt-3 text-sm text-[#77011B]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
