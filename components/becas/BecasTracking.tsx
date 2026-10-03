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
  const { catalog, track, ref } = useBecas();
  useEffect(() => {
    if (window.location.pathname !== '/becas') return;
    track('becas_view', { cupos_shown: catalog?.cuposTotal !== null && catalog?.cuposTotal !== undefined, ref_present: Boolean(ref) });
    fireMetaEvent('ViewContent', { content_path: '/becas', content_name: 'becas' });
    // once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
