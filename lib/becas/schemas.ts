import { z } from 'zod';
import { BECA_CATEGORIAS } from './contract';
import { normalizePhoneMX } from '@/lib/phone';

/* ------------------------------------------------------------------ */
/*  Browser → site API payloads. Messages are codes the UI maps to      */
/*  copy; they are never shown raw.                                     */
/* ------------------------------------------------------------------ */

const SITE_CAMPUS = z.enum(['milenio', 'corregidora', 'san-miguel', 'juriquilla']);
const CICLO = z.string().regex(/^\d{4}-\d{4}$/, 'ciclo');
const GRADO = z.string().min(1).max(40);
const NAME = z.string().trim().min(2, 'required').max(80);
const EMAIL = z.string().trim().toLowerCase().email('email').max(120);
const PHONE = z
  .string()
  .transform((v) => normalizePhoneMX(v))
  .refine((v): v is string => v !== null, { message: 'phone' });

export const guardFields = {
  ft: z.string().min(10),
  website: z.string().max(0).optional(),
};

// Best effort: an oversized or odd attribution value must never block the
// application itself, so the whole block falls back to undefined.
export const attributionSchema = z
  .object({
    utm: z.record(z.string(), z.string().max(200).optional()).optional(),
    ft_utm: z.record(z.string(), z.string().max(200).optional()).optional(),
    clickIds: z.record(z.string(), z.string().max(300).optional()).optional(),
    landing_page: z.string().max(500).optional(),
    ft_landing_page: z.string().max(500).optional(),
    fbclid: z.string().max(300).optional(),
    fbclidTs: z.number().optional(),
    source_path: z.string().max(300).optional(),
  })
  .optional()
  .catch(undefined);

export const startSchema = z.object({
  ...guardFields,
  idempotencyKey: z.string().uuid(),
  campus: SITE_CAMPUS,
  ciclo: CICLO,
  grado: GRADO.optional(),
  padre: z.object({ nombre: NAME, apellidos: NAME, email: EMAIL, telefono: PHONE }),
  consent: z.object({ version: z.string().min(1).max(20), aceptado: z.literal(true) }),
  referido: z.object({ por: z.string().trim().max(120).optional(), codigo: z.string().trim().max(24).optional() }).optional(),
  attribution: attributionSchema,
  fromToken: z.string().max(64).optional(),
  eventId: z.string().max(64).optional(),
});
export type StartInput = z.infer<typeof startSchema>;

export const documentSchema = z.object({
  ...guardFields,
  token: z.string().min(8).max(64),
  kind: z.enum(['boleta', 'evidencia']),
  filename: z.string().trim().min(1).max(200),
  contentType: z.enum(['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic']),
  size: z.number().int().positive().max(10 * 1024 * 1024, 'too_large'),
});
export type DocumentInput = z.infer<typeof documentSchema>;

const declaradoSchema = z.object({
  promedio: z.number().min(5).max(10).optional(),
  nivelCompetencia: z.enum(['estatal', 'regional', 'nacional', 'internacional']).optional(),
  anioCompetencia: z.number().int().min(2000).max(2100).optional(),
  deporte: z.string().trim().max(80).optional(),
  disciplina: z.string().trim().max(80).optional(),
  anosFormacion: z.number().int().min(0).max(30).optional(),
  presentacionPublica: z.boolean().optional(),
  evidenciaUrl: z.string().trim().url('url').startsWith('https://', 'url').max(500).optional(),
  cartaMotivos: z.string().trim().max(3000).optional(),
});

export const submitSchema = z.object({
  ...guardFields,
  token: z.string().min(8).max(64),
  campus: SITE_CAMPUS,
  ciclo: CICLO,
  grado: GRADO,
  categoria: z.enum(BECA_CATEGORIAS as [string, ...string[]]),
  alumno: z.object({
    nombres: NAME,
    apPaterno: NAME,
    apMaterno: z.string().trim().max(80).optional(),
    nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date'),
    gradoActual: z.string().trim().max(60).optional(),
    escuelaProcedencia: z.string().trim().max(120).optional(),
  }),
  padre: z.object({
    nombre: NAME,
    apellidos: NAME,
    email: EMAIL,
    telefono: PHONE,
    domicilio: z.object({
      calle: z.string().trim().min(3, 'required').max(160),
      colonia: z.string().trim().min(2, 'required').max(100),
      ciudad: z.string().trim().min(2, 'required').max(80),
      cp: z.string().trim().regex(/^\d{5}$/, 'cp'),
    }),
  }),
  declarado: declaradoSchema,
  consent: z.object({ version: z.string().min(1).max(20), aceptado: z.literal(true) }),
  referido: z.object({ por: z.string().trim().max(120).optional(), codigo: z.string().trim().max(24).optional() }).optional(),
});
export type SubmitInput = z.infer<typeof submitSchema>;
