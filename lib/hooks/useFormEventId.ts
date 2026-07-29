'use client';

import { useRef } from 'react';
import { newEventId } from '@/lib/meta-pixel';

/**
 * One stable Meta `event_id` per mounted form.
 *
 * Minted BEFORE the iframe is built so the same value can be (a) appended to
 * the GHL form src as `event_id`, and (b) used as the `eventID` on the
 * browser-side `Lead`. GHL echoes it on its server-side Lead, and Meta
 * collapses the two into one event.
 *
 * Never rendered into markup, so the server/client value difference is inert.
 */
export function useFormEventId(): string {
  const ref = useRef<string | null>(null);
  if (ref.current === null) ref.current = newEventId();
  return ref.current;
}
