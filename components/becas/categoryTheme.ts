import type { ComponentType } from 'react';
import { FiActivity, FiAward, FiFeather, FiHeart } from 'react-icons/fi';
import type { BecaCategoria } from '@/lib/becas/contract';

/**
 * One accent per category, shared by the public cards and the application
 * step so picking a category on either side looks like the same object.
 * Level colours are avoided on purpose: on this site they mean school levels.
 */
export interface CategoryTheme {
  /** CSS colour (token var) used for the accent line, icon and selected ring. */
  color: string;
  /** Tailwind text class matching `color`, for inline text. */
  text: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Navy card: light text on dark. */
  dark?: boolean;
}

export const CATEGORY_THEME: Record<BecaCategoria, CategoryTheme> = {
  deportiva: { color: 'var(--nwl-eucalyptus)', text: 'text-eucalyptus', icon: FiActivity },
  academica: { color: 'var(--nwl-gold)', text: 'text-gold-600', icon: FiAward },
  cultural: { color: 'var(--nwl-wattle)', text: 'text-wattle', icon: FiFeather },
  espiritu: { color: 'var(--nwl-navy)', text: 'text-navy', icon: FiHeart, dark: true },
};
