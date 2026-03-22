'use client';

import { useUTMCapture } from '@/lib/hooks/useUTMCapture';

/** Invisible client component that captures UTMs on every page visit. */
export default function UTMCapture() {
  useUTMCapture();
  return null;
}
