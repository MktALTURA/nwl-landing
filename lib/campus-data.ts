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
  value: { en: string; es: string };
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
  phone: string;        // Display format: "442-161-2211/12"
  phoneLink: string;    // tel: link format: "4421612211"
  whatsapp: string;     // WhatsApp number with country code: "5214421612211"
  stats: CampusStat[];
  facilities: CampusFacility[];
  activities: CampusActivity[];
  director: CampusDirector;
  address: string;
  city: string;         // For schema addressLocality
  state: string;        // For schema addressRegion
  geo: { lat: number; lng: number }; // For schema GeoCoordinates
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

// Campus phone directory — used when building each campus page
export const campusPhones: Record<string, { phone: string; phoneLink: string; whatsapp: string }> = {
  juriquilla:  { phone: '442-384-6880/81',  phoneLink: '4423846880', whatsapp: '5214423846880' },
  milenio:     { phone: '442-325-1413/1414',  phoneLink: '4423251413', whatsapp: '5214423251413' },
  zibata:      { phone: '442-161-2211/12',  phoneLink: '4421612211', whatsapp: '5214421612211' },
  sanmiguel:   { phone: '415-690-3100',     phoneLink: '4156903100', whatsapp: '5214156903100' },
  corregidora: { phone: '442-671-7645/46',  phoneLink: '4426717645', whatsapp: '5214426717645' },
};

