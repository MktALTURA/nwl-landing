'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ivory to-sand relative overflow-hidden">
      {/* Faded kangaroo background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/images/brand/kangaroo-wine.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="text-center relative z-10 px-6 max-w-lg">
        {/* Dizzy kangaroo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src="/images/brand/kangaroo-wine.png"
              alt="Confused kangaroo"
              width={100}
              height={100}
              className="h-24 w-auto animate-[wiggle_1s_ease-in-out_infinite] opacity-80"
            />
            {/* Speech bubble */}
            <div className="absolute -top-8 -right-16 bg-white rounded-2xl rounded-bl-none px-3 py-1.5 shadow-md border border-warmgray">
              <span className="text-xs font-medium text-charcoal whitespace-nowrap">
                Hmm...
              </span>
            </div>
          </div>
        </div>

        {/* Wine divider */}
        <div className="w-12 h-[2px] bg-wine mx-auto mb-6" />

        {/* Messages */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-3">
          Something went wrong
        </h1>
        <p className="text-charcoal/60 text-base sm:text-lg mb-2">
          Don&apos;t worry, it&apos;s not you — we&apos;re on it.
        </p>
        <p className="text-charcoal/50 text-base sm:text-lg mb-10">
          No te preocupes, no eres t&uacute; — ya estamos en ello.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.28a.75.75 0 00-.75.75v3.955a.75.75 0 001.5 0v-2.134l.246.245A7 7 0 0016.732 11a.75.75 0 00-1.42-.576zM4.688 8.576a5.5 5.5 0 019.201-2.466l.312.311h-2.433a.75.75 0 000 1.5H15.72a.75.75 0 00.75-.75V3.216a.75.75 0 00-1.5 0v2.134l-.246-.245A7 7 0 003.268 9a.75.75 0 001.42.576z"
                clipRule="evenodd"
              />
            </svg>
            Try Again
          </button>
          <a
            href="/"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
