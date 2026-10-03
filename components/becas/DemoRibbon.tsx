'use client';

import { useBecas } from './BecasProvider';

/** Visible on fixture data and demo routes so nobody mistakes illustrative prices for real ones. */
export default function DemoRibbon() {
  const { copy } = useBecas();
  return (
    <div className="fixed top-0 inset-x-0 z-[60] pointer-events-none flex justify-center">
      <span className="mt-1 rounded-b-md bg-wattle text-[#1C0F00] font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 shadow-navy-sm">
        {copy.demoRibbon}
      </span>
    </div>
  );
}
