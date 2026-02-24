'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import { brochures, brochureLevels, type BrochureLevel } from '@/lib/brochures';
import { use } from 'react';

// Display names per locale
const levelLabels: Record<BrochureLevel, Record<string, string>> = {
  'maternal-kinder': { en: 'Maternal & Kinder', es: 'Maternal y Kínder' },
  elementary: { en: 'Elementary', es: 'Primaria' },
  'middle-school': { en: 'Middle School', es: 'Secundaria' },
  'high-school': { en: 'High School', es: 'Preparatoria' },
};

function BrochureContent({ level }: { level: string }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') === 'es' ? 'es' : 'en';

  // Validate level
  if (!brochureLevels.includes(level as BrochureLevel)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal text-white">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Brochure not found</h1>
          <a href="/" className="text-mustard hover:underline">
            ← Back to NWL
          </a>
        </div>
      </div>
    );
  }

  const brochureLevel = level as BrochureLevel;
  const config = brochures[brochureLevel];
  const displayName = levelLabels[brochureLevel][lang];
  const heyzineUrl = config.heyzineUrl[lang];
  const pdfUrl = config.pdfDownloadUrl[lang];

  return (
    <div className="h-screen flex flex-col bg-charcoal overflow-hidden">
      {/* Compact header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-charcoal/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src="/images/brand/kangaroo-wine.png"
            alt="Newland School"
            width={32}
            height={32}
            className="h-8 w-auto shrink-0"
          />
          <div className="w-px h-6 bg-charcoal/10 shrink-0" />
          <div className="min-w-0">
            <h1 className="font-display text-base sm:text-lg font-bold text-charcoal truncate">
              {displayName}
            </h1>
            <p className="text-xs text-charcoal/50 hidden sm:block">
              {lang === 'es' ? 'Modelo Educativo — Colegio Newland' : 'Educational Model — Newland School'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Language toggle */}
          <a
            href={lang === 'en' ? `/brochures/${level}?lang=es` : `/brochures/${level}`}
            className="text-xs font-bold text-charcoal/50 hover:text-wine border border-charcoal/15 rounded px-2 py-1 transition-colors"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </a>
          {/* PDF download */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-wine hover:bg-wine/90 rounded-lg px-3 py-2 transition-colors"
          >
            <FiDownload size={14} />
            <span className="hidden sm:inline">
              {lang === 'es' ? 'Descargar PDF' : 'Download PDF'}
            </span>
          </a>
        </div>
      </header>

      {/* Flip-book iframe — takes remaining space */}
      <div className="flex-1">
        <iframe
          src={heyzineUrl}
          title={`${displayName} brochure`}
          className="w-full h-full border-0"
          allow="fullscreen; clipboard-write"
          scrolling="no"
        />
      </div>
    </div>
  );
}

export default function BrochurePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-charcoal">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <BrochureContent level={level} />
    </Suspense>
  );
}
