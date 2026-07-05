'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

interface LanguageToggleProps {
  light?: boolean;
}

export default function LanguageToggle({ light = false }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center rounded-full p-0.5 text-xs font-medium ${
      light ? 'bg-white/10' : 'bg-navy/5'
    }`}>
      <button
        onClick={() => setLocale('en')}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          locale === 'en'
            ? 'bg-gold text-[#1C0F00]'
            : light
              ? 'text-white/60 hover:text-white'
              : 'text-n-500 hover:text-navy'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLocale('es')}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          locale === 'es'
            ? 'bg-gold text-[#1C0F00]'
            : light
              ? 'text-white/60 hover:text-white'
              : 'text-n-500 hover:text-navy'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
