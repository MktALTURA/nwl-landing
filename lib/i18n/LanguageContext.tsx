'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { en } from './en';
import { es } from './es';
import type { Dictionary, Locale } from './types';

const dictionaries: Record<Locale, Dictionary> = { en, es };

interface LanguageContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: en,
  setLocale: () => {},
  isReady: false,
});

export function LanguageProvider({
  children,
  initialLocale = 'en',
}: {
  children: ReactNode;
  /**
   * Locale the server renders with. Defaults to 'en' (site-wide behaviour).
   * Routes aimed at Spanish-speaking ad traffic (e.g. /becas) pass 'es' so
   * the first paint is already Spanish; a saved preference still wins after
   * mount, exactly as everywhere else.
   */
  initialLocale?: Locale;
}) {
  // Start with the server locale to match the server-rendered HTML
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isReady, setIsReady] = useState(false);

  // Hydrate saved preference after mount (avoids hydration mismatch)
  useEffect(() => {
    const saved = localStorage.getItem('nwl-lang');
    if (saved === 'en' || saved === 'es') {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
    setIsReady(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('nwl-lang', newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
