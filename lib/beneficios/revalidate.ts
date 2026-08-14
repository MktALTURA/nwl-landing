import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Flush the public /beneficios page after an admin write.
 *
 * Both calls, deliberately: the tag drops the cached Redis read (Data Cache),
 * the path drops the rendered page (Full Route Cache). Skipping either can
 * leave Marlene staring at an unchanged page after saving — the exact failure
 * that makes a non-technical admin save five more times.
 *
 * Never imported from lib/db/beneficios.ts: `next/cache` must not get pulled
 * into anything a client component might reach.
 */
export function revalidateBeneficios() {
  try {
    revalidateTag('beneficios');
    revalidatePath('/beneficios');
  } catch (err) {
    // A failed revalidation must not fail the write — the 1h TTL heals it.
    console.error('[beneficios] revalidation failed', err);
  }
}
