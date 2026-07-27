import type { Locale } from './i18n/types';

/**
 * Commercial benefits catalog for the NWL community ("Catálogo de Beneficios").
 *
 * This is DISTINCT from the academic/institutional partners shown in
 * components/Partnerships.tsx (Knotion, Cognia…). These are external
 * businesses that offer exclusive discounts to NWL families and collaborators.
 *
 * Translatable benefit/vigencia copy is stored inline-bilingual here (same
 * approach as getPartners() in Partnerships.tsx); page/section UI copy lives in
 * the i18n `beneficios` block. To add a real logo later, drop the file under
 * /images/logos/benefits/ and set `logo` to its path — until then `logo: null`
 * renders a brand-colored monogram tile.
 */

export type LocalizedString = { es: string; en: string };

export interface BenefitCategory {
  /** Stable key referenced by partners and the filter UI. */
  key: string;
  label: LocalizedString;
  /** Tailwind color token (from tailwind.config.ts) used as the accent. */
  color: string;
}

export interface BenefitPartner {
  slug: string;
  name: string;
  categoryKey: string;
  /** Path under /images/logos/benefits/, or null for a monogram placeholder. */
  logo: string | null;
  /**
   * How to fit the logo in the card band:
   * - 'wordmark' (default): transparent/white-bg logo shown wide via contain.
   * - 'badge': logo with its own colored background, shown as a rounded tile.
   */
  logoStyle?: 'wordmark' | 'badge';
  /** The headline discount — the focal element of the card. */
  discount: LocalizedString;
  /** Optional secondary detail (eligibility tiers, fine print). */
  detail?: LocalizedString;
  /** Conditions / fine print shown as muted small text on the card. */
  restrictions?: LocalizedString;
  /** Validity window, e.g. "Vigencia: octubre". */
  vigencia?: LocalizedString;
  /** Outbound link (partner site, WhatsApp, etc.). */
  url?: string;
  /**
   * Optional promo flyer images (paths under /images/benefits/). When set,
   * the card shows "view flyer" thumbnails that open each image in a lightbox.
   */
  promoImages?: string[];
}

export const benefitCategories: BenefitCategory[] = [
  { key: 'salud', label: { es: 'Salud y Bienestar', en: 'Health & Wellness' }, color: 'eucalyptus' },
  { key: 'dental', label: { es: 'Dental y Ortopedia', en: 'Dental & Orthopedics' }, color: 'skyblue' },
  { key: 'optica', label: { es: 'Óptica y Audiología', en: 'Optical & Hearing' }, color: 'bondi' },
  { key: 'laboratorio', label: { es: 'Estudios Clínicos', en: 'Clinical Studies' }, color: 'terracotta' },
  { key: 'prevision', label: { es: 'Previsión y Asistencia', en: 'Funeral & Assistance' }, color: 'mustard' },
  { key: 'alimentos', label: { es: 'Alimentos y Bebidas', en: 'Food & Drink' }, color: 'coral' },
  { key: 'entretenimiento', label: { es: 'Entretenimiento', en: 'Entertainment' }, color: 'galah' },
  { key: 'deporte', label: { es: 'Deporte y Danza', en: 'Sports & Dance' }, color: 'navy' },
  { key: 'musica', label: { es: 'Música y Arte', en: 'Music & Arts' }, color: 'jacaranda' },
];

