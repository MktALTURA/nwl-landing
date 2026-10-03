'use client';

import { useEffect } from 'react';
import { fireMetaEvent } from '@/lib/meta-pixel';
import { useBecas } from './BecasProvider';

/**
 * Mount-time events for /becas. `becas_view` (GA4) and a Meta ViewContent.
 * The path is NOT added to MetaTracking's VIEW_CONTENT_PATHS on purpose: that
 * prefix match would also fire on the status and verify pages.
 */
export default function BecasTracking() {
  const { catalog, track } = useBecas();
  useEffect(() => {
    if (window.location.pathname !== '/becas') return;
    // Read the referral code here rather than from the provider: child
    // effects run before the parent's, so the provider's value is still null.
    let refPresent = false;
    try {
      refPresent = Boolean(new URLSearchParams(window.location.search).get('ref') || localStorage.getItem('nwl_becas_ref'));
    } catch {
      /* storage unavailable */
    }
    track('becas_view', { cupos_shown: catalog?.cuposTotal !== null && catalog?.cuposTotal !== undefined, ref_present: refPresent });
    fireMetaEvent('ViewContent', { content_path: '/becas', content_name: 'becas' });
    // once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
