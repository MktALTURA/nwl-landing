import { z } from 'zod';

const bilingualShort = z.object({
  en: z.string().min(1, 'English text is required').max(200, 'Max 200 characters'),
  es: z.string().min(1, 'Spanish text is required').max(200, 'Max 200 characters'),
});

const bilingualLong = z.object({
  en: z.string().min(1, 'English text is required').max(5000, 'Max 5000 characters'),
  es: z.string().min(1, 'Spanish text is required').max(5000, 'Max 5000 characters'),
});

const campusEnum = z.enum(['juriquilla', 'milenio', 'san-miguel', 'corregidora', 'zibata', 'all']);

export const jobListingSchema = z.object({
  title: bilingualShort,
  campus: campusEnum,
  description: bilingualLong,
  requirements: bilingualLong,
  department: bilingualShort.optional(),
  isActive: z.boolean(),
});

export type JobListingInput = z.infer<typeof jobListingSchema>;

export const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});
