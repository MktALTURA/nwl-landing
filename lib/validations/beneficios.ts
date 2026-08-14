import { z } from 'zod';
import { COLOR_KEYS } from '@/lib/beneficios/colors';

/**
 * Server-side rules for the beneficios admin.
 *
 * The panel mirrors these client-side for instant feedback, but this file is
 * the authority — messages are in Spanish because they surface directly in
 * Marlene's form.
 */

/** Spanish required, English optional (empty English falls back to Spanish). */
const localized = (max: number, campo: string) =>
  z.object({
    es: z.string().trim().min(1, `Falta el texto en español ${campo}`).max(max, `Máximo ${max} caracteres`),
    en: z.string().trim().max(max, `Máximo ${max} caracteres`).optional(),
  });

/** Same shape but the whole field may be omitted (detail, restrictions, vigencia). */
const localizedOptional = (max: number) =>
  z
    .object({
      es: z.string().trim().max(max, `Máximo ${max} caracteres`).optional(),
      en: z.string().trim().max(max, `Máximo ${max} caracteres`).optional(),
    })
    .optional();

/**
 * An image is either a committed asset under /images/... or a Vercel Blob URL.
 * Arbitrary external URLs are rejected: they'd trip CSP, leak referrers, and
 * could vanish from under the site.
 */
const imageRef = z
  .string()
  .trim()
  .refine(
    (v) => v.startsWith('/images/') || /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(v),
    'La imagen debe subirse desde el panel'
  );

export const partnerSchema = z.object({
  name: z.string().trim().min(2, 'El nombre es obligatorio').max(60, 'Máximo 60 caracteres'),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones')
    .max(60),
  categoryKey: z.string().trim().min(1, 'Elige una categoría'),
  logo: imageRef.nullable(),
  logoStyle: z.enum(['wordmark', 'badge']).default('wordmark'),
  discount: localized(80, 'del descuento'),
  detail: localizedOptional(500),
  restrictions: localizedOptional(500),
  vigencia: localizedOptional(60),
  url: z
    .string()
    .trim()
    .url('El link no es válido')
    .startsWith('https://', 'El link debe empezar con https://')
    .optional()
    .or(z.literal('')),
  promoImages: z.array(imageRef).max(4, 'Máximo 4 imágenes').optional(),
});

export type PartnerInput = z.infer<typeof partnerSchema>;

export const categorySchema = z.object({
  key: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{2,32}$/, 'Solo minúsculas, números y guiones (2–32)'),
  label: localized(40, 'de la categoría'),
  color: z.enum(COLOR_KEYS as [string, ...string[]]),
});

export type CategoryInput = z.infer<typeof categorySchema>;

/** Reorder submits the full ordered id list — see the set-equality guard in the route. */
export const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, 'Lista vacía'),
});

/** Turn a partner name into a URL-safe slug ("Carl's Jr." → "carls-jr"). */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}
