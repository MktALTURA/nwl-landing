'use client';

/**
 * Browser-side calls to the site's own becas API. Every POST carries the
 * form token from /api/becas/live and the empty honeypot. Errors are
 * normalised to `{ code }` so the UI maps them to copy.
 */

export type ApiErrorCode =
  | 'validation'
  | 'bot'
  | 'rate_limited'
  | 'too_large'
  | 'bad_json'
  | 'bad_type'
  | 'duplicate'
  | 'closed'
  | 'no_cupo'
  | 'network'
  | 'upstream'
  | string;

export class ApiError extends Error {
  constructor(public readonly code: ApiErrorCode, public readonly status: number, public readonly fields?: Record<string, string>) {
    super(code);
  }
}

let formToken: string | null = null;
let formTokenAt = 0;
const TOKEN_MIN_AGE_MS = 4_500; // server requires >= 4 s

/** The page's live-counter fetch hands its token here so no extra round trip is needed. */
export function setFormToken(ft: string) {
  formToken = ft;
  formTokenAt = Date.now();
}

export async function getFormToken(force = false): Promise<string> {
  if (force || !formToken || Date.now() - formTokenAt > 5 * 60 * 60_000) {
    const res = await fetch('/api/becas/live', { cache: 'no-store' });
    if (!res.ok) throw new ApiError('upstream', res.status);
    const data = (await res.json()) as { ft?: string };
    if (!data.ft) throw new ApiError('upstream', 500);
    setFormToken(data.ft);
  }
  // The server rejects tokens younger than a few seconds (bots submit
  // instantly). A human reaching this point has been on the page far longer;
  // this only matters right after a forced refresh.
  const age = Date.now() - formTokenAt;
  if (age < TOKEN_MIN_AGE_MS) await new Promise((r) => setTimeout(r, TOKEN_MIN_AGE_MS - age));
  return formToken as string;
}

/** Mapped worker codes → UI codes. */
function mapCode(code: string): ApiErrorCode {
  switch (code) {
    case 'programa_cerrado':
      return 'closed';
    case 'estado_invalido':
      return 'duplicate';
    case 'archivo_grande':
      return 'too_large';
    case 'tipo_no_permitido':
      return 'bad_type';
    case 'limite':
      return 'rate_limited';
    case 'validacion':
      return 'validation';
    default:
      return code;
  }
}

async function post<T>(path: string, body: Record<string, unknown>, retries = 1): Promise<T> {
  const ft = await getFormToken();
  let res: Response;
  try {
    res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ website: '', ...body, ft }),
    });
  } catch {
    if (retries > 0) return post<T>(path, body, retries - 1);
    throw new ApiError('network', 0);
  }
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; fields?: Record<string, string> } & T;
  if (!res.ok || data.ok === false) {
    // A stale form token comes back as 'bot'; refresh once and retry.
    if (res.status === 403 && data.code === 'bot' && retries > 0) {
      await getFormToken(true);
      return post<T>(path, body, retries - 1);
    }
    if (res.status >= 500 && retries > 0) return post<T>(path, body, retries - 1);
    throw new ApiError(mapCode(data.code ?? 'upstream'), res.status, data.fields);
  }
  return data;
}

export interface StartResult {
  token: string;
  contactRecognized: boolean;
  prefill: { padre: { nombre: string; apellidos: string; email: string; telefono: string } } | null;
}

export const becasApi = {
  start: (body: Record<string, unknown>) => post<StartResult>('/api/becas/start', body),
  documentTicket: (body: Record<string, unknown>) =>
    post<{ docId: string; uploadUrl: string; method: 'PUT'; headers: Record<string, string>; maxBytes: number }>('/api/becas/documents', body),
  submit: (body: Record<string, unknown>) => post<{ folio: string; token: string; statusUrl: string }>('/api/becas/submit', body),
  deleteDocument: (body: Record<string, unknown>) => post<{ ok: true }>('/api/becas/documents/delete', body),
};

/** PUT the bytes to the worker ticket URL with progress. */
export function uploadToTicket(
  url: string,
  headers: Record<string, string>,
  blob: Blob,
  onProgress: (fraction: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new ApiError(xhr.status === 413 ? 'too_large' : xhr.status === 415 ? 'bad_type' : 'upstream', xhr.status));
    };
    xhr.onerror = () => reject(new ApiError('network', 0));
    xhr.send(blob);
  });
}
