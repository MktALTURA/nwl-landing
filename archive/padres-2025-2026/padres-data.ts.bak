export type PortalSectionKey = 'calendario' | 'cafeteria' | 'comunicados' | 'utiles';

export interface PortalDocument {
  id: string;
  title: { en: string; es: string };
  description?: { en: string; es: string };
  pdfUrl: string;
  date?: string;
  group?: { en: string; es: string };
}

export interface CampusPortalConfig {
  campusSlug: string;
  campusName: string;
  city: { en: string; es: string };
  sections: Record<PortalSectionKey, PortalDocument[]>;
}

export const PORTAL_SECTION_KEYS: PortalSectionKey[] = [
  'calendario',
  'cafeteria',
  'comunicados',
  'utiles',
];

export const campusPasswords: Record<string, string> = {
  juriquilla: 'joeyjuriquilla',
  milenio: 'joeymilenio',
  corregidora: 'joeycorregidora',
  zibata: 'joeyzibata',
  'san-miguel': 'joeysanmiguel',
};

// ── Helper: generate supply list for a campus ──

const preescolar = { en: 'Preschool', es: 'Preescolar' };
const primaria = { en: 'Elementary', es: 'Primaria' };
const secundaria = { en: 'Middle School', es: 'Secundaria' };

function buildUtiles(campusSlug: string): PortalDocument[] {
  const base = `/padres/${campusSlug}/utiles`;
  return [
    {
      id: `${campusSlug}-utiles-maternal`,
      title: { en: 'Maternal', es: 'Maternal' },
      pdfUrl: `${base}/Maternal-Materiales-2025-2026.pdf`,
      group: preescolar,
    },
    {
      id: `${campusSlug}-utiles-k1`,
      title: { en: 'Kinder 1', es: 'Kinder 1' },
      pdfUrl: `${base}/K1-Materiales-2025-2026.pdf`,
      group: preescolar,
    },
    {
      id: `${campusSlug}-utiles-k2`,
      title: { en: 'Kinder 2', es: 'Kinder 2' },
      pdfUrl: `${base}/K2-Materiales-2025-2026.pdf`,
      group: preescolar,
    },
    {
      id: `${campusSlug}-utiles-k3`,
      title: { en: 'Kinder 3', es: 'Kinder 3' },
      pdfUrl: `${base}/K3-Materiales-2025-2026.pdf`,
      group: preescolar,
    },
    {
      id: `${campusSlug}-utiles-1-pri`,
      title: { en: '1st Grade', es: '1° Primaria' },
      pdfUrl: `${base}/1-Primaria-Materiales-2025-2026.pdf`,
      group: primaria,
    },
    {
      id: `${campusSlug}-utiles-2-pri`,
      title: { en: '2nd Grade', es: '2° Primaria' },
      pdfUrl: `${base}/2-Primaria-Materiales-2025-2026.pdf`,
      group: primaria,
    },
    {
      id: `${campusSlug}-utiles-3-pri`,
      title: { en: '3rd Grade', es: '3° Primaria' },
      pdfUrl: `${base}/3-Primaria-Materiales-2025-2026.pdf`,
      group: primaria,
    },
    {
      id: `${campusSlug}-utiles-4-pri`,
      title: { en: '4th Grade', es: '4° Primaria' },
      pdfUrl: `${base}/4-Primaria-Materiales-2025-2026.pdf`,
      group: primaria,
    },
    {
      id: `${campusSlug}-utiles-5-pri`,
      title: { en: '5th Grade', es: '5° Primaria' },
      pdfUrl: `${base}/5-Primaria-Materiales-2025-2026.pdf`,
      group: primaria,
    },
    {
      id: `${campusSlug}-utiles-6-pri`,
      title: { en: '6th Grade', es: '6° Primaria' },
      pdfUrl: `${base}/6-Primaria-Materiales-2025-2026.pdf`,
      group: primaria,
    },
    {
      id: `${campusSlug}-utiles-7-sec`,
      title: { en: '7th Grade', es: '1° Secundaria' },
      pdfUrl: `${base}/7-Secundaria-Materiales-2025-2026.pdf`,
      group: secundaria,
    },
    {
      id: `${campusSlug}-utiles-8-sec`,
      title: { en: '8th Grade', es: '2° Secundaria' },
      pdfUrl: `${base}/8-Secundaria-Materiales-2025-2026.pdf`,
      group: secundaria,
    },
    {
      id: `${campusSlug}-utiles-9-sec`,
      title: { en: '9th Grade', es: '3° Secundaria' },
      pdfUrl: `${base}/9-Secundaria-Materiales-2025-2026.pdf`,
      group: secundaria,
    },
  ];
}

