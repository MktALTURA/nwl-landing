import type { Locale } from './i18n/types';

export interface CampusFacility {
  name: { en: string; es: string };
  image: string;
}

export interface CampusActivity {
  name: { en: string; es: string };
  description: { en: string; es: string };
  color: string;
}

export interface CampusDirector {
  name: string;
  title: { en: string; es: string };
  message: { en: string; es: string };
  image: string;
}

export interface CampusStat {
  value: string;
  label: { en: string; es: string };
}

export interface CampusTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CampusGalleryImage {
  src: string;
  caption: { en: string; es: string };
}

export interface CampusData {
  slug: string;
  name: string;
  tagline: { en: string; es: string };
  levels: { en: string; es: string };
  heroImage: string;
  stats: CampusStat[];
  facilities: CampusFacility[];
  activities: CampusActivity[];
  director: CampusDirector;
  address: string;
  mapUrl: string;
  galleryImages: CampusGalleryImage[];
  testimonials: CampusTestimonial[];
  googleRating: number;
  googleReviewCount: number;
}

// Helper to get localized text
export function localized<T extends { en: string; es: string }>(
  obj: T,
  locale: Locale,
): string {
  return obj[locale];
}

export const campuses: Record<string, CampusData> = {
  zibata: {
    slug: 'zibata',
    name: 'Zibatá',
    tagline: {
      en: 'Modern facilities in a growing community',
      es: 'Instalaciones modernas en una comunidad en crecimiento',
    },
    levels: {
      en: 'Maternal — High School',
      es: 'Maternal — Preparatoria',
    },
    heroImage: '/images/campus/zibata-hero.png',
    stats: [
      { value: 'Maternal – Prepa', label: { en: 'Academic Levels', es: 'Niveles Académicos' } },
      { value: '500+', label: { en: 'Students', es: 'Alumnos' } },
      { value: '2018', label: { en: 'Founded', es: 'Fundado' } },
      { value: '100%', label: { en: 'Bilingual', es: 'Bilingüe' } },
    ],
    facilities: [
      { name: { en: 'Sports Fields', es: 'Canchas Deportivas' }, image: '/images/campus/zibata-sports.png' },
      { name: { en: 'Science Labs', es: 'Laboratorios de Ciencias' }, image: '/images/campus/zibata-labs.png' },
      { name: { en: 'Library', es: 'Biblioteca' }, image: '/images/campus/zibata-library.png' },
      { name: { en: 'Playground', es: 'Área de Juegos' }, image: '/images/campus/zibata-playground.png' },
      { name: { en: 'Auditorium', es: 'Auditorio' }, image: '/images/campus/zibata-auditorium.png' },
      { name: { en: 'Cafeteria', es: 'Cafetería' }, image: '/images/campus/zibata-cafeteria.png' },
    ],
    activities: [
      {
        name: { en: 'Sports', es: 'Deportes' },
        description: {
          en: 'Soccer, basketball, volleyball, and more competitive and recreational options.',
          es: 'Fútbol, basquetbol, voleibol y más opciones competitivas y recreativas.',
        },
        color: 'ocean',
      },
      {
        name: { en: 'Arts & Culture', es: 'Arte y Cultura' },
        description: {
          en: 'Visual arts, theater, and cultural expression workshops.',
          es: 'Artes visuales, teatro y talleres de expresión cultural.',
        },
        color: 'coral',
      },
      {
        name: { en: 'Robotics & STEAM', es: 'Robótica y STEAM' },
        description: {
          en: 'Hands-on projects in science, technology, engineering, arts, and math.',
          es: 'Proyectos prácticos en ciencia, tecnología, ingeniería, arte y matemáticas.',
        },
        color: 'blueberry',
      },
      {
        name: { en: 'Music', es: 'Música' },
        description: {
          en: 'Instrumental lessons, choir, and ensemble performances.',
          es: 'Clases de instrumentos, coro y presentaciones en ensamble.',
        },
        color: 'sunshine',
      },
    ],
    director: {
      name: 'Nombre del Director',
      title: {
        en: 'Campus Director',
        es: 'Director de Campus',
      },
      message: {
        en: 'At NWL Zibatá, we believe every child carries the potential for greatness. Our modern campus is designed to nurture curiosity, build confidence, and prepare students for a world full of possibilities. We welcome you to visit and experience the NWL difference firsthand.',
        es: 'En NWL Zibatá, creemos que cada niño lleva el potencial de la grandeza. Nuestro campus moderno está diseñado para nutrir la curiosidad, construir confianza y preparar a los alumnos para un mundo lleno de posibilidades. Te invitamos a visitarnos y vivir la diferencia NWL.',
      },
      image: '/images/campus/zibata-hero.png',
    },
    address: 'Paseo de las Pitahayas, Zibatá, Querétaro',
    mapUrl: 'https://maps.google.com/?q=Colegio+Newland+Zibata',
    galleryImages: [
      {
        src: '/images/campus/zibata-hero.png',
        caption: { en: 'Welcome to Campus Zibatá', es: 'Bienvenidos a Campus Zibatá' },
      },
      {
        src: '/images/campus/zibata-sports.png',
        caption: { en: 'Sports & Active Play', es: 'Deporte y Juego Activo' },
      },
      {
        src: '/images/campus/zibata-labs.png',
        caption: { en: 'Hands-on Discovery in Our Labs', es: 'Descubrimiento en Nuestros Laboratorios' },
      },
      {
        src: '/images/campus/zibata-library.png',
        caption: { en: 'Reading & Imagination', es: 'Lectura e Imaginación' },
      },
      {
        src: '/images/campus/zibata-playground.png',
        caption: { en: 'Play, Explore & Grow', es: 'Jugar, Explorar y Crecer' },
      },
      {
        src: '/images/campus/zibata-auditorium.png',
        caption: { en: 'Events & Performances', es: 'Eventos y Presentaciones' },
      },
      {
        src: '/images/campus/zibata-cafeteria.png',
        caption: { en: 'Healthy Meals Together', es: 'Comidas Saludables Juntos' },
      },
    ],
    testimonials: [
      {
        quote: 'Estamos muy contentos en Colegio NWL. Se tomaron el tiempo de escuchar nuestras necesidades. Nuestra hija lleva 4 años y cada día es una niña más segura de sí misma. ¡Ama acudir al colegio!',
        author: 'Familia O.D.',
        role: 'Primaria · 4 años en NWL',
      },
      {
        quote: 'Mis hijos son los más felices. Han tenido un desarrollo increíble en lo social y lo cognitivo. En NWL somos parte de una gran familia con experiencias nuevas y enriquecedoras.',
        author: 'S.M.D.',
        role: 'Mamá · Juriquilla',
      },
      {
        quote: 'Buscamos una escuela centrada en el desarrollo de cada alumno y la encontramos en NWL. La atención es personalizada y cuidan cada detalle. Estamos felices.',
        author: 'A.P.',
        role: 'Mamá · La Cañada',
      },
    ],
    googleRating: 4.5,
    googleReviewCount: 230,
  },
};
