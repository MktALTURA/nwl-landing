export type PortalSectionKey = 'calendario' | 'cafeteria' | 'comunicados' | 'utiles';

export interface PortalDocument {
  id: string;
  title: { en: string; es: string };
  description?: { en: string; es: string };
  /** Absent while the document is pending publication. */
  pdfUrl?: string;
  date?: string;
  group?: { en: string; es: string };
  /** Cycle document not published yet — shown as a placeholder, no view/download. */
  pending?: boolean;
}

export interface CampusPortalConfig {
  campusSlug: string;
  campusName: string;
  city: { en: string; es: string };
  sections: Record<PortalSectionKey, PortalDocument[]>;
}

/**
 * School cycle the portal is currently serving. The 2025–2026 documents were
 * retired (archive/padres-2025-2026/) and every year-specific entry below is a
 * pending placeholder until the new files land.
 */
export const CURRENT_CYCLE = '2026–2027';

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

const utilesGrades: { idSuffix: string; title: { en: string; es: string }; group: { en: string; es: string } }[] = [
  { idSuffix: 'maternal', title: { en: 'Maternal', es: 'Maternal' }, group: preescolar },
  { idSuffix: 'k1', title: { en: 'Kinder 1', es: 'Kinder 1' }, group: preescolar },
  { idSuffix: 'k2', title: { en: 'Kinder 2', es: 'Kinder 2' }, group: preescolar },
  { idSuffix: 'k3', title: { en: 'Kinder 3', es: 'Kinder 3' }, group: preescolar },
  { idSuffix: '1-pri', title: { en: '1st Grade', es: '1° Primaria' }, group: primaria },
  { idSuffix: '2-pri', title: { en: '2nd Grade', es: '2° Primaria' }, group: primaria },
  { idSuffix: '3-pri', title: { en: '3rd Grade', es: '3° Primaria' }, group: primaria },
  { idSuffix: '4-pri', title: { en: '4th Grade', es: '4° Primaria' }, group: primaria },
  { idSuffix: '5-pri', title: { en: '5th Grade', es: '5° Primaria' }, group: primaria },
  { idSuffix: '6-pri', title: { en: '6th Grade', es: '6° Primaria' }, group: primaria },
  { idSuffix: '7-sec', title: { en: '7th Grade', es: '1° Secundaria' }, group: secundaria },
  { idSuffix: '8-sec', title: { en: '8th Grade', es: '2° Secundaria' }, group: secundaria },
  { idSuffix: '9-sec', title: { en: '9th Grade', es: '3° Secundaria' }, group: secundaria },
];

function buildUtiles(campusSlug: string): PortalDocument[] {
  // 2026–2027 supply lists pending. Add `pdfUrl` and drop `pending` per grade as
  // each campus publishes its list.
  return utilesGrades.map(({ idSuffix, title, group }) => ({
    id: `${campusSlug}-utiles-${idSuffix}`,
    title,
    group,
    pending: true,
  }));
}

function buildComunicados(campusSlug: string): PortalDocument[] {
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
      title: {
        en: `Coexistence Manual ${CURRENT_CYCLE}`,
        es: `Manual de Convivencia ${CURRENT_CYCLE}`,
      },
      pending: true,
    },
    {
      id: `${campusSlug}-responsiva-ipad`,
      title: {
        en: `iPad Responsibility Agreement ${CURRENT_CYCLE}`,
        es: `Responsiva iPad ${CURRENT_CYCLE}`,
      },
      pending: true,
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

function buildCalendario(campusSlug: string): PortalDocument[] {
  // 2026–2027 calendar pending. Add `pdfUrl` and drop `pending` once published.
  return [
    {
      id: `${campusSlug}-cal`,
      title: {
        en: `School Calendar ${CURRENT_CYCLE}`,
        es: `Calendario Escolar ${CURRENT_CYCLE}`,
      },
      pending: true,
    },
  ];
}

// ── Campus portal configurations ──

export const campusPortals: Record<string, CampusPortalConfig> = {
  juriquilla: {
    campusSlug: 'juriquilla',
    campusName: 'Juriquilla',
    city: { en: 'Querétaro', es: 'Querétaro' },
    sections: {
      calendario: buildCalendario('juriquilla'),
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
      calendario: buildCalendario('milenio'),
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
      calendario: buildCalendario('corregidora'),
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
      calendario: buildCalendario('zibata'),
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
      calendario: buildCalendario('san-miguel'),
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