export const benefitPartners: BenefitPartner[] = [
  {
    slug: 'gestamed',
    name: 'GestaMed Hospital',
    categoryKey: 'salud',
    logo: '/images/logos/benefits/gestamed.png',
    url: 'https://gestamed.mx/',
    discount: { es: 'Consulta desde $800', en: 'Consultations from $800' },
    detail: {
      es: 'Pediatría y especialidades · Atención las 24 horas. Agenda al 442 212 5965.',
      en: 'Pediatrics & specialties · 24-hour care. Book at 442 212 5965.',
    },
    restrictions: {
      es: 'Precio con IVA incluido. Aplican restricciones.',
      en: 'Price includes tax (IVA). Restrictions apply.',
    },
  },
  {
    slug: 'saiens',
    name: 'SAIENS',
    categoryKey: 'laboratorio',
    logo: '/images/logos/benefits/saiens.png',
    url: 'https://saiens.com.mx/',
    discount: { es: '25% de descuento', en: '25% discount' },
    detail: {
      es: 'En estudios clínicos, mencionando que perteneces a la comunidad NWL Australian School. Toma de muestra a domicilio gratis en todo Querétaro.',
      en: 'On clinical studies, mention you belong to the NWL Australian School community. Free home sample collection across Querétaro.',
    },
    restrictions: {
      es: 'Válido mencionando que perteneces a la comunidad NWL Australian School al agendar.',
      en: 'Valid when you mention you belong to the NWL Australian School community at booking.',
    },
  },
  {
    slug: 'airapi',
    name: 'Airapí',
    categoryKey: 'prevision',
    logo: '/images/logos/benefits/airapi.jpg',
    url: 'https://airapi.mx/',
    discount: { es: 'Cobertura funeraria gratuita', en: 'Free funeral coverage' },
    detail: {
      es: 'Plan Tributo con valor de $49,000 MXN, sin costo para tu familia. Al activarlo accedes a descuentos exclusivos en otros servicios.',
      en: 'Tribute Plan worth $49,000 MXN at no cost to your family. Activating it unlocks exclusive discounts on other services.',
    },
    restrictions: {
      es: 'Actívala presentando tu INE (lunes a domingo, 9:00–19:00 hrs, sin cita). Cubre al estudiante e incluye descuentos exclusivos sin vencimiento en planes funerarios y nichos para otros familiares.',
      en: 'Activate it by presenting your INE ID (Mon–Sun, 9:00–19:00, no appointment). Covers the student and includes non-expiring exclusive discounts on funeral plans and niches for other family members.',
    },
  },
  {
    slug: 'orthointegra',
    name: 'Orthointegra',
    categoryKey: 'dental',
    logo: '/images/logos/benefits/orthointegra.jpg',
    logoStyle: 'badge',
    url: 'https://www.facebook.com/people/Orthointegra/100063555731675/',
    discount: { es: '10% a 30% de descuento', en: '10%–30% discount' },
    detail: {
      es: 'En tratamientos dentales según el tipo. Alumnos NWL: valoración y consulta inicial gratis · Colaboradores: $200 · Familiares: 10% a 30%.',
      en: 'On dental treatments by type. NWL students: free initial valuation & consultation · Staff: $200 · Family: 10%–30%.',
    },
    restrictions: {
      es: 'El porcentaje de descuento depende del tipo de tratamiento. Válido en sucursales Juriquilla y El Pueblito.',
      en: 'The discount percentage depends on the treatment type. Valid at the Juriquilla and El Pueblito locations.',
    },
  },
  {
    slug: 'tim-hortons',
    name: 'Tim Hortons',
    categoryKey: 'alimentos',
    logo: '/images/logos/benefits/tim-hortons.svg',
    url: 'https://timhortonsmx.com/',
    promoImages: ['/images/benefits/tim-hortons-promo.jpg'],
    discount: { es: '10% de descuento', en: '10% discount' },
    detail: {
      es: 'Lleva tu antojo al campus con un 10% de descuento presentando tu credencial NWL (alumno o colaborador) en sucursales participantes.',
      en: 'Bring your craving to campus with 10% off when you present your NWL credential (student or staff) at participating locations.',
    },
    restrictions: {
      es: 'Válido presentando tu credencial NWL en sucursales participantes. Aplican restricciones.',
      en: 'Valid when you present your NWL credential at participating locations. Restrictions apply.',
    },
  },
  {
    slug: 'carls-jr',
    name: "Carl's Jr.",
    categoryKey: 'alimentos',
    logo: '/images/logos/benefits/carls-jr.svg',
    url: 'https://carlsjr.com.mx/',
    promoImages: [
      '/images/benefits/carls-jr-promo-130.jpg',
      '/images/benefits/carls-jr-promo-10off.jpg',
    ],
    discount: {
      es: 'Combo Famous Star® $130',
      en: 'Famous Star® combo $130',
    },
    detail: {
      es: 'Combo Chico Famous Star® con queso (papas chicas y bebida chica) por solo $130 · Además, 10% de descuento en consumo general a partir del 15 de julio.',
      en: 'Small Famous Star® with cheese combo (small fries & small drink) for just $130 · Plus 10% off your total check starting July 15.',
    },
    restrictions: {
      es: 'Válido presentando credencial, uniforme del Colegio NWL o volante de la promoción en sucursales participantes de Querétaro. Una promoción por persona; no aplica con otras ofertas. Aplican restricciones.',
      en: 'Valid with your credential, Colegio NWL uniform or promo flyer at participating Querétaro locations. One promotion per person; not valid with other offers. Restrictions apply.',
    },
    vigencia: {
      es: '10% vigente desde el 15 de julio',
      en: '10% off starts July 15',
    },
  },
  {
    slug: 'fun4us',
    name: 'Fun4us',
    categoryKey: 'entretenimiento',
    logo: '/images/logos/benefits/fun4us.svg',
    url: 'https://www.fun4us.mx/',
    discount: { es: 'Tarifa especial $199–$249', en: 'Special rate $199–$249' },
    detail: {
      es: 'Acceso por $249 para pequeños que miden más de 90 cm y $199 para menores de 90 cm · 10% de descuento en cafetería (incluye golosinas y productos ICC y Holanda) · Acceso gratuito de papás al comedor.',
      en: 'Entry for $249 for kids taller than 90 cm and $199 for kids under 90 cm · 10% off at the café (including candy and ICC & Holanda products) · Free dining-area access for parents.',
    },
    restrictions: {
      es: 'Horario: lunes a jueves 13:00–20:00 · viernes y sábado 11:00–21:00 · domingo 11:00–19:00. Válido para la comunidad de todos los campus NWL.',
      en: 'Hours: Mon–Thu 1:00–8:00 pm · Fri–Sat 11:00 am–9:00 pm · Sun 11:00 am–7:00 pm. Valid for the community of all NWL campuses.',
    },
  },
  {
    slug: 'dientes-co',
    name: 'Dientes & Co',
    categoryKey: 'dental',
    logo: '/images/logos/benefits/dientes-co.jpg',
    discount: { es: 'Hasta 20% de descuento', en: 'Up to 20% off' },
    detail: {
      es: 'Alumnos, docentes y personal administrativo: 20% en tratamientos generales y 10% en tratamientos de especialidad · Familiares directos: 10% en generales y 5% en especialidad.',
      en: 'Students, teachers & administrative staff: 20% off general treatments and 10% off specialty treatments · Direct family members: 10% off general and 5% off specialty.',
    },
    restrictions: {
      es: 'Válido para la comunidad de todos los campus NWL.',
      en: 'Valid for the community of all NWL campuses.',
    },
  },
  {
    slug: 'we-dance',
    name: 'We-Dance Studio',
    categoryKey: 'deporte',
    logo: '/images/logos/benefits/we-dance.png',
    discount: { es: '50% de descuento en inscripción', en: '50% off enrollment' },
    detail: {
      es: 'Presenta tu credencial NWL al inscribirte y obtén la mitad de descuento en tu inscripción.',
      en: 'Show your NWL credential when you sign up and get half off your enrollment fee.',
    },
  },
  {
    slug: 'devlyn',
    name: 'Devlyn',
    categoryKey: 'optica',
    logo: '/images/logos/benefits/devlyn.svg',
    url: 'https://www.devlyn.com.mx/',
    discount: { es: 'Hasta 20% de descuento', en: 'Up to 20% off' },
    detail: {
      es: '20% en anteojos graduados, armazones, micas, lentes solares y de contacto (Essilor, Transitions, Varilux, Crizal y más) · 10% en consulta oftalmológica y cirugías en Clínicas Devlyn · Examen de la vista, asesoramiento, limpieza y ajuste de anteojos sin costo · Audiología: estudio auditivo gratis y 15% en auxiliares auditivos.',
      en: '20% off prescription glasses, frames, lenses, sunglasses and contact lenses (Essilor, Transitions, Varilux, Crizal and more) · 10% off ophthalmology consultations and surgeries at Devlyn Clinics · Free eye exams, advice, cleaning and frame adjustments · Audiology: free hearing test and 15% off hearing aids.',
    },
    restrictions: {
      es: 'Descuentos extensivos a familiares directos e indirectos. Válido pagando en efectivo o tarjeta sobre precio de lista en sucursales Devlyn de todo el país; no aplica en tiendas outlet ni concesiones dentro de tiendas departamentales.',
      en: 'Discounts extend to direct and extended family. Valid paying cash or card on list prices at Devlyn locations nationwide; not valid at outlet stores or concessions inside department stores.',
    },
  },
  {
    slug: 'mvs-music-center',
    name: 'MVS Music Center',
    categoryKey: 'musica',
    logo: '/images/logos/benefits/mvs-music-center.png',
    url: 'https://mvsmusiccenter.com/',
    discount: { es: '50% de descuento en inscripción', en: '50% off enrollment' },
    detail: {
      es: 'Escuela y tienda de música: 50% de descuento en inscripción · 15% en colegiaturas · 10% en tienda.',
      en: 'Music school and store: 50% off enrollment · 15% off tuition · 10% off in-store purchases.',
    },
    restrictions: {
      es: 'Válido presentando tu credencial NWL. Válido para la comunidad de todos los campus NWL.',
      en: 'Valid when you present your NWL credential. Valid for the community of all NWL campuses.',
    },
  },
  {
    slug: 'leoba-spa',
    name: 'Leoba Centro de Masajes y Spa',
    categoryKey: 'salud',
    logo: '/images/logos/benefits/leoba.png',
    url: 'https://leobacentrodemasajesyspa.com.mx/',
    discount: { es: 'Hasta 30% de descuento', en: 'Up to 30% off' },
    detail: {
      es: 'En sesiones individuales de masaje: 30% de descuento para personal administrativo y 25% para la comunidad de padres de familia.',
      en: 'On individual massage sessions: 30% off for administrative staff and 25% off for the parent community.',
    },
    restrictions: {
      es: 'Aplica en sesiones individuales de masaje.',
      en: 'Valid on individual massage sessions.',
    },
  },
  {
    slug: 'anytime-fitness',
    name: 'Anytime Fitness',
    categoryKey: 'deporte',
    logo: '/images/logos/benefits/anytime-fitness.svg',
    url: 'https://www.anytimefitness.com.mx/',
    discount: { es: 'Inscripción sin costo', en: 'Free enrollment' },
    detail: {
      es: 'Membresía especial NWL: inscripción sin costo, llave de acceso multiclub $550 y mensualidad desde $900 (plan 12 meses) o $990 (plan 6 meses). Acceso 24/7, multiclub en +5,500 sucursales, coach y clases incluidas.',
      en: 'Special NWL membership: free enrollment, $550 multi-club access key and monthly fees from $900 (12-month plan) or $990 (6-month plan). 24/7 access, multi-club entry to 5,500+ locations, coach and classes included.',
    },
    restrictions: {
      es: 'Válido para colaboradores, alumnos y familiares directos. Sucursales participantes: Zakia, Toscana Juriquilla y Juriquilla Santa Fe (Qro) y San Miguel de Allende (Gto).',
      en: 'Valid for staff, students and direct family members. Participating locations: Zakia, Toscana Juriquilla and Juriquilla Santa Fe (Qro) and San Miguel de Allende (Gto).',
    },
  },
];

/** Resolve a localized string to the active locale. */
export const t = (s: LocalizedString | undefined, locale: Locale): string =>
  s ? s[locale] : '';

/** Category lookup by key (falls back to the first category). */
export const getCategory = (key: string): BenefitCategory =>
  benefitCategories.find((c) => c.key === key) ?? benefitCategories[0];
