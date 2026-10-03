import { createHash, createHmac } from 'crypto';
import type {
  BecasCatalog,
  BecasDocumentRequest,
  BecasDocumentTicket,
  BecasErrorBody,
  BecasErrorCode,
  BecasStartRequest,
  BecasStartResponse,
  BecasStatusResponse,
  BecasSubmitRequest,
  BecasSubmitResponse,
  BecasVariant,
  BecasVerifyResponse,
} from './contract';
import { fixtureCatalog, fixtureStatus, fixtureVerify } from './fixtures';

/* ------------------------------------------------------------------ */
/*  Server-to-server client for the becas API on the ALTURA worker.    */
/*                                                                     */
/*  Every request is HMAC-signed (see contract.ts). The browser never  */
/*  talks to the worker directly except for the document PUT, which   */
/*  uses a single-use ticket the worker minted.                        */
/*                                                                     */
/*  Mock mode: when BECAS_API_URL is unset (or BECAS_MOCK=1) the       */
/*  fixtures answer instead, so the page works before the worker       */
/*  exists and on preview deployments without credentials. Mock is    */
/*  refused in production once the page is public — a silent fixture  */
/*  on the live site would show made-up prices.                       */
/* ------------------------------------------------------------------ */

const BASE_URL = (process.env.BECAS_API_URL || '').replace(/\/$/, '');
const SECRET = process.env.BECAS_API_SECRET || '';
const TIMEOUT_MS = 8000;

export class BecasApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: BecasErrorCode | 'upstream' | 'timeout',
    public readonly detail: string,
    public readonly fields?: Record<string, string>,
  ) {
    super(`${code}: ${detail}`);
  }
}

export function isMockMode(): boolean {
  if (process.env.BECAS_MOCK === '1') return true;
  if (!BASE_URL || !SECRET) {
    const live = process.env.VERCEL_ENV === 'production' && process.env.NEXT_PUBLIC_BECAS_PUBLIC === 'true';
    // Production + public + no credentials: fail loudly rather than show fixtures.
    if (live) throw new BecasApiError(503, 'becas_no_configurado', 'BECAS_API_URL/SECRET no configurados');
    return true;
  }
  return false;
}

/** Variant the mock catalog uses. The worker decides this in real mode. */
export function mockVariant(): BecasVariant {
  return process.env.BECAS_MOCK_VARIANT === 'precios' ? 'precios' : 'ahorro';
}

function sign(method: string, pathWithSearch: string, body: string): { ts: string; sig: string } {
  const ts = String(Date.now());
  const bodyHash = createHash('sha256').update(body, 'utf8').digest('hex');
  const canonical = `${ts}.${method.toUpperCase()}.${pathWithSearch}.${bodyHash}`;
  const sig = createHmac('sha256', SECRET).update(canonical, 'utf8').digest('hex');
  return { ts, sig };
}

async function call<T>(method: 'GET' | 'POST' | 'DELETE', path: string, payload?: unknown): Promise<T> {
  const body = payload === undefined ? '' : JSON.stringify(payload);
  // The canonical string carries the FULL pathname (+search) as the worker
  // sees it, not the path relative to BASE_URL.
  const target = new URL(`${BASE_URL}${path}`);
  const { ts, sig } = sign(method, `${target.pathname}${target.search}`, body);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(target.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Becas-Timestamp': ts,
        'X-Becas-Signature': sig,
      },
      body: body || undefined,
      signal: controller.signal,
      cache: 'no-store',
    });
  } catch (err) {
    const aborted = (err as Error)?.name === 'AbortError';
    throw new BecasApiError(504, aborted ? 'timeout' : 'upstream', aborted ? 'El servicio tardó demasiado' : String(err));
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON upstream error */
  }

  if (!res.ok) {
    const e = (json ?? {}) as Partial<BecasErrorBody>;
    throw new BecasApiError(res.status, e.error ?? 'upstream', e.detail ?? `HTTP ${res.status}`, e.fields);
  }
  return json as T;
}

/* ───────────────────────────── public API ───────────────────────────── */

export async function fetchCatalog(): Promise<BecasCatalog> {
  if (isMockMode()) return fixtureCatalog(mockVariant());
  return call<BecasCatalog>('GET', '/catalog');
}

export async function startApplication(req: BecasStartRequest): Promise<BecasStartResponse> {
  if (isMockMode()) {
    return {
      token: `mock-${req.idempotencyKey.slice(0, 8)}`,
      status: 'iniciada',
      contactId: null,
      contactRecognized: false,
    };
  }
  return call<BecasStartResponse>('POST', '/applications', req);
}

export async function requestDocumentTicket(token: string, req: BecasDocumentRequest): Promise<BecasDocumentTicket> {
  if (isMockMode()) {
    return {
      docId: `mockdoc-${Math.random().toString(36).slice(2, 10)}`,
      uploadUrl: '/api/becas/mock-upload',
      method: 'PUT',
      headers: { 'Content-Type': req.contentType },
      expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
      maxBytes: 10 * 1024 * 1024,
    };
  }
  return call<BecasDocumentTicket>('POST', `/applications/${encodeURIComponent(token)}/documents`, req);
}

export async function deleteDocument(token: string, docId: string): Promise<void> {
  if (isMockMode()) return;
  await call<{ ok: true }>('DELETE', `/applications/${encodeURIComponent(token)}/documents/${encodeURIComponent(docId)}`);
}

export async function submitApplication(token: string, req: BecasSubmitRequest): Promise<BecasSubmitResponse> {
  if (isMockMode()) {
    return {
      token,
      folio: 'BECA-JUR-27-000042',
      status: 'en_revision',
      statusUrl: `/becas/solicitud/mock-pending`,
    };
  }
  return call<BecasSubmitResponse>('POST', `/applications/${encodeURIComponent(token)}/submit`, req);
}

export async function fetchStatus(token: string): Promise<BecasStatusResponse | null> {
  if (isMockMode()) return fixtureStatus(token);
  try {
    return await call<BecasStatusResponse>('GET', `/status/${encodeURIComponent(token)}`);
  } catch (err) {
    if (err instanceof BecasApiError && err.status === 404) return null;
    throw err;
  }
}

export async function fetchVerify(folio: string, code: string): Promise<BecasVerifyResponse | null> {
  if (isMockMode()) return fixtureVerify(folio);
  try {
    return await call<BecasVerifyResponse>('GET', `/verify/${encodeURIComponent(folio)}?c=${encodeURIComponent(code)}`);
  } catch (err) {
    if (err instanceof BecasApiError && err.status === 404) return null;
    throw err;
  }
}