function buildComunicados(campusSlug: string): PortalDocument[] {
  const base = `/padres/${campusSlug}/comunicados`;
  const privacyMap: Record<string, string> = {
    juriquilla: 'JURIQUILLA',
    milenio: 'MILENIO',
    corregidora: 'CORREGIDORA',
    zibata: 'NWL',
    'san-miguel': 'SAN-MIGUEL',
  };
  const docs: PortalDocument[] = [
    {
      id: `${campusSlug}-manual-convivencia`,
      title: { en: 'Coexistence Manual 2025–2026', es: 'Manual de Convivencia 2025–2026' },
      pdfUrl: `${base}/Manual-de-convivencia-2025-2026.pdf`,
      date: '2025-08-01',
    },
    {
      id: `${campusSlug}-responsiva-ipad`,
      title: { en: 'iPad Responsibility Agreement 2025–2026', es: 'Responsiva iPad 2025–2026' },
      pdfUrl: `${base}/Responsiva-iPad-2025-2026.pdf`,
      date: '2025-08-01',
    },
    {
      id: `${campusSlug}-acuerdo-sep`,
      title: { en: 'SEP-PROFECO Agreement', es: 'Acuerdo SEP-PROFECO' },
      pdfUrl: '/padres/shared/acuerdo-SEP-PROFECO.pdf',
    },
    {
      id: `${campusSlug}-decreto-deduccion`,
      title: { en: 'Tuition Tax Deduction Decree', es: 'Decreto de Deducción de Colegiaturas' },
      pdfUrl: '/padres/shared/Decreto-deduccion-colegiaturas.pdf',
    },
  ];
  if (privacyMap[campusSlug]) {
    docs.push({
      id: `${campusSlug}-aviso-privacidad`,
      title: { en: 'Privacy Notice', es: 'Aviso de Privacidad' },
      pdfUrl: `/padres/${campusSlug}/AVISO-PRIVACIDAD-${privacyMap[campusSlug]}.pdf`,
    });
  }
  return docs;
}

// ── Campus portal configurations ──

export const campusPortals: Record<string, CampusPortalConfig> = {
  juriquilla: {
    campusSlug: 'juriquilla',
    campusName: 'Juriquilla',
    city: { en: 'Querétaro', es: 'Querétaro' },
    sections: {
      calendario: [{
        id: 'juriquilla-cal',
        title: { en: 'School Calendar 2025–2026', es: 'Calendario Escolar 2025–2026' },
        pdfUrl: '/padres/juriquilla/calendario/NWL-Calendar-2025-2026.pdf',
        date: '2025-08-01',
      }],
      cafeteria: [],
      comunicados: buildComunicados('juriquilla'),
      utiles: buildUtiles('juriquilla'),
    },
  },
  milenio: {
    campusSlug: 'milenio',
    campusName: 'Milenio',
    city: { en: 'Querétaro', es: 'Querétaro' },
    sections: {
      calendario: [{
        id: 'milenio-cal',
        title: { en: 'School Calendar 2025–2026', es: 'Calendario Escolar 2025–2026' },
        pdfUrl: '/padres/milenio/calendario/NWL-Calendar-2025-2026.pdf',
        date: '2025-08-01',
      }],
      cafeteria: [],
      comunicados: buildComunicados('milenio'),
      utiles: buildUtiles('milenio'),
    },
  },
  corregidora: {
    campusSlug: 'corregidora',
    campusName: 'Corregidora',
    city: { en: 'Querétaro', es: 'Querétaro' },
    sections: {
      calendario: [{
        id: 'corregidora-cal',
        title: { en: 'School Calendar 2025–2026', es: 'Calendario Escolar 2025–2026' },
        pdfUrl: '/padres/corregidora/calendario/NWL-Calendar-2025-2026.pdf',
        date: '2025-08-01',
      }],
      cafeteria: [],
      comunicados: buildComunicados('corregidora'),
      utiles: buildUtiles('corregidora'),
    },
  },
  zibata: {
    campusSlug: 'zibata',
    campusName: 'Zibatá',
    city: { en: 'Querétaro', es: 'Querétaro' },
    sections: {
      calendario: [{
        id: 'zibata-cal',
        title: { en: 'School Calendar 2025–2026', es: 'Calendario Escolar 2025–2026' },
        pdfUrl: '/padres/zibata/calendario/NWL-Calendar-2025-2026.pdf',
        date: '2025-08-01',
      }],
      cafeteria: [],
      comunicados: buildComunicados('zibata'),
      utiles: buildUtiles('zibata'),
    },
  },
  'san-miguel': {
    campusSlug: 'san-miguel',
    campusName: 'San Miguel de Allende',
    city: { en: 'Guanajuato', es: 'Guanajuato' },
    sections: {
      calendario: [{
        id: 'san-miguel-cal',
        title: { en: 'School Calendar 2025–2026', es: 'Calendario Escolar 2025–2026' },
        pdfUrl: '/padres/san-miguel/calendario/NWL-Calendar-2025-2026.pdf',
        date: '2025-08-01',
      }],
      cafeteria: [],
      comunicados: buildComunicados('san-miguel'),
      utiles: buildUtiles('san-miguel'),
    },
  },
};

export function getCampusPortal(slug: string): CampusPortalConfig | undefined {
  return campusPortals[slug];
}

export function getCampusSlugs(): string[] {
  return Object.keys(campusPortals);
}
