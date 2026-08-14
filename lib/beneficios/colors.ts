/**
 * Category accent colors for the beneficios catalog.
 *
 * Moved out of BeneficiosCatalog so three consumers share one definition: the
 * card renderer, the zod enum that validates an incoming category, and the
 * admin swatch picker.
 *
 * TRAP: the keys are NOT all Tailwind tokens. `skyblue`, `terracotta`,
 * `mustard` and `coral` are legacy names from the pre-rebrand palette that are
 * remapped here to Australian School colors — `bg-skyblue` renders nothing.
 * Always render from `COLOR[key].bar`, never from `bg-${key}`.
 *
 * The classes must stay written out in full: Tailwind scans source text, so an
 * interpolated `bg-${token}` would be purged at build time.
 */
export interface CategoryColor {
  bar: string;
  tile: string;
  pill: string;
  /** Real hex of `bar`, for the admin swatch (Tailwind classes can't be read at runtime). */
  hex: string;
  /** What Marlene sees in the color picker. */
  label: string;
}

export const COLOR: Record<string, CategoryColor> = {
  eucalyptus: {
    bar: 'bg-eucalyptus',
    tile: 'from-eucalyptus/30 to-eucalyptus/10',
    pill: 'bg-eucalyptus/20 text-navy',
    hex: '#93A860',
    label: 'Verde eucalipto',
  },
  skyblue: {
    bar: 'bg-coral-sea',
    tile: 'from-coral-sea/25 to-coral-sea/5',
    pill: 'bg-coral-sea/15 text-navy',
    hex: '#004756',
    label: 'Azul profundo',
  },
  terracotta: {
    bar: 'bg-gold',
    tile: 'from-gold/30 to-gold/10',
    pill: 'bg-gold/20 text-navy',
    hex: '#CB8606',
    label: 'Dorado',
  },
  mustard: {
    bar: 'bg-wattle',
    tile: 'from-wattle/30 to-wattle/10',
    pill: 'bg-wattle/20 text-navy',
    hex: '#EDB500',
    label: 'Amarillo wattle',
  },
  coral: {
    bar: 'bg-jacaranda',
    tile: 'from-jacaranda/25 to-jacaranda/5',
    pill: 'bg-jacaranda/15 text-navy',
    hex: '#4A3A82',
    label: 'Morado jacaranda',
  },
  bondi: {
    bar: 'bg-bondi',
    tile: 'from-bondi/25 to-bondi/5',
    pill: 'bg-bondi/15 text-navy',
    hex: '#3AA79B',
    label: 'Turquesa Bondi',
  },
  galah: {
    bar: 'bg-galah',
    tile: 'from-galah/30 to-galah/10',
    pill: 'bg-galah/20 text-navy',
    hex: '#E89BB5',
    label: 'Rosa galah',
  },
  navy: {
    bar: 'bg-navy',
    tile: 'from-navy/20 to-navy/5',
    pill: 'bg-navy/10 text-navy',
    hex: '#0B224E',
    label: 'Azul marino',
  },
  jacaranda: {
    bar: 'bg-jacaranda',
    tile: 'from-jacaranda/25 to-jacaranda/5',
    pill: 'bg-jacaranda/15 text-navy',
    hex: '#4A3A82',
    label: 'Morado jacaranda',
  },
};

export const DEFAULT_COLOR_KEY = 'mustard';

/** Every key the renderer accepts (includes legacy aliases still in use). */
export const COLOR_KEYS = Object.keys(COLOR);

/**
 * What the admin picker offers. `coral` is omitted because it renders the exact
 * same purple as `jacaranda` — offering both would just confuse the choice.
 * Existing partners using `coral` keep working; it stays valid in COLOR.
 */
export const SELECTABLE_COLOR_KEYS = COLOR_KEYS.filter((k) => k !== 'coral');

export const getColor = (key: string): CategoryColor =>
  COLOR[key] ?? COLOR[DEFAULT_COLOR_KEY];
