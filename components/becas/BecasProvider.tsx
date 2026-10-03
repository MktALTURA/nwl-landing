'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import type { PublicCatalog, PublicCampus, PublicGrado } from '@/lib/becas/catalog';
import type { BecaCategoria, SiteCampusSlug } from '@/lib/becas/contract';
import { BECAS_COPY, type BecasCopy, type Locale } from '@/lib/becas/copy';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { sendGA4Event } from '@/lib/analytics';
import { setFormToken } from '@/lib/becas/client';

/* ------------------------------------------------------------------ */
/*  Page-wide state for /becas: the catalog (server-provided), the     */
/*  visitor's calculator choices, and the live counter refresh.        */
/*  The application stepper has its own reducer (BecasApplication) and */
/*  reads the calculator choices from here to prefill itself.          */
/* ------------------------------------------------------------------ */

export interface CalcState {
  campus?: SiteCampusSlug;
  ciclo?: string;
  grado?: string;
  referrals: number;
  /** Category chosen from the cards; the application preselects it. */
  categoria?: BecaCategoria;
}

type CalcAction =
  | { type: 'campus'; campus: SiteCampusSlug }
  | { type: 'ciclo'; ciclo: string }
  | { type: 'grado'; grado: string }
  | { type: 'referrals'; referrals: number }
  | { type: 'set'; calc: Partial<CalcState> };

function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case 'campus':
      return { ...state, campus: action.campus, grado: undefined };
    case 'ciclo':
      return { ...state, ciclo: action.ciclo };
    case 'grado':
      return { ...state, grado: action.grado };
    case 'referrals':
      return { ...state, referrals: action.referrals };
    case 'set':
      return { ...state, ...action.calc };
  }
}

export interface LiveCupos {
  cuposTotal: number | null;
  cupos: Record<string, number | null>;
  ft?: string;
}

interface BecasContextValue {
  catalog: PublicCatalog | null;
  copy: BecasCopy;
  locale: Locale;
  demo: boolean;
  calc: CalcState;
  setCampus: (campus: SiteCampusSlug) => void;
  setCiclo: (ciclo: string) => void;
  setGrado: (grado: string) => void;
  setReferrals: (n: number) => void;
  prefill: (calc: Partial<CalcState>) => void;
  /** Resolved selection, when complete. */
  selection: { campus: PublicCampus; ciclo: string; grado: PublicGrado } | null;
  live: LiveCupos | null;
  refreshLive: () => void;
  /** Smooth-scroll to a section id (works with ScrollSmoother). */
  scrollTo: (id: string) => void;
  track: (name: string, params?: Record<string, unknown>) => void;
  ref: string | null;
}

const BecasContext = createContext<BecasContextValue | null>(null);

export function useBecas(): BecasContextValue {
  const ctx = useContext(BecasContext);
  if (!ctx) throw new Error('useBecas must be used inside <BecasProvider>');
  return ctx;
}

export function BecasProvider({
  catalog,
  demo = false,
  children,
}: {
  catalog: PublicCatalog | null;
  demo?: boolean;
  children: ReactNode;
}) {
  const { locale } = useLanguage();
  const copy = BECAS_COPY[locale];

  const defaultCiclo = catalog?.ciclos.find((c) => c.tipo === 'siguiente')?.key ?? catalog?.ciclos[0]?.key;
  const [calc, dispatch] = useReducer(calcReducer, { referrals: 0, ciclo: defaultCiclo });

  const selection = useMemo(() => {
    if (!catalog || !calc.campus || !calc.ciclo || !calc.grado) return null;
    const campus = catalog.campuses.find((c) => c.slug === calc.campus);
    const grado = campus?.ciclos[calc.ciclo]?.grados.find((g) => g.key === calc.grado);
    if (!campus || !grado) return null;
    return { campus, ciclo: calc.ciclo, grado };
  }, [catalog, calc.campus, calc.ciclo, calc.grado]);

  /* ── live counter (refreshes the 60 s ISR figure on mount) ── */
  const [live, setLive] = useReducer((_: LiveCupos | null, next: LiveCupos | null) => next, null);
  const refreshLive = useCallback(() => {
    if (!catalog) return;
    fetch('/api/becas/live', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: LiveCupos | null) => {
        if (data && typeof data === 'object') {
          setLive(data);
          if (data.ft) setFormToken(data.ft);
        }
      })
      .catch(() => {});
  }, [catalog]);
  useEffect(() => {
    refreshLive();
  }, [refreshLive]);

  /* ── ?ref= capture (referral code, phase 1 stores it with the application) ── */
  const refRef = useRef<string | null>(null);
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('ref');
      if (fromUrl && /^[A-Za-z0-9-]{3,24}$/.test(fromUrl)) {
        refRef.current = fromUrl.toUpperCase();
        localStorage.setItem('nwl_becas_ref', refRef.current);
      } else {
        refRef.current = localStorage.getItem('nwl_becas_ref');
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const scrollTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // ScrollSmoother moves #smooth-content with a transform, so scrollIntoView
    // alone would land in the wrong place while it is active.
    import('gsap/ScrollSmoother')
      .then(({ ScrollSmoother }) => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          // scrollTo inherits the page's 2.5 s smoothing lag, which turns a
          // jump into a slow glide. Drop the lag for this one move.
          const prev = smoother.smooth();
          smoother.smooth(0.5);
          smoother.scrollTo(target, true, 'top 88px');
          window.setTimeout(() => smoother.smooth(prev), 900);
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      })
      .catch(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, []);

  const track = useCallback(
    (name: string, params: Record<string, unknown> = {}) => {
      sendGA4Event(name, { page_path: '/becas', calc_variant: catalog?.variant ?? 'none', ...params });
    },
    [catalog?.variant],
  );

  const value = useMemo<BecasContextValue>(
    () => ({
      catalog,
      copy,
      locale,
      demo,
      calc,
      setCampus: (campus) => dispatch({ type: 'campus', campus }),
      setCiclo: (ciclo) => dispatch({ type: 'ciclo', ciclo }),
      setGrado: (grado) => dispatch({ type: 'grado', grado }),
      setReferrals: (referrals) => dispatch({ type: 'referrals', referrals }),
      prefill: (c) => dispatch({ type: 'set', calc: c }),
      selection,
      live,
      refreshLive,
      scrollTo,
      track,
      ref: refRef.current,
    }),
    [catalog, copy, locale, demo, calc, selection, live, refreshLive, scrollTo, track],
  );

  return <BecasContext.Provider value={value}>{children}</BecasContext.Provider>;
}
