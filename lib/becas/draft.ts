/**
 * Application draft persistence (localStorage). Families fill this on a
 * phone, get interrupted, come back: everything but the file bytes survives
 * a reload for 14 days. Uploads keep their worker docId so they are not
 * re-sent. After submit the draft shrinks to the token so the page can show
 * "ya enviaste" with a link to the status page.
 */
const KEY = 'nwl_becas_draft_v1';
const TTL_MS = 14 * 86_400_000;

export interface DraftEnvelope<T> {
  v: 1;
  savedAt: number;
  data: T;
}

export function loadDraft<T>(): T | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const env = JSON.parse(raw) as DraftEnvelope<T>;
    if (env.v !== 1 || Date.now() - env.savedAt > TTL_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return env.data;
  } catch {
    return null;
  }
}

export function saveDraft<T>(data: T): void {
  try {
    const env: DraftEnvelope<T> = { v: 1, savedAt: Date.now(), data };
    localStorage.setItem(KEY, JSON.stringify(env));
  } catch {
    /* quota or private mode */
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
