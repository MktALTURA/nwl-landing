export type Campus = 'juriquilla' | 'milenio' | 'san-miguel' | 'corregidora' | 'zibata' | 'all';

export interface BilingualText {
  en: string;
  es: string;
}

export interface JobListing {
  id: string;
  title: BilingualText;
  campus: Campus;
  description: BilingualText;
  requirements: BilingualText;
  department?: BilingualText;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobListingFormData {
  title: BilingualText;
  campus: Campus;
  description: BilingualText;
  requirements: BilingualText;
  department?: BilingualText;
  isActive: boolean;
}