export const campuses: Record<string, CampusData> = {
  /* ─────────────────────────────  JURIQUILLA  ───────────────────────────── */
  juriquilla: {
    slug: 'juriquilla',
    name: 'Juriquilla',
    tagline: {
      en: 'Our flagship campus with a tradition of excellence',
      es: 'Nuestro campus insignia con tradición de excelencia',
    },
    levels: {
      en: 'Maternal — Middle School',
      es: 'Maternal — Secundaria',
    },
    heroImage: '/images/campus/juriquilla/juriquilla-building.jpg',
    phone: '442-384-6880/81',
    phoneLink: '4423846880',
    whatsapp: '5214423846880',
    stats: [
      { value: { en: 'Maternal – Middle School', es: 'Maternal – Sec' }, label: { en: 'Academic Levels', es: 'Niveles Académicos' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Certified Teachers', es: 'Docentes Certificados' } },
      { value: { en: '2009', es: '2009' }, label: { en: 'Founded', es: 'Fundado' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Bilingual', es: 'Bilingüe' } },
    ],
    facilities: [
      { name: { en: 'Sports Fields', es: 'Canchas Deportivas' }, image: '/images/campus/juriquilla/juriquilla-sports.jpg' },
      { name: { en: 'Soccer Field', es: 'Cancha de Fútbol' }, image: '/images/campus/juriquilla/juriquilla-soccer.jpg' },
      { name: { en: 'Classrooms', es: 'Salones de Clase' }, image: '/images/campus/juriquilla/juriquilla-classrooms.jpg' },
      { name: { en: 'Playground', es: 'Área de Juegos' }, image: '/images/campus/juriquilla/juriquilla-playground.jpg' },
      { name: { en: 'Cafetorium', es: 'Cafetorium' }, image: '/images/campus/juriquilla/juriquilla-cafeteria.jpg' },
      { name: { en: 'Student Commons', es: 'Zona de Convivencia' }, image: '/images/campus/juriquilla/juriquilla-commons.jpg' },
    ],
    activities: [
      {
        name: { en: 'Sports', es: 'Deportes' },
        description: {
          en: 'Soccer, basketball, volleyball, and more competitive and recreational options.',
          es: 'Fútbol, basquetbol, voleibol y más opciones competitivas y recreativas.',
        },
        color: 'sunshine',
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
        color: 'ocean',
      },
    ],
    director: {
      name: 'Mtra. Dayana Rose Gómez',
      title: { en: 'Campus Director', es: 'Directora de Campus' },
      message: {
        en: 'At NWL Juriquilla, our flagship campus sets the standard for educational excellence. With over a decade of experience, we nurture every student\'s potential in a vibrant, close-knit community. We invite you to visit and discover the NWL difference.',
        es: 'En NWL Juriquilla, nuestro campus insignia marca el estándar de excelencia educativa. Con más de una década de experiencia, cultivamos el potencial de cada alumno en una comunidad vibrante y cercana. Te invitamos a visitarnos y descubrir la diferencia NWL.',
      },
      image: '/images/campus/juriquilla/juriquilla-director.jpg',
    },
    address: 'Anillo Vial Fray Junípero Serra, Juriquilla, Querétaro',
    city: 'Juriquilla, Querétaro',
    state: 'Querétaro',
    geo: { lat: 20.673776092246715, lng: -100.41597892208858 },
    mapUrl: 'https://maps.google.com/?q=Colegio+Newland+Juriquilla',
    galleryImages: [
      { src: '/images/campus/juriquilla/juriquilla-building.jpg', caption: { en: 'Welcome to Campus Juriquilla', es: 'Bienvenidos a Campus Juriquilla' } },
      { src: '/images/campus/juriquilla/juriquilla-hero.jpg', caption: { en: 'Campus Entrance', es: 'Entrada del Campus' } },
      { src: '/images/campus/juriquilla/juriquilla-sports.jpg', caption: { en: 'Sports & Active Play', es: 'Deporte y Juego Activo' } },
      { src: '/images/campus/juriquilla/juriquilla-classrooms.jpg', caption: { en: 'Bright Learning Spaces', es: 'Espacios de Aprendizaje Luminosos' } },
      { src: '/images/campus/juriquilla/juriquilla-playground.jpg', caption: { en: 'Play, Explore & Grow', es: 'Jugar, Explorar y Crecer' } },
      { src: '/images/campus/juriquilla/juriquilla-cafeteria.jpg', caption: { en: 'Our Cafetorium', es: 'Nuestro Cafetorium' } },
      { src: '/images/campus/juriquilla/juriquilla-commons.jpg', caption: { en: 'Student Commons', es: 'Zona de Convivencia' } },
      { src: '/images/campus/juriquilla/juriquilla-sports-overview.jpg', caption: { en: 'Campus Sports Overview', es: 'Vista General Deportiva' } },

      { src: '/images/campus/juriquilla/juriquilla-soccer.jpg', caption: { en: 'Soccer Field', es: 'Cancha de Fútbol' } },
      { src: '/images/campus/juriquilla/juriquilla-campus-fields.jpg', caption: { en: 'Campus & Fields', es: 'Campus y Canchas' } },
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
    googleRating: 4.6,
    googleReviewCount: 320,
  },

  /* ─────────────────────────────  MILENIO  ───────────────────────────── */
  milenio: {
    slug: 'milenio',
    name: 'Milenio',
    tagline: {
      en: 'A safe, nurturing space with great facilities for expanded growth',
      es: 'Un espacio seguro y acogedor con excelentes instalaciones para crecer',
    },
    levels: {
      en: 'Maternal — Middle School',
      es: 'Maternal — Secundaria',
    },
    heroImage: '/images/campus/milenio/milenio-building.jpg',
    phone: '442-325-1413/1414',
    phoneLink: '4423251413',
    whatsapp: '5214423251413',
    stats: [
      { value: { en: 'Maternal – Middle School', es: 'Maternal – Sec' }, label: { en: 'Academic Levels', es: 'Niveles Académicos' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Certified Teachers', es: 'Docentes Certificados' } },
      { value: { en: '2016', es: '2016' }, label: { en: 'Founded', es: 'Fundado' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Bilingual', es: 'Bilingüe' } },
    ],
    facilities: [
      { name: { en: 'Sports Fields', es: 'Canchas Deportivas' }, image: '/images/campus/milenio/milenio-sports.jpg' },
      { name: { en: 'Science Labs', es: 'Laboratorios de Ciencias' }, image: '' },
      { name: { en: 'Classrooms', es: 'Salones de Clase' }, image: '' },
      { name: { en: 'Playground', es: 'Área de Juegos' }, image: '/images/campus/milenio/milenio-playground.jpg' },
      { name: { en: 'Cafetorium', es: 'Cafetorium' }, image: '' },
      { name: { en: 'Student Commons', es: 'Zona de Convivencia' }, image: '' },
    ],
    activities: [
      {
        name: { en: 'Sports', es: 'Deportes' },
        description: {
          en: 'Soccer, basketball, volleyball, and more competitive and recreational options.',
          es: 'Fútbol, basquetbol, voleibol y más opciones competitivas y recreativas.',
        },
        color: 'coral',
      },
      {
        name: { en: 'Arts & Culture', es: 'Arte y Cultura' },
        description: {
          en: 'Visual arts, theater, and cultural expression workshops.',
          es: 'Artes visuales, teatro y talleres de expresión cultural.',
        },
        color: 'ocean',
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
      name: 'Ximena Arellano Atristain',
      title: { en: 'Campus Director', es: 'Directora de Campus' },
      message: {
        en: 'At NWL Milenio, we create a warm, secure environment where children feel at home. Our dedicated team focuses on both academic achievement and emotional development, helping each student grow into a confident, well-rounded individual.',
        es: 'En NWL Milenio, creamos un ambiente cálido y seguro donde los niños se sienten como en casa. Nuestro equipo dedicado se enfoca tanto en el logro académico como en el desarrollo emocional, ayudando a cada alumno a crecer como un individuo seguro e integral.',
      },
      image: '/images/campus/milenio/milenio-director.jpg',
    },
    address: 'Cerrada Panorámica, Distrito Piamonte, Querétaro',
    city: 'Querétaro',
    state: 'Querétaro',
    geo: { lat: 20.583665906727823, lng: -100.34497862432194 },
    mapUrl: 'https://maps.google.com/?q=Colegio+Newland+Milenio',
    galleryImages: [
      { src: '/images/campus/milenio/milenio-hero.jpg', caption: { en: 'Campus Milenio', es: 'Campus Milenio' } },
      { src: '/images/campus/milenio/milenio-aerial-view.jpg', caption: { en: 'Aerial View', es: 'Vista Aérea' } },
      { src: '/images/campus/milenio/milenio-sports.jpg', caption: { en: 'Sports & Active Play', es: 'Deporte y Juego Activo' } },
      { src: '/images/campus/milenio/milenio-playground.jpg', caption: { en: 'Play, Explore & Grow', es: 'Jugar, Explorar y Crecer' } },
      { src: '/images/campus/milenio/milenio-cafeteria.jpg', caption: { en: 'Our Cafetorium', es: 'Nuestro Cafetorium' } },
      { src: '/images/campus/milenio/milenio-soccer-field.jpg', caption: { en: 'Soccer Field', es: 'Cancha de Fútbol' } },
      { src: '/images/campus/milenio/milenio-welcome.jpg', caption: { en: 'Welcome to Campus Milenio', es: 'Bienvenidos a Campus Milenio' } },
      { src: '/images/campus/milenio/milenio-covered-court.jpg', caption: { en: 'Covered Multi-Sport Court', es: 'Cancha Multiusos Techada' } },
      { src: '/images/campus/milenio/milenio-nurse-office.jpg', caption: { en: 'Nurse\'s Office', es: 'Enfermería' } },
    ],
    testimonials: [
      {
        quote: 'Mis hijos son los más felices. Han tenido un desarrollo increíble en lo social y lo cognitivo. En NWL somos parte de una gran familia con experiencias nuevas y enriquecedoras.',
        author: 'S.M.D.',
        role: 'Mamá · Milenio',
      },
      {
        quote: 'Estamos muy contentos en Colegio NWL. Se tomaron el tiempo de escuchar nuestras necesidades. Nuestra hija lleva 4 años y cada día es una niña más segura de sí misma.',
        author: 'Familia O.D.',
        role: 'Primaria · 4 años en NWL',
      },
      {
        quote: 'Buscamos una escuela centrada en el desarrollo de cada alumno y la encontramos en NWL. La atención es personalizada y cuidan cada detalle.',
        author: 'A.P.',
        role: 'Mamá · Milenio',
      },
    ],
    googleRating: 4.5,
    googleReviewCount: 185,
  },

  /* ─────────────────────────  SAN MIGUEL DE ALLENDE  ─────────────────────── */
  'san-miguel': {
    slug: 'san-miguel',
    name: 'San Miguel de Allende',
    tagline: {
      en: 'Cultural richness meets academic excellence',
      es: 'Donde la riqueza cultural se encuentra con la excelencia académica',
    },
    levels: {
      en: 'Maternal — High School',
      es: 'Maternal — Preparatoria',
    },
    heroImage: '/images/campus/san-miguel/san-miguel-hero.jpg',
    phone: '415-690-3100',
    phoneLink: '4156903100',
    whatsapp: '5214156903100',
    stats: [
      { value: { en: 'Maternal – High School', es: 'Maternal – Prepa' }, label: { en: 'Academic Levels', es: 'Niveles Académicos' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Certified Teachers', es: 'Docentes Certificados' } },
      { value: { en: '2018', es: '2018' }, label: { en: 'Founded', es: 'Fundado' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Bilingual', es: 'Bilingüe' } },
    ],
    facilities: [
      { name: { en: 'Sports Fields', es: 'Canchas Deportivas' }, image: '/images/campus/san-miguel/san-miguel-sports.jpg' },
      { name: { en: 'Science Labs', es: 'Laboratorios de Ciencias' }, image: '/images/campus/san-miguel/san-miguel-labs.jpg' },
      { name: { en: 'Classrooms', es: 'Salones de Clase' }, image: '/images/campus/san-miguel/san-miguel-classrooms.jpg' },
      { name: { en: 'Playground', es: 'Área de Juegos' }, image: '/images/campus/san-miguel/san-miguel-playground.jpg' },
      { name: { en: 'Cafetorium', es: 'Cafetorium' }, image: '/images/campus/san-miguel/san-miguel-cafeteria.jpg' },
      { name: { en: 'Student Commons', es: 'Zona de Convivencia' }, image: '/images/campus/san-miguel/san-miguel-commons.jpg' },
    ],
    activities: [
      {
        name: { en: 'Sports', es: 'Deportes' },
        description: {
          en: 'Soccer, basketball, volleyball, and more competitive and recreational options.',
          es: 'Fútbol, basquetbol, voleibol y más opciones competitivas y recreativas.',
        },
        color: 'coral',
      },
      {
        name: { en: 'Arts & Culture', es: 'Arte y Cultura' },
        description: {
          en: 'Painting, sculpture, theater, and immersion in San Miguel\'s vibrant art scene.',
          es: 'Pintura, escultura, teatro e inmersión en la vibrante escena artística de San Miguel.',
        },
        color: 'tangerine',
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
      name: 'Lic. Ramón Godínez Ceja',
      title: { en: 'Campus Director', es: 'Director de Campus' },
      message: {
        en: 'At NWL San Miguel de Allende, we blend the cultural richness of this UNESCO World Heritage city with our commitment to academic excellence. Our students grow immersed in art, history, and a global perspective that sets them apart.',
        es: 'En NWL San Miguel de Allende, combinamos la riqueza cultural de esta ciudad Patrimonio de la Humanidad con nuestro compromiso con la excelencia académica. Nuestros alumnos crecen inmersos en arte, historia y una perspectiva global que los distingue.',
      },
      image: '/images/campus/san-miguel/san-miguel-director.jpg',
    },
    address: 'Carr. SMA – Querétaro, San José de la Posta, Guanajuato',
    city: 'San Miguel de Allende',
    state: 'Guanajuato',
    geo: { lat: 20.9007282723409, lng: -100.70576454273844 },
    mapUrl: 'https://maps.google.com/?q=Colegio+Newland+San+Miguel+de+Allende',
    galleryImages: [
      { src: '/images/campus/san-miguel/san-miguel-covered-court.jpg', caption: { en: 'Covered Sports Court', es: 'Cancha Deportiva Techada' } },
      { src: '/images/campus/san-miguel/san-miguel-building-playground.jpg', caption: { en: 'NWL Building & Playground', es: 'Edificio NWL y Área de Juegos' } },
      { src: '/images/campus/san-miguel/san-miguel-classrooms-gallery.jpg', caption: { en: 'Kinder Classroom', es: 'Salón de Kínder' } },
      { src: '/images/campus/san-miguel/san-miguel-hero.jpg', caption: { en: 'Be Proud, Be Newland', es: 'Be Proud, Be Newland' } },
      { src: '/images/campus/san-miguel/san-miguel-art-room.jpg', caption: { en: 'Art Room', es: 'Salón de Arte' } },
      { src: '/images/campus/san-miguel/san-miguel-soccer-gallery.jpg', caption: { en: 'Soccer Field', es: 'Cancha de Fútbol' } },
      { src: '/images/campus/san-miguel/san-miguel-prepa-classroom.jpg', caption: { en: 'Prepa Classroom', es: 'Salón de Preparatoria' } },
      { src: '/images/campus/san-miguel/san-miguel-cafeteria-gallery.jpg', caption: { en: 'Cafetorium', es: 'Cafetorium' } },
      { src: '/images/campus/san-miguel/san-miguel-kinder-courtyard.jpg', caption: { en: 'Kinder Courtyard', es: 'Patio de Kínder' } },
      { src: '/images/campus/san-miguel/san-miguel-reception.jpg', caption: { en: 'High School Area', es: 'Área de Preparatoria' } },
      { src: '/images/campus/san-miguel/san-miguel-playground-gallery.jpg', caption: { en: 'Pirate Ship Playground', es: 'Juegos Barco Pirata' } },
      { src: '/images/campus/san-miguel/san-miguel-commons-gallery.jpg', caption: { en: 'Student Lounge', es: 'Sala de Estudiantes' } },
      { src: '/images/campus/san-miguel/san-miguel-labs-gallery.jpg', caption: { en: 'Science Lab', es: 'Laboratorio de Ciencias' } },
      { src: '/images/campus/san-miguel/san-miguel-prepa-lounge.jpg', caption: { en: 'Prepa Lounge', es: 'Sala de Prepa' } },
      { src: '/images/campus/san-miguel/san-miguel-nwl-crest.jpg', caption: { en: 'NWL School Crest', es: 'Escudo NWL' } },
      { src: '/images/campus/san-miguel/san-miguel-outdoor-area.jpg', caption: { en: 'Outdoor Area', es: 'Área al Aire Libre' } },
    ],
    testimonials: [
      {
        quote: 'Lo que más nos impresionó fue el sentido de comunidad. Padres, maestros y alumnos se sienten como una gran familia.',
        author: 'R.G.',
        role: 'Papá · San Miguel de Allende',
      },
      {
        quote: 'Mis hijos son los más felices. Han tenido un desarrollo increíble en lo social y lo cognitivo. En NWL somos parte de una gran familia.',
        author: 'S.M.D.',
        role: 'Mamá · San Miguel de Allende',
      },
      {
        quote: 'Buscamos una escuela centrada en el desarrollo de cada alumno y la encontramos en NWL. La atención es personalizada y cuidan cada detalle.',
        author: 'A.P.',
        role: 'Mamá · San Miguel de Allende',
      },
    ],
    googleRating: 4.7,
    googleReviewCount: 150,
  },

  /* ─────────────────────────────  CORREGIDORA  ───────────────────────────── */
  corregidora: {
    slug: 'corregidora',
    name: 'Corregidora',
    tagline: {
      en: 'A warm, community-centered campus in the heart of Corregidora',
      es: 'Un campus cálido y comunitario en el corazón de Corregidora',
    },
    levels: {
      en: 'Maternal — High School',
      es: 'Maternal — Preparatoria',
    },
    heroImage: '/images/campus/corregidora/corregidora-campus-wide.jpg',
    phone: '442-671-7645/46',
    phoneLink: '4426717645',
    whatsapp: '5214426717645',
    stats: [
      { value: { en: 'Maternal – High School', es: 'Maternal – Prepa' }, label: { en: 'Academic Levels', es: 'Niveles Académicos' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Certified Teachers', es: 'Docentes Certificados' } },
      { value: { en: '2019', es: '2019' }, label: { en: 'Founded', es: 'Fundado' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Bilingual', es: 'Bilingüe' } },
    ],
    facilities: [
      { name: { en: 'Science Labs', es: 'Laboratorios de Ciencias' }, image: '/images/campus/corregidora/corregidora-labs.jpg' },
      { name: { en: 'Sports Fields', es: 'Canchas Deportivas' }, image: '/images/campus/corregidora/corregidora-sports.jpg' },
      { name: { en: 'Classrooms', es: 'Salones de Clase' }, image: '/images/campus/corregidora/corregidora-classrooms.jpg' },
      { name: { en: 'Playground', es: 'Área de Juegos' }, image: '/images/campus/corregidora/corregidora-playground.jpg' },
      { name: { en: 'Cafetorium', es: 'Cafetorium' }, image: '/images/campus/corregidora/corregidora-cafeteria.jpg' },
      { name: { en: 'Student Commons', es: 'Zona de Convivencia' }, image: '/images/campus/corregidora/corregidora-commons.jpg' },
    ],
    activities: [
      {
        name: { en: 'Sports', es: 'Deportes' },
        description: {
          en: 'Basketball, volleyball, and flag football.',
          es: 'Basquetbol, voleibol y tochito (flag football).',
        },
        color: 'lime',
      },
      {
        name: { en: 'Arts & Culture', es: 'Arte y Cultura' },
        description: {
          en: 'Dance, theater, and podcast creation.',
          es: 'Dance, teatro y creación de podcast.',
        },
        color: 'coral',
      },
      {
        name: { en: 'Robotics & STEAM', es: 'Robótica y STEAM' },
        description: {
          en: 'Hands-on projects in science, programming, and AI.',
          es: 'Proyectos prácticos en ciencia, programación y uso de IA.',
        },
        color: 'blueberry',
      },
      {
        name: { en: 'Music', es: 'Música' },
        description: {
          en: 'Instrument classes and ensemble performances.',
          es: 'Clases de instrumentos y presentaciones en conjunto.',
        },
        color: 'sunshine',
      },
    ],
    director: {
      name: 'José Gustavo Flores Espinosa',
      title: { en: 'Campus Director', es: 'Director de Campus' },
      message: {
        en: 'At Corregidora, we are passionate about serving a growing community with a close, warm, and human approach. We work hand in hand with each family to nurture the development and well-being of every student. Our mission is to develop and unlock the greatness within each one.',
        es: 'En Corregidora, nos apasiona servir a una comunidad en crecimiento con un enfoque cercano, cálido y humano. Trabajamos de la mano con cada familia para impulsar el desarrollo y bienestar de cada estudiante. Nuestra misión es desarrollar y potenciar la grandeza que hay en cada uno.',
      },
      image: '/images/campus/corregidora/corregidora-director.jpg',
    },
    address: 'Libramiento Sur Poniente, El Pueblito, Corregidora, Querétaro',
    city: 'Corregidora',
    state: 'Querétaro',
    geo: { lat: 20.52545872187598, lng: -100.42433560674684 },
    mapUrl: 'https://maps.google.com/?q=Colegio+Newland+Corregidora',
    galleryImages: [
      { src: '/images/campus/corregidora/corregidora-hero.jpg', caption: { en: 'Covered Sports Court', es: 'Cancha Deportiva Techada' } },
      { src: '/images/campus/corregidora/corregidora-kinder-classroom.jpg', caption: { en: 'Kinder Classroom', es: 'Salón de Kínder' } },
      { src: '/images/campus/corregidora/corregidora-building-aerial.jpg', caption: { en: 'Main Building', es: 'Edificio Principal' } },
      { src: '/images/campus/corregidora/corregidora-prepa-classroom-2.jpg', caption: { en: 'Prepa Tech Classroom', es: 'Salón Tecnológico de Prepa' } },
      { src: '/images/campus/corregidora/corregidora-school-bus.jpg', caption: { en: 'NWL School Bus', es: 'Autobús Escolar NWL' } },
      { src: '/images/campus/corregidora/corregidora-campus-aerial.jpg', caption: { en: 'Campus Overview', es: 'Vista General del Campus' } },
      { src: '/images/campus/corregidora/corregidora-commons-gallery.jpg', caption: { en: 'Student Commons', es: 'Zona de Convivencia' } },
      { src: '/images/campus/corregidora/corregidora-soccer.jpg', caption: { en: 'Soccer Field', es: 'Cancha de Fútbol' } },
      { src: '/images/campus/corregidora/corregidora-campus-wide.jpg', caption: { en: 'Campus & Playground', es: 'Campus y Área de Juegos' } },
      { src: '/images/campus/corregidora/corregidora-labs-gallery.jpg', caption: { en: 'Science Lab', es: 'Laboratorio de Ciencias' } },
      { src: '/images/campus/corregidora/corregidora-playground-gallery.jpg', caption: { en: 'Playground', es: 'Área de Juegos' } },
      { src: '/images/campus/corregidora/corregidora-garden.jpg', caption: { en: 'Garden & Play Area', es: 'Jardín y Área de Juegos' } },
      { src: '/images/campus/corregidora/corregidora-prepa-classroom.jpg', caption: { en: 'Prepa Classroom', es: 'Salón de Preparatoria' } },
      { src: '/images/campus/corregidora/corregidora-court.jpg', caption: { en: 'Basketball Court', es: 'Cancha de Basquetbol' } },
      { src: '/images/campus/corregidora/corregidora-cafeteria-gallery.jpg', caption: { en: 'Cafetorium', es: 'Cafetorium' } },
      { src: '/images/campus/corregidora/corregidora-kinder-area.jpg', caption: { en: 'Kinder Outdoor Area', es: 'Área Exterior de Kínder' } },
      { src: '/images/campus/corregidora/corregidora-classrooms.jpg', caption: { en: 'Classrooms', es: 'Salones de Clase' } },
      { src: '/images/campus/corregidora/corregidora-campus-playground.jpg', caption: { en: 'Playground & Rubik\'s Cube Building', es: 'Juegos y Edificio Cubo Rubik' } },
      { src: '/images/campus/corregidora/corregidora-prepa-classroom-3.jpg', caption: { en: 'Prepa Learning Space', es: 'Espacio de Aprendizaje Prepa' } },
      { src: '/images/campus/corregidora/corregidora-playground-closeup.jpg', caption: { en: 'Playground Close-Up', es: 'Área de Juegos de Cerca' } },
      { src: '/images/campus/corregidora/corregidora-building.jpg', caption: { en: 'Campus Building', es: 'Edificio del Campus' } },
    ],
    testimonials: [
      {
        quote: 'Estamos muy contentos en Colegio NWL. Se tomaron el tiempo de escuchar nuestras necesidades. Nuestra hija lleva 4 años y cada día es una niña más segura de sí misma.',
        author: 'Familia O.D.',
        role: 'Primaria · Corregidora',
      },
      {
        quote: 'Lo que más nos impresionó fue el sentido de comunidad. Padres, maestros y alumnos se sienten como una gran familia.',
        author: 'R.G.',
        role: 'Papá · Corregidora',
      },
      {
        quote: 'Buscamos una escuela centrada en el desarrollo de cada alumno y la encontramos en NWL. La atención es personalizada y cuidan cada detalle.',
        author: 'A.P.',
        role: 'Mamá · Corregidora',
      },
    ],
    googleRating: 4.5,
    googleReviewCount: 175,
  },

  /* ─────────────────────────────  ZIBATÁ  ───────────────────────────── */
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
    heroImage: '/images/campus/zibata/zibata-hero.jpg',
    phone: '442-161-2211/12',
    phoneLink: '4421612211',
    whatsapp: '5214421612211',
    stats: [
      { value: { en: 'Maternal – High School', es: 'Maternal – Prepa' }, label: { en: 'Academic Levels', es: 'Niveles Académicos' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Certified Teachers', es: 'Docentes Certificados' } },
      { value: { en: '2025', es: '2025' }, label: { en: 'Founded', es: 'Fundado' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Bilingual', es: 'Bilingüe' } },
    ],
    facilities: [
      { name: { en: 'Sports Fields', es: 'Canchas Deportivas' }, image: '/images/campus/zibata/zibata-sports.jpg' },
      { name: { en: 'Science Labs', es: 'Laboratorios de Ciencias' }, image: '/images/campus/zibata/zibata-labs.jpg' },
      { name: { en: 'Classrooms', es: 'Salones de Clase' }, image: '/images/campus/zibata/zibata-classrooms.jpg' },
      { name: { en: 'Playground', es: 'Área de Juegos' }, image: '/images/campus/zibata/zibata-playground.jpg' },
      { name: { en: 'Cafetorium', es: 'Cafetorium' }, image: '/images/campus/zibata/zibata-cafeteria.jpg' },
      { name: { en: 'Student Commons', es: 'Zona de Convivencia' }, image: '/images/campus/zibata/zibata-commons.jpg' },
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
      name: 'Daniela Arévalo Zapien',
      title: { en: 'Campus Director', es: 'Directora de Campus' },
      message: {
        en: 'At NWL Zibatá, we believe every child carries the potential for greatness. Our modern campus is designed to nurture curiosity, build confidence, and prepare students for a world full of possibilities. We welcome you to visit and experience the NWL difference firsthand.',
        es: 'En NWL Zibatá, creemos que cada niño lleva el potencial de la grandeza. Nuestro campus moderno está diseñado para nutrir la curiosidad, construir confianza y preparar a los alumnos para un mundo lleno de posibilidades. Te invitamos a visitarnos y vivir la diferencia NWL.',
      },
      image: '/images/campus/zibata/zibata-director.jpg',
    },
    address: 'Paseo de las Pitahayas, Zibatá, Querétaro',
    city: 'Zibatá, El Marqués',
    state: 'Querétaro',
    geo: { lat: 20.681857880179148, lng: -100.34012899325315 },
    mapUrl: 'https://maps.google.com/?q=Colegio+Newland+Zibata',
    galleryImages: [
      { src: '/images/campus/zibata/zibata-building.jpg', caption: { en: 'Campus Building', es: 'Edificio del Campus' } },
      { src: '/images/campus/zibata/zibata-sports.jpg', caption: { en: 'Sports & Active Play', es: 'Deporte y Juego Activo' } },
      { src: '/images/campus/zibata/zibata-soccer.jpg', caption: { en: 'Soccer Field', es: 'Cancha de Fútbol' } },
      { src: '/images/campus/zibata/zibata-labs.jpg', caption: { en: 'Hands-on Discovery in Our Labs', es: 'Descubrimiento en Nuestros Laboratorios' } },
      { src: '/images/campus/zibata/zibata-classrooms.jpg', caption: { en: 'Modern Learning Spaces', es: 'Espacios de Aprendizaje Modernos' } },
      { src: '/images/campus/zibata/zibata-playground.jpg', caption: { en: 'Play, Explore & Grow', es: 'Jugar, Explorar y Crecer' } },
      { src: '/images/campus/zibata/zibata-cafeteria.jpg', caption: { en: 'Our Cafetorium', es: 'Nuestro Cafetorium' } },
      { src: '/images/campus/zibata/zibata-commons.jpg', caption: { en: 'Where Friendships Grow', es: 'Donde Crecen las Amistades' } },
      { src: '/images/campus/zibata/zibata-hall-entrance.jpg', caption: { en: 'Main Entrance Hall', es: 'Vestíbulo Principal' } },
      { src: '/images/campus/zibata/zibata-hallway.jpg', caption: { en: 'Campus Hallway', es: 'Pasillo del Campus' } },
      { src: '/images/campus/zibata/zibata-hallway2.jpg', caption: { en: 'Campus Corridors', es: 'Corredores del Campus' } },
      { src: '/images/campus/zibata/zibata-interior.jpg', caption: { en: 'Interior Spaces', es: 'Espacios Interiores' } },
      { src: '/images/campus/zibata/zibata-reception.jpg', caption: { en: 'Reception Area', es: 'Área de Recepción' } },
      { src: '/images/campus/zibata/zibata-preschool-classroom.jpg', caption: { en: 'Preschool Classroom', es: 'Aula de Preescolar' } },
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
