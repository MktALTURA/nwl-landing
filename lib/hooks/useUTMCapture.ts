'use client';

import { useEffect } from 'react';
import { captureUTMs } from '@/lib/utm';

/**
 * Capture UTMs from the current URL on mount.
 * Use in a top-level layout component so every page visit is tracked.
 */
export function useUTMCapture(): void {
  useEffect(() => {
    captureUTMs();
  }, []);
}
