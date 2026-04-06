// ---------------------------------------------------------------------------
// informacion-data.ts  —  SEO landing page data for /informacion/[slug]
// Part 1 of 2: Type definitions + pages 1-23
// ---------------------------------------------------------------------------

export interface InformacionFAQ {
  question: string;
  answer: string;
}

export interface InformacionSection {
  heading: string;
  body: string;
}

export interface InformacionPage {
  slug: string;
  lang: 'es' | 'en';
  title: string;
  h1: string;
  description: string;
  uniqueIntro: string;
  sections: InformacionSection[];
  faqs: InformacionFAQ[];
  images: {
    hero: string;
    content: [string, string];
  };
  targetCampus?: string;
  targetLevel?: string;
  targetNeighborhood?: string;
  category: 'campus' | 'neighborhood' | 'level' | 'general';
  hreflangPair?: string;
  keywords: string[];
}

// ---------------------------------------------------------------------------
// Pages record  (keys = slug)
// ---------------------------------------------------------------------------

export const informacionPages: Record<string, InformacionPage> = {

  // =========================================================================
  // PAGE 1 — Kinder en Juriquilla
  // =========================================================================
  'colegio-privado-con-kinder-en-juriquilla': {
    slug: 'colegio-privado-con-kinder-en-juriquilla',
    lang: 'es',
    title: 'Colegio con kinder privado en Juriquilla Queretaro | Newland School',
    h1: 'El mejor kinder privado en Juriquilla para tu hijos',
    description:
      'Descubre el kinder privado en Juriquilla de Newland School: programa bilingüe, Filosofía para Niños y un entorno seguro para el desarrollo integral de tu hijo.',
    uniqueIntro:
      'Desde 2009, NWL Juriquilla ha sido el campus insignia de Colegio Newland en Querétaro. Nuestro kinder recibe niños de 3 a 5 años en un entorno rodeado de áreas verdes, con canchas deportivas, cafetorium y salones diseñados para la primera infancia. Aquí, cada alumno inicia su vida escolar con la metodología Knotion, inmersión bilingüe y el acompañamiento de la Mtra. Dayana Rose Gómez y su equipo.',
    sections: [
      {
        heading: 'Knotion: Aprendizaje sin tarea tradicional',
        body: 'En el kinder de Juriquilla utilizamos Knotion, una metodología internacional basada en proyectos donde los niños resuelven retos reales en lugar de llevar tarea a casa. Cada proyecto integra ciencias, lenguaje y habilidades socioemocionales de forma natural.\n\nLos pequeños trabajan en equipos, presentan sus descubrimientos frente a sus compañeros y desarrollan autonomía desde los 3 años. Este enfoque elimina la tarea tradicional y la reemplaza con experiencias que despiertan curiosidad genuina.',
      },
      {
        heading: 'Yo Soy Líder NWL by Tec de Monterrey',
        body: 'Juriquilla es uno de los campus donde se aplica el programa Yo Soy Líder NWL, diseñado exclusivamente para Colegio Newland por el Tecnológico de Monterrey. Desde kinder, los niños aprenden a identificar emociones, resolver conflictos y trabajar en equipo.\n\nEl programa desarrolla los 7 hábitos de liderazgo adaptados a la edad preescolar, combinando actividades lúdicas con herramientas de inteligencia emocional que los preparan para la convivencia escolar y familiar.',
      },
      {
        heading: 'Fútbol, teatro y robótica desde preescolar',
        body: 'El kinder de Juriquilla ofrece actividades extracurriculares que van más allá del aula: fútbol y basquetbol en nuestras canchas deportivas, artes visuales, teatro y las primeras experiencias de robótica STEAM.\n\nEstas actividades complementan la formación académica y permiten que cada niño descubra sus talentos en un campus con instalaciones completas, incluyendo área de juegos, cancha de fútbol y zona de convivencia.',
      },
    ],
    faqs: [
      {
        question: '¿A partir de qué edad pueden ingresar al kinder en Juriquilla?',
        answer:
          'El kinder de Newland School Juriquilla recibe alumnos a partir de los 3 años. El horario es de 8:20 a 1:50 pm. El campus, fundado en 2009, cuenta con 4.6 estrellas en Google (320+ reseñas) y ofrece desde maternal hasta secundaria.',
      },
      {
        question: '¿El kinder en Juriquilla es completamente bilingüe?',
        answer:
          'Sí. Utilizamos la metodología Knotion que integra el inglés de forma natural en proyectos interdisciplinarios. No hay tarea tradicional; el aprendizaje ocurre a través de retos reales. La directora del campus es la Mtra. Dayana Rose Gómez.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-classroom.jpg',
        '/images/campus/juriquilla/juriquilla-playground.jpg',
      ],
    },
    targetCampus: 'juriquilla',
    targetLevel: '/kinder',
    category: 'campus',
    keywords: [
      'kinder privado juriquilla',
      'colegio kinder juriquilla queretaro',
      'preescolar bilingüe juriquilla',
      'kinder newland juriquilla',
    ],
  },

  // =========================================================================
  // PAGE 2 — Secundaria en Juriquilla
  // =========================================================================
  'colegio-privado-con-secundaria-en-juriquilla': {
    slug: 'colegio-privado-con-secundaria-en-juriquilla',
    lang: 'es',
    title: 'Secundaria privada en Juriquilla Queretaro | Newland School',
    h1: 'Conoce la opción ideal de secundaria en Juriquilla',
    description:
      'Secundaria privada en Juriquilla con formación bilingüe, laboratorios de ciencias y programa de Filosofía para Niños. Prepara a tu hijo para la preparatoria con Newland School.',
    uniqueIntro:
      'La secundaria de NWL Juriquilla prepara adolescentes de 12 a 15 años con un modelo que combina el programa de Emprendizaje con Universidad Mondragón, certificaciones Cambridge PET/FCE y la Doble Certificación Internacional (diploma EUA + México vía Hokku Academy). Con más de 90 cámaras de seguridad y un horario de 7:30 a 2:30 pm, las familias de Juriquilla cuentan con la tranquilidad de un campus fundado en 2009 y respaldado por 4.6 estrellas en Google.',
    sections: [
      {
        heading: 'Emprendizaje con Universidad Mondragón',
        body: 'Los alumnos de secundaria en Juriquilla participan en el programa de Emprendizaje, desarrollado en colaboración con la Universidad Mondragón. A lo largo de los tres años, los estudiantes crean proyectos empresariales reales, aprenden sobre finanzas básicas y presentan sus propuestas ante jurados.\n\nEste programa transforma la manera en que los adolescentes entienden el trabajo: no se trata de memorizar, sino de resolver problemas reales con creatividad y responsabilidad social.',
      },
      {
        heading: 'Doble Certificación Internacional',
        body: 'La secundaria de Juriquilla ofrece la Doble Certificación Internacional a través de Hokku Academy: los alumnos obtienen tanto el diploma mexicano (SEP) como el estadounidense (acreditado por Cognia). Esto les permite postularse a preparatorias y universidades en ambos países.\n\nAdemás, los estudiantes se preparan para certificaciones Cambridge PET y FCE, alcanzando un nivel B1-B2 de inglés al egresar. Participan en Model ONU, debate y oratoria como parte de su formación.',
      },
      {
        heading: 'Deporte y actividades en campus Juriquilla',
        body: 'La secundaria aprovecha las instalaciones del campus insignia: cancha de fútbol, canchas de basquetbol y voleibol, cafetorium y zonas de convivencia. Los alumnos practican fútbol, basquetbol, voleibol, artes visuales, teatro, robótica STEAM y música.\n\nLa Filosofía para Niños continúa en secundaria con sesiones de debate estructurado, y el Diplomado para Padres ofrece a las familias herramientas para acompañar la adolescencia de sus hijos.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria en Juriquilla prepara para certificaciones internacionales?',
        answer:
          'Sí. Los alumnos se preparan para certificaciones Cambridge PET y FCE, y obtienen la Doble Certificación Internacional (diploma EUA + México) a través de Hokku Academy. El programa de Emprendizaje con Universidad Mondragón complementa la formación.',
      },
      {
        question: '¿Qué actividades extracurriculares ofrece la secundaria en Juriquilla?',
        answer:
          'Fútbol, basquetbol, voleibol, artes visuales, teatro, robótica STEAM, música, Model ONU y debate. El campus cuenta con más de 90 cámaras de seguridad 24/7 y el horario es de 7:30 a 2:30 pm.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/levels/secundaria/nwl-secundaria-lab-experiment.jpg',
        '/images/campus/juriquilla/juriquilla-sports.jpg',
      ],
    },
    targetCampus: 'juriquilla',
    targetLevel: '/middle-school',
    category: 'campus',
    keywords: [
      'secundaria privada juriquilla',
      'secundaria bilingüe juriquilla queretaro',
      'colegio secundaria juriquilla',
      'newland secundaria juriquilla',
    ],
  },

  // =========================================================================
  // PAGE 3 — Maternal en Juriquilla
  // =========================================================================
  'colegio-privado-en-juriquilla-con-maternal': {
    slug: 'colegio-privado-en-juriquilla-con-maternal',
    lang: 'es',
    title: 'Colegio con maternal privado en Juriquilla | Newland School',
    h1: 'NWL es el maternal privado en Juriquilla ideal',
    description:
      'Maternal privado en Juriquilla: estimulación temprana bilingüe, espacios seguros y acompañamiento socioemocional desde los primeros meses. Conoce Newland School.',
    uniqueIntro:
      'El maternal de NWL Juriquilla es el único programa en Querétaro que ofrece Estimulación Multisensorial especializada para niños desde los 2 años. Combinamos el programa Brain Up de inmersión en inglés con Filosofía para Niños adaptada a los más pequeños y el programa Corazones Mágicos de prevención de violencia. El horario es de 8:20 a 1:30 pm en nuestro campus insignia fundado en 2009.',
    sections: [
      {
        heading: 'Brain Up: Inglés desde los 2 años',
        body: 'Brain Up es nuestro programa de inmersión temprana en inglés, diseñado para aprovechar la ventana de adquisición lingüística de los niños más pequeños. Desde los 2 años, los alumnos de maternal en Juriquilla escuchan, cantan y juegan en inglés de forma natural.\n\nA diferencia de una clase de idiomas tradicional, Brain Up integra el inglés en todas las rutinas del día: la hora de comer, los cuentos, las canciones y las actividades sensoriales. Los niños adquieren el segundo idioma como si fuera materno.',
      },
      {
        heading: 'Estimulación Multisensorial: Único en Querétaro',
        body: 'NWL es el único colegio en Querétaro con un programa de Estimulación Multisensorial en maternal. Los niños exploran texturas, sonidos, aromas y movimientos en espacios diseñados por especialistas en desarrollo infantil.\n\nCada sesión combina estimulación visual, auditiva, táctil y vestibular, fortaleciendo las conexiones neuronales en la etapa de mayor plasticidad cerebral. Este programa se complementa con psicomotricidad gruesa y fina adaptada a cada niño.',
      },
      {
        heading: 'Corazones Mágicos y Desapego Seguro',
        body: 'El programa Corazones Mágicos enseña a los más pequeños a identificar emociones, poner límites y pedir ayuda, previniendo situaciones de violencia desde la primera infancia. Se trabaja con cuentos, títeres y dinámicas de grupo adaptadas a niños de 2-3 años.\n\nEl protocolo de Desapego Seguro acompaña la transición del hogar a la escuela, respetando el ritmo de cada niño. NWL Juriquilla también es Bullying Free School (BFS), lo que garantiza un ambiente de respeto desde maternal.',
      },
    ],
    faqs: [
      {
        question: '¿Desde qué edad aceptan niños en el maternal de Juriquilla?',
        answer:
          'El maternal de NWL Juriquilla recibe niños desde los 2 años cumplidos. El horario es de 8:20 a 1:30 pm. Contamos con el programa Brain Up (inglés desde los 2 años), Estimulación Multisensorial (único en Querétaro) y Corazones Mágicos.',
      },
      {
        question: '¿Qué hace diferente al maternal de NWL Juriquilla?',
        answer:
          'Somos el único colegio en Querétaro con Estimulación Multisensorial en maternal. Además, ofrecemos Brain Up (inmersión en inglés), Yo Soy Líder NWL by Tec de Monterrey, Filosofía para Niños adaptada y el programa Corazones Mágicos de prevención. Campus fundado en 2009 con 4.6★ en Google.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/levels/maternal/maternal-playtime.jpg',
        '/images/campus/juriquilla/juriquilla-cafeteria.jpg',
      ],
    },
    targetCampus: 'juriquilla',
    targetLevel: '/maternal',
    category: 'campus',
    keywords: [
      'maternal privado juriquilla',
      'guardería juriquilla queretaro',
      'estimulación temprana juriquilla',
      'maternal newland juriquilla',
    ],
  },

  // =========================================================================
  // PAGE 4 — Escuela bilingüe en Juriquilla (multi-level)
  // =========================================================================
  'escuela-particular-y-bilingue-en-juriquilla': {
    slug: 'escuela-particular-y-bilingue-en-juriquilla',
    lang: 'es',
    title: 'Colegio o escuela privada bilingüe en Juriquilla | Newland School',
    h1: 'Opción de escuela en Juriquilla con programa bilingüe',
    description:
      'Escuela privada bilingüe en Juriquilla con maternal, kinder, primaria y secundaria. Modelo educativo integral con Filosofía para Niños en Newland School.',
    uniqueIntro:
      'NWL Juriquilla es nuestro campus fundador (2009) y ofrece un recorrido educativo completo desde maternal hasta secundaria. Con 4.6 estrellas en Google y más de 320 reseñas, es el campus con la trayectoria más larga de Colegio Newland. La Mtra. Dayana Rose Gómez dirige un equipo docente que aplica Knotion, Filosofía para Niños y Yo Soy Líder NWL en cada nivel.',
    sections: [
      {
        heading: 'De Brain Up a Emprendizaje: Un camino continuo',
        body: 'En maternal, los niños comienzan con Brain Up (inmersión en inglés desde los 2 años) y Estimulación Multisensorial. En kinder, Knotion reemplaza la tarea tradicional por proyectos reales. En primaria, TecniKids STEAM Lab introduce impresión 3D, corte láser y robótica.\n\nAl llegar a secundaria, los alumnos participan en Emprendizaje con Universidad Mondragón y obtienen la Doble Certificación Internacional. Cada nivel construye sobre el anterior, formando egresados bilingües, emprendedores y con pensamiento crítico.',
      },
      {
        heading: 'Certificaciones Cambridge y acreditación Cognia',
        body: 'Los alumnos de Juriquilla se preparan para certificaciones Cambridge desde primaria (Starters, Movers, Flyers) hasta secundaria (PET, FCE). La acreditación Cognia respalda la calidad académica del sistema NWL a nivel internacional.\n\nDesde 5.° de primaria, los estudiantes acceden a viajes internacionales que complementan su formación global. En secundaria, participan en Model ONU, debate y oratoria para desarrollar habilidades de comunicación y liderazgo.',
      },
      {
        heading: 'Campus insignia: Instalaciones y comunidad',
        body: 'Juriquilla cuenta con canchas de fútbol, basquetbol y voleibol, cafetorium, salones equipados, área de juegos y zona de convivencia. Las actividades incluyen fútbol, basquetbol, artes visuales, teatro, robótica STEAM y música.\n\nMás de 90 cámaras de seguridad operan 24/7. El programa BFS (Bullying Free School) y el Diplomado para Padres crean una comunidad educativa donde cada familia se siente acompañada. Los niveles cubren de maternal (8:20 am) a secundaria (7:30 am).',
      },
    ],
    faqs: [
      {
        question: '¿Newland School en Juriquilla ofrece todos los niveles educativos?',
        answer:
          'Juriquilla ofrece maternal, kinder, primaria y secundaria (no preparatoria). Es nuestro campus insignia fundado en 2009, con 4.6★ en Google y 320+ reseñas. La directora es la Mtra. Dayana Rose Gómez.',
      },
      {
        question: '¿Qué porcentaje del programa es en inglés?',
        answer:
          'El programa es 100% bilingüe con metodología Knotion. Los alumnos obtienen certificaciones Cambridge en cada nivel y pueden acceder a la Doble Certificación Internacional (diploma EUA + México) en secundaria vía Hokku Academy.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-group-classroom-wide.jpg',
        '/images/campus/juriquilla/juriquilla-commons.jpg',
      ],
    },
    targetCampus: 'juriquilla',
    category: 'campus',
    keywords: [
      'escuela bilingüe juriquilla',
      'colegio privado juriquilla queretaro',
      'escuela particular juriquilla',
      'newland school juriquilla',
    ],
  },

  // =========================================================================
  // PAGE 5 — Escuela cerca de Zibatá
  // =========================================================================
  'escuela-privada-cerca-de-zibata-queretaro': {
    slug: 'escuela-privada-cerca-de-zibata-queretaro',
    lang: 'es',
    title: 'Escuela privada cerca de Zibatá Querétaro | Newland School',
    h1: 'NWL es la escuela en Zibatá Querétaro que buscas',
    description:
      'Escuela privada cerca de Zibatá con programa bilingüe, Filosofía para Niños y todos los niveles desde maternal hasta prepa. Conoce Newland School campus Zibatá.',
    uniqueIntro:
      'NWL Zibatá es nuestro campus más nuevo (2025) y el más moderno de la red, con instalaciones de última generación y todos los niveles desde maternal hasta preparatoria. Dirigido por Daniela Arévalo, el campus cuenta con 4.5 estrellas en Google y 230+ reseñas. Zibatá es la única comunidad en Querétaro donde puedes encontrar un colegio con Life Project, Doble Diploma y preparatoria NWL a pasos de tu casa.',
    sections: [
      {
        heading: 'Maternal a Prepa: Trayectoria completa en Zibatá',
        body: 'A diferencia de otros campus de NWL, Zibatá ofrece todos los niveles, incluyendo preparatoria. Los niños inician con Brain Up y Estimulación Multisensorial en maternal (2 años), avanzan con Knotion sin tarea en kinder, y llegan al TecniKids STEAM Lab en primaria con impresión 3D y robótica.\n\nEn secundaria, participan en Emprendizaje con Universidad Mondragón y obtienen la Doble Certificación Internacional. Y en preparatoria, el programa Life Project los guía con mentores personales hacia su proyecto de vida a lo largo de 6 semestres.',
      },
      {
        heading: 'Life Project y Doble Diploma en Preparatoria',
        body: 'La preparatoria NWL Zibatá ofrece el Doble Diploma: los alumnos egresan con validez SEP (México) y un diploma estadounidense acreditado por Cognia. Desde el primer semestre, acceden a certificaciones Kn U High y Coursera que los preparan para la universidad.\n\nEl programa incluye Inteligencia Financiera cada semestre, IA y Tecnología Moderna, el programa HIT/Hyrox de fitness en campus y un Portafolio de 6 Proyectos Personales. En 5.° y 6.° semestre, participan en intercambio internacional.',
      },
      {
        heading: 'Instalaciones modernas y comunidad en crecimiento',
        body: 'El campus Zibatá fue diseñado desde cero con las necesidades de cada nivel en mente: áreas de estimulación sensorial para maternal, maker spaces para primaria, laboratorios para secundaria y espacios de innovación para preparatoria.\n\nLas familias de Zibatá y El Refugio cuentan con un campus a minutos de su hogar, con programa BFS (Bullying Free School), Filosofía para Niños en todos los niveles y el respaldo del modelo NWL con Yo Soy Líder by Tec de Monterrey.',
      },
    ],
    faqs: [
      {
        question: '¿Qué tan cerca está Newland School del fraccionamiento Zibatá?',
        answer:
          'El campus Zibatá se encuentra dentro de la zona de Zibatá, a pocos minutos de los accesos principales. Fundado en 2025, es nuestro campus más moderno y ofrece todos los niveles de maternal a preparatoria. Directora: Daniela Arévalo.',
      },
      {
        question: '¿El campus Zibatá tiene preparatoria?',
        answer:
          'Sí. Zibatá es uno de los 3 campus NWL con preparatoria (junto con San Miguel y Corregidora). La prepa incluye Life Project, Doble Diploma (EUA + México), certificaciones Kn U High/Coursera, Inteligencia Financiera y programa HIT/Hyrox.',
      },
    ],
    images: {
      hero: '/images/campus/zibata/zibata-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-steam-lab.jpg',
        '/images/campus/zibata/zibata-sports.jpg',
      ],
    },
    targetCampus: 'zibata',
    category: 'campus',
    keywords: [
      'escuela privada zibata',
      'colegio zibata queretaro',
      'escuela bilingüe zibata',
      'newland school zibata',
    ],
  },

  // =========================================================================
  // PAGE 6 — Escuela cerca de Milenio
  // =========================================================================
  'escuela-privada-cerca-de-milenio': {
    slug: 'escuela-privada-cerca-de-milenio',
    lang: 'es',
    title: 'Escuela privada cerca de Milenio Querétaro | Newland School',
    h1: 'Conoce nuestra escuela en Milenio Querétaro',
    description:
      'Escuela privada cerca de Milenio III con todos los niveles, programa bilingüe y formación integral. Descubre Newland School campus Milenio en Querétaro.',
    uniqueIntro:
      'NWL Milenio fue fundado en 2016 y es nuestro campus acreditado por Cognia, con terraza rooftop, el icónico letrero LÍDER y 4.5 estrellas en Google (185+ reseñas). Bajo la dirección de la Mtra. Ximena Arellano, ofrece maternal, kinder, primaria y secundaria con un modelo que integra talleres de cocina, yoga, dance team y robótica STEAM que lo distinguen de otros colegios en la zona sur de Querétaro.',
    sections: [
      {
        heading: 'Talleres de cocina, yoga y dance team',
        body: 'Milenio se diferencia de otros campus NWL por su oferta de actividades únicas: talleres de cocina donde los alumnos aprenden nutrición y gastronomía básica, sesiones de yoga que desarrollan concentración y manejo de estrés, y un dance team competitivo.\n\nEstas actividades se suman al voleibol, tochito, basquetbol, fútbol, robótica STEAM y música. La terraza rooftop del campus ofrece un espacio al aire libre para eventos, clases especiales y convivencia familiar.',
      },
      {
        heading: 'Acreditación Cognia: Calidad internacional comprobada',
        body: 'NWL Milenio cuenta con acreditación Cognia, un sello de calidad internacional que evalúa estándares académicos, gobernanza y mejora continua. Menos del 5% de las escuelas privadas en México cuentan con esta certificación.\n\nEsta acreditación respalda la Doble Certificación Internacional que los alumnos de secundaria obtienen (diploma EUA + México vía Hokku Academy), así como las certificaciones Cambridge en todos los niveles.',
      },
      {
        heading: 'De maternal a secundaria con el modelo NWL completo',
        body: 'Los niños de 2 años comienzan en maternal con Brain Up y Estimulación Multisensorial. En kinder (3-5 años), Knotion elimina la tarea tradicional. En primaria, el TecniKids STEAM Lab y los viajes internacionales desde 5.° grado amplían su horizonte.\n\nLa secundaria ofrece Emprendizaje con Universidad Mondragón, certificaciones Cambridge PET/FCE y más de 90 cámaras de seguridad. La Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey acompañan cada etapa.',
      },
    ],
    faqs: [
      {
        question: '¿Qué niveles ofrece Newland School cerca de Milenio?',
        answer:
          'NWL Milenio ofrece maternal, kinder, primaria y secundaria (no preparatoria). Fundado en 2016, es el campus con acreditación Cognia y cuenta con 4.5★ en Google (185+ reseñas). Directora: Mtra. Ximena Arellano.',
      },
      {
        question: '¿Qué diferencia a NWL Milenio de otros campus?',
        answer:
          'Milenio es el único campus con acreditación Cognia, terraza rooftop, letrero LÍDER, y talleres exclusivos de cocina, yoga y dance team. También ofrece tochito, voleibol, basquetbol, fútbol, robótica STEAM y música.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-students-closeup.jpg',
        '/images/campus/milenio/milenio-cafeteria.jpg',
      ],
    },
    targetCampus: 'milenio',
    category: 'campus',
    keywords: [
      'escuela privada milenio queretaro',
      'colegio milenio iii',
      'escuela bilingüe milenio',
      'newland school milenio',
    ],
  },

  // =========================================================================
  // PAGE 7 — Primaria en Milenio
  // =========================================================================
  'primarias-cerca-de-milenio-queretaro': {
    slug: 'primarias-cerca-de-milenio-queretaro',
    lang: 'es',
    title: 'Primaria privada cerca de Milenio Querétaro | Newland School',
    h1: 'Conoce nuestra primaria en Milenio Querétaro',
    description:
      'Primaria privada cerca de Milenio Querétaro con programa bilingüe, STEAM y Filosofía para Niños. Formación integral en Newland School campus Milenio.',
    uniqueIntro:
      'La primaria de NWL Milenio recibe alumnos de 6 a 11 años en un campus acreditado por Cognia, con instalaciones que incluyen laboratorio STEAM, cancha de fútbol, cancha techada y cafetería. El horario es de 7:40 a 2:30 pm, sin tarea tradicional gracias a la metodología Knotion IMPACT y Design Thinking.',
    sections: [
      {
        heading: 'Knotion IMPACT y TecniKids STEAM Lab',
        body: 'La primaria en Milenio utiliza Knotion IMPACT, donde los alumnos resuelven problemas reales de su comunidad aplicando Design Thinking. No hay tarea tradicional: el aprendizaje ocurre a través de proyectos que integran ciencias, tecnología y humanidades.\n\nEl TecniKids STEAM Lab del campus ofrece impresión 3D, corte láser, robótica y maker spaces donde los niños construyen prototipos de sus soluciones. Estas habilidades los preparan para las certificaciones y competencias de secundaria.',
      },
      {
        heading: 'Cambridge, Cognia y viajes internacionales',
        body: 'Los alumnos de primaria en Milenio se preparan para certificaciones Cambridge (Starters, Movers, Flyers). La acreditación Cognia del campus respalda los estándares académicos internacionales que se aplican en cada grado.\n\nDesde 5.° grado, los estudiantes acceden a viajes internacionales que complementan su formación global. El programa BFS (Bullying Free School) y la Filosofía para Niños con Diploma para Padres crean un ecosistema educativo integral.',
      },
      {
        heading: 'Deportes y talleres exclusivos de Milenio',
        body: 'La primaria en Milenio destaca por actividades que no encontrarás en otros campus: talleres de cocina, yoga y dance team se suman a voleibol, tochito, basquetbol, fútbol, robótica STEAM y música.\n\nEl campus cuenta con cancha de fútbol, cancha techada, laboratorio STEAM, cafetería y la icónica terraza rooftop. El programa Yo Soy Líder NWL by Tec de Monterrey desarrolla liderazgo e inteligencia emocional en cada alumno.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria en Milenio incluye actividades STEAM?',
        answer:
          'Sí. El TecniKids STEAM Lab ofrece impresión 3D, corte láser, robótica y maker spaces. La metodología Knotion IMPACT elimina la tarea tradicional y la reemplaza con proyectos de Design Thinking. Campus acreditado por Cognia.',
      },
      {
        question: '¿Cuál es el horario de la primaria en Milenio?',
        answer:
          'El horario de primaria es de 7:40 a 2:30 pm. Los alumnos acceden a certificaciones Cambridge, viajes internacionales desde 5.° grado, y actividades como cocina, yoga, dance team, deportes, robótica y música.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-teacher-ipad-guidance.jpg',
        '/images/campus/milenio/milenio-lab.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/elementary',
    category: 'campus',
    keywords: [
      'primaria privada milenio queretaro',
      'escuela primaria milenio iii',
      'primaria bilingüe milenio',
      'newland primaria milenio',
    ],
  },

  // =========================================================================
  // PAGE 8 — Kinder en Milenio
  // =========================================================================
  'kinder-en-milenio-queretaro': {
    slug: 'kinder-en-milenio-queretaro',
    lang: 'es',
    title: 'Kinder particular cerca de Milenio Querétaro | Newland School',
    h1: 'Kinder en Milenio Querétaro con excelente oferta académica',
    description:
      'Kinder particular cerca de Milenio con programa bilingüe, Filosofía para Niños y espacios diseñados para primera infancia. Inscripciones abiertas en Newland School.',
    uniqueIntro:
      'El kinder de NWL Milenio recibe niños de 3 a 5 años en un campus acreditado por Cognia, con áreas de juego diseñadas para preescolar, terraza rooftop y el acompañamiento de la Mtra. Ximena Arellano. Utilizamos Knotion (sin tarea tradicional), Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey. El horario es de 8:20 a 1:50 pm.',
    sections: [
      {
        heading: 'Knotion: Proyectos en vez de tarea',
        body: 'En el kinder de Milenio no hay cuadernos de tarea. La metodología Knotion sustituye la tarea tradicional por proyectos donde los niños investigan, crean y presentan sus descubrimientos. Cada proyecto integra lenguaje, ciencias, arte y habilidades socioemocionales.\n\nLos pequeños trabajan en equipos, aprenden a hacer preguntas y desarrollan autonomía desde los 3 años. Los docentes documentan el proceso de aprendizaje con portafolios digitales que comparten con las familias.',
      },
      {
        heading: 'Filosofía para Niños y liderazgo emocional',
        body: 'Las sesiones de Filosofía para Niños en kinder utilizan cuentos, imágenes y preguntas abiertas para que los pequeños exploren conceptos como la amistad, la justicia y las emociones. Aprenden a escuchar, argumentar y respetar opiniones diferentes.\n\nEl programa Yo Soy Líder NWL by Tec de Monterrey complementa esta formación con los 7 hábitos de liderazgo adaptados a preescolar: proactividad, cooperación, empatía y pensamiento ganar-ganar.',
      },
      {
        heading: 'Dance team, cocina y yoga desde preescolar',
        body: 'El kinder de Milenio ofrece actividades exclusivas de este campus: dance team, talleres de cocina adaptados a la edad preescolar y sesiones de yoga para desarrollar concentración y equilibrio.\n\nEstas actividades se suman a basquetbol, fútbol, robótica STEAM y música. El campus cuenta con áreas de juego con piso amortiguante, la terraza rooftop para actividades al aire libre y el programa BFS (Bullying Free School) desde preescolar.',
      },
    ],
    faqs: [
      {
        question: '¿El kinder en Milenio tiene áreas de juego seguras?',
        answer:
          'Sí. El campus cuenta con áreas de juego con piso amortiguante, terraza rooftop y espacios diseñados para preescolar. NWL Milenio es Bullying Free School y tiene acreditación Cognia. Directora: Mtra. Ximena Arellano.',
      },
      {
        question: '¿Cuál es el horario del kinder en Milenio?',
        answer:
          'El horario regular es de 8:20 a 1:50 pm. El kinder usa Knotion (sin tarea tradicional), Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey. Actividades incluyen dance team, cocina, yoga, deportes, robótica y música.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-playground.jpg',
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/kinder',
    category: 'campus',
    keywords: [
      'kinder milenio queretaro',
      'kinder particular milenio iii',
      'preescolar milenio queretaro',
      'kinder bilingüe milenio',
    ],
  },

  // =========================================================================
  // PAGE 9 — Secundaria en Milenio
  // =========================================================================
  'secundaria-en-milenio-queretaro': {
    slug: 'secundaria-en-milenio-queretaro',
    lang: 'es',
    title: 'Secundaria particular cerca de Milenio Querétaro | Newland School',
    h1: 'Secundaria en Milenio Querétaro con educación integral',
    description:
      'Secundaria particular cerca de Milenio con formación bilingüe, laboratorios y programa de Filosofía para Niños. Forma parte de Newland School campus Milenio.',
    uniqueIntro:
      'La secundaria de NWL Milenio (fundado 2016) prepara adolescentes de 12 a 15 años en un campus acreditado por Cognia. Aquí, el programa de Emprendizaje con Universidad Mondragón, la Doble Certificación Internacional (diploma EUA + México) y las certificaciones Cambridge PET/FCE se combinan con talleres de cocina, yoga y dance team que hacen de Milenio un campus único en la zona sur.',
    sections: [
      {
        heading: 'Emprendizaje y Doble Certificación en Milenio',
        body: 'Los alumnos de secundaria participan en Emprendizaje, el programa de emprendimiento desarrollado con Universidad Mondragón. Durante 3 años, crean proyectos empresariales reales con impacto social, aprendiendo finanzas, mercadotecnia y presentación ejecutiva.\n\nLa Doble Certificación Internacional vía Hokku Academy les otorga un diploma estadounidense (acreditado por Cognia) junto con su certificado SEP mexicano. Esto les abre puertas a preparatorias en ambos países.',
      },
      {
        heading: 'Cambridge PET/FCE y Model ONU',
        body: 'La secundaria bilingüe de Milenio prepara a los alumnos para certificaciones Cambridge PET y FCE, alcanzando nivel B1-B2 de inglés al egresar. El campus con acreditación Cognia respalda estos estándares internacionales.\n\nLos estudiantes participan en Model ONU, debate y oratoria, desarrollando habilidades de comunicación, negociación y liderazgo. La Filosofía para Niños evoluciona hacia análisis de dilemas éticos y debate estructurado.',
      },
      {
        heading: 'Seguridad, deporte y actividades Milenio',
        body: 'El campus cuenta con más de 90 cámaras de seguridad 24/7, cancha de fútbol, cancha techada y laboratorio STEAM. Los alumnos practican voleibol, tochito, basquetbol, fútbol, y las actividades exclusivas de Milenio: dance team, talleres de cocina y yoga.\n\nEl horario es de 7:30 a 2:30 pm. El Diplomado para Padres de Filosofía para Niños y el programa Yo Soy Líder NWL by Tec de Monterrey acompañan tanto a alumnos como a familias durante la adolescencia.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria en Milenio ofrece orientación vocacional?',
        answer:
          'Sí. El programa de Emprendizaje con Universidad Mondragón incluye desarrollo de proyectos empresariales que orientan vocacionalmente. Además, la Doble Certificación Internacional les da opciones de continuar estudios en México o EUA.',
      },
      {
        question: '¿La secundaria de Milenio tiene acreditación Cognia?',
        answer:
          'Sí. NWL Milenio es el campus con acreditación Cognia, lo que respalda la Doble Certificación Internacional. El campus tiene 4.5★ en Google (185+ reseñas), fue fundado en 2016 y es dirigido por la Mtra. Ximena Arellano.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/secundaria/nwl-secundaria-lab-team-fist-bump.jpg',
        '/images/campus/milenio/milenio-covered-court.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/middle-school',
    category: 'campus',
    keywords: [
      'secundaria milenio queretaro',
      'secundaria particular milenio iii',
      'secundaria bilingüe milenio',
      'newland secundaria milenio',
    ],
  },

  // =========================================================================
  // PAGE 10 — Escuela en El Mirador
  // =========================================================================
  'escuelas-en-el-mirador-queretaro': {
    slug: 'escuelas-en-el-mirador-queretaro',
    lang: 'es',
    title: 'Escuela o Colegio cerca del Mirador Querétaro | Newland School',
    h1: 'Un innovador colegio en El Mirador Querétaro',
    description:
      'Colegio privado cerca de El Mirador Querétaro con programa bilingüe y todos los niveles. Descubre Newland School campus Milenio, la opción más cercana.',
    uniqueIntro:
      'Las familias de El Mirador tienen en NWL campus Milenio su escuela bilingüe más cercana, a solo 10-15 minutos en auto. El campus, fundado en 2016 y acreditado por Cognia, ofrece maternal a secundaria con actividades únicas como talleres de cocina, yoga y dance team que complementan el modelo Knotion, Filosofía para Niños y Yo Soy Líder NWL.',
    sections: [
      {
        heading: 'Campus Milenio: A 10 minutos de El Mirador',
        body: 'NWL campus Milenio se encuentra a solo 10-15 minutos del fraccionamiento El Mirador por las vialidades principales. Contamos con rutas de transporte escolar que cubren El Mirador para mayor comodidad de las familias.\n\nEl campus ofrece maternal (2 años), kinder, primaria y secundaria en un solo lugar, evitando cambios de escuela. Fue fundado en 2016, cuenta con acreditación Cognia y 4.5★ en Google con 185+ reseñas.',
      },
      {
        heading: 'Knotion, Brain Up y sin tarea tradicional',
        body: 'Los niños de El Mirador que asisten a NWL Milenio se benefician de un modelo sin tarea tradicional. En maternal, Brain Up introduce el inglés desde los 2 años. En kinder y primaria, Knotion IMPACT utiliza proyectos y Design Thinking en lugar de cuadernos de tarea.\n\nEn primaria, el TecniKids STEAM Lab ofrece impresión 3D, corte láser y robótica. En secundaria, el Emprendizaje con Universidad Mondragón prepara emprendedores. Cada nivel incluye Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey.',
      },
      {
        heading: 'Cocina, yoga y dance team solo en Milenio',
        body: 'NWL Milenio ofrece actividades que no encontrarás en otros colegios de la zona: talleres de cocina, sesiones de yoga y un dance team competitivo. Estas se suman a voleibol, tochito, basquetbol, fútbol, robótica STEAM y música.\n\nEl campus cuenta con terraza rooftop, cancha techada, cancha de fútbol, laboratorio STEAM y cafetería. Más de 90 cámaras de seguridad operan 24/7 y el programa BFS (Bullying Free School) garantiza un ambiente seguro.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo se tarda en llegar desde El Mirador al campus Milenio?',
        answer:
          'Aproximadamente 10 a 15 minutos en auto. También ofrecemos transporte escolar con rutas que cubren El Mirador. El campus Milenio tiene acreditación Cognia y ofrece maternal a secundaria.',
      },
      {
        question: '¿Qué actividades ofrece NWL para las familias de El Mirador?',
        answer:
          'Campus Milenio ofrece talleres de cocina, yoga, dance team, tochito, voleibol, basquetbol, fútbol, robótica STEAM y música. Es Bullying Free School con 90+ cámaras de seguridad. Directora: Mtra. Ximena Arellano.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-group-classroom-wide.jpg',
        '/images/campus/milenio/milenio-building.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetNeighborhood: 'El Mirador',
    category: 'neighborhood',
    keywords: [
      'escuela el mirador queretaro',
      'colegio privado el mirador',
      'escuela cerca del mirador',
      'newland school el mirador',
    ],
  },

  // =========================================================================
  // PAGE 11 — Maternal en San Miguel de Allende
  // =========================================================================
  'escuela-maternal-en-san-miguel-de-allende': {
    slug: 'escuela-maternal-en-san-miguel-de-allende',
    lang: 'es',
    title: 'Escuela Maternal en San Miguel de Allende | Newland School',
    h1: 'Contamos con escuelas con maternal en San Miguel de Allende',
    description:
      'Maternal privado en San Miguel de Allende con estimulación temprana bilingüe y espacios seguros. Descubre el programa de primera infancia de Newland School.',
    uniqueIntro:
      'NWL San Miguel de Allende, fundado en 2018, ofrece maternal para niños desde 2 años en una ciudad Patrimonio UNESCO. Dirigido por el Lic. Ramón Godínez, el campus tiene 4.7 estrellas en Google (la calificación más alta de la red NWL) y un área de juegos con barco pirata que encanta a los más pequeños. El horario de maternal es de 8:20 a 1:30 pm.',
    sections: [
      {
        heading: 'Brain Up y Estimulación Multisensorial en San Miguel',
        body: 'El maternal de San Miguel aprovecha la riqueza sensorial de una ciudad llena de color, música y arte. El programa Brain Up introduce el inglés desde los 2 años de forma natural, mientras que la Estimulación Multisensorial (único programa de su tipo en Querétaro) desarrolla conexiones neuronales a través de texturas, sonidos y movimientos.\n\nLa comunidad multicultural de San Miguel de Allende potencia la experiencia: los niños conviven con familias mexicanas y extranjeras, escuchando diferentes idiomas y costumbres desde sus primeros años de vida escolar.',
      },
      {
        heading: 'Corazones Mágicos y Desapego Seguro',
        body: 'El programa Corazones Mágicos enseña a los niños más pequeños a identificar y expresar emociones, a poner límites sanos y a pedir ayuda cuando lo necesitan. Se trabaja con cuentos, títeres y dinámicas adaptadas a niños de 2-3 años.\n\nEl protocolo de Desapego Seguro acompaña el proceso de separación entre padres e hijos con sensibilidad y respeto. NWL San Miguel es Bullying Free School (BFS) desde maternal, creando un ambiente de confianza desde el primer día.',
      },
      {
        heading: 'Playground con barco pirata y arte en San Miguel',
        body: 'El campus San Miguel cuenta con un área de juegos con barco pirata que estimula la imaginación y la motricidad gruesa. Los pequeños de maternal exploran este espacio diariamente como parte de su desarrollo físico y social.\n\nLa inmersión en la escena artística de San Miguel de Allende enriquece el programa: los niños se inspiran en los colores, texturas y tradiciones de una de las ciudades más creativas de México. El programa de Filosofía para Niños adaptada a maternal fomenta la curiosidad y el asombro.',
      },
    ],
    faqs: [
      {
        question: '¿A partir de qué edad aceptan niños en el maternal de San Miguel de Allende?',
        answer:
          'El maternal recibe niños desde los 2 años. El horario es de 8:20 a 1:30 pm. El campus fue fundado en 2018, tiene 4.7★ en Google (150+ reseñas) y es dirigido por el Lic. Ramón Godínez. Ofrece de maternal a preparatoria.',
      },
      {
        question: '¿El maternal en San Miguel de Allende recibe alumnos de familias extranjeras?',
        answer:
          'Sí. San Miguel de Allende es ciudad UNESCO con una comunidad internacional activa. El programa Brain Up de inmersión en inglés y la diversidad del alumnado facilitan la integración de familias de cualquier nacionalidad.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/maternal/maternal-roleplay.jpg',
        '/images/campus/san-miguel/san-miguel-kinder-courtyard.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    targetLevel: '/maternal',
    category: 'campus',
    keywords: [
      'maternal san miguel de allende',
      'guardería san miguel de allende',
      'estimulación temprana san miguel',
      'newland san miguel maternal',
    ],
  },

  // =========================================================================
  // PAGE 12 — Kinder en San Miguel de Allende
  // =========================================================================
  'kinder-en-san-miguel-de-allende': {
    slug: 'kinder-en-san-miguel-de-allende',
    lang: 'es',
    title: 'Kinder en San Miguel de Allende | Newland School',
    h1: 'Las ventajas de nuestro kinder en San Miguel de Allende',
    description:
      'Kinder bilingüe en San Miguel de Allende con Filosofía para Niños, programa STEAM y espacios seguros. Conoce las ventajas de Newland School para tus hijos.',
    uniqueIntro:
      'El kinder de NWL San Miguel recibe niños de 3 a 5 años en una ciudad Patrimonio UNESCO. Con 4.7 estrellas en Google y la dirección del Lic. Ramón Godínez, este campus ofrece Knotion (sin tarea tradicional), un playground con barco pirata y la inmersión en la escena artística más vibrante de México. El horario es de 8:20 a 1:50 pm.',
    sections: [
      {
        heading: 'Knotion sin tarea en la ciudad más creativa',
        body: 'La metodología Knotion en San Miguel elimina la tarea tradicional y la sustituye por proyectos que conectan el aprendizaje con el entorno cultural de la ciudad. Los niños investigan sobre colores, tradiciones y naturaleza aprovechando la riqueza de San Miguel de Allende.\n\nCada proyecto integra lenguaje, ciencias, arte y habilidades socioemocionales. Los pequeños presentan sus descubrimientos, desarrollando desde temprano confianza para comunicar ideas en español e inglés.',
      },
      {
        heading: 'Arte e inmersión cultural en San Miguel',
        body: 'NWL San Miguel aprovecha la escena artística de la ciudad para enriquecer la experiencia de kinder. Las actividades incluyen pintura, escultura y teatro inspirados en las tradiciones y el patrimonio cultural del entorno.\n\nLa convivencia con familias mexicanas e internacionales crea un ambiente multicultural natural donde los niños desarrollan sensibilidad cultural y empatía desde los 3 años. El programa de Filosofía para Niños fortalece esta apertura al diálogo y la reflexión.',
      },
      {
        heading: 'Barco pirata, Yo Soy Líder y BFS',
        body: 'El playground con barco pirata es uno de los espacios más queridos del campus: estimula la imaginación, la motricidad gruesa y el juego cooperativo. Los niños de kinder lo utilizan diariamente como parte de su desarrollo integral.\n\nEl programa Yo Soy Líder NWL by Tec de Monterrey desarrolla los 7 hábitos de liderazgo desde preescolar. NWL San Miguel es Bullying Free School (BFS) con protocolo de prevención y el programa Corazones Mágicos que acompaña a los más pequeños.',
      },
    ],
    faqs: [
      {
        question: '¿El kinder en San Miguel de Allende ofrece programa bilingüe completo?',
        answer:
          'Sí. El kinder usa Knotion, metodología internacional que integra español e inglés sin tarea tradicional. El campus tiene 4.7★ en Google, la calificación más alta de la red NWL. Director: Lic. Ramón Godínez.',
      },
      {
        question: '¿Qué actividades artísticas ofrece el kinder en San Miguel?',
        answer:
          'Pintura, escultura, teatro y actividades inspiradas en la escena artística de San Miguel de Allende. También robotics/STEAM, música y deportes. El campus cuenta con playground con barco pirata y fue fundado en 2018.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-friends.jpg',
        '/images/campus/san-miguel/san-miguel-playground.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    targetLevel: '/kinder',
    category: 'campus',
    keywords: [
      'kinder san miguel de allende',
      'preescolar san miguel de allende',
      'kinder bilingüe san miguel',
      'newland kinder san miguel',
    ],
  },

  // =========================================================================
  // PAGE 13 — Primaria en San Miguel de Allende
  // =========================================================================
  'escuela-primaria-en-san-miguel-de-allende': {
    slug: 'escuela-primaria-en-san-miguel-de-allende',
    lang: 'es',
    title: 'Escuela Primaria en San Miguel de Allende | Newland School',
    h1: 'Conoce nuestra escuela con primaria en San Miguel de Allende',
    description:
      'Primaria bilingüe en San Miguel de Allende con programa STEAM, Filosofía para Niños y certificaciones internacionales. Inscripciones abiertas en Newland School.',
    uniqueIntro:
      'La primaria de NWL San Miguel recibe alumnos de 6 a 11 años en una ciudad Patrimonio UNESCO. El campus, fundado en 2018 con 4.7★ en Google, combina el TecniKids STEAM Lab con la inmersión en la escena artística de San Miguel: pintura, escultura y teatro se viven como parte del currículo. Horario: 7:40 a 2:30 pm, sin tarea tradicional.',
    sections: [
      {
        heading: 'TecniKids STEAM Lab y arte en San Miguel',
        body: 'La primaria de San Miguel fusiona tecnología y arte de una forma única. El TecniKids STEAM Lab ofrece impresión 3D, corte láser, robótica y maker spaces, mientras que las actividades artísticas aprovechan la riqueza cultural de la ciudad: pintura, escultura y teatro con inspiración en el patrimonio de San Miguel.\n\nLa metodología Knotion IMPACT con Design Thinking elimina la tarea tradicional. Los alumnos resuelven problemas reales de su comunidad integrando ciencias, tecnología y humanidades en cada proyecto.',
      },
      {
        heading: 'Cambridge, viajes internacionales y Cognia',
        body: 'Los alumnos se preparan para certificaciones Cambridge (Starters, Movers, Flyers) desde 3.° grado. La acreditación Cognia del sistema NWL respalda los estándares académicos internacionales. Desde 5.° grado, acceden a viajes internacionales.\n\nEl contexto multicultural de San Miguel potencia la preparación global: los alumnos conviven con compañeros de distintas nacionalidades y practican inglés en contextos reales fuera del aula, acelerando su dominio del idioma.',
      },
      {
        heading: 'Filosofía para Niños y Diploma para Padres',
        body: 'Las sesiones semanales de Filosofía para Niños en primaria trabajan con textos narrativos y dilemas morales. Los alumnos aprenden a formular hipótesis, identificar supuestos y comunicar sus ideas con estructura argumentativa.\n\nEl Diploma para Padres de Filosofía para Niños ofrece a las familias herramientas para continuar el diálogo filosófico en casa. El programa Yo Soy Líder NWL by Tec de Monterrey y BFS (Bullying Free School) completan la formación integral.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria en San Miguel de Allende prepara para certificaciones Cambridge?',
        answer:
          'Sí. Desde 3.° grado se preparan para Cambridge Starters, Movers y Flyers. Desde 5.° grado acceden a viajes internacionales. El campus fue fundado en 2018 y tiene 4.7★ en Google. Director: Lic. Ramón Godínez.',
      },
      {
        question: '¿La primaria en San Miguel incluye educación artística?',
        answer:
          'Sí, con un enfoque único. Además de artes visuales y música, el programa aprovecha la escena artística de San Miguel de Allende para ofrecer pintura, escultura y teatro inspirados en el patrimonio cultural de la ciudad UNESCO.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-group-classroom-wide.jpg',
        '/images/campus/san-miguel/san-miguel-art-room.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    targetLevel: '/elementary',
    category: 'campus',
    keywords: [
      'primaria san miguel de allende',
      'escuela primaria bilingüe san miguel',
      'primaria privada san miguel',
      'newland primaria san miguel',
    ],
  },

  // =========================================================================
  // PAGE 14 — Secundaria en San Miguel de Allende
  // =========================================================================
  'secundaria-en-san-miguel-de-allende': {
    slug: 'secundaria-en-san-miguel-de-allende',
    lang: 'es',
    title: 'Secundaria en San Miguel de Allende | Newland School',
    h1: 'Conoce nuestra secundaria en San Miguel de Allende',
    description:
      'Secundaria bilingüe en San Miguel de Allende con laboratorios, certificaciones Cambridge y Filosofía para Niños. Formación integral en Newland School.',
    uniqueIntro:
      'La secundaria de NWL San Miguel (fundado 2018, 4.7★ en Google) prepara adolescentes de 12 a 15 años en una ciudad Patrimonio UNESCO. El programa combina Emprendizaje con Universidad Mondragón, Doble Certificación Internacional (diploma EUA + México) y la inmersión en la escena artística y cultural de San Miguel. Horario: 7:30 a 2:30 pm.',
    sections: [
      {
        heading: 'Emprendizaje en una ciudad cosmopolita',
        body: 'El programa de Emprendizaje con Universidad Mondragón cobra un significado especial en San Miguel de Allende, donde la comunidad internacional y el espíritu emprendedor son parte de la vida cotidiana. Los alumnos crean proyectos empresariales reales inspirados en las necesidades de una ciudad turística y cultural.\n\nDurante 3 años, los estudiantes aprenden finanzas, mercadotecnia y presentación ejecutiva, presentando sus propuestas ante jurados que incluyen empresarios locales. La diversidad cultural del entorno enriquece cada proyecto.',
      },
      {
        heading: 'Doble Certificación y Cambridge PET/FCE',
        body: 'La Doble Certificación Internacional vía Hokku Academy otorga a los alumnos un diploma estadounidense (acreditado por Cognia) junto con el certificado SEP mexicano. En una ciudad con tanta población extranjera, este doble diploma es especialmente valorado.\n\nLas certificaciones Cambridge PET y FCE consolidan un nivel B1-B2 de inglés. Los alumnos practican el idioma no solo en el aula sino en la vida cotidiana de San Miguel, donde el inglés se escucha en cada esquina.',
      },
      {
        heading: 'Arte, debate y seguridad en campus San Miguel',
        body: 'La secundaria aprovecha la riqueza artística de San Miguel: los alumnos participan en talleres de pintura, escultura y teatro que se nutren del patrimonio cultural de la ciudad. Model ONU, debate y oratoria complementan su formación.\n\nEl campus cuenta con más de 90 cámaras de seguridad 24/7, laboratorios de ciencias y espacios deportivos. El Diplomado para Padres de Filosofía para Niños y el programa BFS garantizan un ambiente de respeto y confianza.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria en San Miguel de Allende tiene laboratorio de ciencias?',
        answer:
          'Sí. El campus cuenta con laboratorios equipados, más de 90 cámaras de seguridad 24/7 y espacios para arte, pintura, escultura y teatro. Horario: 7:30-2:30 pm. Campus fundado en 2018 con 4.7★ en Google.',
      },
      {
        question: '¿Ofrecen actividades culturales en la secundaria de San Miguel?',
        answer:
          'Sí. Pintura, escultura, teatro, robótica STEAM y música, aprovechando la escena artística de San Miguel de Allende. El Emprendizaje con Universidad Mondragón y Model ONU complementan la formación. Director: Lic. Ramón Godínez.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/secundaria/milenio-classroom-secondary.jpg',
        '/images/campus/san-miguel/san-miguel-labs.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    targetLevel: '/middle-school',
    category: 'campus',
    keywords: [
      'secundaria san miguel de allende',
      'secundaria bilingüe san miguel',
      'secundaria privada san miguel de allende',
      'newland secundaria san miguel',
    ],
  },

  // =========================================================================
  // PAGE 15 — Escuela bilingüe en San Miguel de Allende
  // =========================================================================
  'escuela-bilingue-en-san-miguel-de-allende': {
    slug: 'escuela-bilingue-en-san-miguel-de-allende',
    lang: 'es',
    title: 'Escuela Bilingüe en San Miguel de Allende | Newland School',
    h1: 'Una vanguardista escuela bilingüe en San Miguel de Allende',
    description:
      'Escuela bilingüe en San Miguel de Allende con todos los niveles: maternal a prepa. Programa internacional, Filosofía para Niños y formación integral en Newland School.',
    uniqueIntro:
      'NWL San Miguel de Allende es el único colegio bilingüe en la ciudad con trayectoria completa de maternal a preparatoria. Fundado en 2018 en una ciudad Patrimonio UNESCO, con 4.7 estrellas en Google y bajo la dirección del Lic. Ramón Godínez, el campus integra la escena artística local con el modelo NWL: Knotion, Filosofía para Niños, Yo Soy Líder by Tec de Monterrey y Life Project en preparatoria.',
    sections: [
      {
        heading: 'Maternal a Prepa en una ciudad Patrimonio UNESCO',
        body: 'San Miguel de Allende es uno de los 3 campus NWL que ofrece preparatoria (junto con Corregidora y Zibatá). Los niños inician con Brain Up a los 2 años, avanzan con Knotion sin tarea, y en primaria acceden al TecniKids STEAM Lab y viajes internacionales desde 5.° grado.\n\nEn secundaria, Emprendizaje con Universidad Mondragón y la Doble Certificación Internacional los preparan para la preparatoria NWL, donde el programa Life Project, el Doble Diploma y certificaciones Kn U High/Coursera definen su camino universitario.',
      },
      {
        heading: 'Comunidad multicultural y arte como eje formativo',
        body: 'La diversidad de San Miguel de Allende (familias mexicanas, estadounidenses, canadienses, europeas) enriquece naturalmente el programa bilingüe. Los niños practican inglés en contextos reales fuera del aula y desarrollan sensibilidad intercultural de forma orgánica.\n\nLas actividades artísticas aprovechan el patrimonio de la ciudad: pintura, escultura, teatro y la inmersión en galerías, festivales y tradiciones locales. Esto hace de NWL San Miguel una experiencia educativa irrepetible.',
      },
      {
        heading: 'Life Project y Doble Diploma en prepa San Miguel',
        body: 'La preparatoria NWL San Miguel ofrece el Doble Diploma (SEP México + diploma EUA acreditado por Cognia), Life Project con mentores personales durante 6 semestres, y certificaciones Kn U High/Coursera desde el primer semestre.\n\nEl programa incluye Inteligencia Financiera, IA y Tecnología Moderna, HIT/Hyrox fitness, un Portafolio de 6 Proyectos Personales e intercambio internacional en 5.° y 6.° semestre. Todo esto en el contexto cultural único de San Miguel de Allende.',
      },
    ],
    faqs: [
      {
        question: '¿Newland School San Miguel ofrece preparatoria?',
        answer:
          'Sí. San Miguel es uno de los 3 campus con preparatoria. La prepa incluye Life Project, Doble Diploma, Kn U High/Coursera, Inteligencia Financiera y HIT/Hyrox. El campus tiene 4.7★ en Google, la calificación más alta de la red.',
      },
      {
        question: '¿Qué niveles educativos ofrece la escuela bilingüe en San Miguel?',
        answer:
          'De maternal (2 años) a preparatoria (17 años). Es la trayectoria educativa más completa de San Miguel de Allende. Fundado en 2018, con playground con barco pirata y actividades artísticas únicas. Director: Lic. Ramón Godínez.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-steam-lab.jpg',
        '/images/campus/san-miguel/san-miguel-commons.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    category: 'campus',
    hreflangPair: 'international-school-in-san-miguel-de-allende',
    keywords: [
      'escuela bilingüe san miguel de allende',
      'colegio bilingüe san miguel',
      'escuela privada san miguel de allende',
      'newland school san miguel',
      'colegio internacional san miguel',
    ],
  },

  // =========================================================================
  // PAGE 16 — Kinder y maternal en Corregidora
  // =========================================================================
  'colegio-con-kinder-y-maternal-en-corregidora-queretaro': {
    slug: 'colegio-con-kinder-y-maternal-en-corregidora-queretaro',
    lang: 'es',
    title: 'Colegio con kinder y maternal en Corregidora Querétaro | Newland School',
    h1: 'Conoce nuestro colegio en Corregidora Querétaro',
    description:
      'Colegio con kinder y maternal en Corregidora Querétaro: programa bilingüe, Filosofía para Niños y espacios seguros para primera infancia. Conoce Newland School.',
    uniqueIntro:
      'NWL Corregidora fue fundado en 2019 y se distingue por su icónico edificio con forma de cubo Rubik. Bajo la dirección de José Gustavo Flores, el campus ofrece de maternal a preparatoria con 4.5 estrellas en Google (175+ reseñas). En maternal y kinder, los niños desde 2 años se benefician de Brain Up, Estimulación Multisensorial y actividades como basquetbol, dance y teatro.',
    sections: [
      {
        heading: 'Brain Up y Estimulación Multisensorial en Corregidora',
        body: 'El maternal de Corregidora (desde los 2 años) ofrece Brain Up, el programa de inmersión en inglés que introduce el segundo idioma de forma natural a través de canciones, cuentos y rutinas cotidianas. La Estimulación Multisensorial, única en Querétaro, desarrolla conexiones neuronales a través de experiencias táctiles, auditivas y visuales.\n\nEl horario de maternal es de 8:20 a 1:30 pm. En kinder (3-5 años, hasta 1:50 pm), la metodología Knotion elimina la tarea tradicional y la reemplaza con proyectos que integran ambos idiomas.',
      },
      {
        heading: 'Yo Soy Líder, BFS y Corazones Mágicos',
        body: 'El programa Yo Soy Líder NWL by Tec de Monterrey adapta los 7 hábitos de liderazgo a la primera infancia: proactividad, cooperación, empatía y pensamiento ganar-ganar. Es exclusivo de Colegio Newland, diseñado y avalado por el Tec de Monterrey.\n\nCorazones Mágicos enseña prevención de violencia desde los 2 años. El protocolo de Desapego Seguro acompaña la transición hogar-escuela. NWL Corregidora es Bullying Free School (BFS) desde maternal.',
      },
      {
        heading: 'Edificio cubo Rubik y actividades en Corregidora',
        body: 'El campus Corregidora es fácil de reconocer por su edificio con forma de cubo Rubik, diseñado para inspirar la creatividad desde el exterior. Las áreas de juego para maternal y kinder incluyen espacios con piso amortiguante, materiales sensoriales y zona de psicomotricidad.\n\nLos niños de kinder practican basquetbol, dance, teatro, robótica STEAM y música. La Filosofía para Niños se introduce desde kinder con cuentos y preguntas abiertas que desarrollan curiosidad y capacidad de diálogo.',
      },
    ],
    faqs: [
      {
        question: '¿El colegio en Corregidora tiene maternal y kinder?',
        answer:
          'Sí. NWL Corregidora ofrece maternal desde los 2 años (8:20-1:30 pm) y kinder de 3 a 5 años (8:20-1:50 pm). El campus fue fundado en 2019, tiene 4.5★ en Google y ofrece hasta preparatoria. Director: José Gustavo Flores.',
      },
      {
        question: '¿Qué actividades ofrece el kinder en Corregidora?',
        answer:
          'Basquetbol, dance, teatro, robótica STEAM, música, Knotion sin tarea, Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey. El campus cuenta con su icónico edificio cubo Rubik y es Bullying Free School.',
      },
    ],
    images: {
      hero: '/images/campus/corregidora/corregidora-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-students.jpg',
        '/images/campus/corregidora/corregidora-playground.jpg',
      ],
    },
    targetCampus: 'corregidora',
    targetLevel: '/kinder',
    category: 'campus',
    keywords: [
      'kinder corregidora queretaro',
      'maternal corregidora queretaro',
      'colegio corregidora',
      'preescolar corregidora queretaro',
    ],
  },

  // =========================================================================
  // PAGE 17 — Primaria y secundaria en Corregidora
  // =========================================================================
  'escuela-con-primaria-y-secundaria-en-corregidora-queretaro': {
    slug: 'escuela-con-primaria-y-secundaria-en-corregidora-queretaro',
    lang: 'es',
    title: 'Escuela con primaria y secundaria en Corregidora Querétaro | Newland School',
    h1: 'Una de las mejores escuelas en Corregidora Querétaro',
    description:
      'Escuela con primaria y secundaria en Corregidora con programa bilingüe, laboratorios y actividades extracurriculares. Forma parte de Newland School Corregidora.',
    uniqueIntro:
      'NWL Corregidora (fundado 2019, 4.5★ en Google) ofrece de maternal a preparatoria en su campus con edificio cubo Rubik. Bajo la dirección de José Gustavo Flores, la primaria y secundaria se distinguen por incluir creación de podcasts, programación e inteligencia artificial como parte de las actividades extracurriculares, junto con el modelo Knotion sin tarea y certificaciones Cambridge.',
    sections: [
      {
        heading: 'Knotion IMPACT, TecniKids y podcasts en Corregidora',
        body: 'La primaria (7:40-2:30 pm) usa Knotion IMPACT con Design Thinking: los alumnos resuelven problemas reales sin tarea tradicional. El TecniKids STEAM Lab ofrece impresión 3D, corte láser, robótica y maker spaces.\n\nLo que distingue a Corregidora es la inclusión de creación de podcasts, programación e inteligencia artificial como actividades extracurriculares. Los alumnos aprenden a grabar, editar y publicar contenido digital desde primaria, preparándose para el mundo tecnológico.',
      },
      {
        heading: 'Emprendizaje, Cambridge y Doble Certificación',
        body: 'En secundaria (7:30-2:30 pm), el programa de Emprendizaje con Universidad Mondragón desafía a los alumnos a crear proyectos empresariales reales. La Doble Certificación Internacional (diploma EUA + México vía Hokku Academy) y las certificaciones Cambridge PET/FCE consolidan su perfil internacional.\n\nModel ONU, debate, oratoria y Filosofía para Niños con análisis de dilemas éticos preparan adolescentes con pensamiento crítico. El Diplomado para Padres acompaña a las familias durante la etapa más desafiante.',
      },
      {
        heading: 'Deportes, arte y seguridad en el cubo Rubik',
        body: 'El campus Corregidora ofrece basquetbol, voleibol, tochito, dance, teatro, programación, AI, podcasts, robótica STEAM y música. La variedad de actividades permite que cada alumno descubra sus talentos en un ambiente seguro con 90+ cámaras 24/7.\n\nEl programa BFS (Bullying Free School), Yo Soy Líder NWL by Tec de Monterrey y la Filosofía para Niños con Diploma para Padres crean una comunidad educativa donde las familias de Corregidora se sienten parte de algo especial.',
      },
    ],
    faqs: [
      {
        question: '¿La escuela en Corregidora ofrece primaria y secundaria en el mismo campus?',
        answer:
          'Sí. NWL Corregidora ofrece de maternal a preparatoria en un solo campus (edificio cubo Rubik). Primaria: 7:40-2:30 pm. Secundaria: 7:30-2:30 pm. Fundado 2019, 4.5★ en Google, 175+ reseñas. Director: José Gustavo Flores.',
      },
      {
        question: '¿Qué actividades extracurriculares ofrece la escuela en Corregidora?',
        answer:
          'Basquetbol, voleibol, tochito, dance, teatro, creación de podcasts, programación, inteligencia artificial, robótica STEAM y música. Es el único campus NWL con podcasts y AI como actividades regulares.',
      },
    ],
    images: {
      hero: '/images/campus/corregidora/corregidora-hero.jpg',
      content: [
        '/images/levels/secundaria/nwl-secundaria-lab-experiment.jpg',
        '/images/campus/corregidora/corregidora-sports.jpg',
      ],
    },
    targetCampus: 'corregidora',
    category: 'campus',
    keywords: [
      'escuela primaria corregidora queretaro',
      'secundaria corregidora queretaro',
      'escuela privada corregidora',
      'newland school corregidora',
    ],
  },

  // =========================================================================
  // PAGE 18 — Secundaria cerca de Loma Dorada
  // =========================================================================
  'secundaria-cerca-de-loma-dorada-queretaro': {
    slug: 'secundaria-cerca-de-loma-dorada-queretaro',
    lang: 'es',
    title: 'Secundaria cerca de Loma Dorada Querétaro | Newland School',
    h1: 'Conoce la secundaria en Loma Dorada NWL',
    description:
      'Secundaria privada cerca de Loma Dorada Querétaro con programa bilingüe, laboratorios y Filosofía para Niños. Descubre Newland School campus Milenio.',
    uniqueIntro:
      'Las familias de Loma Dorada tienen en NWL campus Milenio la secundaria bilingüe más cercana, a solo 10 minutos en auto. Los alumnos de 12-15 años acceden al programa de Emprendizaje con Universidad Mondragón, Doble Certificación Internacional y certificaciones Cambridge PET/FCE en un campus acreditado por Cognia con 4.5★ en Google.',
    sections: [
      {
        heading: 'Emprendizaje con Universidad Mondragón',
        body: 'Los adolescentes de Loma Dorada que asisten a NWL Milenio participan en Emprendizaje, el programa de emprendimiento con Universidad Mondragón. Durante 3 años de secundaria, crean proyectos empresariales reales con impacto social, aprendiendo finanzas, mercadotecnia y presentación ejecutiva.\n\nEste programa transforma la relación de los jóvenes con el trabajo y la creatividad, formando emprendedores con visión social que saben identificar problemas y proponer soluciones innovadoras.',
      },
      {
        heading: 'Doble Certificación y Cambridge en campus Cognia',
        body: 'NWL Milenio es el campus con acreditación Cognia, lo que respalda la Doble Certificación Internacional que los alumnos obtienen (diploma EUA + México vía Hokku Academy). Las certificaciones Cambridge PET y FCE consolidan un nivel B1-B2 de inglés.\n\nEsta combinación de certificaciones abre puertas a preparatorias y universidades tanto en México como en Estados Unidos, un diferenciador importante para los egresados.',
      },
      {
        heading: 'Transporte, seguridad y actividades para Loma Dorada',
        body: 'NWL Milenio ofrece rutas de transporte escolar que cubren Loma Dorada, con unidades monitoreadas por GPS. El campus cuenta con 90+ cámaras de seguridad 24/7, cancha de fútbol, cancha techada y laboratorio STEAM.\n\nLas actividades incluyen voleibol, tochito, basquetbol, fútbol, dance team, talleres de cocina, yoga, robótica STEAM y música. El horario de secundaria es de 7:30 a 2:30 pm. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿Cómo llego a Newland School desde Loma Dorada?',
        answer:
          'NWL campus Milenio se encuentra a unos 10 minutos en auto desde Loma Dorada. Ofrecemos transporte escolar con rutas que cubren la zona. Campus fundado en 2016 con acreditación Cognia y 4.5★ en Google.',
      },
      {
        question: '¿Qué certificaciones obtienen los alumnos de secundaria?',
        answer:
          'Cambridge PET/FCE (nivel B1-B2), Doble Certificación Internacional (diploma EUA + México vía Hokku Academy) y programa de Emprendizaje con Universidad Mondragón. Todo respaldado por la acreditación Cognia del campus.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/secundaria/nwl-secundaria-lab-team-fist-bump.jpg',
        '/images/campus/milenio/milenio-covered-court.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/middle-school',
    targetNeighborhood: 'Loma Dorada',
    category: 'neighborhood',
    keywords: [
      'secundaria loma dorada queretaro',
      'secundaria privada loma dorada',
      'secundaria cerca de loma dorada',
      'newland secundaria loma dorada',
    ],
  },

  // =========================================================================
  // PAGE 19 — Escuela particular cerca de Loma Dorada
  // =========================================================================
  'escuela-particular-cerca-de-loma-dorada-queretaro': {
    slug: 'escuela-particular-cerca-de-loma-dorada-queretaro',
    lang: 'es',
    title: 'Escuela Particular cerca de Loma Dorada Querétaro | Newland School',
    h1: 'La mejor escuela en Loma Dorada Querétaro para tus hijos',
    description:
      'Escuela particular cerca de Loma Dorada con todos los niveles, programa bilingüe y Filosofía para Niños. Newland School campus Milenio, a minutos de tu hogar.',
    uniqueIntro:
      'NWL campus Milenio es la escuela bilingüe más cercana a Loma Dorada (10 min en auto) y ofrece maternal a secundaria en un campus acreditado por Cognia. Fundado en 2016 con 4.5★ en Google, el campus se distingue por talleres de cocina, yoga, dance team y la terraza rooftop, además del modelo completo NWL con Knotion sin tarea y Filosofía para Niños.',
    sections: [
      {
        heading: 'De Brain Up a Emprendizaje: Trayectoria en Milenio',
        body: 'Los niños de Loma Dorada que ingresan a NWL Milenio recorren un camino educativo continuo: Brain Up y Estimulación Multisensorial en maternal (2 años), Knotion sin tarea en kinder, TecniKids STEAM Lab en primaria con impresión 3D y robótica.\n\nEn secundaria, Emprendizaje con Universidad Mondragón y la Doble Certificación Internacional preparan a los adolescentes para las mejores opciones de preparatoria. Cada nivel incluye Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey.',
      },
      {
        heading: 'Cocina, yoga y dance team: Solo en Milenio',
        body: 'Lo que distingue a NWL Milenio de otros colegios de la zona es su oferta de actividades únicas: talleres de cocina donde los alumnos aprenden nutrición práctica, sesiones de yoga para concentración y manejo de estrés, y un dance team competitivo.\n\nEstas actividades se suman a voleibol, tochito, basquetbol, fútbol, robótica STEAM y música. La terraza rooftop y el letrero LÍDER son espacios icónicos del campus donde se realizan eventos y clases especiales.',
      },
      {
        heading: 'Transporte y seguridad para familias de Loma Dorada',
        body: 'Ofrecemos rutas de transporte escolar que cubren Loma Dorada, con unidades monitoreadas por GPS. El campus cuenta con 90+ cámaras de seguridad 24/7, programa BFS (Bullying Free School) y protocolo de Desapego Seguro para los más pequeños.\n\nLa acreditación Cognia del campus Milenio certifica que los estándares académicos cumplen con las más altas exigencias internacionales. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿Newland School ofrece todos los niveles para familias de Loma Dorada?',
        answer:
          'NWL campus Milenio ofrece maternal, kinder, primaria y secundaria (no preparatoria). Está a 10 min de Loma Dorada, fundado en 2016, acreditado por Cognia, con 4.5★ en Google y 185+ reseñas.',
      },
      {
        question: '¿Hay transporte escolar desde Loma Dorada?',
        answer:
          'Sí. Rutas con unidades monitoreadas por GPS cubren Loma Dorada y colonias aledañas. El campus ofrece talleres de cocina, yoga, dance team, deportes, robótica STEAM y música. Directora: Mtra. Ximena Arellano.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-students-closeup.jpg',
        '/images/campus/milenio/milenio-building.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetNeighborhood: 'Loma Dorada',
    category: 'neighborhood',
    keywords: [
      'escuela particular loma dorada',
      'escuela privada loma dorada queretaro',
      'colegio loma dorada',
      'newland school loma dorada',
    ],
  },

  // =========================================================================
  // PAGE 20 — Kinder cerca de Loma Dorada
  // =========================================================================
  'kinder-cerca-de-loma-dorada': {
    slug: 'kinder-cerca-de-loma-dorada',
    lang: 'es',
    title: 'Kinder cerca de Loma Dorada | Newland School',
    h1: 'Kinder en Loma Dorada con las mejores metodologías',
    description:
      'Kinder bilingüe cerca de Loma Dorada con Filosofía para Niños, programa STEAM y espacios seguros. Inscribe a tu hijo en Newland School campus Milenio.',
    uniqueIntro:
      'Para las familias de Loma Dorada, NWL campus Milenio ofrece un kinder bilingüe a solo 10 minutos de distancia. Con Knotion (sin tarea tradicional), Filosofía para Niños, Yo Soy Líder NWL by Tec de Monterrey y actividades exclusivas como dance team, cocina y yoga, el kinder de Milenio prepara niños de 3-5 años con un enfoque integral. Horario: 8:20 a 1:50 pm.',
    sections: [
      {
        heading: 'Knotion: Sin tarea, con proyectos reales',
        body: 'En el kinder de Milenio no hay cuadernos de tarea. La metodología Knotion sustituye la tarea tradicional por proyectos donde los niños investigan, crean y presentan. Cada proyecto integra lenguaje, ciencias y habilidades socioemocionales en español e inglés.\n\nLos docentes documentan el aprendizaje con portafolios digitales que comparten con las familias de Loma Dorada, permitiendo seguir el progreso de cada niño de forma cercana y transparente.',
      },
      {
        heading: 'Dance team, cocina y yoga desde los 3 años',
        body: 'El kinder de Milenio ofrece actividades que no encontrarás en otros preescolares de la zona: dance team, talleres de cocina adaptados a la edad preescolar y sesiones de yoga que desarrollan concentración y equilibrio desde los 3 años.\n\nEstas actividades se suman a basquetbol, fútbol, robótica STEAM y música. El campus Milenio tiene terraza rooftop y áreas de juego con piso amortiguante diseñadas para preescolar.',
      },
      {
        heading: 'Transporte y Bullying Free School',
        body: 'NWL ofrece transporte escolar con ruta que cubre Loma Dorada, con unidades monitoreadas por GPS y personal capacitado para el traslado de los más pequeños.\n\nEl campus es Bullying Free School (BFS) desde preescolar, con protocolo de Desapego Seguro para la transición hogar-escuela. La acreditación Cognia respalda los estándares de calidad. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿A qué distancia está el kinder de Newland School desde Loma Dorada?',
        answer:
          'NWL campus Milenio se ubica a unos 10 minutos en auto desde Loma Dorada. Ofrecemos transporte escolar con ruta por la zona. Campus acreditado por Cognia con 4.5★ en Google.',
      },
      {
        question: '¿El kinder cerca de Loma Dorada acepta niños de 3 años?',
        answer:
          'Sí. El kinder recibe niños de 3 a 5 años. Horario: 8:20-1:50 pm. Usa Knotion (sin tarea), Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey. Actividades incluyen dance team, cocina, yoga, deportes y música.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-digital-learning.jpg',
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/kinder',
    targetNeighborhood: 'Loma Dorada',
    category: 'neighborhood',
    keywords: [
      'kinder loma dorada',
      'kinder cerca de loma dorada queretaro',
      'preescolar loma dorada',
      'kinder bilingüe loma dorada',
    ],
  },

  // =========================================================================
  // PAGE 21 — Primaria cerca de Loma Dorada
  // =========================================================================
  'primaria-cerca-de-loma-dorada': {
    slug: 'primaria-cerca-de-loma-dorada',
    lang: 'es',
    title: 'Primaria cerca de Loma Dorada Querétaro | Newland School',
    h1: 'Una primaria en Loma Dorada con programas internacionales',
    description:
      'Primaria bilingüe cerca de Loma Dorada con certificaciones Cambridge, STEAM y Filosofía para Niños. Conoce Newland School campus Milenio en Querétaro.',
    uniqueIntro:
      'NWL campus Milenio ofrece a las familias de Loma Dorada una primaria bilingüe a 10 minutos de distancia. Los alumnos de 6-11 años estudian con Knotion IMPACT (sin tarea), TecniKids STEAM Lab con impresión 3D y robótica, y se preparan para certificaciones Cambridge desde 3.° grado. Campus acreditado por Cognia, horario: 7:40-2:30 pm.',
    sections: [
      {
        heading: 'TecniKids STEAM Lab y Knotion IMPACT',
        body: 'El TecniKids STEAM Lab del campus Milenio ofrece impresión 3D, corte láser, robótica y maker spaces donde los alumnos de primaria construyen prototipos y resuelven problemas reales con Design Thinking.\n\nLa metodología Knotion IMPACT elimina la tarea tradicional. Los niños de Loma Dorada que asisten a NWL Milenio no llevan cuadernos de tarea a casa: el aprendizaje significativo ocurre en el aula a través de proyectos interdisciplinarios.',
      },
      {
        heading: 'Cambridge, Cognia y viajes desde 5.° grado',
        body: 'Los alumnos se preparan para certificaciones Cambridge (Starters, Movers, Flyers) desde 3.° grado. La acreditación Cognia del campus respalda estos estándares internacionales.\n\nDesde 5.° grado, los estudiantes acceden a viajes internacionales que amplían su perspectiva global. El programa BFS (Bullying Free School) y la Filosofía para Niños con Diploma para Padres crean un ecosistema educativo donde las familias participan activamente.',
      },
      {
        heading: 'Cocina, yoga y talleres exclusivos de Milenio',
        body: 'La primaria en campus Milenio ofrece talleres de cocina, yoga y dance team que no encontrarás en otras escuelas de la zona. Estas actividades se suman a voleibol, tochito, basquetbol, fútbol, robótica STEAM y música.\n\nTransporte escolar con ruta por Loma Dorada y unidades con GPS. El campus cuenta con cancha de fútbol, cancha techada, terraza rooftop, laboratorio STEAM y cafetería. Yo Soy Líder NWL by Tec de Monterrey desarrolla liderazgo en cada alumno.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria cerca de Loma Dorada ofrece certificaciones de inglés?',
        answer:
          'Sí. Cambridge Starters, Movers y Flyers desde 3.° grado. Campus Milenio tiene acreditación Cognia. Viajes internacionales desde 5.° grado. Sin tarea tradicional gracias a Knotion IMPACT con Design Thinking.',
      },
      {
        question: '¿Hay actividades deportivas en la primaria cercana a Loma Dorada?',
        answer:
          'Sí. Voleibol, tochito, basquetbol, fútbol, dance team, talleres de cocina, yoga, robótica STEAM y música. El campus cuenta con cancha de fútbol, cancha techada y terraza rooftop. Transporte escolar cubre Loma Dorada.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-teacher-ipad-guidance.jpg',
        '/images/campus/milenio/milenio-lab.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/elementary',
    targetNeighborhood: 'Loma Dorada',
    category: 'neighborhood',
    keywords: [
      'primaria loma dorada queretaro',
      'primaria cerca de loma dorada',
      'primaria bilingüe loma dorada',
      'newland primaria loma dorada',
    ],
  },

  // =========================================================================
  // PAGE 22 — Escuela en Centro Sur
  // =========================================================================
  'escuela-primaria-en-centro-sur-queretaro': {
    slug: 'escuela-primaria-en-centro-sur-queretaro',
    lang: 'es',
    title: 'Escuela o Colegio cerca de Centro Sur Querétaro | Newland School',
    h1: 'Conoce nuestra escuela en Centro Sur Querétaro',
    description:
      'Escuela privada cerca de Centro Sur Querétaro con programa bilingüe, todos los niveles y Filosofía para Niños. Descubre Newland School campus Milenio.',
    uniqueIntro:
      'Las familias de Centro Sur encuentran en NWL campus Milenio su escuela bilingüe más accesible, a 10-15 minutos por las vialidades principales. El campus, acreditado por Cognia y fundado en 2016, ofrece maternal a secundaria con Knotion sin tarea, Filosofía para Niños y actividades exclusivas como talleres de cocina, yoga y dance team.',
    sections: [
      {
        heading: 'Campus Milenio: Acreditado por Cognia',
        body: 'NWL campus Milenio es el único en la red con acreditación Cognia, un sello de calidad internacional que certifica estándares académicos de primer nivel. Menos del 5% de los colegios privados en México cuentan con esta certificación.\n\nPara las familias de Centro Sur, esto significa la tranquilidad de que sus hijos estudian en un colegio evaluado por expertos internacionales, con 4.5★ en Google y 185+ reseñas.',
      },
      {
        heading: 'Knotion sin tarea y TecniKids STEAM',
        body: 'Desde kinder, la metodología Knotion elimina la tarea tradicional. En primaria, Knotion IMPACT con Design Thinking resuelve problemas reales. El TecniKids STEAM Lab ofrece impresión 3D, corte láser, robótica y maker spaces.\n\nEn secundaria, el programa de Emprendizaje con Universidad Mondragón y la Doble Certificación Internacional (diploma EUA + México) preparan a los adolescentes para las mejores opciones de preparatoria en Querétaro y el mundo.',
      },
      {
        heading: 'Transporte, cocina, yoga y terraza rooftop',
        body: 'Ofrecemos rutas de transporte escolar que cubren Centro Sur con unidades monitoreadas por GPS. El campus se distingue por su terraza rooftop, talleres de cocina, yoga, dance team, tochito, voleibol, basquetbol, fútbol, robótica STEAM y música.\n\nMás de 90 cámaras de seguridad 24/7, programa BFS (Bullying Free School) y Yo Soy Líder NWL by Tec de Monterrey garantizan un ambiente seguro y formativo. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo toma llegar desde Centro Sur al campus Milenio?',
        answer:
          'Aproximadamente 10-15 minutos por las vialidades principales. Ofrecemos transporte escolar con rutas por Centro Sur. Campus acreditado por Cognia, 4.5★ en Google, fundado en 2016.',
      },
      {
        question: '¿Newland School cerca de Centro Sur ofrece todos los niveles?',
        answer:
          'NWL Milenio ofrece maternal, kinder, primaria y secundaria (no preparatoria). Incluye Knotion sin tarea, Filosofía para Niños, Brain Up, TecniKids STEAM Lab, Emprendizaje y talleres de cocina, yoga y dance team.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-group-classroom-wide.jpg',
        '/images/campus/milenio/milenio-cafeteria.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetNeighborhood: 'Centro Sur',
    category: 'neighborhood',
    keywords: [
      'escuela centro sur queretaro',
      'colegio centro sur queretaro',
      'escuela privada centro sur',
      'newland school centro sur',
    ],
  },

  // =========================================================================
  // PAGE 23 — Kinder en Centro Sur
  // =========================================================================
  'kinder-en-centro-sur-queretaro': {
    slug: 'kinder-en-centro-sur-queretaro',
    lang: 'es',
    title: 'Kinder cerca de Centro Sur Querétaro | Newland School',
    h1: 'Conoce la metodología de nuestro kinder en Centro Sur',
    description:
      'Kinder bilingüe cerca de Centro Sur Querétaro con Filosofía para Niños, programa STEAM y espacios diseñados para primera infancia. Inscripciones abiertas en NWL.',
    uniqueIntro:
      'Las familias de Centro Sur que buscan un kinder bilingüe sin tarea tradicional encuentran en NWL campus Milenio la respuesta. A 10-15 minutos de la zona, el kinder utiliza Knotion, Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey. Actividades exclusivas de Milenio incluyen dance team, cocina y yoga desde los 3 años. Horario: 8:20-1:50 pm.',
    sections: [
      {
        heading: 'Knotion: Proyectos en lugar de tarea',
        body: 'Los niños de Centro Sur que asisten al kinder de Milenio no llevan tarea a casa. La metodología Knotion sustituye los cuadernos de tarea por proyectos interdisciplinarios donde los pequeños investigan, crean y presentan en español e inglés.\n\nCada proyecto está diseñado por especialistas para desarrollar autonomía, curiosidad y habilidades de comunicación desde los 3 años. Los docentes comparten portafolios digitales con las familias para seguir el progreso.',
      },
      {
        heading: 'Filosofía para Niños y liderazgo Tec',
        body: 'Las sesiones de Filosofía para Niños en kinder utilizan cuentos e imágenes para explorar conceptos como la amistad, la justicia y las emociones. Los niños aprenden a escuchar, hacer preguntas y respetar opiniones diferentes.\n\nYo Soy Líder NWL by Tec de Monterrey enseña los 7 hábitos de liderazgo adaptados a preescolar: proactividad, cooperación y pensamiento ganar-ganar. Es un programa exclusivo de NWL, diseñado por el Tec de Monterrey.',
      },
      {
        heading: 'Dance team, cocina y transporte desde Centro Sur',
        body: 'El kinder de Milenio ofrece actividades que lo distinguen: dance team, talleres de cocina y yoga, además de basquetbol, fútbol, robótica STEAM y música. Los espacios incluyen terraza rooftop y áreas de juego con piso amortiguante.\n\nTransporte escolar con rutas por Centro Sur y unidades con GPS. Campus acreditado por Cognia, BFS (Bullying Free School) y 90+ cámaras 24/7. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿El kinder cercano a Centro Sur tiene horario extendido?',
        answer:
          'El horario regular del kinder es de 8:20 a 1:50 pm. El campus ofrece actividades como dance team, cocina, yoga, deportes, robótica STEAM y música. Transporte escolar cubre Centro Sur.',
      },
      {
        question: '¿Ofrecen transporte escolar desde Centro Sur al kinder?',
        answer:
          'Sí. Rutas con unidades monitoreadas por GPS cubren Centro Sur. NWL campus Milenio tiene acreditación Cognia, 4.5★ en Google y usa Knotion (sin tarea tradicional). Directora: Mtra. Ximena Arellano.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-climbing.jpg',
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/kinder',
    targetNeighborhood: 'Centro Sur',
    category: 'neighborhood',
    keywords: [
      'kinder centro sur queretaro',
      'kinder bilingüe centro sur',
      'preescolar centro sur queretaro',
      'kinder cerca de centro sur',
    ],
  },

  // =========================================================================
  // PAGE 24 — Primaria privada en Centro Sur
  // =========================================================================
  'primaria-privada-en-centro-sur-queretaro': {
    slug: 'primaria-privada-en-centro-sur-queretaro',
    lang: 'es',
    title: 'Primaria privada cerca de Centro Sur Queretaro | Newland School',
    h1: 'La mejor educación primaria en Centro Sur',
    description:
      'Primaria privada bilingüe cerca de Centro Sur Querétaro con Filosofía para Niños, programas internacionales y formación integral. Conoce Newland School campus Milenio.',
    uniqueIntro:
      'Las familias de Centro Sur tienen en NWL campus Milenio una primaria bilingüe sin tarea tradicional a 10-15 minutos de distancia. El campus, acreditado por Cognia, ofrece TecniKids STEAM Lab con impresión 3D y robótica, certificaciones Cambridge desde 3.° grado y viajes internacionales desde 5.° grado. Horario: 7:40-2:30 pm.',
    sections: [
      {
        heading: 'Knotion IMPACT: Sin tarea, con Design Thinking',
        body: 'Los alumnos de Centro Sur que asisten a la primaria de Milenio no llevan tarea a casa. La metodología Knotion IMPACT utiliza Design Thinking para resolver problemas reales de la comunidad, integrando ciencias, tecnología y humanidades.\n\nEl TecniKids STEAM Lab complementa este enfoque con impresión 3D, corte láser, robótica y maker spaces. Los niños construyen prototipos de sus soluciones, desarrollando habilidades del siglo XXI desde los 6 años.',
      },
      {
        heading: 'Cambridge y viajes internacionales',
        body: 'Desde 3.° grado, los alumnos se preparan para certificaciones Cambridge (Starters, Movers, Flyers). La acreditación Cognia del campus Milenio valida estos estándares internacionales.\n\nDesde 5.° grado, los estudiantes acceden a viajes internacionales que amplían su perspectiva global. La Filosofía para Niños con Diploma para Padres y Yo Soy Líder NWL by Tec de Monterrey completan una formación integral.',
      },
      {
        heading: 'Talleres exclusivos y transporte desde Centro Sur',
        body: 'La primaria de Milenio ofrece talleres de cocina, yoga y dance team que la distinguen. También voleibol, tochito, basquetbol, fútbol, robótica STEAM y música en instalaciones con cancha de fútbol, cancha techada y terraza rooftop.\n\nTransporte escolar con rutas por Centro Sur y GPS. Programa BFS (Bullying Free School) y 90+ cámaras de seguridad 24/7. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria cercana a Centro Sur ofrece actividades extracurriculares?',
        answer:
          'Sí. Talleres de cocina, yoga, dance team, tochito, voleibol, basquetbol, fútbol, robótica STEAM y música. TecniKids STEAM Lab con impresión 3D. Cambridge desde 3.° grado. Viajes internacionales desde 5.°.',
      },
      {
        question: '¿Hay transporte escolar desde Centro Sur a la primaria?',
        answer:
          'Sí. Rutas con GPS cubren Centro Sur. NWL campus Milenio tiene acreditación Cognia, 4.5★ en Google. Primaria sin tarea tradicional (Knotion IMPACT). Horario: 7:40-2:30 pm.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/primaria/primaria-classroom.jpg',
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/elementary',
    targetNeighborhood: 'Centro Sur',
    category: 'neighborhood',
    keywords: [
      'primaria centro sur queretaro',
      'primaria privada centro sur',
      'primaria bilingüe centro sur',
      'escuela primaria cerca de centro sur',
    ],
  },

  // =========================================================================
  // PAGE 25 — Secundaria en Centro Sur
  // =========================================================================
  'secundaria-en-centro-sur': {
    slug: 'secundaria-en-centro-sur',
    lang: 'es',
    title: 'Secundaria privada cerca de Centro Sur Queretaro | Newland School',
    h1: 'Newland, la mejor secundaria en Centro Sur',
    description:
      'Secundaria privada bilingüe cerca de Centro Sur Querétaro. Filosofía para Niños, programas internacionales y formación integral en Newland School campus Milenio.',
    uniqueIntro:
      'Los adolescentes de Centro Sur encuentran en NWL campus Milenio una secundaria bilingüe con Emprendizaje (Universidad Mondragón), Doble Certificación Internacional y Cambridge PET/FCE. A 10-15 minutos de la zona, el campus acreditado por Cognia ofrece talleres de cocina, yoga y dance team además de 90+ cámaras de seguridad. Horario: 7:30-2:30 pm.',
    sections: [
      {
        heading: 'Emprendizaje con Universidad Mondragón',
        body: 'Los alumnos de Centro Sur que cursan secundaria en NWL Milenio participan en Emprendizaje, creando proyectos empresariales reales durante 3 años en colaboración con Universidad Mondragón. Aprenden finanzas, mercadotecnia y presentación ejecutiva.\n\nLa Doble Certificación Internacional (diploma EUA + México vía Hokku Academy) les abre puertas a preparatorias nacionales e internacionales. El campus Milenio es el único con acreditación Cognia, lo que respalda estas certificaciones.',
      },
      {
        heading: 'Cambridge PET/FCE y Model ONU',
        body: 'Las certificaciones Cambridge PET y FCE consolidan un nivel B1-B2 de inglés al egresar de secundaria. Los alumnos participan en Model ONU, debate y oratoria, desarrollando habilidades de comunicación y negociación.\n\nLa Filosofía para Niños evoluciona hacia análisis de dilemas éticos y debate estructurado. El Diplomado para Padres ofrece a las familias de Centro Sur herramientas para acompañar la adolescencia.',
      },
      {
        heading: 'Actividades exclusivas y transporte',
        body: 'La secundaria de Milenio ofrece talleres de cocina, yoga y dance team junto con voleibol, tochito, basquetbol, fútbol, robótica STEAM y música. Instalaciones con cancha de fútbol, cancha techada, laboratorio STEAM y terraza rooftop.\n\nTransporte escolar con rutas por Centro Sur y GPS. Programa BFS, Yo Soy Líder NWL by Tec de Monterrey y 90+ cámaras 24/7. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria cercana a Centro Sur prepara para preparatoria bilingüe?',
        answer:
          'Sí. Los alumnos obtienen Doble Certificación Internacional (EUA + México), Cambridge PET/FCE y Emprendizaje con Universidad Mondragón. Campus acreditado por Cognia. Transporte escolar cubre Centro Sur.',
      },
      {
        question: '¿Qué horario tiene la secundaria cerca de Centro Sur?',
        answer:
          'Horario: 7:30 a 2:30 pm. Actividades: cocina, yoga, dance team, tochito, voleibol, basquetbol, fútbol, robótica STEAM, música, Model ONU y debate. Campus con 90+ cámaras 24/7.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/secundaria/secundaria-science-lab.jpg',
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/middle-school',
    targetNeighborhood: 'Centro Sur',
    category: 'neighborhood',
    keywords: [
      'secundaria centro sur queretaro',
      'secundaria privada centro sur',
      'secundaria bilingüe centro sur',
      'escuela secundaria cerca de centro sur',
    ],
  },

  // =========================================================================
  // PAGE 26 — Escuela privada cerca del Refugio
  // =========================================================================
  'escuela-privada-cerca-del-refugio-queretaro': {
    slug: 'escuela-privada-cerca-del-refugio-queretaro',
    lang: 'es',
    title: 'Escuela privada cerca del Refugio Queretaro | Newland School',
    h1: 'Conoce la escuela en el Refugio Queretaro de NWL',
    description:
      'Escuela privada bilingüe cerca del Refugio Querétaro con todos los niveles educativos, Filosofía para Niños y programas internacionales. Conoce Newland School campus Zibatá.',
    uniqueIntro:
      'Las familias de El Refugio tienen en NWL campus Zibatá su escuela bilingüe más cercana, con todos los niveles de maternal a preparatoria. Fundado en 2025, es el campus más moderno de la red NWL, con instalaciones de última generación y los programas Life Project, Doble Diploma y Kn U High/Coursera en preparatoria. Dirigido por Daniela Arévalo, con 4.5★ en Google y 230+ reseñas.',
    sections: [
      {
        heading: 'Campus Zibatá: El más moderno, a minutos de El Refugio',
        body: 'NWL campus Zibatá fue diseñado desde cero en 2025 con instalaciones de última generación para cada nivel: áreas sensoriales para maternal, maker spaces para primaria, laboratorios para secundaria y espacios de innovación para preparatoria.\n\nPara las familias de El Refugio, es la opción más cercana con trayectoria completa de maternal a preparatoria. El campus cuenta con transporte escolar que cubre El Refugio y zonas aledañas.',
      },
      {
        heading: 'Life Project y Doble Diploma en Zibatá',
        body: 'A diferencia de otros colegios cercanos a El Refugio, NWL Zibatá ofrece preparatoria con Life Project (mentores personales, 6 semestres), Doble Diploma (SEP + EUA acreditado por Cognia), certificaciones Kn U High/Coursera y programa HIT/Hyrox de fitness.\n\nInteligencia Financiera cada semestre, IA y Tecnología Moderna, Portafolio de 6 Proyectos Personales e intercambio internacional en 5.° y 6.° semestre completan una oferta de preparatoria sin igual en la zona.',
      },
      {
        heading: 'El modelo NWL completo en Zibatá',
        body: 'Brain Up y Estimulación Multisensorial en maternal, Knotion sin tarea en kinder, TecniKids STEAM Lab en primaria, Emprendizaje con Universidad Mondragón en secundaria: todo el modelo NWL está disponible en campus Zibatá.\n\nFilosofía para Niños, Yo Soy Líder NWL by Tec de Monterrey, certificaciones Cambridge, programa BFS y Corazones Mágicos acompañan cada etapa. Directora: Daniela Arévalo.',
      },
    ],
    faqs: [
      {
        question: '¿Qué niveles educativos ofrece la escuela cercana a El Refugio?',
        answer:
          'NWL campus Zibatá ofrece de maternal (2 años) a preparatoria (17 años). Es el campus más nuevo (2025) y más moderno de la red. Tiene 4.5★ en Google, 230+ reseñas y transporte escolar que cubre El Refugio.',
      },
      {
        question: '¿Hay rutas de transporte desde El Refugio al campus Zibatá?',
        answer:
          'Sí. Transporte escolar con unidades con GPS cubre El Refugio y zonas aledañas. El campus ofrece el modelo NWL completo, incluyendo preparatoria con Life Project y Doble Diploma. Directora: Daniela Arévalo.',
      },
    ],
    images: {
      hero: '/images/campus/zibata/zibata-hero.jpg',
      content: [
        '/images/campus/zibata/zibata-classroom.jpg',
        '/images/campus/zibata/zibata-playground.jpg',
      ],
    },
    targetCampus: 'zibata',
    targetNeighborhood: 'El Refugio',
    category: 'neighborhood',
    keywords: [
      'escuela privada el refugio queretaro',
      'colegio bilingüe el refugio',
      'escuela cerca del refugio queretaro',
      'newland zibata el refugio',
    ],
  },

  // =========================================================================
  // PAGE 27 — Colegio privado bilingüe en Querétaro
  // =========================================================================
  'colegio-privado-bilingue-en-queretaro': {
    slug: 'colegio-privado-bilingue-en-queretaro',
    lang: 'es',
    title: 'Colegio privado bilingüe en Queretaro | Newland School',
    h1: 'NWL, colegio en Queretaro con excelencia académica',
    description:
      'Colegio privado bilingüe en Querétaro con Filosofía para Niños, programas internacionales y 5 campus. Newland School ofrece educación de excelencia desde maternal hasta preparatoria.',
    uniqueIntro:
      'Colegio Newland opera 5 campus en Querétaro y San Miguel de Allende, atendiendo desde maternal (2 años) hasta preparatoria (17 años). Con acreditación Cognia, alianzas con Tec de Monterrey, Universidad Mondragón, Hokku Academy, Knotion, Cambridge y Coursera, NWL forma estudiantes bilingües con pensamiento crítico. Más de 15 años de trayectoria desde la fundación de nuestro campus insignia en Juriquilla (2009).',
    sections: [
      {
        heading: 'Tres pilares: FpN, Yo Soy Líder y Knotion',
        body: 'El modelo NWL se sostiene en tres programas que ningún otro colegio en Querétaro combina: Filosofía para Niños (FpN) desarrolla pensamiento crítico desde los 2 años; Yo Soy Líder NWL by Tec de Monterrey forma líderes con inteligencia emocional; y Knotion elimina la tarea tradicional con proyectos reales y Design Thinking.\n\nEstos tres programas se aplican en los 5 campus, creando una experiencia educativa consistente sin importar la ubicación. Cada nivel adapta la metodología a la edad: desde estimulación sensorial en maternal hasta emprendimiento y debate en secundaria.',
      },
      {
        heading: '5 campus estratégicos en Querétaro',
        body: 'Juriquilla (2009, 4.6★) es el campus insignia con maternal a secundaria. Milenio (2016, 4.5★) tiene acreditación Cognia y talleres únicos de cocina y yoga. San Miguel de Allende (2018, 4.7★) aprovecha la ciudad UNESCO para arte y cultura.\n\nCorregidora (2019, 4.5★) destaca por podcasts, programación e IA. Zibatá (2025, 4.5★) es el más moderno, con instalaciones de última generación. San Miguel, Corregidora y Zibatá ofrecen también preparatoria.',
      },
      {
        heading: 'Certificaciones y alianzas de clase mundial',
        body: 'Cambridge (certificaciones de inglés en todos los niveles), Cognia (acreditación internacional), Tec de Monterrey (programa Yo Soy Líder exclusivo para NWL), Universidad Mondragón (Emprendizaje en secundaria), Hokku Academy (Doble Certificación Internacional) y Kn U High/Coursera (certificaciones en preparatoria).\n\nEn preparatoria: Doble Diploma (México + EUA), Life Project con mentores, Inteligencia Financiera, IA y Tecnología Moderna, HIT/Hyrox, Portafolio de 6 Proyectos Personales e intercambio internacional.',
      },
    ],
    faqs: [
      {
        question: '¿Cuántos campus tiene Newland School en Querétaro?',
        answer:
          '5 campus: Juriquilla (2009), Milenio (2016), San Miguel de Allende (2018), Corregidora (2019) y Zibatá (2025). San Miguel, Corregidora y Zibatá ofrecen hasta preparatoria. Juriquilla y Milenio ofrecen hasta secundaria.',
      },
      {
        question: '¿Qué niveles educativos ofrece el colegio bilingüe NWL?',
        answer:
          'De maternal (2 años) a preparatoria (17 años). El modelo incluye Brain Up, Knotion sin tarea, TecniKids STEAM Lab, Emprendizaje, Doble Certificación, Cambridge, Life Project y Doble Diploma según el nivel y campus.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/campus/zibata/zibata-classroom.jpg',
        '/images/campus/corregidora/corregidora-hero.jpg',
      ],
    },
    category: 'general',
    hreflangPair: 'private-bilingual-school-in-queretaro',
    keywords: [
      'colegio privado bilingüe queretaro',
      'colegio bilingüe queretaro',
      'escuela privada bilingüe queretaro',
      'newland school queretaro',
    ],
  },

  // =========================================================================
  // PAGE 28 — Colegio particular en Querétaro
  // =========================================================================
  'el-mejor-colegio-particular-en-queretaro': {
    slug: 'el-mejor-colegio-particular-en-queretaro',
    lang: 'es',
    title: 'Colegio o escuela particular en Queretaro | Newland School',
    h1: 'Totalmente bilingüe, colegio particular en Queretaro',
    description:
      'Colegio particular bilingüe en Querétaro con todos los niveles educativos. Newland School ofrece Filosofía para Niños, programas internacionales y formación integral.',
    uniqueIntro:
      'NWL se distingue como colegio particular en Querétaro por tres razones concretas: es el único con el programa Yo Soy Líder diseñado por el Tec de Monterrey; utiliza Knotion que elimina la tarea tradicional; y ofrece la Estimulación Multisensorial más completa de la región en maternal. Con 5 campus y más de 15 años de experiencia, formamos alumnos bilingües, emprendedores y con pensamiento crítico.',
    sections: [
      {
        heading: 'Yo Soy Líder NWL: Exclusivo del Tec de Monterrey',
        body: 'Ningún otro colegio en Querétaro cuenta con un programa de liderazgo diseñado exclusivamente por el Tecnológico de Monterrey. Yo Soy Líder NWL adapta los 7 hábitos de liderazgo a cada edad, desde maternal hasta secundaria.\n\nLos alumnos aprenden proactividad, cooperación, empatía, pensamiento ganar-ganar y responsabilidad personal. El programa incluye certificaciones internas y se complementa con Filosofía para Niños para desarrollar pensamiento crítico junto con inteligencia emocional.',
      },
      {
        heading: 'Sin tarea tradicional desde kinder',
        body: 'NWL usa Knotion en todos sus campus, lo que significa que desde kinder no hay cuadernos de tarea. El aprendizaje ocurre a través de proyectos interdisciplinarios donde los alumnos investigan, crean y presentan soluciones a problemas reales.\n\nEn primaria, Knotion IMPACT con Design Thinking lleva esto un paso más allá. El TecniKids STEAM Lab ofrece impresión 3D, corte láser y robótica. En secundaria, Emprendizaje con Universidad Mondragón aplica el emprendimiento real.',
      },
      {
        heading: 'Doble Certificación y preparatoria con Life Project',
        body: 'En secundaria, los alumnos obtienen la Doble Certificación Internacional (diploma EUA + México vía Hokku Academy) y certificaciones Cambridge PET/FCE. En los 3 campus con preparatoria (San Miguel, Corregidora, Zibatá), el programa Life Project guía a cada alumno con mentores personales.\n\nDoble Diploma, certificaciones Kn U High/Coursera, Inteligencia Financiera, IA y Tecnología Moderna, HIT/Hyrox y Portafolio de 6 Proyectos Personales preparan a los egresados para las mejores universidades.',
      },
    ],
    faqs: [
      {
        question: '¿Por qué elegir un colegio particular bilingüe en Querétaro?',
        answer:
          'NWL ofrece programas exclusivos: Yo Soy Líder by Tec de Monterrey, Knotion sin tarea, Emprendizaje con Universidad Mondragón, Doble Certificación y Cambridge. 5 campus con más de 15 años de trayectoria y acreditación Cognia.',
      },
      {
        question: '¿Newland School ofrece becas o apoyos económicos?',
        answer:
          'Sí. NWL cuenta con programas de apoyo económico y descuentos por hermanos. Agenda una visita para conocer las opciones en el campus de tu interés: Juriquilla, Milenio, San Miguel, Corregidora o Zibatá.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
        '/images/campus/zibata/zibata-playground.jpg',
      ],
    },
    category: 'general',
    hreflangPair: 'international-school-in-queretaro',
    keywords: [
      'colegio particular queretaro',
      'escuela particular queretaro',
      'colegio particular bilingüe queretaro',
      'mejor colegio particular queretaro',
    ],
  },

  // =========================================================================
  // PAGE 29 — Kinder privado en Querétaro
  // =========================================================================
  'el-mejor-kinder-privado-en-queretaro': {
    slug: 'el-mejor-kinder-privado-en-queretaro',
    lang: 'es',
    title: 'Kinder bilingüe privado en Queretaro | Newland School',
    h1: 'Métodos de enseñanza en nuestro kinder privado en Queretaro',
    description:
      'Kinder privado bilingüe en Querétaro con Filosofía para Niños, programa STEAM y formación socioemocional. Conoce los métodos de enseñanza de Newland School.',
    uniqueIntro:
      'El kinder NWL (3-5 años) se distingue en Querétaro por usar Knotion, la metodología internacional que elimina la tarea tradicional y la reemplaza con proyectos reales. Disponible en los 5 campus, el kinder incluye Filosofía para Niños, Yo Soy Líder NWL by Tec de Monterrey y programa BFS (Bullying Free School). Horario: 8:20-1:50 pm.',
    sections: [
      {
        heading: 'Knotion: Sin tarea, con aprendizaje real',
        body: 'En los 5 campus NWL, el kinder utiliza Knotion: no hay cuadernos de tarea. Los niños trabajan en proyectos interdisciplinarios donde investigan, crean y presentan en español e inglés. Cada proyecto integra ciencias, lenguaje, arte y habilidades socioemocionales.\n\nEsta metodología internacional respeta el ritmo de cada niño y desarrolla autonomía, curiosidad y habilidades de comunicación desde los 3 años. Los docentes comparten portafolios digitales con las familias.',
      },
      {
        heading: 'Filosofía para Niños desde los 3 años',
        body: 'Las sesiones semanales de Filosofía para Niños usan cuentos, imágenes y preguntas abiertas para explorar la amistad, la justicia, las emociones y la naturaleza. Los niños aprenden a escuchar, formular preguntas y respetar opiniones diferentes.\n\nEsta metodología, presente en todos los campus NWL, desarrolla habilidades cognitivas y sociales que marcan la diferencia en primaria. Se complementa con Yo Soy Líder NWL by Tec de Monterrey para liderazgo e inteligencia emocional.',
      },
      {
        heading: 'Kinder en 5 campus: Cada uno con su sello',
        body: 'Juriquilla: campus insignia con fútbol, basquetbol, artes visuales, teatro, robótica y música. Milenio: dance team, cocina, yoga, terraza rooftop y acreditación Cognia. San Miguel: arte, pintura, escultura, playground con barco pirata.\n\nCorregidora: basquetbol, dance, teatro, edificio cubo Rubik. Zibatá: instalaciones modernas de última generación (2025). Todos comparten el mismo modelo: Knotion sin tarea, FpN, Yo Soy Líder y BFS.',
      },
    ],
    faqs: [
      {
        question: '¿Qué métodos de enseñanza utiliza el kinder de Newland School?',
        answer:
          'Knotion (sin tarea, proyectos reales), Filosofía para Niños, Yo Soy Líder NWL by Tec de Monterrey y BFS (Bullying Free School). Horario: 8:20-1:50 pm. Disponible en los 5 campus.',
      },
      {
        question: '¿En qué campus de Querétaro hay kinder de Newland School?',
        answer:
          'En los 5 campus: Juriquilla, Milenio, San Miguel de Allende, Corregidora y Zibatá. Cada uno tiene actividades únicas pero todos comparten el mismo modelo educativo bilingüe Knotion.',
      },
    ],
    images: {
      hero: '/images/levels/kinder.jpg',
      content: [
        '/images/levels/kinder/kinder-climbing.jpg',
        '/images/levels/kinder/kinder-classroom.jpg',
      ],
    },
    targetLevel: '/kinder',
    category: 'level',
    hreflangPair: 'private-bilingual-kindergarten-in-queretaro',
    keywords: [
      'kinder privado queretaro',
      'kinder bilingüe queretaro',
      'mejor kinder privado queretaro',
      'preescolar bilingüe queretaro',
    ],
  },

  // =========================================================================
  // PAGE 30 — Maternal en Querétaro
  // =========================================================================
  'escuela-con-maternal-y-kinder-en-queretaro': {
    slug: 'escuela-con-maternal-y-kinder-en-queretaro',
    lang: 'es',
    title: 'Escuela con maternal privado en Queretaro | Newland School',
    h1: 'Conoce una de las mejores escuelas con maternal en Queretaro',
    description:
      'Escuela con maternal privado bilingüe en Querétaro. Estimulación temprana, Filosofía para Niños y un entorno seguro para el desarrollo integral desde los primeros meses.',
    uniqueIntro:
      'El maternal NWL es el único programa en Querétaro que combina Brain Up (inglés desde los 2 años), Estimulación Multisensorial (único de su tipo en la región) y Filosofía para Niños adaptada a la primera infancia. Disponible en los 5 campus, con horario de 8:20-1:30 pm y protocolo de Desapego Seguro para la transición hogar-escuela.',
    sections: [
      {
        heading: 'Brain Up: El inglés más temprano de Querétaro',
        body: 'Brain Up es el programa de inmersión en inglés que introduce el segundo idioma desde los 2 años, la edad más temprana disponible en un colegio de Querétaro. No es una clase de inglés: el idioma se integra en canciones, cuentos, rutinas y juegos durante todo el día.\n\nEsta inmersión aprovecha la ventana de adquisición lingüística de la primera infancia, permitiendo que los niños adquieran el inglés de forma natural, como si fuera un idioma materno adicional.',
      },
      {
        heading: 'Estimulación Multisensorial: Única en la región',
        body: 'NWL es el único colegio en Querétaro con un programa de Estimulación Multisensorial estructurado en maternal. Los niños exploran texturas, sonidos, aromas, sabores y movimientos en espacios diseñados por especialistas en desarrollo infantil.\n\nCada sesión combina estimulación visual, auditiva, táctil y vestibular, fortaleciendo conexiones neuronales en la etapa de mayor plasticidad cerebral. Complementa la psicomotricidad gruesa y fina adaptada al ritmo de cada niño.',
      },
      {
        heading: 'Corazones Mágicos, BFS y Desapego Seguro',
        body: 'Corazones Mágicos enseña prevención de violencia desde los 2 años con cuentos, títeres y dinámicas de grupo. El protocolo de Desapego Seguro acompaña la transición del hogar a la escuela respetando el ritmo emocional de cada familia.\n\nTodos los campus NWL son Bullying Free School (BFS) desde maternal. Filosofía para Niños adaptada y Yo Soy Líder NWL by Tec de Monterrey completan la formación socioemocional más completa para primera infancia en Querétaro.',
      },
    ],
    faqs: [
      {
        question: '¿A partir de qué edad reciben niños en el maternal de NWL?',
        answer:
          'Desde los 2 años cumplidos. Horario: 8:20-1:30 pm. Incluye Brain Up (inglés inmersivo), Estimulación Multisensorial (único en Querétaro), Corazones Mágicos, Desapego Seguro y BFS. Disponible en los 5 campus.',
      },
      {
        question: '¿El maternal de Newland School es bilingüe?',
        answer:
          'Sí. El programa Brain Up introduce inglés desde los 2 años de forma natural e inmersiva. Es el programa de inglés más temprano disponible en colegios de Querétaro. Se complementa con Estimulación Multisensorial y Filosofía para Niños.',
      },
    ],
    images: {
      hero: '/images/levels/maternal.jpg',
      content: [
        '/images/levels/kinder/kinder-climbing.jpg',
        '/images/levels/kinder/kinder-classroom.jpg',
      ],
    },
    targetLevel: '/maternal',
    category: 'level',
    hreflangPair: 'private-bilingual-pre-kinder-in-queretaro',
    keywords: [
      'maternal privado queretaro',
      'escuela con maternal queretaro',
      'maternal bilingüe queretaro',
      'guardería bilingüe queretaro',
      'estimulación temprana queretaro',
    ],
  },

  // =========================================================================
  // PAGE 31 — Escuela privada en Querétaro (general)
  // =========================================================================
  'escuela-privada-en-queretaro-con-kinder-primaria-y-secundaria': {
    slug: 'escuela-privada-en-queretaro-con-kinder-primaria-y-secundaria',
    lang: 'es',
    title: 'Una de las mejores escuelas privadas en Queretaro | Newland School',
    h1: 'Escuelas privadas en Queretaro de alto nivel educativo',
    description:
      'Escuela privada en Querétaro con kinder, primaria y secundaria bilingüe. Newland School ofrece Filosofía para Niños, programas internacionales y 5 campus.',
    uniqueIntro:
      'NWL es una de las pocas escuelas privadas en Querétaro que ofrece trayectoria completa de maternal a preparatoria en 5 campus. Nuestro modelo elimina la tarea tradicional con Knotion, forma líderes con Yo Soy Líder by Tec de Monterrey, y certifica internacionalmente con Cambridge, Cognia y Hokku Academy. Más de 15 años formando estudiantes bilingües.',
    sections: [
      {
        heading: 'Un modelo sin tarea: Knotion en cada nivel',
        body: 'Lo primero que notan las familias en NWL es que no hay tarea tradicional. La metodología Knotion sustituye cuadernos por proyectos: en kinder, los niños investigan y crean. En primaria, Knotion IMPACT con Design Thinking resuelve problemas reales. En secundaria, Emprendizaje con Universidad Mondragón crea proyectos empresariales.\n\nEl TecniKids STEAM Lab (impresión 3D, corte láser, robótica, maker spaces) complementa este enfoque en primaria. Los alumnos aprenden haciendo, no memorizando.',
      },
      {
        heading: 'Certificaciones que abren puertas',
        body: 'Cambridge en todos los niveles (Starters, Movers, Flyers en primaria; PET, FCE en secundaria). Doble Certificación Internacional en secundaria (diploma EUA + México vía Hokku Academy). Acreditación Cognia en campus Milenio.\n\nEn preparatoria (San Miguel, Corregidora, Zibatá): Doble Diploma, Kn U High/Coursera, Inteligencia Financiera, IA y Tecnología Moderna. Viajes internacionales desde 5.° de primaria e intercambio en 5.° y 6.° semestre de prepa.',
      },
      {
        heading: '5 campus, un mismo estándar',
        body: 'Juriquilla (2009, 4.6★): insignia, maternal-secundaria. Milenio (2016, 4.5★): Cognia, cocina, yoga, dance team. San Miguel (2018, 4.7★): arte, UNESCO, maternal-prepa. Corregidora (2019, 4.5★): podcasts, IA, cubo Rubik, maternal-prepa. Zibatá (2025, 4.5★): el más moderno, maternal-prepa.\n\nTodos comparten: Knotion sin tarea, FpN, Yo Soy Líder NWL, BFS, Cambridge, 90+ cámaras 24/7. Cada campus tiene actividades únicas que reflejan su comunidad.',
      },
    ],
    faqs: [
      {
        question: '¿Qué ventaja tiene una escuela privada con todos los niveles?',
        answer:
          'Continuidad educativa de maternal a prepa sin cambiar de escuela. Mismo modelo (Knotion, FpN, Yo Soy Líder), mismas certificaciones (Cambridge, Cognia), y seguimiento personalizado a largo plazo en 5 campus.',
      },
      {
        question: '¿Dónde están ubicados los campus de Newland School?',
        answer:
          'Juriquilla, Milenio, San Miguel de Allende, Corregidora y Zibatá. Los 5 ofrecen maternal a secundaria. San Miguel, Corregidora y Zibatá también ofrecen preparatoria con Life Project y Doble Diploma.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/campus/corregidora/corregidora-hero.jpg',
        '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      ],
    },
    category: 'general',
    keywords: [
      'escuela privada queretaro',
      'escuela privada con kinder primaria y secundaria',
      'escuelas privadas queretaro',
      'mejor escuela privada queretaro',
    ],
  },

  // =========================================================================
  // PAGE 32 — Primaria bilingüe en Querétaro
  // =========================================================================
  'la-mejor-primaria-bilingue-en-queretaro': {
    slug: 'la-mejor-primaria-bilingue-en-queretaro',
    lang: 'es',
    title: 'Uno de los mejores colegios privado bilingüe en Queretaro | Newland School',
    h1: 'De las mejores primarias bilingüe en Queretaro',
    description:
      'Primaria bilingüe en Querétaro con Filosofía para Niños, certificaciones de Cambridge y formación integral. Descubre por qué Newland School es de las mejores opciones.',
    uniqueIntro:
      'La primaria NWL (6-11 años) se distingue en Querétaro por tres programas clave: Knotion IMPACT con Design Thinking (sin tarea tradicional), TecniKids STEAM Lab (impresión 3D, corte láser, robótica) y certificaciones Cambridge desde 3.° grado. Horario: 7:40-2:30 pm en los 5 campus, con viajes internacionales desde 5.° grado.',
    sections: [
      {
        heading: 'Knotion IMPACT y TecniKids STEAM Lab',
        body: 'No hay cuadernos de tarea en la primaria NWL. Knotion IMPACT utiliza Design Thinking para que los alumnos resuelvan problemas reales de su comunidad, integrando ciencias, tecnología y humanidades en cada proyecto.\n\nEl TecniKids STEAM Lab ofrece impresión 3D, corte láser, robótica y maker spaces. Los niños construyen prototipos, programan robots y experimentan con tecnología de punta desde los 6 años.',
      },
      {
        heading: 'Cambridge, Cognia y viajes internacionales',
        body: 'Desde 3.° grado, los alumnos se preparan para certificaciones Cambridge (Starters, Movers, Flyers). La acreditación Cognia del sistema NWL respalda los estándares académicos internacionales.\n\nDesde 5.° grado, los estudiantes acceden a viajes internacionales que complementan su formación global. La Filosofía para Niños con Diploma para Padres invita a las familias a participar activamente en la formación de pensamiento crítico.',
      },
      {
        heading: 'Actividades únicas en cada campus',
        body: 'Juriquilla: fútbol, basquetbol, voleibol, artes visuales, teatro, robótica, música. Milenio: cocina, yoga, dance team, tochito, voleibol. San Miguel: pintura, escultura, teatro, inmersión artística UNESCO. Corregidora: podcasts, programación, IA, basquetbol, dance. Zibatá: instalaciones modernas 2025.\n\nTodos comparten: Knotion sin tarea, TecniKids STEAM, FpN, Yo Soy Líder NWL by Tec de Monterrey, BFS y Cambridge. El programa se adapta al contexto de cada campus manteniendo el mismo estándar.',
      },
    ],
    faqs: [
      {
        question: '¿Qué certificaciones internacionales ofrece la primaria bilingüe?',
        answer:
          'Cambridge Starters, Movers y Flyers desde 3.° grado. Acreditación Cognia del sistema. Viajes internacionales desde 5.° grado. Sin tarea tradicional gracias a Knotion IMPACT con Design Thinking.',
      },
      {
        question: '¿La primaria bilingüe incluye programa STEAM?',
        answer:
          'Sí. El TecniKids STEAM Lab ofrece impresión 3D, corte láser, robótica y maker spaces en los 5 campus. Horario: 7:40-2:30 pm. Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey completan la formación.',
      },
    ],
    images: {
      hero: '/images/levels/elementary.jpg',
      content: [
        '/images/levels/primaria/primaria-classroom.jpg',
        '/images/levels/primaria/primaria-science-fair.jpg',
      ],
    },
    targetLevel: '/elementary',
    category: 'level',
    hreflangPair: 'private-bilingual-elementary-school-in-queretaro',
    keywords: [
      'primaria bilingüe queretaro',
      'mejor primaria bilingüe queretaro',
      'primaria privada bilingüe queretaro',
      'colegio primaria bilingüe queretaro',
    ],
  },

  // =========================================================================
  // PAGE 33 — Secundaria particular en Querétaro
  // =========================================================================
  'la-mejor-secundaria-particular-en-queretaro': {
    slug: 'la-mejor-secundaria-particular-en-queretaro',
    lang: 'es',
    title: 'Secundaria privada o particular bilingüe en Queretaro | Newland School',
    h1: 'Buscando la mejor secundaria en Queretaro',
    description:
      'Secundaria particular bilingüe en Querétaro con Filosofía para Niños, certificaciones de Cambridge y orientación vocacional. Newland School forma líderes del mañana.',
    uniqueIntro:
      'La secundaria NWL (12-15 años) se diferencia en Querétaro por el programa de Emprendizaje con Universidad Mondragón, la Doble Certificación Internacional (diploma EUA + México vía Hokku Academy) y certificaciones Cambridge PET/FCE. El modelo Knotion elimina la tarea tradicional. Horario: 7:30-2:30 pm, 90+ cámaras de seguridad en cada campus.',
    sections: [
      {
        heading: 'Emprendizaje con Universidad Mondragón',
        body: 'El programa de Emprendizaje desafía a los adolescentes a crear proyectos empresariales reales durante los 3 años de secundaria. En colaboración con Universidad Mondragón, los alumnos aprenden finanzas, mercadotecnia, presentación ejecutiva e impacto social.\n\nNo es un taller extracurricular: el emprendimiento es parte integral del currículo. Los proyectos se presentan ante jurados y los mejores se desarrollan para su implementación real.',
      },
      {
        heading: 'Doble Certificación: Diploma EUA + México',
        body: 'A través de Hokku Academy, los alumnos de secundaria obtienen un diploma estadounidense (acreditado por Cognia) junto con su certificado SEP mexicano. Esta Doble Certificación Internacional les abre puertas a preparatorias en ambos países.\n\nLas certificaciones Cambridge PET y FCE consolidan un nivel B1-B2 de inglés. Model ONU, debate y oratoria desarrollan habilidades de comunicación y liderazgo. La Filosofía para Niños evoluciona hacia análisis ético y debate estructurado.',
      },
      {
        heading: 'Seguridad, deporte y actividades por campus',
        body: 'Los 5 campus cuentan con 90+ cámaras de seguridad 24/7, programa BFS y Yo Soy Líder NWL by Tec de Monterrey. Cada campus tiene actividades únicas: Milenio (cocina, yoga, dance team), San Miguel (arte, cultura UNESCO), Corregidora (podcasts, IA, programación), Juriquilla (fútbol, artes visuales, teatro), Zibatá (instalaciones 2025).\n\nEl Diplomado para Padres de Filosofía para Niños y el seguimiento socioemocional acompañan a las familias durante la adolescencia.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria particular de NWL ofrece orientación vocacional?',
        answer:
          'Sí. El programa de Emprendizaje con Universidad Mondragón orienta vocacionalmente a través de proyectos reales. La Doble Certificación Internacional y Cambridge PET/FCE amplían las opciones de preparatoria en México y el extranjero.',
      },
      {
        question: '¿Qué nivel de inglés alcanzan los alumnos al terminar secundaria?',
        answer:
          'Nivel B1-B2 certificado por Cambridge (PET/FCE). Además obtienen Doble Certificación Internacional (diploma EUA + México). Participan en Model ONU, debate y oratoria. Horario: 7:30-2:30 pm.',
      },
    ],
    images: {
      hero: '/images/levels/middle-school.jpg',
      content: [
        '/images/levels/secundaria/secundaria-science-lab.jpg',
        '/images/levels/secundaria/secundaria-students.jpg',
      ],
    },
    targetLevel: '/middle-school',
    category: 'level',
    hreflangPair: 'private-bilingual-junior-high-school-in-queretaro',
    keywords: [
      'secundaria particular queretaro',
      'secundaria privada queretaro',
      'mejor secundaria queretaro',
      'secundaria bilingüe queretaro',
    ],
  },

  // =========================================================================
  // PAGE 34 — Secundaria cerca de El Mirador
  // =========================================================================
  'secundarias-cerca-de-el-mirador-queretaro': {
    slug: 'secundarias-cerca-de-el-mirador-queretaro',
    lang: 'es',
    title: 'NWL escuela con secundaria en Queretaro | Newland School',
    h1: 'Recibe la mejor educación secundaria en Queretaro',
    description:
      'Secundaria privada bilingüe cerca de El Mirador Querétaro con Filosofía para Niños, certificaciones internacionales y formación integral en Newland School campus Milenio.',
    uniqueIntro:
      'Los adolescentes de El Mirador encuentran en NWL campus Milenio la secundaria bilingüe más cercana (10-15 minutos). El campus con acreditación Cognia ofrece Emprendizaje con Universidad Mondragón, Doble Certificación Internacional, Cambridge PET/FCE y actividades exclusivas como cocina, yoga y dance team. Horario: 7:30-2:30 pm.',
    sections: [
      {
        heading: 'Emprendizaje y Doble Certificación cerca de El Mirador',
        body: 'Los alumnos de El Mirador participan en Emprendizaje con Universidad Mondragón: 3 años creando proyectos empresariales reales con impacto social. La Doble Certificación Internacional (diploma EUA + México vía Hokku Academy) abre puertas a preparatorias en ambos países.\n\nNWL campus Milenio es el único con acreditación Cognia en la zona sur, lo que respalda la validez internacional de las certificaciones que obtienen los alumnos.',
      },
      {
        heading: 'Cambridge PET/FCE y Model ONU',
        body: 'Las certificaciones Cambridge PET y FCE consolidan un nivel B1-B2 de inglés al egresar. Los alumnos participan en Model ONU, debate y oratoria, desarrollando habilidades de comunicación y negociación.\n\nLa Filosofía para Niños con Diplomado para Padres crea un espacio de reflexión tanto para adolescentes como para familias, abordando dilemas éticos y fortaleciendo el pensamiento crítico durante una etapa de grandes cambios.',
      },
      {
        heading: 'Dance team, cocina, yoga y transporte',
        body: 'Las actividades exclusivas de campus Milenio incluyen talleres de cocina, yoga y dance team competitivo, además de voleibol, tochito, basquetbol, fútbol, robótica STEAM y música.\n\nTransporte escolar cubre El Mirador con unidades monitoreadas por GPS. El campus cuenta con 90+ cámaras 24/7, cancha de fútbol, cancha techada, terraza rooftop y laboratorio STEAM. Directora: Mtra. Ximena Arellano.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria cercana a El Mirador tiene actividades deportivas?',
        answer:
          'Sí. Voleibol, tochito, basquetbol, fútbol, dance team, cocina, yoga, robótica STEAM y música. Campus Milenio tiene acreditación Cognia, cancha de fútbol, cancha techada y terraza rooftop.',
      },
      {
        question: '¿Hay transporte escolar desde El Mirador al campus Milenio?',
        answer:
          'Sí. Rutas con GPS cubren El Mirador (10-15 min). Los alumnos obtienen Emprendizaje, Doble Certificación, Cambridge PET/FCE y participan en Model ONU. Horario: 7:30-2:30 pm. 90+ cámaras 24/7.',
      },
    ],
    images: {
      hero: '/images/campus/milenio/milenio-soccer-field-hero.jpg',
      content: [
        '/images/levels/secundaria/secundaria-science-lab.jpg',
        '/images/campus/milenio/milenio-kinder-playground-wide.jpg',
      ],
    },
    targetCampus: 'milenio',
    targetLevel: '/middle-school',
    targetNeighborhood: 'El Mirador',
    category: 'neighborhood',
    keywords: [
      'secundaria el mirador queretaro',
      'secundaria privada el mirador',
      'secundaria bilingüe el mirador',
      'escuela secundaria cerca de el mirador',
    ],
  },

  // =========================================================================
  // PAGE 35 — Private bilingual Pre Kinder (EN)
  // =========================================================================
  'private-bilingual-pre-kinder-in-queretaro': {
    slug: 'private-bilingual-pre-kinder-in-queretaro',
    lang: 'en',
    title: 'Private bilingual pre Kinder in Queretaro | Newland School',
    h1: 'The best education in our bilingual Pre Kinder in Queretaro',
    description:
      'Private bilingual Pre Kinder in Queretaro with Philosophy for Children, early stimulation and a safe environment. Discover Newland School\'s approach to early childhood education.',
    uniqueIntro:
      'Newland School\'s Pre Kinder is the only program in Queretaro offering Multisensory Stimulation combined with Brain Up English immersion from age 2. Available at all 5 campuses, the program includes Philosophy for Children adapted for toddlers, the Corazones Magicos violence prevention program, and Secure Attachment protocols. Schedule: 8:20 AM to 1:30 PM.',
    sections: [
      {
        heading: 'Brain Up: English Immersion from Age 2',
        body: 'Brain Up is NWL\'s early English immersion program, introducing the second language through songs, stories, routines, and play throughout the day. This is not a separate English class — the language is woven into every activity naturally.\n\nStarting at age 2, children absorb English during the peak window of language acquisition, developing bilingual neural pathways that give them a lasting cognitive advantage. Brain Up is available at all 5 NWL campuses.',
      },
      {
        heading: 'Multisensory Stimulation: Only at NWL',
        body: 'NWL is the only school in Queretaro with a structured Multisensory Stimulation program for toddlers. Children explore textures, sounds, scents, and movements in spaces designed by child development specialists.\n\nEach session combines visual, auditory, tactile, and vestibular stimulation, strengthening neural connections during the brain\'s most plastic period. This complements gross and fine motor skills development adapted to each child\'s pace.',
      },
      {
        heading: 'I\'m NWL Leader by Tec de Monterrey',
        body: 'Even at the Pre Kinder level, children begin the I\'m NWL Leader program, designed exclusively for Newland School by Tecnologico de Monterrey. The 7 leadership habits are adapted for toddlers: proactivity, cooperation, empathy, and win-win thinking through play and group activities.\n\nThe Bullying Free School (BFS) protocol and Corazones Magicos program create a safe, nurturing environment from day one. The Secure Attachment protocol supports the home-to-school transition.',
      },
    ],
    faqs: [
      {
        question: 'What age does Newland School\'s Pre Kinder accept children?',
        answer:
          'From age 2. Schedule: 8:20 AM to 1:30 PM. The program includes Brain Up (English immersion), Multisensory Stimulation (only at NWL in Queretaro), Philosophy for Children, and I\'m NWL Leader by Tec de Monterrey. Available at all 5 campuses.',
      },
      {
        question: 'Is the Pre Kinder program fully bilingual?',
        answer:
          'Yes. Brain Up integrates English naturally throughout the day from age 2. NWL also offers Multisensory Stimulation (unique in Queretaro), Corazones Magicos violence prevention, and Bullying Free School protocols across all campuses.',
      },
    ],
    images: {
      hero: '/images/levels/maternal.jpg',
      content: [
        '/images/levels/kinder/kinder-climbing.jpg',
        '/images/levels/kinder/kinder-classroom.jpg',
      ],
    },
    targetLevel: '/maternal',
    category: 'level',
    hreflangPair: 'escuela-con-maternal-y-kinder-en-queretaro',
    keywords: [
      'pre kinder queretaro',
      'bilingual pre kinder queretaro',
      'private pre kinder queretaro',
      'early childhood education queretaro',
    ],
  },

  // =========================================================================
  // PAGE 36 — Private bilingual Kindergarten (EN)
  // =========================================================================
  'private-bilingual-kindergarten-in-queretaro': {
    slug: 'private-bilingual-kindergarten-in-queretaro',
    lang: 'en',
    title: 'Private bilingual Kindergarten in Queretaro | Newland School',
    h1: 'The best option is our kindergarten in Queretaro',
    description:
      'Private bilingual Kindergarten in Queretaro with Philosophy for Children, STEAM program and holistic development. Discover Newland School\'s approach to early education.',
    uniqueIntro:
      'NWL\'s kindergarten (ages 3-5) uses Knotion, an international methodology that replaces traditional homework with real-world projects. Available at all 5 campuses, the program includes Philosophy for Children, I\'m NWL Leader by Tec de Monterrey, and Bullying Free School protocols. Each campus has unique activities: Milenio offers dance team, cooking, and yoga; San Miguel features art and sculpture. Schedule: 8:20 AM to 1:50 PM.',
    sections: [
      {
        heading: 'Knotion: No Homework, Real Projects',
        body: 'At NWL kindergarten, there are no homework notebooks. Knotion replaces traditional homework with interdisciplinary projects where children investigate, create, and present in both Spanish and English. Each project integrates science, language, art, and social-emotional skills.\n\nThis international methodology respects each child\'s pace and develops autonomy, curiosity, and communication skills from age 3. Teachers share digital portfolios with families to track progress.',
      },
      {
        heading: 'Philosophy for Children from Age 3',
        body: 'Weekly Philosophy for Children sessions use stories, images, and open-ended questions to explore friendship, justice, emotions, and nature. Children learn to listen, ask questions, and respect different opinions.\n\nThis methodology, present at all NWL campuses, develops cognitive and social skills that make a measurable difference in elementary school. It complements I\'m NWL Leader by Tec de Monterrey for emotional intelligence.',
      },
      {
        heading: '5 Campuses, Each with Unique Activities',
        body: 'Juriquilla: soccer, basketball, visual arts, theater, robotics, music. Milenio: dance team, cooking workshops, yoga, rooftop terrace, Cognia accreditation. San Miguel: painting, sculpture, pirate ship playground, UNESCO city. Corregidora: basketball, dance, theater, Rubik\'s Cube building. Zibata: modern 2025 facilities.\n\nAll share: Knotion (no homework), Philosophy for Children, I\'m NWL Leader, and Bullying Free School. Same educational model, different campus personalities.',
      },
    ],
    faqs: [
      {
        question: 'What teaching methods does the kindergarten use?',
        answer:
          'Knotion (no traditional homework, real projects), Philosophy for Children, I\'m NWL Leader by Tec de Monterrey, and Bullying Free School. Schedule: 8:20-1:50 PM. Available at all 5 campuses across Queretaro and San Miguel de Allende.',
      },
      {
        question: 'Which campuses offer kindergarten in Queretaro?',
        answer:
          'All 5: Juriquilla (est. 2009), Milenio (est. 2016, Cognia accredited), San Miguel de Allende (est. 2018), Corregidora (est. 2019), and Zibata (est. 2025). Each has unique activities but the same bilingual Knotion model.',
      },
    ],
    images: {
      hero: '/images/levels/kinder.jpg',
      content: [
        '/images/levels/kinder/kinder-climbing.jpg',
        '/images/levels/kinder/kinder-classroom.jpg',
      ],
    },
    targetLevel: '/kinder',
    category: 'level',
    hreflangPair: 'el-mejor-kinder-privado-en-queretaro',
    keywords: [
      'kindergarten queretaro',
      'bilingual kindergarten queretaro',
      'private kindergarten queretaro',
      'preschool queretaro english',
    ],
  },

  // =========================================================================
  // PAGE 37 — Private bilingual Elementary School (EN)
  // =========================================================================
  'private-bilingual-elementary-school-in-queretaro': {
    slug: 'private-bilingual-elementary-school-in-queretaro',
    lang: 'en',
    title: 'Private bilingual Elementary School in Queretaro | Newland School',
    h1: 'We are the best primary school in Queretaro',
    description:
      'Private bilingual elementary school in Queretaro with Philosophy for Children, Cambridge certifications and holistic education. Newland School shapes future global citizens.',
    uniqueIntro:
      'NWL\'s elementary school (ages 6-11) stands out in Queretaro for three key programs: Knotion IMPACT with Design Thinking (no traditional homework), TecniKids STEAM Lab (3D printing, laser cutting, robotics), and Cambridge certifications from 3rd grade. International trips begin in 5th grade. Schedule: 7:40 AM to 2:30 PM across all 5 campuses.',
    sections: [
      {
        heading: 'Knotion IMPACT and TecniKids STEAM Lab',
        body: 'There are no homework notebooks at NWL elementary. Knotion IMPACT uses Design Thinking so students solve real community problems, integrating science, technology, and humanities in every project.\n\nThe TecniKids STEAM Lab offers 3D printing, laser cutting, robotics, and maker spaces where children build prototypes and program robots from age 6. These hands-on skills prepare students for Cambridge certifications and secondary school challenges.',
      },
      {
        heading: 'Cambridge Certifications and International Trips',
        body: 'From 3rd grade, students prepare for Cambridge certifications (Starters, Movers, Flyers). The Cognia accreditation of the NWL system backs these international academic standards.\n\nStarting in 5th grade, students access international trips that broaden their global perspective. Philosophy for Children with a Parent Diploma invites families to actively participate in developing critical thinking at home.',
      },
      {
        heading: 'Unique Activities at Each Campus',
        body: 'Juriquilla: soccer, basketball, volleyball, visual arts, theater, robotics, music. Milenio: cooking workshops, yoga, dance team, Cognia accredited. San Miguel: painting, sculpture, theater in a UNESCO city. Corregidora: podcasts, programming, AI, basketball, dance. Zibata: state-of-the-art 2025 facilities.\n\nAll share: Knotion IMPACT (no homework), TecniKids STEAM, Philosophy for Children, I\'m NWL Leader by Tec de Monterrey, Bullying Free School, and Cambridge. Same standard, unique campus culture.',
      },
    ],
    faqs: [
      {
        question: 'What international certifications does the elementary school offer?',
        answer:
          'Cambridge Starters, Movers, and Flyers from 3rd grade. Cognia system accreditation. International trips from 5th grade. No traditional homework — Knotion IMPACT with Design Thinking replaces it with real-world projects.',
      },
      {
        question: 'Does the elementary school include a STEAM program?',
        answer:
          'Yes. The TecniKids STEAM Lab offers 3D printing, laser cutting, robotics, and maker spaces at all 5 campuses. Schedule: 7:40-2:30 PM. Philosophy for Children and I\'m NWL Leader by Tec de Monterrey complete the program.',
      },
    ],
    images: {
      hero: '/images/levels/elementary.jpg',
      content: [
        '/images/levels/primaria/primaria-classroom.jpg',
        '/images/levels/primaria/primaria-science-fair.jpg',
      ],
    },
    targetLevel: '/elementary',
    category: 'level',
    hreflangPair: 'la-mejor-primaria-bilingue-en-queretaro',
    keywords: [
      'elementary school queretaro',
      'bilingual elementary queretaro',
      'private primary school queretaro',
      'english elementary school queretaro',
    ],
  },

  // =========================================================================
  // PAGE 38 — Private bilingual Junior High School (EN)
  // =========================================================================
  'private-bilingual-junior-high-school-in-queretaro': {
    slug: 'private-bilingual-junior-high-school-in-queretaro',
    lang: 'en',
    title: 'Private bilingual Junior High School in Queretaro | Newland School',
    h1: 'NWL, our bilingual Junior High School in Queretaro',
    description:
      'Private bilingual junior high school in Queretaro with Philosophy for Children, Cambridge certifications and career guidance. Newland School prepares future leaders.',
    uniqueIntro:
      'NWL\'s junior high (ages 12-15) stands apart in Queretaro with the Emprendizaje entrepreneurship program (with Mondragon University), Dual International Certification (US + Mexico diplomas via Hokku Academy), and Cambridge PET/FCE certifications. The Knotion model eliminates traditional homework. Schedule: 7:30 AM to 2:30 PM, with 90+ security cameras at every campus.',
    sections: [
      {
        heading: 'Emprendizaje: Real Entrepreneurship with Mondragon University',
        body: 'Over three years of junior high, students create real business projects in partnership with Mondragon University. They learn finance, marketing, and executive presentation while addressing social challenges in their communities.\n\nThis is not an extracurricular workshop — entrepreneurship is integrated into the core curriculum. Projects are presented to judges, and the best are developed for real-world implementation.',
      },
      {
        heading: 'Dual International Certification: US + Mexico Diplomas',
        body: 'Through Hokku Academy, NWL junior high students earn a US diploma (Cognia-accredited) alongside their Mexican SEP certificate. This Dual International Certification opens doors to high schools in both countries.\n\nCambridge PET and FCE certifications consolidate a B1-B2 English level. Model UN, debate, and public speaking develop communication and leadership skills. Philosophy for Children evolves into structured ethical analysis and debate.',
      },
      {
        heading: 'Security, Sports, and Unique Campus Activities',
        body: 'All 5 campuses feature 90+ security cameras (24/7), Bullying Free School protocols, and I\'m NWL Leader by Tec de Monterrey. Each campus has unique offerings: Milenio (cooking, yoga, dance team), San Miguel (art in a UNESCO city), Corregidora (podcasts, AI, programming), Juriquilla (soccer, visual arts), Zibata (modern 2025 facilities).\n\nThe Parent Diploma in Philosophy for Children and social-emotional support help families navigate the teenage years together.',
      },
    ],
    faqs: [
      {
        question: 'Does the junior high school offer career guidance?',
        answer:
          'Yes. The Emprendizaje program with Mondragon University provides hands-on entrepreneurship and career exploration over 3 years. The Dual International Certification (US + Mexico) and Cambridge PET/FCE expand high school options domestically and abroad.',
      },
      {
        question: 'What English level do students achieve by the end of junior high?',
        answer:
          'Cambridge-certified B1-B2 level (PET/FCE). Students also earn Dual International Certification (US + Mexico diplomas). They participate in Model UN, debate, and public speaking. Schedule: 7:30-2:30 PM. 90+ security cameras at each campus.',
      },
    ],
    images: {
      hero: '/images/levels/middle-school.jpg',
      content: [
        '/images/levels/secundaria/secundaria-science-lab.jpg',
        '/images/levels/secundaria/secundaria-students.jpg',
      ],
    },
    targetLevel: '/middle-school',
    category: 'level',
    hreflangPair: 'la-mejor-secundaria-particular-en-queretaro',
    keywords: [
      'junior high school queretaro',
      'bilingual junior high queretaro',
      'private middle school queretaro',
      'english secondary school queretaro',
    ],
  },

  // =========================================================================
  // PAGE 39 — Private bilingual school (EN — high school focus)
  // =========================================================================
  'private-bilingual-school-in-queretaro': {
    slug: 'private-bilingual-school-in-queretaro',
    lang: 'en',
    title: 'Private bilingual school in Queretaro | Newland School',
    h1: 'High School in Queretaro with academic excellence',
    description:
      'Private bilingual high school in Queretaro with Philosophy for Children, international programs and 5 campuses. Newland School delivers academic excellence from preschool to high school.',
    uniqueIntro:
      'Newland School operates 5 campuses across Queretaro and San Miguel de Allende, serving students from pre-kinder (age 2) through high school (age 17). With Cognia accreditation, partnerships with Tec de Monterrey, Mondragon University, Hokku Academy, Knotion, Cambridge, and Coursera, NWL shapes bilingual, entrepreneurial, critical-thinking graduates. High school is available at San Miguel, Corregidora, and Zibata campuses.',
    sections: [
      {
        heading: 'Life Project: Your Personalized Path',
        body: 'NWL\'s high school (available at San Miguel, Corregidora, and Zibata) features the Life Project program: each student works with a personal Life Mentor over 6 semesters to define their academic and professional path.\n\nThe Dual Diploma (SEP Mexico + Cognia-accredited US diploma) and Kn U High/Coursera certifications from 1st semester give students a head start on college preparation. International exchange opportunities open in semesters 5 and 6.',
      },
      {
        heading: 'Financial Literacy, AI, and Modern Skills',
        body: 'Every semester includes Financial Literacy classes that teach practical money management, investing fundamentals, and entrepreneurial finance. The AI and Modern Technology module ensures students are proficient with cutting-edge tools.\n\nThe HIT/Hyrox fitness program maintains physical wellness on campus. Over 3 years, students build a Personal Project Portfolio of 6 real-world projects. McGraw-Hill provides the academic content backbone.',
      },
      {
        heading: '5 Campuses, Complete Educational Journey',
        body: 'Juriquilla (est. 2009, 4.6 stars): flagship, pre-k through junior high. Milenio (est. 2016, 4.5 stars): Cognia accredited, cooking/yoga/dance team. San Miguel (est. 2018, 4.7 stars): art, UNESCO city, pre-k through high school. Corregidora (est. 2019, 4.5 stars): podcasts, AI, Rubik\'s Cube building, pre-k through high school. Zibata (est. 2025, 4.5 stars): newest, most modern, pre-k through high school.\n\nAll campuses share: Knotion (no homework), Philosophy for Children, I\'m NWL Leader by Tec de Monterrey, Cambridge, and Bullying Free School.',
      },
    ],
    faqs: [
      {
        question: 'How many campuses does Newland School have?',
        answer:
          '5 campuses: Juriquilla (2009), Milenio (2016), San Miguel de Allende (2018), Corregidora (2019), and Zibata (2025). San Miguel, Corregidora, and Zibata offer high school with Life Project and Dual Diploma.',
      },
      {
        question: 'What grade levels does Newland School offer?',
        answer:
          'Pre-kinder (age 2) through high school (age 17). Programs include Brain Up, Knotion (no homework), TecniKids STEAM, Emprendizaje, Dual International Certification, Cambridge, Life Project, and Dual Diploma depending on level and campus.',
      },
    ],
    images: {
      hero: '/images/levels/high-school.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetLevel: '/high-school',
    category: 'level',
    hreflangPair: 'colegio-privado-bilingue-en-queretaro',
    keywords: [
      'private school queretaro',
      'bilingual school queretaro',
      'private bilingual school queretaro',
      'english school queretaro',
    ],
  },

  // =========================================================================
  // PAGE 40 — Preparatoria bilingüe en Querétaro
  // =========================================================================
  'preparatoria-bilingue-privada-en-queretaro': {
    slug: 'preparatoria-bilingue-privada-en-queretaro',
    lang: 'es',
    title: 'Preparatoria bilingüe privada en Queretaro | Newland School',
    h1: 'Preparatoria en Queretaro particular y de excelencia',
    description:
      'Preparatoria bilingüe privada en Querétaro con Filosofía para Niños, programas internacionales y formación integral. Newland School prepara líderes con visión global.',
    uniqueIntro:
      'La preparatoria NWL está disponible en 3 campus (San Miguel de Allende, Corregidora y Zibatá) y ofrece el programa Life Project con mentores personales durante 6 semestres. Los alumnos obtienen el Doble Diploma (SEP México + EUA acreditado por Cognia), certificaciones Kn U High/Coursera desde el primer semestre, Inteligencia Financiera, IA y Tecnología Moderna, y acceso a intercambio internacional. Horario: 7:30-2:30 pm.',
    sections: [
      {
        heading: 'Life Project: Tu camino personalizado',
        body: 'Cada alumno de preparatoria NWL trabaja con un Life Mentor personal durante los 6 semestres. Juntos definen metas académicas, personales y profesionales, construyendo un plan de vida que se materializa en un Portafolio de 6 Proyectos Personales.\n\nEl Life Project no es una materia: es una experiencia transformadora donde el alumno se conoce, identifica sus fortalezas y diseña su futuro con el apoyo de mentores, herramientas y experiencias reales.',
      },
      {
        heading: 'Doble Diploma y certificaciones Kn U High/Coursera',
        body: 'Los alumnos egresan con doble validez: diploma SEP (México) y diploma estadounidense acreditado por Cognia. Desde el primer semestre, acceden a certificaciones Kn U High y Coursera que les dan una ventaja en admisiones universitarias.\n\nEl contenido académico de McGraw-Hill se complementa con Inteligencia Financiera cada semestre (inversiones, presupuestos, emprendimiento financiero) y módulos de IA y Tecnología Moderna que preparan para las carreras del futuro.',
      },
      {
        heading: 'HIT/Hyrox, intercambio y 3 campus disponibles',
        body: 'El programa HIT/Hyrox mantiene la condición física en campus con entrenamientos de alta intensidad. En 5.° y 6.° semestre, los alumnos acceden a programas de intercambio internacional.\n\nSan Miguel de Allende (4.7★, ciudad UNESCO, arte y cultura), Corregidora (4.5★, podcasts, IA, edificio cubo Rubik) y Zibatá (4.5★, 2025, instalaciones más modernas). Cada campus ofrece la misma preparatoria con el carácter único de su comunidad.',
      },
    ],
    faqs: [
      {
        question: '¿En qué campus de NWL hay preparatoria?',
        answer:
          'San Miguel de Allende, Corregidora y Zibatá. Juriquilla y Milenio NO tienen preparatoria. Los 3 campus con prepa ofrecen Life Project, Doble Diploma, Kn U High/Coursera, Inteligencia Financiera, HIT/Hyrox e intercambio internacional.',
      },
      {
        question: '¿La preparatoria bilingüe tiene programa de emprendimiento?',
        answer:
          'Sí. El Portafolio de 6 Proyectos Personales, las certificaciones Coursera, la Inteligencia Financiera y el Life Project con mentores crean un perfil emprendedor. En secundaria previa, el Emprendizaje con Universidad Mondragón sienta las bases.',
      },
    ],
    images: {
      hero: '/images/levels/high-school.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetLevel: '/high-school',
    category: 'level',
    keywords: [
      'preparatoria bilingüe queretaro',
      'prepa privada queretaro',
      'preparatoria particular queretaro',
      'mejor preparatoria queretaro',
    ],
  },

  // =========================================================================
  // PAGE 41 — Preparatoria en San Miguel de Allende
  // =========================================================================
  'preparatoria-bilingue-privada-en-san-miguel-de-allende': {
    slug: 'preparatoria-bilingue-privada-en-san-miguel-de-allende',
    lang: 'es',
    title: 'Preparatoria bilingüe privada en San Miguel de Allende | Newland School',
    h1: 'Tu mejor opción de prepa en San Miguel de Allende',
    description:
      'Preparatoria bilingüe privada en San Miguel de Allende con Filosofía para Niños, programas internacionales y formación integral. Newland School campus San Miguel.',
    uniqueIntro:
      'La preparatoria NWL San Miguel de Allende combina el programa Life Project con mentores personales y el contexto cultural de una ciudad Patrimonio UNESCO. Los alumnos obtienen el Doble Diploma (México + EUA), certificaciones Kn U High/Coursera y participan en intercambio internacional en 5.° y 6.° semestre. Campus fundado en 2018, 4.7★ en Google, dirigido por el Lic. Ramón Godínez.',
    sections: [
      {
        heading: 'Life Project en una ciudad Patrimonio UNESCO',
        body: 'El Life Project en San Miguel de Allende cobra una dimensión única: los alumnos trabajan con Life Mentors rodeados de galerías, festivales, artistas y una comunidad internacional activa. Los 6 Proyectos Personales del portafolio pueden conectar con la escena cultural y emprendedora de la ciudad.\n\nEsta inmersión cultural enriquece el proceso de autoconocimiento y definición vocacional. Los alumnos no solo planean su futuro académico, sino que lo viven en un entorno que inspira creatividad y visión global.',
      },
      {
        heading: 'Doble Diploma y comunidad multicultural',
        body: 'El Doble Diploma (SEP México + diploma EUA acreditado por Cognia) es especialmente valorado en San Miguel, donde la comunidad internacional demanda credenciales reconocidas en ambos países. Las certificaciones Kn U High/Coursera desde el primer semestre refuerzan el perfil de admisión universitaria.\n\nLa diversidad de San Miguel de Allende (familias mexicanas, estadounidenses, canadienses, europeas) crea un ambiente donde los alumnos practican inglés en contextos reales, acelerando su dominio del idioma.',
      },
      {
        heading: 'Arte, HIT/Hyrox e intercambio internacional',
        body: 'Las actividades aprovechan la riqueza de San Miguel: pintura, escultura, teatro y la inmersión en la escena artística local complementan robótica STEAM y música. El programa HIT/Hyrox mantiene la condición física con entrenamientos en campus.\n\nEn 5.° y 6.° semestre, los alumnos acceden a programas de intercambio internacional. Inteligencia Financiera cada semestre y módulos de IA y Tecnología Moderna preparan para las carreras del futuro.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en San Miguel de Allende acepta alumnos internacionales?',
        answer:
          'Sí. La comunidad multicultural de San Miguel enriquece la experiencia. El Doble Diploma (México + EUA) facilita la transición para familias internacionales. Campus con 4.7★ en Google, la calificación más alta de la red NWL.',
      },
      {
        question: '¿Qué actividades ofrece la prepa en San Miguel?',
        answer:
          'Pintura, escultura, teatro (inmersión artística), robótica STEAM, música, HIT/Hyrox fitness, Life Project con mentores, Inteligencia Financiera, IA, Kn U High/Coursera e intercambio internacional. Director: Lic. Ramón Godínez.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    targetLevel: '/high-school',
    category: 'campus',
    hreflangPair: 'excellence-bilingual-high-school-in-san-miguel-de-allende',
    keywords: [
      'preparatoria san miguel de allende',
      'prepa bilingüe san miguel',
      'preparatoria privada san miguel de allende',
      'high school san miguel de allende',
    ],
  },

  // =========================================================================
  // PAGE 42 — Bilingual High School in San Miguel (EN)
  // =========================================================================
  'excellence-bilingual-high-school-in-san-miguel-de-allende': {
    slug: 'excellence-bilingual-high-school-in-san-miguel-de-allende',
    lang: 'en',
    title: 'Excellence bilingual high school in San Miguel de Allende | Newland School',
    h1: 'NWL, Leading Bilingual High School in San Miguel de Allende',
    description:
      'Bilingual high school in San Miguel de Allende with Philosophy for Children, Cambridge certifications and a global perspective. Newland School shapes tomorrow\'s leaders.',
    uniqueIntro:
      'NWL San Miguel de Allende offers the only bilingual high school in the city with a Dual Diploma (Mexico SEP + US Cognia-accredited), Life Project with personal mentors, and Kn U High/Coursera certifications. In a UNESCO World Heritage city with a thriving international community, students build their future surrounded by art, culture, and global perspectives. Campus rated 4.7 stars on Google, directed by Lic. Ramon Godinez.',
    sections: [
      {
        heading: 'Life Project in a UNESCO World Heritage City',
        body: 'The Life Project at NWL San Miguel takes on a unique dimension: students work with personal Life Mentors surrounded by galleries, festivals, artists, and an active international community. The 6-project Personal Portfolio can connect with the city\'s cultural and entrepreneurial scene.\n\nThis cultural immersion enriches the self-discovery process. Students don\'t just plan their academic future — they live it in an environment that inspires creativity, empathy, and global vision.',
      },
      {
        heading: 'Dual Diploma and Multicultural Community',
        body: 'The Dual Diploma (Mexico SEP + Cognia-accredited US diploma) is especially valued in San Miguel, where the international community demands credentials recognized in both countries. Kn U High/Coursera certifications from 1st semester strengthen university admissions profiles.\n\nSan Miguel\'s diversity (Mexican, American, Canadian, European families) creates an environment where students practice English in real contexts daily, accelerating fluency and cultural competence.',
      },
      {
        heading: 'Art, HIT/Hyrox, and International Exchange',
        body: 'Activities leverage San Miguel\'s cultural wealth: painting, sculpture, theater, and immersion in the local art scene complement robotics/STEAM and music. The HIT/Hyrox fitness program maintains physical wellness with on-campus training.\n\nIn semesters 5 and 6, students access international exchange programs. Financial Literacy every semester and AI/Modern Technology modules prepare graduates for tomorrow\'s careers. McGraw-Hill provides the academic content framework.',
      },
    ],
    faqs: [
      {
        question: 'Does the high school in San Miguel de Allende accept international students?',
        answer:
          'Yes. San Miguel\'s multicultural community enriches the experience. The Dual Diploma (Mexico + US) facilitates transitions for international families. Campus rated 4.7 stars on Google — the highest in the NWL network. Director: Lic. Ramon Godinez.',
      },
      {
        question: 'What extracurricular activities are available at the San Miguel high school?',
        answer:
          'Painting, sculpture, theater (cultural immersion), robotics/STEAM, music, HIT/Hyrox fitness, Life Project with mentors, Financial Literacy, AI, Kn U High/Coursera certifications, and international exchange in semesters 5-6.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    targetLevel: '/high-school',
    category: 'campus',
    hreflangPair: 'preparatoria-bilingue-privada-en-san-miguel-de-allende',
    keywords: [
      'high school san miguel de allende',
      'bilingual high school san miguel',
      'private high school san miguel de allende',
      'english school san miguel de allende',
    ],
  },

  // =========================================================================
  // PAGE 43 — Preparatoria en Corregidora
  // =========================================================================
  'preparatoria-bilingue-privada-en-corregidora-queretaro': {
    slug: 'preparatoria-bilingue-privada-en-corregidora-queretaro',
    lang: 'es',
    title: 'Preparatoria bilingüe privada en Corregidora Queretaro | Newland School',
    h1: 'En NWL seremos tu mejor preparatoria en Corregidora',
    description:
      'Preparatoria bilingüe privada en Corregidora Querétaro con Filosofía para Niños, programas internacionales y formación integral. Conoce Newland School campus Corregidora.',
    uniqueIntro:
      'La preparatoria NWL Corregidora se encuentra en el campus con el icónico edificio cubo Rubik, fundado en 2019 con 4.5★ en Google (175+ reseñas). Bajo la dirección de José Gustavo Flores, los alumnos acceden a Life Project con mentores, Doble Diploma (México + EUA), certificaciones Kn U High/Coursera y actividades únicas como creación de podcasts, programación e inteligencia artificial.',
    sections: [
      {
        heading: 'Life Project y Doble Diploma en el cubo Rubik',
        body: 'En el campus con forma de cubo Rubik, cada alumno de preparatoria trabaja con un Life Mentor personal durante 6 semestres. Juntos definen su proyecto de vida y construyen un Portafolio de 6 Proyectos Personales que documenta su crecimiento.\n\nEl Doble Diploma (SEP México + diploma EUA acreditado por Cognia) y las certificaciones Kn U High/Coursera desde el primer semestre les dan ventaja en admisiones universitarias nacionales e internacionales.',
      },
      {
        heading: 'Podcasts, IA y programación en preparatoria',
        body: 'Lo que distingue la prepa de Corregidora es la integración de tecnología de vanguardia: los alumnos crean podcasts profesionales, aprenden programación y trabajan con herramientas de inteligencia artificial como parte del currículo.\n\nEstas actividades se suman a los módulos de IA y Tecnología Moderna y a la Inteligencia Financiera que se imparte cada semestre. Los egresados manejan herramientas digitales que la mayoría de universitarios aún no conoce.',
      },
      {
        heading: 'HIT/Hyrox, deporte e intercambio',
        body: 'El programa HIT/Hyrox ofrece entrenamientos de alta intensidad en campus. Las actividades deportivas incluyen basquetbol, voleibol, tochito y dance. Teatro y música complementan la formación artística.\n\nEn 5.° y 6.° semestre, los alumnos acceden a intercambio internacional. El contenido académico McGraw-Hill, la Filosofía para Niños y Yo Soy Líder NWL by Tec de Monterrey acompañan la formación integral. Director: José Gustavo Flores.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en Corregidora tiene programas de tecnología?',
        answer:
          'Sí. Es el único campus NWL con creación de podcasts, programación e IA como actividades regulares. Además incluye IA y Tecnología Moderna curricular, Kn U High/Coursera y Life Project con mentores. 4.5★ en Google.',
      },
      {
        question: '¿Qué perfil tienen los egresados de la prepa en Corregidora?',
        answer:
          'Bilingües con Doble Diploma (México + EUA), Portafolio de 6 Proyectos, certificaciones Coursera, dominio de IA, podcasting y programación, Inteligencia Financiera y experiencia de intercambio internacional. Director: José Gustavo Flores.',
      },
    ],
    images: {
      hero: '/images/campus/corregidora/corregidora-hero.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetCampus: 'corregidora',
    targetLevel: '/high-school',
    category: 'campus',
    keywords: [
      'preparatoria corregidora queretaro',
      'prepa bilingüe corregidora',
      'preparatoria privada corregidora',
      'high school corregidora queretaro',
    ],
  },

  // =========================================================================
  // PAGE 44 — Preparatoria en Zibatá
  // =========================================================================
  'preparatoria-bilingue-privada-en-zibata-queretaro': {
    slug: 'preparatoria-bilingue-privada-en-zibata-queretaro',
    lang: 'es',
    title: 'Preparatoria bilingüe privada en Zibatá Queretaro | Newland School',
    h1: 'NWL, Preparatoria en Zibatá para una educación integral',
    description:
      'Preparatoria bilingüe privada en Zibatá Querétaro con Filosofía para Niños, programas internacionales y formación integral. Newland School campus Zibatá.',
    uniqueIntro:
      'La preparatoria NWL Zibatá se encuentra en el campus más nuevo y moderno de la red (fundado 2025), con instalaciones diseñadas desde cero para una experiencia de preparatoria de primer nivel. Los alumnos acceden a Life Project con mentores, Doble Diploma (México + EUA), Kn U High/Coursera, Inteligencia Financiera, HIT/Hyrox e intercambio internacional. Dirigido por Daniela Arévalo, con 4.5★ en Google y 230+ reseñas.',
    sections: [
      {
        heading: 'Life Project en el campus más moderno de NWL',
        body: 'El campus Zibatá fue diseñado en 2025 con espacios de innovación, laboratorios de última generación y áreas de trabajo colaborativo pensados específicamente para la experiencia de preparatoria. Cada alumno trabaja con un Life Mentor personal durante 6 semestres.\n\nEl Portafolio de 6 Proyectos Personales documenta el crecimiento de cada estudiante. Las instalaciones modernas del campus potencian esta experiencia: maker spaces, estudios de grabación y zonas de estudio flexibles.',
      },
      {
        heading: 'Doble Diploma y certificaciones desde el día 1',
        body: 'Los alumnos egresan con Doble Diploma: SEP México y diploma estadounidense acreditado por Cognia. Desde el primer semestre, las certificaciones Kn U High y Coursera les dan un diferenciador en admisiones universitarias.\n\nLa Inteligencia Financiera cada semestre enseña inversiones, presupuestos y emprendimiento. Los módulos de IA y Tecnología Moderna aseguran que los egresados dominen las herramientas del futuro. McGraw-Hill provee el contenido académico base.',
      },
      {
        heading: 'HIT/Hyrox, intercambio y comunidad Zibatá',
        body: 'El programa HIT/Hyrox mantiene la condición física con entrenamientos de alta intensidad en las instalaciones más modernas de la red NWL. En 5.° y 6.° semestre, los alumnos acceden a programas de intercambio internacional.\n\nLas familias de Zibatá y El Refugio tienen una preparatoria de primer nivel a minutos de casa. Filosofía para Niños, Yo Soy Líder NWL by Tec de Monterrey y BFS acompañan la formación integral. Directora: Daniela Arévalo.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en Zibatá tiene instalaciones nuevas?',
        answer:
          'Sí. Campus Zibatá fue fundado en 2025 con instalaciones de última generación diseñadas desde cero. Es el campus más moderno de la red NWL. 4.5★ en Google, 230+ reseñas. Directora: Daniela Arévalo.',
      },
      {
        question: '¿Qué ventajas tiene estudiar la prepa en Zibatá?',
        answer:
          'Instalaciones 2025, Life Project con mentores, Doble Diploma (México + EUA), Kn U High/Coursera desde 1.° semestre, Inteligencia Financiera, IA, HIT/Hyrox, Portafolio de 6 Proyectos e intercambio internacional en 5.°-6.° semestre.',
      },
    ],
    images: {
      hero: '/images/campus/zibata/zibata-hero.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetCampus: 'zibata',
    targetLevel: '/high-school',
    category: 'campus',
    keywords: [
      'preparatoria zibata queretaro',
      'prepa bilingüe zibata',
      'preparatoria privada zibata',
      'high school zibata queretaro',
    ],
  },

  // =========================================================================
  // PAGE 45 — Mejores preparatorias privadas en Querétaro
  // =========================================================================
  'mejores-preparatorias-privadas-en-queretaro': {
    slug: 'mejores-preparatorias-privadas-en-queretaro',
    lang: 'es',
    title: 'Preparatorias privadas en Querétaro y SMA | Newland School',
    h1: 'Preparatorias privadas en Querétaro con Doble Diploma y Life Project',
    description:
      'Conoce las preparatorias de Newland School en 3 campus: Corregidora, Zibatá y San Miguel de Allende. Doble Diploma, Life Project, Kn U High y certificaciones internacionales.',
    uniqueIntro:
      'Tres campus de Newland School ofrecen preparatoria en Querétaro y San Miguel de Allende: Corregidora, Zibatá y San Miguel. Los tres comparten un modelo que no se parece a ninguna otra prepa en la región — cada alumno trabaja con un Life Mentor personal durante los 6 semestres, construye un Portafolio de 6 Proyectos Personales y egresa con Doble Diploma reconocido en México y Estados Unidos.',
    sections: [
      {
        heading: 'Tres campus, un mismo modelo de preparatoria',
        body: 'Lo que hace distinta a la prepa NWL no es un solo programa sino cómo se conectan todos. Life Project asigna un mentor desde el primer día. Doble Diploma (SEP México + diploma EUA acreditado por Cognia) abre puertas a universidades en ambos países. Y las certificaciones Kn U High/Coursera arrancan desde el primer semestre, no al final de la carrera.\n\nCorregidora destaca por podcasts, programación e IA aplicada. Zibatá tiene las instalaciones más nuevas de la red, diseñadas en 2025. San Miguel aprovecha su entorno multicultural y artístico para enriquecer la experiencia. Los tres campus incluyen Inteligencia Financiera, IA y Tecnología Moderna, HIT/Hyrox y la posibilidad de intercambio internacional en 5.° y 6.° semestre.',
      },
      {
        heading: 'Life Project: mentores reales, proyectos reales',
        body: 'El programa Life Project funciona así: un mentor acompaña al alumno durante toda la prepa. Juntos definen metas académicas, personales y profesionales. Cada semestre el alumno entrega un proyecto que forma parte de su portafolio final — no un trabajo escolar genérico, sino algo que demuestra crecimiento real.\n\nAl terminar, los egresados tienen un Portafolio de 6 Proyectos con evidencia concreta de lo que saben hacer. Eso, combinado con el Doble Diploma y las certificaciones Coursera, les da un perfil que las oficinas de admisiones de universidades nacionales e internacionales reconocen de inmediato.',
      },
      {
        heading: 'HIT/Hyrox, deporte y formación integral',
        body: 'La condición física no es opcional: el programa HIT/Hyrox ofrece entrenamientos de alta intensidad en los tres campus. Basquetbol, voleibol, tochito, dance y música completan la oferta extracurricular.\n\nFilosofía para Niños sigue presente en preparatoria — los alumnos debaten ética, política y ciencia con herramientas de pensamiento crítico que desarrollaron desde maternal. Yo Soy Líder NWL by Tec de Monterrey y el programa BFS (Bullying Free School) acompañan la formación socioemocional. Contenido académico base: McGraw-Hill.',
      },
    ],
    faqs: [
      {
        question: '¿En qué campus de Newland School puedo estudiar preparatoria?',
        answer:
          'En tres: Corregidora (2019, director José Gustavo Flores), Zibatá (2025, directora Daniela Arévalo) y San Miguel de Allende (2018, director Ramón Godínez). Juriquilla y Milenio ofrecen hasta secundaria.',
      },
      {
        question: '¿Qué certificaciones obtienen los alumnos de la prepa NWL?',
        answer:
          'Doble Diploma (SEP México + EUA acreditado por Cognia), certificaciones Kn U High y Coursera desde primer semestre, Cambridge English, Inteligencia Financiera y un Portafolio de 6 Proyectos Personales supervisado por un Life Mentor.',
      },
    ],
    images: {
      hero: '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
      content: [
        '/images/campus/corregidora/corregidora-prepa-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-student-lounge-gradas.jpg',
      ],
    },
    category: 'general',
    keywords: [
      'preparatorias en queretaro',
      'prepas en queretaro',
      'mejores preparatorias queretaro',
      'preparatorias privadas queretaro',
      'prepa bilingüe queretaro',
    ],
  },

  // =========================================================================
  // PAGE 46 — Escuela privada cerca de Cumbres del Lago
  // =========================================================================
  'escuela-privada-cerca-de-cumbres-del-lago-queretaro': {
    slug: 'escuela-privada-cerca-de-cumbres-del-lago-queretaro',
    lang: 'es',
    title: 'Escuela privada cerca de Cumbres del Lago Querétaro | Newland School',
    h1: 'Tu escuela privada a minutos de Cumbres del Lago',
    description:
      'Escuela privada bilingüe cerca de Cumbres del Lago Querétaro. Campus Juriquilla a 10 min y Zibatá a 20 min. Maternal a preparatoria con programa Knotion y Filosofía para Niños.',
    uniqueIntro:
      'Las familias de Cumbres del Lago tienen dos campus NWL cerca: Juriquilla (fundado en 2009, el campus insignia con 4.6★ y 320+ reseñas) queda a unos 10 minutos en auto, y Zibatá (2025, el más moderno de la red con 4.5★) a unos 20 minutos. Entre ambos cubren desde maternal hasta preparatoria, con transporte escolar que pasa por la zona.',
    sections: [
      {
        heading: 'Juriquilla: 10 minutos desde Cumbres del Lago',
        body: 'NWL Juriquilla es el campus más cercano para las familias de Cumbres del Lago. Con más de 15 años de operación, ofrece maternal (2 años), kinder, primaria y secundaria. La directora Guadalupe Barrientos lidera un equipo que ha mantenido la calificación más alta en reseñas de la zona norte.\n\nEl campus cuenta con canchas deportivas, cafetería, laboratorio STEAM, playground y áreas verdes. Rutas de transporte escolar cubren Cumbres del Lago, Juriquilla, El Refugio y fraccionamientos cercanos.',
      },
      {
        heading: 'Zibatá: preparatoria a 20 minutos',
        body: 'Si buscas preparatoria, campus Zibatá ofrece desde maternal hasta prepa. Fundado en 2025 con instalaciones diseñadas desde cero, opera bajo la dirección de Daniela Arévalo.\n\nZibatá complementa a Juriquilla: los alumnos pueden cursar maternal a secundaria en Juriquilla y pasar a la prepa en Zibatá sin cambiar de sistema educativo. Mismos programas, misma filosofía, continuidad total. El campus incluye maker spaces, estudios de grabación y zonas colaborativas de última generación.',
      },
      {
        heading: 'Knotion, FpN y programas que no encontrarás cerca',
        body: 'Los dos campus comparten lo que distingue a NWL: Knotion elimina la tarea tradicional y la reemplaza con proyectos; Filosofía para Niños desarrolla pensamiento crítico desde los 2 años; y Yo Soy Líder NWL by Tec de Monterrey forma liderazgo con inteligencia emocional.\n\nEn primaria, el TecniKids STEAM Lab ofrece impresión 3D, corte láser y robótica. En secundaria, Emprendizaje con Universidad Mondragón y la Doble Certificación Internacional preparan el siguiente paso. Todo esto cerca de Cumbres del Lago.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto se tarda de Cumbres del Lago al campus Juriquilla?',
        answer:
          'Aproximadamente 10 minutos en auto. NWL Juriquilla ofrece maternal a secundaria. Para preparatoria, campus Zibatá queda a unos 20 minutos. Ambos campus tienen rutas de transporte que cubren Cumbres del Lago.',
      },
      {
        question: '¿Qué niveles educativos hay cerca de Cumbres del Lago?',
        answer:
          'Maternal a secundaria en Juriquilla (10 min) y maternal a preparatoria en Zibatá (20 min). Ambos campus usan Knotion, Filosofía para Niños y Yo Soy Líder by Tec de Monterrey. Directora Juriquilla: Guadalupe Barrientos. Directora Zibatá: Daniela Arévalo.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-group-classroom-wide.jpg',
        '/images/campus/zibata/zibata-building.jpg',
      ],
    },
    targetNeighborhood: 'Cumbres del Lago',
    category: 'neighborhood',
    keywords: [
      'escuela cumbres del lago queretaro',
      'colegio privado cumbres del lago',
      'escuela cerca de cumbres del lago',
      'newland school cumbres del lago',
    ],
  },

  // =========================================================================
  // PAGE 47 — Escuela privada cerca de Gran Reserva
  // =========================================================================
  'escuela-privada-cerca-de-gran-reserva-queretaro': {
    slug: 'escuela-privada-cerca-de-gran-reserva-queretaro',
    lang: 'es',
    title: 'Escuela privada cerca de Gran Reserva Querétaro | Newland School',
    h1: 'Colegio privado bilingüe cerca de Gran Reserva',
    description:
      'Escuela privada bilingüe cerca de Gran Reserva Querétaro. Campus Corregidora a 8 min y Zibatá a 10 min. Maternal a preparatoria con Knotion, FpN y Doble Diploma.',
    uniqueIntro:
      'Gran Reserva queda entre dos de los campus más completos de Newland School: Corregidora (2019, 4.5★, 175+ reseñas) a unos 8 minutos en auto y Zibatá (2025, 4.5★, 230+ reseñas) a unos 10 minutos. Ambos ofrecen desde maternal hasta preparatoria — algo que muy pocos colegios en la zona sur-poniente de Querétaro pueden decir.',
    sections: [
      {
        heading: 'Corregidora: el cubo Rubik a 8 minutos',
        body: 'El campus Corregidora es difícil de confundir — el edificio con forma de cubo Rubik se ha convertido en referencia de la zona. Bajo la dirección de José Gustavo Flores, ofrece maternal a preparatoria con actividades que lo distinguen: creación de podcasts, programación e inteligencia artificial como parte del currículo regular.\n\nLas familias de Gran Reserva llegan en 8 minutos por las vialidades principales. El campus cuenta con rutas de transporte escolar, cancha techada, laboratorio STEAM, cafetería y más de 90 cámaras de seguridad.',
      },
      {
        heading: 'Zibatá: instalaciones 2025 a 10 minutos',
        body: 'Campus Zibatá es el más nuevo de la red NWL. Diseñado en 2025 con maker spaces, estudios de grabación y laboratorios de última generación, ofrece maternal a preparatoria. Directora: Daniela Arévalo.\n\nDesde Gran Reserva el trayecto es de unos 10 minutos. Los alumnos pueden iniciar en cualquiera de los dos campus y transitar a preparatoria sin perder continuidad — mismo modelo Knotion, mismos programas, mismos valores.',
      },
      {
        heading: 'Dos campus con preparatoria, ambos cerca de casa',
        body: 'Tener dos campus NWL con preparatoria a menos de 10 minutos es una ventaja real para las familias de Gran Reserva. La prepa NWL incluye Life Project con mentores personales, Doble Diploma (México + EUA), certificaciones Kn U High/Coursera desde primer semestre, Inteligencia Financiera e intercambio internacional.\n\nEn los niveles previos: Brain Up en maternal, Knotion sin tarea en kinder y primaria, TecniKids STEAM Lab, Emprendizaje con Universidad Mondragón en secundaria y Doble Certificación Internacional vía Hokku Academy.',
      },
    ],
    faqs: [
      {
        question: '¿Qué tan lejos está Newland School de Gran Reserva?',
        answer:
          'Campus Corregidora queda a unos 8 minutos y Zibatá a unos 10 minutos desde Gran Reserva. Ambos ofrecen maternal a preparatoria, transporte escolar y programa bilingüe completo. Director Corregidora: José Gustavo Flores. Directora Zibatá: Daniela Arévalo.',
      },
      {
        question: '¿Puedo estudiar preparatoria cerca de Gran Reserva?',
        answer:
          'Sí. Tanto Corregidora como Zibatá ofrecen preparatoria con Life Project, Doble Diploma, Kn U High/Coursera, Inteligencia Financiera, HIT/Hyrox e intercambio internacional. Corregidora además incluye podcasts, programación e IA.',
      },
    ],
    images: {
      hero: '/images/campus/corregidora/corregidora-hero.jpg',
      content: [
        '/images/levels/kinder/kinder-classroom.jpg',
        '/images/campus/zibata/zibata-hallway.jpg',
      ],
    },
    targetNeighborhood: 'Gran Reserva',
    category: 'neighborhood',
    keywords: [
      'escuela gran reserva queretaro',
      'colegio privado gran reserva',
      'escuela cerca de gran reserva',
      'newland school gran reserva',
    ],
  },

  // =========================================================================
  // PAGE 48 — International School in San Miguel de Allende (EN)
  // =========================================================================
  'international-school-in-san-miguel-de-allende': {
    slug: 'international-school-in-san-miguel-de-allende',
    lang: 'en',
    title: 'International School in San Miguel de Allende | Newland School',
    h1: 'A bilingual international school in San Miguel de Allende',
    description:
      'Newland School in San Miguel de Allende offers nursery through high school with Cambridge English, Dual Diploma, Cognia accreditation, and a multicultural learning environment.',
    uniqueIntro:
      'Newland School San Miguel de Allende sits in the heart of a UNESCO World Heritage city and serves families from Mexico, the United States, Canada, and Europe. Founded in 2018, the campus holds a 4.7-star Google rating — the highest in the NWL network — and runs from nursery (age 2) through high school (age 17) under the direction of Ramón Godínez.',
    sections: [
      {
        heading: 'Nursery through high school in one campus',
        body: 'San Miguel de Allende is one of three NWL campuses that offers the full educational journey from nursery to high school. Children start with Brain Up English immersion at age 2, move through Knotion project-based learning in elementary, and reach the Emprendizaje entrepreneurship program with Universidad Mondragón in middle school.\n\nThe high school program includes Life Project with personal mentors, a Dual Diploma recognized in both Mexico and the United States (Cognia-accredited), Kn U High/Coursera certifications from the first semester, and an international exchange program in the final year.',
      },
      {
        heading: 'Cambridge English and a naturally bilingual environment',
        body: 'Most international schools in San Miguel teach in English with Spanish as a second language. NWL does the opposite — full bilingual immersion where students operate in both languages daily, backed by Cambridge English certifications at every level.\n\nThe multicultural makeup of San Miguel means students practice English outside the classroom too — with neighbors, at restaurants, in galleries. That kind of organic language exposure is hard to replicate anywhere else in central Mexico.',
      },
      {
        heading: 'Art, culture, and critical thinking in a UNESCO city',
        body: 'Philosophy for Children (P4C) starts at age 2 and continues through high school. Students learn to question, argue, and build ideas — skills that show up in every subject and every conversation. The Yo Soy Líder NWL program, designed by Tec de Monterrey, develops emotional intelligence and leadership alongside academics.\n\nSan Miguel\'s artistic heritage feeds directly into the curriculum: painting, sculpture, theater, and visits to local galleries and festivals. The campus includes a covered court, science labs, art rooms, a podcast studio, and a cafeteria. More than 90 security cameras operate around the clock.',
      },
    ],
    faqs: [
      {
        question: 'Is instruction at Newland School San Miguel conducted in English?',
        answer:
          'NWL uses a bilingual model — roughly half the day is in English, half in Spanish. Cambridge English certifications are included at every level. The multicultural community in San Miguel provides additional English-language exposure outside school.',
      },
      {
        question: 'Does Newland School accept international students?',
        answer:
          'Yes. NWL San Miguel serves families from Mexico, the US, Canada, and Europe. The Dual Diploma is recognized in both Mexico and the United States. The campus runs nursery (age 2) through high school. Director: Lic. Ramón Godínez. 4.7★ on Google.',
      },
    ],
    images: {
      hero: '/images/campus/san-miguel/san-miguel-hero.jpg',
      content: [
        '/images/campus/san-miguel/san-miguel-classrooms.jpg',
        '/images/campus/san-miguel/san-miguel-art-room.jpg',
      ],
    },
    targetCampus: 'san-miguel',
    category: 'campus',
    hreflangPair: 'escuela-bilingue-en-san-miguel-de-allende',
    keywords: [
      'international school san miguel de allende',
      'bilingual school san miguel de allende',
      'private school san miguel de allende',
      'english school san miguel de allende',
      'best school san miguel de allende',
    ],
  },

  // =========================================================================
  // PAGE 49 — Secundarias en Querétaro
  // =========================================================================
  'secundarias-en-queretaro': {
    slug: 'secundarias-en-queretaro',
    lang: 'es',
    title: 'Secundarias privadas en Querétaro | Newland School',
    h1: 'Secundarias en Querétaro con Emprendizaje y Doble Certificación',
    description:
      'Secundaria privada bilingüe en Querétaro con Emprendizaje, Doble Certificación Internacional, Filosofía para Niños y programa sin tarea. 5 campus NWL disponibles.',
    uniqueIntro:
      'La secundaria NWL opera en los 5 campus de la red: Juriquilla (2009, 4.6★), Milenio (2016, 4.5★), San Miguel de Allende (2018, 4.7★), Corregidora (2019, 4.5★) y Zibatá (2025, 4.5★). Lo que comparten no es solo un nombre — es un modelo de secundaria donde los alumnos trabajan como emprendedores con Universidad Mondragón, obtienen Doble Certificación Internacional vía Hokku Academy y no llevan tarea a casa.',
    sections: [
      {
        heading: 'Emprendizaje: secundaria con Universidad Mondragón',
        body: 'El programa Emprendizaje convierte a los alumnos de secundaria en emprendedores reales. En alianza con Universidad Mondragón (referente mundial en educación cooperativa), los estudiantes identifican problemas de su comunidad, diseñan soluciones y las presentan ante jurados.\n\nNo es una materia más. Es la columna vertebral del tercer año de secundaria, donde el aprendizaje de matemáticas, ciencias, español e inglés se aplica a un proyecto con impacto real. Los alumnos egresan sabiendo qué significa crear algo desde cero.',
      },
      {
        heading: 'Doble Certificación y Cambridge en 5 campus',
        body: 'Todos los alumnos de secundaria NWL obtienen Doble Certificación Internacional: diploma mexicano (SEP) más diploma estadounidense a través de Hokku Academy. Esto les da validez internacional antes de llegar a preparatoria.\n\nLas certificaciones Cambridge (PET y FCE) se integran al currículo — no son un extra que hay que pagar aparte. Filosofía para Niños sigue activa en secundaria, ahora con debates más complejos sobre ética, tecnología y sociedad. Yo Soy Líder NWL by Tec de Monterrey mantiene la formación socioemocional.',
      },
      {
        heading: 'Sin tarea, con laboratorio y deporte',
        body: 'La secundaria NWL mantiene el modelo Knotion sin tarea tradicional. El aprendizaje ocurre en el aula, en el laboratorio y en proyectos — no en cuadernos a las 10 de la noche.\n\nCada campus cuenta con laboratorios de ciencias, áreas deportivas (basquetbol, voleibol, tochito, fútbol), programa BFS (Bullying Free School) y más de 90 cámaras de seguridad. En San Miguel, Corregidora y Zibatá, los alumnos que terminan secundaria pueden continuar a preparatoria NWL sin cambiar de sistema.',
      },
    ],
    faqs: [
      {
        question: '¿Qué diferencia a la secundaria NWL de otras en Querétaro?',
        answer:
          'Tres cosas: Emprendizaje con Universidad Mondragón (emprendimiento real, no simulado), Doble Certificación Internacional desde secundaria (no hay que esperar a prepa) y cero tarea tradicional con Knotion. Todo esto en 5 campus con acreditación Cognia.',
      },
      {
        question: '¿En qué campus de Newland School hay secundaria?',
        answer:
          'En los 5: Juriquilla (directora Guadalupe Barrientos), Milenio (directora Ximena Arellano), San Miguel de Allende (director Ramón Godínez), Corregidora (director José Gustavo Flores) y Zibatá (directora Daniela Arévalo).',
      },
    ],
    images: {
      hero: '/images/levels/secundaria/nwl-secundaria-lab-experiment.jpg',
      content: [
        '/images/levels/secundaria/nwl-secundaria-lab-team-fist-bump.jpg',
        '/images/campus/milenio/milenio-classroom-secondary.jpg',
      ],
    },
    category: 'general',
    keywords: [
      'secundarias en queretaro',
      'mejores secundarias queretaro',
      'secundarias privadas queretaro',
      'secundaria bilingüe queretaro',
      'secundaria particular queretaro',
    ],
  },

  // =========================================================================
  // PAGE 50 — International School in Querétaro (EN)
  // =========================================================================
  'international-school-in-queretaro': {
    slug: 'international-school-in-queretaro',
    lang: 'en',
    title: 'International School in Querétaro Mexico | Newland School',
    h1: 'International bilingual school in Querétaro with 5 campuses',
    description:
      'Newland School operates 5 bilingual campuses in Querétaro with Cognia accreditation, Cambridge English, Dual Diploma, and nursery through high school programs.',
    uniqueIntro:
      'Newland School runs five campuses across Querétaro and San Miguel de Allende, serving international and Mexican families since 2009. With Cognia accreditation (the same body that accredits schools across the US), Cambridge English certifications at every level, and a Dual Diploma recognized in both Mexico and the United States, NWL offers the academic rigor that relocating families look for — without sacrificing the warmth of a Mexican school community.',
    sections: [
      {
        heading: 'Five campuses, one educational model',
        body: 'Juriquilla (2009) is the flagship campus with the longest track record and a 4.6-star Google rating. Milenio (2016) holds Cognia accreditation and offers cooking workshops, yoga, and a competitive dance team. San Miguel de Allende (2018) sits in a UNESCO World Heritage city with a 4.7-star rating.\n\nCorregidora (2019) stands out for its Rubik\'s-cube-shaped building and programs in podcasting, programming, and AI. Zibatá (2025) is the newest campus with purpose-built maker spaces and recording studios. Three campuses (San Miguel, Corregidora, Zibatá) run through high school.',
      },
      {
        heading: 'Cognia accreditation and Cambridge English',
        body: 'Cognia is the accreditation standard used by over 36,000 schools in 85 countries, including most American private schools. NWL campuses hold this accreditation, which means credits transfer smoothly if your family relocates again.\n\nCambridge English certifications (Starters through FCE) are built into the curriculum at no extra cost. The bilingual model splits the school day between English and Spanish instruction, so students develop real fluency in both languages rather than studying one as a foreign language.',
      },
      {
        heading: 'From nursery to high school with no gaps',
        body: 'NWL enrolls children from age 2 (nursery) through age 17 (high school). Brain Up introduces English immersion in nursery. Knotion replaces traditional homework with project-based learning from kindergarten onward. The TecniKids STEAM Lab in elementary offers 3D printing, laser cutting, and robotics.\n\nIn middle school, the Emprendizaje program with Universidad Mondragón teaches real entrepreneurship. High school students work with personal Life Mentors, earn a Dual Diploma, and can do international exchanges in their final year. Philosophy for Children runs across all levels — it is the thread that connects the entire NWL experience.',
      },
    ],
    faqs: [
      {
        question: 'What accreditations does Newland School hold?',
        answer:
          'Cognia accreditation (international, recognized by US schools for credit transfer), Cambridge English certifications at every level, alliance with Tec de Monterrey for the Yo Soy Líder leadership program, and Universidad Mondragón for the Emprendizaje entrepreneurship curriculum.',
      },
      {
        question: 'How many Newland School campuses are in Querétaro?',
        answer:
          'Five: Juriquilla, Milenio, Zibatá, Corregidora, and San Miguel de Allende. All five offer nursery through middle school. San Miguel, Corregidora, and Zibatá also offer high school with a Dual Diploma program.',
      },
    ],
    images: {
      hero: '/images/campus/zibata/zibata-hero.jpg',
      content: [
        '/images/levels/primaria/nwl-primaria-steam-lab.jpg',
        '/images/campus/juriquilla/juriquilla-classrooms.jpg',
      ],
    },
    category: 'general',
    hreflangPair: 'el-mejor-colegio-particular-en-queretaro',
    keywords: [
      'international school queretaro',
      'bilingual school queretaro',
      'private school queretaro mexico',
      'english school queretaro',
      'best international school queretaro',
    ],
  },
};

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getAllInformacionSlugs(): string[] {
  return Object.keys(informacionPages);
}

export function getInformacionBySlug(slug: string): InformacionPage | undefined {
  return informacionPages[slug];
}

export function getInformacionByCampus(campusSlug: string): InformacionPage[] {
  return Object.values(informacionPages).filter(p => p.targetCampus === campusSlug);
}

export function getInformacionByLevel(levelRoute: string): InformacionPage[] {
  return Object.values(informacionPages).filter(p => p.targetLevel === levelRoute);
}
