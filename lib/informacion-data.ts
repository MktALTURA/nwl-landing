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
      'Juriquilla se ha consolidado como una de las zonas residenciales con mayor crecimiento y calidad de vida en Querétaro. Con amplias áreas verdes y un entorno familiar, es el lugar ideal para que los más pequeños inicien su formación académica rodeados de naturaleza y seguridad.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En Newland School creemos que el pensamiento crítico se cultiva desde los primeros años de vida. Nuestro programa de Filosofía para Niños invita a los alumnos de kinder a explorar preguntas sobre el mundo que los rodea a través del diálogo, la escucha activa y la reflexión compartida.\n\nMediante comunidades de indagación, los niños aprenden a formular argumentos, respetar puntos de vista diferentes y construir conocimiento de manera colaborativa. Esta metodología fortalece su autoestima y los prepara para enfrentar retos académicos con curiosidad y seguridad.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Desde kinder, nuestros alumnos se sumergen en un programa bilingüe que integra el inglés de forma natural en su rutina diaria. Las actividades lúdicas, canciones y proyectos en ambos idiomas permiten que los niños desarrollen competencias lingüísticas sólidas sin perder el disfrute del aprendizaje.\n\nAdemás, Newland School incorpora estándares internacionales que preparan a los estudiantes para certificaciones y programas de intercambio en etapas posteriores, asegurando que cada niño cuente con una base global desde el inicio.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'Nuestro modelo educativo en kinder combina el juego dirigido con experiencias STEAM que despiertan la curiosidad científica y artística. Los espacios de aprendizaje están diseñados para fomentar la exploración sensorial, la motricidad fina y el trabajo en equipo.\n\nCada grupo cuenta con docentes especializados en primera infancia y un acompañamiento socioemocional que permite detectar oportunamente las fortalezas y áreas de oportunidad de cada alumno, garantizando una atención verdaderamente personalizada.',
      },
    ],
    faqs: [
      {
        question: '¿A partir de qué edad pueden ingresar al kinder en Juriquilla?',
        answer:
          'El kinder de Newland School Juriquilla recibe alumnos a partir de los 3 años cumplidos. Contamos con grupos reducidos para asegurar atención personalizada en cada etapa del preescolar.',
      },
      {
        question: '¿El kinder en Juriquilla es completamente bilingüe?',
        answer:
          'Sí. Desde el primer día, los alumnos participan en actividades en inglés y español con maestros certificados en ambos idiomas, lo que les permite adquirir fluidez de manera natural y progresiva.',
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
      'La zona de Juriquilla, ubicada al norte de Querétaro, ofrece un entorno tranquilo y bien conectado que facilita el traslado diario de las familias. Su cercanía a centros culturales y universidades la convierte en un polo educativo ideal para adolescentes en etapa de secundaria.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En la secundaria de Newland School, la Filosofía para Niños evoluciona hacia debates estructurados y análisis de dilemas éticos contemporáneos. Los adolescentes desarrollan habilidades de argumentación, pensamiento lógico y empatía mientras discuten temas relevantes para su edad y su comunidad.\n\nEste programa fortalece su capacidad de tomar decisiones informadas y de expresarse con claridad, competencias fundamentales para su vida académica y personal.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La secundaria bilingüe de Newland School prepara a los alumnos para certificaciones internacionales de inglés reconocidas mundialmente. El currículo integra contenidos de ciencias, humanidades y tecnología en ambos idiomas, brindando una formación global y competitiva.\n\nLos estudiantes también acceden a proyectos colaborativos con instituciones de otros países, lo que amplía su perspectiva cultural y los prepara para las exigencias académicas de la preparatoria y la universidad.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de secundaria se centra en el aprendizaje basado en proyectos, el uso de tecnología educativa y el desarrollo de competencias socioemocionales. Los alumnos cuentan con laboratorios equipados para prácticas de ciencias, talleres de robótica y espacios creativos.\n\nEl acompañamiento tutorial personalizado asegura que cada adolescente reciba orientación académica y vocacional, permitiéndole descubrir sus talentos y trazar un camino claro hacia su futuro profesional.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria en Juriquilla prepara para certificaciones internacionales?',
        answer:
          'Sí. Nuestros alumnos de secundaria se preparan para obtener certificaciones de inglés como Cambridge y TOEFL Junior, lo que les otorga un diferenciador importante al ingresar a preparatoria.',
      },
      {
        question: '¿Qué actividades extracurriculares ofrece la secundaria en Juriquilla?',
        answer:
          'Ofrecemos deportes como fútbol, voleibol y atletismo, así como talleres de robótica, arte, música y oratoria. Estas actividades complementan la formación académica y favorecen el desarrollo integral.',
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
      'Las familias de Juriquilla buscan opciones educativas de calidad desde la primera infancia. Rodeado de parques y áreas residenciales seguras, este campus ofrece el entorno perfecto para que los más pequeños den sus primeros pasos en un ambiente cálido y profesional.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Incluso en la etapa maternal, las bases del pensamiento filosófico se construyen a través de la curiosidad natural del niño. En Newland School propiciamos momentos de asombro y exploración guiada donde los más pequeños comienzan a hacer preguntas sobre su entorno y a compartir sus descubrimientos con los demás.\n\nEstas primeras experiencias de diálogo y escucha sientan las bases para el programa formal de Filosofía para Niños que continuarán en kinder y primaria.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Desde la etapa maternal, los niños de Newland School están expuestos al inglés de manera lúdica y afectiva. Canciones, cuentos y rutinas cotidianas en ambos idiomas crean un entorno de inmersión natural que favorece la adquisición temprana de un segundo idioma.\n\nEsta exposición temprana al bilingüismo desarrolla conexiones neuronales que facilitarán el aprendizaje de idiomas en etapas posteriores, otorgando una ventaja cognitiva comprobada.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El programa de maternal se basa en la estimulación temprana integral: motricidad gruesa y fina, desarrollo del lenguaje, socialización y exploración sensorial. Cada actividad está diseñada por especialistas en desarrollo infantil para respetar el ritmo individual de cada niño.\n\nLos espacios de maternal cuentan con materiales Montessori, áreas de juego seguras y un ratio reducido de alumnos por educadora, lo que garantiza una atención cercana y un vínculo afectivo que brinda seguridad emocional al pequeño.',
      },
    ],
    faqs: [
      {
        question: '¿Desde qué edad aceptan niños en el maternal de Juriquilla?',
        answer:
          'Nuestro programa de maternal en Juriquilla recibe bebés desde los 12 meses de edad. Contamos con espacios especialmente adaptados y personal capacitado en estimulación temprana.',
      },
      {
        question: '¿El maternal en Juriquilla incluye servicio de comedor?',
        answer:
          'Sí, ofrecemos un servicio de comedor con menús diseñados por nutriólogos, adecuados para la edad de cada alumno. Las familias también pueden enviar alimentos desde casa si lo prefieren.',
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
      'Escuela privada bilingüe en Juriquilla con maternal, kinder, primaria, secundaria y prepa. Modelo educativo integral con Filosofía para Niños en Newland School.',
    uniqueIntro:
      'Juriquilla destaca como una de las comunidades más completas de Querétaro, combinando seguridad, acceso a servicios de primer nivel y una vibrante vida cultural. Las familias que eligen Juriquilla buscan una escuela que esté a la altura de su estilo de vida: internacional, innovadora y con valores sólidos.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Newland School Juriquilla integra la Filosofía para Niños como eje transversal en todos sus niveles educativos. Desde maternal hasta preparatoria, los alumnos participan en comunidades de indagación donde aprenden a pensar de manera crítica, a cuestionar con respeto y a construir ideas en equipo.\n\nEste enfoque filosófico desarrolla habilidades de razonamiento que impactan positivamente en todas las asignaturas y en la vida cotidiana, formando ciudadanos reflexivos y comprometidos con su entorno.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Como escuela bilingüe, Newland School Juriquilla ofrece un programa en el que al menos el 50% de las materias se imparten en inglés desde los primeros niveles. Los alumnos alcanzan certificaciones internacionales de Cambridge y tienen acceso a programas de intercambio académico.\n\nEl perfil global del egresado se complementa con talleres de un tercer idioma y con proyectos interdisciplinarios alineados a estándares internacionales de educación.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de Newland School combina lo mejor de las pedagogías activas con herramientas tecnológicas de vanguardia. El aprendizaje basado en proyectos, las aulas colaborativas y los laboratorios STEAM son pilares de la experiencia escolar en todos los niveles.\n\nCada alumno recibe acompañamiento socioemocional y tutoría académica personalizada, lo que permite identificar sus fortalezas y acompañarlo en un plan de desarrollo que abarca desde su ingreso hasta su egreso.',
      },
    ],
    faqs: [
      {
        question: '¿Newland School en Juriquilla ofrece todos los niveles educativos?',
        answer:
          'Sí. Nuestro campus de Juriquilla cuenta con maternal, kinder, primaria, secundaria y preparatoria, lo que permite a las familias mantenerse en una sola institución durante toda la trayectoria escolar.',
      },
      {
        question: '¿Qué porcentaje del programa es en inglés?',
        answer:
          'Aproximadamente el 50% de las asignaturas se imparten en inglés, con maestros nativos o certificados. Este porcentaje se ajusta según el nivel, incrementándose conforme los alumnos avanzan.',
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
      'Zibatá es uno de los desarrollos residenciales más modernos y dinámicos de Querétaro, con amplias áreas verdes, ciclovías y un concepto de comunidad que prioriza el bienestar familiar. Su crecimiento acelerado ha generado una alta demanda de instituciones educativas de primer nivel que estén a la altura de las expectativas de sus residentes.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En Newland School campus Zibatá, la Filosofía para Niños es parte esencial de la experiencia educativa. A través de sesiones de diálogo filosófico, los alumnos aprenden a escuchar, argumentar y reflexionar de manera autónoma, habilidades que trascienden el aula y se aplican en su vida diaria.\n\nEste programa se adapta a cada nivel educativo, desde preguntas sencillas sobre la naturaleza en maternal hasta debates éticos complejos en preparatoria, asegurando un desarrollo progresivo del pensamiento crítico.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El campus Zibatá ofrece un programa bilingüe completo donde los alumnos desarrollan competencias en inglés a través de proyectos interdisciplinarios, lectura de textos auténticos y actividades comunicativas reales. Los estudiantes se preparan para certificaciones de Cambridge desde primaria.\n\nLa visión internacional del colegio incluye participación en ferias de ciencias, competencias académicas y experiencias de intercambio cultural que amplían la perspectiva de los alumnos.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo en el campus Zibatá se distingue por sus instalaciones de última generación: laboratorios de ciencias, canchas deportivas, áreas de arte y tecnología, y espacios de convivencia diseñados para fomentar la colaboración y la creatividad.\n\nEl equipo docente, conformado por profesionales con experiencia en educación internacional, implementa metodologías activas que colocan al alumno en el centro del proceso de aprendizaje, promoviendo la autonomía y la responsabilidad académica.',
      },
    ],
    faqs: [
      {
        question: '¿Qué tan cerca está Newland School del fraccionamiento Zibatá?',
        answer:
          'Nuestro campus Zibatá se encuentra a pocos minutos del acceso principal del fraccionamiento, con rutas de transporte escolar que cubren toda la zona para mayor comodidad de las familias.',
      },
      {
        question: '¿El campus Zibatá cuenta con transporte escolar?',
        answer:
          'Sí. Ofrecemos servicio de transporte escolar con rutas que cubren Zibatá, El Refugio y zonas aledañas, con unidades seguras y monitoreadas en tiempo real.',
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
      'Milenio III es una zona estratégica de Querétaro que combina accesibilidad, comercio y una creciente oferta de servicios para familias jóvenes. Su ubicación privilegiada permite llegar rápidamente desde múltiples puntos de la ciudad, convirtiéndola en una opción práctica y atractiva para padres que buscan calidad educativa sin largos trayectos.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Newland School campus Milenio aplica el programa de Filosofía para Niños como columna vertebral de su propuesta educativa. En cada nivel, los alumnos participan en sesiones donde exploran conceptos como la justicia, la amistad, la verdad y la belleza, aprendiendo a pensar con profundidad y a expresar sus ideas con claridad.\n\nEsta formación filosófica genera alumnos más empáticos, seguros y capaces de resolver conflictos de manera constructiva, habilidades que marcan la diferencia en su desarrollo personal.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El campus Milenio ofrece un programa bilingüe robusto con docentes certificados que imparten asignaturas clave en inglés. Los alumnos desarrollan habilidades de comunicación oral y escrita en ambos idiomas, preparándose para un mundo cada vez más globalizado.\n\nNuestros programas internacionales incluyen la posibilidad de certificaciones Cambridge, participación en simulacros de Naciones Unidas y proyectos colaborativos con escuelas de otros países.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo en Milenio integra tecnología, arte y deporte como complementos esenciales de la formación académica. Las instalaciones incluyen laboratorios, cancha de fútbol, sala de arte y espacios de convivencia que favorecen el aprendizaje activo.\n\nEl enfoque pedagógico promueve el aprendizaje basado en proyectos, la evaluación formativa continua y el acompañamiento personalizado, asegurando que cada alumno alcance su máximo potencial.',
      },
    ],
    faqs: [
      {
        question: '¿Qué niveles ofrece Newland School cerca de Milenio?',
        answer:
          'Nuestro campus Milenio ofrece maternal, kinder, primaria, secundaria y preparatoria, permitiendo que tu hijo realice toda su trayectoria escolar en un solo colegio.',
      },
      {
        question: '¿La escuela cerca de Milenio tiene horario extendido?',
        answer:
          'Sí, ofrecemos horario extendido con actividades extraescolares como deportes, talleres de arte, robótica y apoyo en tareas, facilitando la logística familiar.',
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
      'La zona de Milenio III se caracteriza por su excelente conectividad y la cercanía a centros comerciales y áreas deportivas, lo que facilita la vida cotidiana de las familias. Elegir una primaria cerca de Milenio significa combinar comodidad de traslado con una educación de excelencia.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En la primaria de Newland School campus Milenio, los alumnos participan semanalmente en comunidades de indagación filosófica. A través de cuentos, dilemas y preguntas detonadoras, desarrollan habilidades de razonamiento, respeto por la diversidad de opiniones y capacidad de asombro.\n\nEste programa ha demostrado mejorar el rendimiento académico general, ya que los alumnos aprenden a analizar información, formular hipótesis y comunicar sus ideas de manera estructurada.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La primaria bilingüe del campus Milenio asegura que los alumnos alcancen un nivel de inglés competitivo para su edad. Las asignaturas de ciencias, matemáticas y estudios sociales se imparten parcialmente en inglés, creando un entorno de inmersión auténtica.\n\nLos estudiantes de primaria también participan en proyectos internacionales y ferias académicas que los conectan con culturas y perspectivas de todo el mundo.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'La primaria integra el aprendizaje basado en proyectos con actividades STEAM que incluyen programación, robótica básica, ciencias experimentales y expresión artística. Los alumnos trabajan en equipos colaborativos y presentan sus hallazgos ante la comunidad escolar.\n\nEl seguimiento académico personalizado permite a los docentes adaptar las estrategias de enseñanza según las necesidades de cada estudiante, asegurando un progreso constante y significativo.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria en Milenio incluye actividades STEAM?',
        answer:
          'Sí. Nuestro programa de primaria integra ciencias, tecnología, ingeniería, arte y matemáticas en proyectos prácticos que desarrollan el pensamiento creativo y la resolución de problemas.',
      },
      {
        question: '¿Cuál es el tamaño de los grupos en la primaria de Milenio?',
        answer:
          'Mantenemos grupos reducidos de máximo 25 alumnos por salón, lo que permite una atención personalizada y un ambiente de aprendizaje óptimo.',
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
      'Las familias jóvenes de Milenio III buscan un kinder que combine cercanía, seguridad y calidad educativa. La zona ofrece una infraestructura moderna y accesible, perfecta para quienes desean que sus hijos inicien su vida escolar en un entorno estimulante y bien conectado.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'El kinder de Newland School en Milenio introduce a los pequeños en el mundo de la filosofía a través del juego y la narrativa. Mediante cuentos y preguntas abiertas, los niños comienzan a explorar conceptos como la amistad, la justicia y la naturaleza, desarrollando su capacidad de asombro y reflexión.\n\nEstas experiencias tempranas de pensamiento filosófico construyen una base sólida para el desarrollo de habilidades cognitivas y socioemocionales que acompañarán al niño durante toda su vida escolar.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Desde el kinder, los alumnos del campus Milenio se exponen a un ambiente bilingüe donde el inglés se integra de forma orgánica en canciones, juegos, rutinas y proyectos creativos. Esta inmersión natural permite que los niños desarrollen su oído y vocabulario en inglés sin presión académica.\n\nEl enfoque comunicativo del programa garantiza que los pequeños no solo aprendan palabras, sino que comiencen a expresar ideas y emociones en ambos idiomas de manera espontánea.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El kinder del campus Milenio cuenta con espacios especialmente diseñados para la primera infancia: áreas de psicomotricidad, rincones de lectura, huerto escolar y zonas de exploración sensorial. Cada actividad está planeada para estimular el desarrollo integral del niño.\n\nLas educadoras especializadas trabajan con grupos reducidos y utilizan observación continua para documentar el progreso de cada alumno, compartiendo avances con las familias de manera regular y transparente.',
      },
    ],
    faqs: [
      {
        question: '¿El kinder en Milenio tiene áreas de juego seguras?',
        answer:
          'Sí. Contamos con áreas de juego diseñadas específicamente para la edad preescolar, con piso amortiguante, juegos de escala apropiada y supervisión permanente por parte del equipo docente.',
      },
      {
        question: '¿Cuál es el horario del kinder en Milenio?',
        answer:
          'El horario regular es de 8:00 a 14:00 hrs. Ofrecemos horario extendido hasta las 16:00 hrs con actividades complementarias como música, movimiento y taller de arte.',
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
      'Los adolescentes que crecen en la zona de Milenio III cuentan con un entorno urbano dinámico, con acceso a bibliotecas, centros deportivos y espacios culturales. Una secundaria de calidad en esta zona les permite aprovechar todas estas ventajas sin sacrificar tiempo en largos traslados.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En la secundaria del campus Milenio, las sesiones de Filosofía para Niños se transforman en espacios de debate estructurado donde los adolescentes analizan dilemas éticos, políticos y sociales. Los estudiantes aprenden a construir argumentos sólidos, a identificar falacias y a defender sus posiciones con evidencia.\n\nEste enfoque fortalece competencias transversales como la comprensión lectora crítica, la escritura argumentativa y la capacidad de negociación, habilidades indispensables para su futuro académico y profesional.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La secundaria bilingüe en Milenio prepara a los alumnos para certificaciones Cambridge PET y FCE, posicionándolos con un nivel de inglés avanzado al ingresar a preparatoria. Las materias de ciencias y humanidades en inglés consolidan su dominio del idioma en contextos académicos reales.\n\nLos alumnos también participan en programas internacionales como Model United Nations y proyectos de colaboración con escuelas de habla inglesa, ampliando su visión del mundo.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la secundaria en Milenio se centra en el desarrollo de competencias del siglo XXI: pensamiento crítico, colaboración, comunicación y creatividad. Los laboratorios de ciencias, el aula de tecnología y los espacios deportivos son herramientas fundamentales de este enfoque.\n\nEl programa de orientación vocacional inicia desde segundo de secundaria, acompañando a cada estudiante en el descubrimiento de sus aptitudes y en la construcción de un proyecto de vida alineado a sus intereses y talentos.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria en Milenio ofrece orientación vocacional?',
        answer:
          'Sí. A partir de segundo año, los alumnos reciben acompañamiento vocacional a través de talleres, aplicación de tests de aptitudes y charlas con profesionales de diversas áreas.',
      },
      {
        question: '¿Hay servicio de transporte para la secundaria en Milenio?',
        answer:
          'Contamos con rutas de transporte escolar que cubren Milenio III, Loma Dorada, Centro Sur y colonias cercanas. Las unidades son modernas y cuentan con monitoreo GPS.',
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
      'El Mirador es un fraccionamiento familiar en el sur de Querétaro que ha crecido rápidamente gracias a su excelente ubicación y sus áreas comunes bien cuidadas. Las familias de esta zona buscan opciones educativas de calidad que estén a pocos minutos de sus hogares, y Newland School campus Milenio se posiciona como la alternativa ideal por su cercanía y oferta integral.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Para las familias de El Mirador, Newland School ofrece un diferenciador único: el programa de Filosofía para Niños que forma pensadores autónomos desde la primera infancia. En cada nivel educativo, los alumnos desarrollan la capacidad de formular preguntas profundas y de buscar respuestas fundamentadas.\n\nEsta formación filosófica se traduce en alumnos más seguros, empáticos y capaces de enfrentar los retos académicos y sociales con madurez y creatividad.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El campus Milenio, el más cercano a El Mirador, ofrece un programa bilingüe integral donde los alumnos desarrollan competencias comunicativas en inglés desde los primeros años. Las certificaciones internacionales y los proyectos de intercambio cultural enriquecen su perfil académico.\n\nEl enfoque global del colegio prepara a los estudiantes para desenvolverse con confianza en contextos multiculturales, una competencia cada vez más valorada en el mundo profesional.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'Newland School combina excelencia académica con formación humana integral. El modelo educativo incluye aprendizaje basado en proyectos, desarrollo socioemocional, actividades deportivas y artísticas que permiten a cada alumno descubrir y potenciar sus talentos.\n\nLas instalaciones del campus Milenio están diseñadas para ofrecer experiencias de aprendizaje completas: laboratorios, canchas deportivas, áreas verdes, salón de arte y espacios de convivencia que fomentan la comunidad escolar.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo se tarda en llegar desde El Mirador al campus Milenio?',
        answer:
          'El trayecto desde El Mirador a nuestro campus Milenio es de aproximadamente 10 a 15 minutos en automóvil. También contamos con rutas de transporte escolar que cubren esta zona.',
      },
      {
        question: '¿Hay descuentos para familias de El Mirador?',
        answer:
          'Ofrecemos planes de becas y descuentos por hermanos para todas las familias, independientemente de su zona. Te invitamos a agendar una visita para conocer las opciones de apoyo financiero disponibles.',
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
      'San Miguel de Allende es reconocido internacionalmente por su riqueza cultural, su comunidad cosmopolita y su entorno artístico vibrante. Las familias que eligen vivir en esta ciudad Patrimonio de la Humanidad buscan opciones educativas que reflejen su visión global, y Newland School responde con un programa de maternal que combina lo mejor de la pedagogía contemporánea con el espíritu creativo de San Miguel.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En el maternal de San Miguel de Allende, la Filosofía para Niños se introduce a través del asombro y la exploración sensorial. Los más pequeños son invitados a observar, tocar y preguntar, desarrollando desde temprana edad una actitud curiosa y reflexiva ante el mundo.\n\nEstas primeras experiencias filosóficas, guiadas por educadoras especializadas, fomentan el desarrollo del lenguaje, la capacidad de escucha y los primeros pasos hacia el pensamiento lógico.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El contexto multicultural de San Miguel de Allende enriquece naturalmente nuestro programa bilingüe. Los pequeños del maternal escuchan y experimentan el inglés de forma cotidiana a través de canciones, cuentos y rutinas, aprovechando la ventana de adquisición lingüística propia de esta etapa.\n\nLa diversidad cultural del alumnado en San Miguel potencia la experiencia internacional, permitiendo que los niños convivan con familias de distintas nacionalidades desde sus primeros años.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El programa de maternal en San Miguel de Allende está diseñado por especialistas en desarrollo infantil e incluye estimulación motriz, sensorial, cognitiva y socioemocional. Los espacios cuentan con materiales naturales, áreas de exploración al aire libre y rincones de actividades adaptados a las necesidades de los más pequeños.\n\nEl ratio reducido de alumnos por educadora garantiza una atención cálida y personalizada, creando un vínculo de confianza que es fundamental para el bienestar emocional del niño en sus primeros años de vida escolar.',
      },
    ],
    faqs: [
      {
        question: '¿A partir de qué edad aceptan niños en el maternal de San Miguel de Allende?',
        answer:
          'Nuestro programa de maternal en San Miguel de Allende recibe niños a partir de los 12 meses de edad, con un programa de estimulación temprana adaptado a cada etapa de desarrollo.',
      },
      {
        question: '¿El maternal en San Miguel de Allende recibe alumnos de familias extranjeras?',
        answer:
          'Sí. Nuestra comunidad escolar en San Miguel es diversa e incluye familias mexicanas e internacionales. El programa bilingüe facilita la integración de niños de cualquier origen lingüístico.',
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
      'San Miguel de Allende ofrece un entorno único para la infancia: calles llenas de color, una comunidad internacional activa y un espíritu artístico que impregna cada rincón. El kinder de Newland School aprovecha esta riqueza cultural para ofrecer una experiencia preescolar que va más allá del aula y se nutre del entorno extraordinario de la ciudad.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'El kinder de Newland School en San Miguel de Allende incorpora la Filosofía para Niños como una herramienta pedagógica central. A través de cuentos, imágenes y preguntas abiertas, los niños aprenden a expresar sus ideas, a escuchar las de los demás y a construir significados compartidos.\n\nEstas comunidades de diálogo fomentan el respeto, la empatía y la creatividad, preparando a los pequeños no solo para la primaria, sino para una vida de aprendizaje reflexivo y consciente.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe del kinder en San Miguel aprovecha el contexto multicultural de la ciudad para ofrecer una inmersión auténtica en el inglés. Los alumnos participan en proyectos interdisciplinarios donde utilizan ambos idiomas de manera funcional y creativa.\n\nLa convivencia cotidiana con compañeros de distintas nacionalidades enriquece la experiencia lingüística y cultural, brindando a los niños una visión global desde sus primeros años de formación.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo del kinder combina metodologías activas con experiencias artísticas y de contacto con la naturaleza. Los niños exploran el huerto escolar, participan en talleres de arte inspirados en las tradiciones locales y desarrollan habilidades motrices en espacios diseñados para su seguridad y disfrute.\n\nCada educadora documenta el proceso de aprendizaje de los alumnos a través de portafolios y observaciones sistemáticas, manteniendo una comunicación cercana con las familias sobre los logros y áreas de desarrollo de cada niño.',
      },
    ],
    faqs: [
      {
        question: '¿El kinder en San Miguel de Allende ofrece programa bilingüe completo?',
        answer:
          'Sí. Nuestro kinder ofrece un programa bilingüe donde las actividades se desarrollan en español e inglés de manera equilibrada, aprovechando el entorno multicultural de San Miguel de Allende.',
      },
      {
        question: '¿Qué método de lectoescritura utilizan en el kinder?',
        answer:
          'Utilizamos un enfoque comunicativo funcional que integra la lectoescritura en contextos reales de uso. Los niños aprenden a leer y escribir a través de proyectos significativos, respetando su ritmo individual de desarrollo.',
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
      'San Miguel de Allende conjuga tradición y modernidad en un entorno que inspira el aprendizaje. Las familias que eligen esta ciudad valoran una educación que respete la identidad cultural mexicana mientras prepara a sus hijos para competir a nivel internacional. La primaria de Newland School ofrece exactamente eso: raíces sólidas y alas globales.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La primaria de Newland School en San Miguel de Allende lleva la Filosofía para Niños a un nivel de mayor complejidad. Los alumnos exploran textos narrativos y filosóficos, participan en debates estructurados y aprenden a identificar supuestos, consecuencias y alternativas en situaciones reales y ficticias.\n\nEsta práctica regular del pensamiento filosófico impacta directamente en la comprensión lectora, la escritura creativa y la capacidad de resolver problemas de manera innovadora.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe de primaria prepara a los alumnos para presentar certificaciones Cambridge desde tercer grado. Las asignaturas en inglés cubren ciencias naturales, matemáticas y estudios globales, asegurando un dominio funcional del idioma en contextos académicos.\n\nLos proyectos colaborativos con escuelas de otros países y la participación en ferias internacionales de ciencias complementan la formación global del alumno sanmiguelense.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la primaria se sustenta en el aprendizaje basado en proyectos, la integración de tecnología educativa y el desarrollo de competencias socioemocionales. Los alumnos cuentan con acceso a laboratorios de ciencias, salas de cómputo y espacios artísticos que enriquecen su experiencia escolar.\n\nLa evaluación formativa continua permite a los docentes ajustar sus estrategias de enseñanza y a las familias conocer con detalle el progreso académico y personal de sus hijos a lo largo del ciclo escolar.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria en San Miguel de Allende prepara para certificaciones Cambridge?',
        answer:
          'Sí. A partir de tercer grado, los alumnos se preparan para certificaciones Cambridge Starters, Movers y Flyers, lo que avala su nivel de inglés con un estándar reconocido a nivel mundial.',
      },
      {
        question: '¿La primaria en San Miguel incluye educación artística?',
        answer:
          'Absolutamente. El programa incluye artes visuales, música y teatro como parte integral del currículo, aprovechando la riqueza artística de San Miguel de Allende como fuente de inspiración.',
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
      'Para los adolescentes de San Miguel de Allende, estudiar la secundaria en una ciudad con tanta riqueza histórica y artística es un privilegio que potencia su formación. Newland School aprovecha este entorno único para ofrecer una educación secundaria que combina rigor académico con sensibilidad cultural y visión internacional.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En la secundaria de San Miguel de Allende, la Filosofía para Niños se convierte en un laboratorio de ideas donde los adolescentes analizan dilemas contemporáneos: ética tecnológica, justicia social, identidad cultural y medio ambiente. Los estudiantes aprenden a construir argumentos rigurosos y a dialogar con apertura y respeto.\n\nEsta formación filosófica es especialmente valiosa en una comunidad tan diversa como San Miguel, donde la convivencia intercultural requiere empatía, tolerancia y capacidad de comunicación efectiva.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La secundaria bilingüe en San Miguel prepara a los alumnos para certificaciones Cambridge PET y FCE, consolidando un nivel de inglés avanzado. El currículo incluye asignaturas completas en inglés y proyectos de investigación con estándares internacionales.\n\nLa diversidad de la comunidad sanmiguelense permite que los alumnos practiquen inglés en contextos reales fuera del aula, acelerando su aprendizaje y desarrollando confianza comunicativa.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'La secundaria de Newland School en San Miguel ofrece un modelo educativo centrado en el estudiante, con aprendizaje por proyectos, laboratorios de ciencias experimentales y un programa deportivo que incluye disciplinas individuales y de equipo.\n\nEl programa de orientación vocacional acompaña a los estudiantes desde segundo grado, ayudándoles a identificar sus aptitudes y a explorar distintas opciones académicas y profesionales con el apoyo de tutores especializados.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria en San Miguel de Allende tiene laboratorio de ciencias?',
        answer:
          'Sí. Contamos con un laboratorio equipado para prácticas de física, química y biología, donde los alumnos realizan experimentos que complementan y profundizan lo aprendido en el aula.',
      },
      {
        question: '¿Ofrecen actividades culturales en la secundaria de San Miguel?',
        answer:
          'Sí. El entorno cultural de San Miguel enriquece nuestro programa con visitas a galerías, talleres de arte, festivales culturales y colaboraciones con artistas locales que amplían la formación de los alumnos.',
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
      'San Miguel de Allende reúne una comunidad internacional vibrante que valora la educación de calidad con perspectiva global. Las familias mexicanas y extranjeras que viven en esta ciudad patrimonio necesitan una escuela bilingüe que prepare a sus hijos para un futuro sin fronteras, y Newland School es esa opción.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Newland School San Miguel integra la Filosofía para Niños en todos los niveles como un sello distintivo de su propuesta educativa. Desde maternal hasta preparatoria, los alumnos participan en comunidades de diálogo que fomentan el pensamiento crítico, la creatividad y el razonamiento ético.\n\nEn una ciudad tan diversa como San Miguel, este programa cobra especial relevancia: los alumnos aprenden a apreciar diferentes perspectivas culturales y a construir puentes de entendimiento a través del diálogo respetuoso.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Como escuela bilingüe, Newland School San Miguel ofrece un programa donde el español y el inglés se integran de manera equilibrada en todas las áreas del conocimiento. Los alumnos acceden a certificaciones Cambridge, participan en proyectos internacionales y desarrollan un perfil global competitivo.\n\nLa presencia de familias de distintas nacionalidades enriquece el programa internacional, creando un microcosmos multicultural donde los niños aprenden idiomas y culturas de forma natural y auténtica.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de Newland School en San Miguel de Allende fusiona innovación pedagógica con respeto por la identidad cultural. El aprendizaje basado en proyectos, la educación socioemocional y la integración de arte y tecnología son pilares que sustentan la formación de cada alumno.\n\nLas instalaciones del campus incluyen laboratorios, espacios deportivos, talleres de arte y áreas de convivencia que promueven el desarrollo integral en un ambiente seguro y estimulante.',
      },
    ],
    faqs: [
      {
        question: '¿Newland School San Miguel es reconocida internacionalmente?',
        answer:
          'Newland School cuenta con certificaciones y alianzas con instituciones educativas internacionales. Nuestros alumnos obtienen certificaciones Cambridge y participan en programas de colaboración global.',
      },
      {
        question: '¿Qué niveles educativos ofrece la escuela bilingüe en San Miguel?',
        answer:
          'Ofrecemos todos los niveles desde maternal hasta preparatoria, lo que permite a las familias contar con una sola institución de confianza durante toda la formación de sus hijos.',
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
      'El municipio de Corregidora ha experimentado un crecimiento notable, posicionándose como una de las zonas con mayor dinamismo residencial y comercial de la zona metropolitana de Querétaro. Las familias jóvenes que se establecen en Corregidora buscan un colegio que combine cercanía, innovación educativa y formación bilingüe desde los primeros años.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En el colegio de Corregidora, la Filosofía para Niños se introduce desde la etapa maternal con actividades que despiertan la curiosidad y el asombro natural de los más pequeños. En kinder, el programa evoluciona hacia comunidades de diálogo donde los niños exploran conceptos como la amistad, la belleza y las emociones.\n\nEste enfoque filosófico desarrolla habilidades de pensamiento que benefician todas las áreas del aprendizaje y forman personas reflexivas, empáticas y seguras de sí mismas.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe en Corregidora permite que los alumnos de maternal y kinder se familiaricen con el inglés de manera natural y afectiva. Las canciones, cuentos, juegos y rutinas en ambos idiomas crean un entorno de inmersión que aprovecha la plasticidad cerebral de la primera infancia.\n\nEsta exposición temprana al bilingüismo sienta las bases para un dominio sólido del inglés que se consolida en los niveles posteriores con certificaciones y proyectos internacionales.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El campus Corregidora cuenta con instalaciones modernas diseñadas específicamente para maternal y kinder: áreas de psicomotricidad, rincones sensoriales, huerto escolar, biblioteca infantil y espacios de juego con piso amortiguante y materiales seguros.\n\nEl equipo docente especializado en primera infancia trabaja con grupos reducidos, implementando un modelo de atención personalizada donde cada niño es observado, acompañado y estimulado de acuerdo con su ritmo y estilo de aprendizaje.',
      },
    ],
    faqs: [
      {
        question: '¿El colegio en Corregidora tiene maternal y kinder?',
        answer:
          'Sí. Nuestro campus en Corregidora ofrece maternal desde los 12 meses y kinder completo, con un programa continuo que facilita la transición entre niveles dentro de la misma institución.',
      },
      {
        question: '¿Qué horarios maneja el kinder en Corregidora?',
        answer:
          'El horario regular es de 8:00 a 14:00 hrs. Contamos con opción de horario extendido hasta las 16:00 hrs con actividades deportivas, artísticas y de apoyo en tareas.',
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
      'Corregidora se ha convertido en uno de los municipios con mayor oferta educativa de la zona metropolitana de Querétaro, pero pocas instituciones ofrecen la continuidad de maternal a preparatoria en un solo campus. Newland School Corregidora destaca por su propuesta integral que acompaña a los alumnos durante primaria y secundaria con un modelo educativo de excelencia.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En primaria y secundaria, el programa de Filosofía para Niños adquiere mayor profundidad. Los alumnos de primaria trabajan con textos narrativos que plantean dilemas morales, mientras que en secundaria los debates abordan problemáticas actuales como la sustentabilidad, la tecnología y los derechos humanos.\n\nEsta formación filosófica continua genera alumnos con pensamiento crítico sólido, capaces de analizar información compleja y de participar activamente en la construcción de una sociedad más justa e informada.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe de Newland School Corregidora asegura que los alumnos de primaria y secundaria alcancen niveles competitivos de inglés. Las materias académicas en inglés se complementan con preparación para certificaciones Cambridge y participación en eventos internacionales.\n\nLa formación global prepara a los estudiantes para que, al egresar de secundaria, cuenten con las herramientas lingüísticas y culturales necesarias para desenvolverse con éxito en cualquier preparatoria, incluyendo opciones internacionales.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo en Corregidora integra el aprendizaje basado en proyectos con tecnología educativa, laboratorios equipados, actividades deportivas y talleres artísticos. Los alumnos desarrollan competencias del siglo XXI en un ambiente que promueve la creatividad, la colaboración y la autonomía.\n\nEl acompañamiento tutorial personalizado permite a cada alumno recibir orientación académica y socioemocional adaptada a sus necesidades, asegurando un desarrollo integral durante las etapas clave de primaria y secundaria.',
      },
    ],
    faqs: [
      {
        question: '¿La escuela en Corregidora ofrece primaria y secundaria en el mismo campus?',
        answer:
          'Sí. Nuestro campus Corregidora cuenta con primaria y secundaria en las mismas instalaciones, facilitando la continuidad académica y la logística familiar.',
      },
      {
        question: '¿Qué actividades extracurriculares ofrece la escuela en Corregidora?',
        answer:
          'Ofrecemos fútbol, básquetbol, voleibol, talleres de robótica, arte, música y club de lectura. Estas actividades complementan la formación académica y ayudan a los alumnos a descubrir sus pasiones.',
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
      'Loma Dorada es una de las colonias más consolidadas y accesibles del sur de Querétaro, con una ubicación privilegiada que conecta fácilmente con las principales vialidades de la ciudad. Las familias de esta zona buscan una secundaria cercana que ofrezca excelencia académica sin largos traslados, y Newland School campus Milenio es la respuesta.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Los adolescentes de Loma Dorada que estudian secundaria en Newland School participan en un programa de Filosofía para Niños que les permite analizar críticamente los temas que definen su generación. A través de debates, lectura de textos filosóficos y proyectos de investigación ética, desarrollan herramientas intelectuales que los distinguen.\n\nEsta formación filosófica tiene un impacto directo en su rendimiento académico, ya que los alumnos aprenden a leer con profundidad, a escribir con estructura argumentativa y a resolver problemas con pensamiento lógico.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La secundaria bilingüe más cercana a Loma Dorada prepara a los alumnos para certificaciones internacionales que acreditan su nivel de inglés. Las asignaturas en inglés cubren ciencias, estudios globales y literatura, asegurando un dominio funcional del idioma en contextos académicos y cotidianos.\n\nLos proyectos de vinculación internacional y las experiencias de intercambio cultural amplían la perspectiva de los alumnos y los preparan para competir en un entorno globalizado.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la secundaria en campus Milenio, la opción más cercana a Loma Dorada, se basa en el desarrollo integral del adolescente: académico, socioemocional y físico. Los laboratorios de ciencias, las canchas deportivas y los espacios de expresión artística son herramientas clave de esta formación.\n\nEl programa de tutoría personalizada y orientación vocacional acompaña a cada estudiante en la transición de la secundaria a la preparatoria, asegurando que tome decisiones informadas sobre su futuro.',
      },
    ],
    faqs: [
      {
        question: '¿Cómo llego a Newland School desde Loma Dorada?',
        answer:
          'Nuestro campus Milenio se encuentra a aproximadamente 10 minutos en automóvil desde Loma Dorada. También ofrecemos rutas de transporte escolar que cubren esta zona.',
      },
      {
        question: '¿La secundaria cerca de Loma Dorada tiene programa de becas?',
        answer:
          'Sí. Newland School ofrece un programa de becas académicas y descuentos por hermanos. Te invitamos a agendar una cita para conocer las opciones disponibles para tu familia.',
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
      'Loma Dorada es una colonia emblemática del sur de Querétaro, apreciada por su vida comunitaria activa y su acceso a servicios esenciales. Las familias de Loma Dorada merecen una escuela que esté a la altura de sus expectativas: cercana, segura y con un modelo educativo que prepare a sus hijos para el futuro.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Newland School ofrece a las familias de Loma Dorada un programa de Filosofía para Niños que distingue a sus alumnos por su capacidad de reflexión y diálogo. En cada nivel educativo, los estudiantes aprenden a pensar de manera autónoma, a cuestionar con argumentos y a escuchar con empatía.\n\nEsta formación filosófica transversal es un sello distintivo de Newland School que prepara ciudadanos conscientes, responsables y comprometidos con su entorno social.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe de Newland School campus Milenio asegura que los alumnos de Loma Dorada reciban una educación con estándares internacionales. Desde los primeros niveles, el inglés se integra como herramienta de comunicación y aprendizaje en materias académicas, no solo como asignatura aislada.\n\nLas certificaciones Cambridge, los proyectos internacionales y las experiencias de intercambio cultural complementan una formación global que abre puertas en México y en el mundo.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de Newland School se centra en el aprendizaje activo, la formación socioemocional y el desarrollo de competencias del siglo XXI. Los alumnos participan en proyectos interdisciplinarios, utilizan tecnología como herramienta de aprendizaje y desarrollan habilidades artísticas y deportivas que complementan su formación académica.\n\nEl campus Milenio ofrece instalaciones completas con laboratorios, canchas, áreas verdes y espacios creativos donde cada alumno puede descubrir y desarrollar su potencial.',
      },
    ],
    faqs: [
      {
        question: '¿Newland School ofrece todos los niveles para familias de Loma Dorada?',
        answer:
          'Sí. Nuestro campus Milenio, el más cercano a Loma Dorada, ofrece maternal, kinder, primaria, secundaria y preparatoria, permitiendo que toda la familia estudie en una sola institución.',
      },
      {
        question: '¿Hay transporte escolar desde Loma Dorada?',
        answer:
          'Sí. Contamos con rutas de transporte escolar que cubren Loma Dorada y colonias aledañas, con unidades seguras y monitoreadas para tranquilidad de las familias.',
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
      'Las familias de Loma Dorada con hijos en edad preescolar buscan un kinder que ofrezca más que guardería: un espacio de formación integral, seguro y cercano. Newland School campus Milenio se encuentra a pocos minutos de Loma Dorada y ofrece un programa de kinder diseñado para despertar el potencial de cada niño.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'El kinder de Newland School invita a los pequeños de Loma Dorada a explorar el mundo de las ideas desde los 3 años. A través de cuentos, preguntas abiertas y actividades lúdicas, los niños desarrollan su capacidad de escucha, su expresión verbal y sus primeras habilidades de razonamiento.\n\nEstas experiencias filosóficas tempranas construyen una base sólida de pensamiento crítico que acompañará al niño durante toda su trayectoria educativa.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe del kinder permite que los niños de Loma Dorada se familiaricen con el inglés de forma natural y divertida. Las actividades en ambos idiomas incluyen canciones, teatro, juegos y proyectos creativos que hacen del aprendizaje una experiencia gozosa.\n\nEsta inmersión lingüística temprana desarrolla el oído, amplía el vocabulario y sienta las bases para una competencia comunicativa bilingüe sólida en los años por venir.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El kinder del campus Milenio ofrece un programa integral que abarca desarrollo cognitivo, motriz, lingüístico y socioemocional. Los espacios están diseñados para la exploración segura: áreas de psicomotricidad, rincones de lectura, huerto escolar y zona de juegos con materiales naturales.\n\nLas educadoras especializadas utilizan observación continua y portafolios individuales para documentar el progreso de cada alumno, manteniendo una comunicación cercana y transparente con las familias.',
      },
    ],
    faqs: [
      {
        question: '¿A qué distancia está el kinder de Newland School desde Loma Dorada?',
        answer:
          'Nuestro campus Milenio se ubica a aproximadamente 10 minutos en auto desde Loma Dorada. También ofrecemos transporte escolar con ruta que pasa por esta zona.',
      },
      {
        question: '¿El kinder cerca de Loma Dorada acepta niños de 3 años?',
        answer:
          'Sí. Nuestro kinder recibe alumnos a partir de los 3 años cumplidos, con grupos reducidos y un programa diseñado para cada etapa del preescolar.',
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
      'Para las familias de Loma Dorada, encontrar una primaria con programas internacionales y cercanía geográfica es una prioridad. Newland School campus Milenio ofrece una primaria bilingüe a pocos minutos de esta colonia, con un modelo educativo que combina rigor académico, innovación y formación humana.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La primaria de Newland School, opción cercana a Loma Dorada, integra la Filosofía para Niños como una práctica semanal donde los alumnos discuten temas que van desde la justicia hasta la creatividad. Estas comunidades de indagación fortalecen la comprensión lectora, la expresión oral y la capacidad argumentativa.\n\nLos alumnos que participan regularmente en Filosofía para Niños muestran un mejor desempeño en todas las asignaturas, ya que desarrollan habilidades metacognitivas que potencian su aprendizaje autónomo.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La primaria bilingüe del campus Milenio ofrece a los alumnos de Loma Dorada una formación en inglés que va más allá de la clase de idiomas. Las asignaturas de ciencias, matemáticas y estudios globales se imparten parcialmente en inglés, preparando a los estudiantes para certificaciones Cambridge desde tercer grado.\n\nLos proyectos de colaboración internacional y las ferias académicas complementan esta formación, brindando experiencias auténticas de comunicación en un contexto global.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la primaria se distingue por la integración de proyectos STEAM, tecnología educativa y actividades artísticas y deportivas. Los alumnos trabajan en equipos multidisciplinarios, resuelven problemas reales y presentan sus proyectos ante la comunidad escolar.\n\nEl seguimiento personalizado a través de reportes formativos y reuniones periódicas con padres asegura que cada familia conozca el progreso de su hijo y participe activamente en su desarrollo educativo.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria cerca de Loma Dorada ofrece certificaciones de inglés?',
        answer:
          'Sí. A partir de tercer grado, los alumnos se preparan para certificaciones Cambridge Starters, Movers y Flyers, acreditando su nivel de inglés con reconocimiento internacional.',
      },
      {
        question: '¿Hay actividades deportivas en la primaria cercana a Loma Dorada?',
        answer:
          'Sí. El programa deportivo incluye fútbol, básquetbol, voleibol y atletismo, con participación en torneos interescolares. Las instalaciones del campus Milenio incluyen cancha de fútbol y cancha techada.',
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
      'Centro Sur es uno de los polos de desarrollo más importantes de Querétaro, con centros comerciales, corporativos y residenciales de primer nivel. Las familias que viven o trabajan en esta zona necesitan una escuela de excelencia que esté a su alcance, y Newland School campus Milenio ofrece esa combinación de cercanía y calidad educativa.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Las familias de Centro Sur que eligen Newland School encuentran en la Filosofía para Niños un programa único que distingue a nuestros alumnos. Desde las primeras etapas, los estudiantes participan en comunidades de indagación donde aprenden a pensar con rigor, a dialogar con respeto y a construir significados compartidos.\n\nEste programa filosófico transversal genera egresados con pensamiento crítico sólido, una competencia cada vez más demandada en el mundo académico y profesional.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe de Newland School prepara a los alumnos cercanos a Centro Sur para un futuro global. El inglés se integra como lengua de instrucción en múltiples asignaturas, y los estudiantes acceden a certificaciones Cambridge y a experiencias de intercambio cultural desde primaria.\n\nLa visión internacional del colegio se refleja también en la participación de alumnos en foros, competencias académicas y proyectos colaborativos con escuelas de otros países.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'Newland School campus Milenio ofrece a las familias de Centro Sur un modelo educativo que integra aprendizaje basado en proyectos, tecnología, arte y deporte. Las instalaciones completas permiten que cada alumno desarrolle sus competencias en ambientes estimulantes y seguros.\n\nEl acompañamiento personalizado, con tutorías académicas y seguimiento socioemocional, asegura que cada estudiante reciba la atención que necesita para alcanzar su máximo potencial.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo toma llegar desde Centro Sur al campus Milenio?',
        answer:
          'El trayecto desde Centro Sur hasta nuestro campus Milenio es de aproximadamente 10 a 15 minutos por las vialidades principales. También ofrecemos transporte escolar con rutas que cubren esta zona.',
      },
      {
        question: '¿Newland School cerca de Centro Sur ofrece todos los niveles?',
        answer:
          'Sí. Nuestro campus Milenio, el más cercano a Centro Sur, ofrece maternal, kinder, primaria, secundaria y preparatoria bajo un mismo modelo educativo de excelencia.',
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
      'Centro Sur es una de las zonas más dinámicas de Querétaro, con excelente conectividad y una creciente comunidad de familias jóvenes. Para los padres que viven o trabajan en Centro Sur, contar con un kinder bilingüe de calidad a pocos minutos de distancia es una necesidad que Newland School campus Milenio satisface con una propuesta educativa integral.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'El kinder de Newland School, opción cercana a Centro Sur, introduce a los niños en la Filosofía para Niños a través del juego, la narrativa y el diálogo. Los pequeños aprenden a hacer preguntas, a escuchar las respuestas de sus compañeros y a reflexionar sobre temas que les son significativos.\n\nEstas experiencias tempranas de pensamiento filosófico desarrollan habilidades lingüísticas, sociales y cognitivas que marcan una diferencia notable en el rendimiento académico durante primaria.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe del kinder permite que los niños de Centro Sur inicien su formación en inglés de manera natural y afectiva. Las actividades cotidianas, canciones, cuentos y juegos en ambos idiomas crean un ambiente de inmersión que aprovecha la plasticidad cerebral de la primera infancia.\n\nEste enfoque comunicativo asegura que los niños no solo aprendan vocabulario, sino que comiencen a comunicar ideas y emociones en inglés de forma espontánea y segura.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El kinder de campus Milenio ofrece a las familias de Centro Sur un programa que integra estimulación cognitiva, desarrollo motriz, expresión artística y formación socioemocional. Los espacios están diseñados para la primera infancia: áreas sensoriales, rincones de lectura, zona de psicomotricidad y juegos al aire libre.\n\nEl equipo docente especializado trabaja con grupos reducidos y mantiene comunicación constante con las familias a través de reportes, portafolios y reuniones periódicas que permiten acompañar el desarrollo de cada niño de manera cercana.',
      },
    ],
    faqs: [
      {
        question: '¿El kinder cercano a Centro Sur tiene horario extendido?',
        answer:
          'Sí. El horario regular del kinder es de 8:00 a 14:00 hrs, con opción de horario extendido hasta las 16:00 hrs que incluye actividades de música, movimiento, arte y apoyo en tareas.',
      },
      {
        question: '¿Ofrecen transporte escolar desde Centro Sur al kinder?',
        answer:
          'Sí. Contamos con rutas de transporte escolar que cubren Centro Sur y zonas aledañas, con unidades seguras y personal capacitado para el cuidado de los más pequeños.',
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
      'Centro Sur se ha posicionado como uno de los polos de desarrollo más importantes de Querétaro, con familias que buscan opciones educativas de primer nivel sin tener que recorrer grandes distancias. Newland School campus Milenio ofrece una primaria bilingüe a pocos minutos de Centro Sur, combinando excelencia académica con atención personalizada.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La primaria de Newland School cercana a Centro Sur integra la Filosofía para Niños como eje transversal del currículo. Los alumnos participan en comunidades de indagación donde formulan preguntas, construyen argumentos y aprenden a dialogar con respeto y profundidad.\n\nEste enfoque filosófico fortalece el pensamiento crítico y la capacidad analítica de los estudiantes, habilidades que se reflejan en un desempeño académico destacado en todas las áreas del conocimiento.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe de la primaria permite que los alumnos de Centro Sur desarrollen fluidez en inglés a través de proyectos, lecturas y actividades que integran ambos idiomas de forma natural. Los estándares internacionales garantizan que la formación sea competitiva a nivel global.\n\nAdemás, los estudiantes participan en evaluaciones y certificaciones internacionales que validan su dominio del idioma y los preparan para programas de intercambio en etapas posteriores.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'La primaria de campus Milenio combina el rigor académico con experiencias STEAM, arte, deporte y formación socioemocional. Los espacios están diseñados para fomentar el trabajo colaborativo, la experimentación y el aprendizaje significativo.\n\nCada alumno cuenta con un seguimiento personalizado que permite identificar fortalezas y áreas de oportunidad, asegurando que ningún estudiante se quede atrás y que todos alcancen su máximo potencial.',
      },
    ],
    faqs: [
      {
        question: '¿La primaria cercana a Centro Sur ofrece actividades extracurriculares?',
        answer:
          'Sí. La primaria de Newland School campus Milenio ofrece talleres de arte, música, robótica, deportes y más, permitiendo que los alumnos desarrollen talentos más allá del aula.',
      },
      {
        question: '¿Hay transporte escolar desde Centro Sur a la primaria?',
        answer:
          'Contamos con rutas de transporte que cubren Centro Sur y colonias aledañas, con unidades seguras, GPS y personal capacitado para el traslado de los alumnos.',
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
      'Las familias de Centro Sur buscan opciones de secundaria que combinen excelencia académica, formación en valores y un entorno seguro. Newland School campus Milenio ofrece una secundaria bilingüe de alto nivel a pocos minutos de esta zona, con un modelo educativo que prepara adolescentes para los retos del siglo XXI.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En la secundaria de Newland School, los alumnos de Centro Sur profundizan en la Filosofía para Niños a través de debates, ensayos y proyectos que los invitan a cuestionar, analizar y proponer soluciones a problemáticas reales. Este enfoque desarrolla pensadores autónomos y ciudadanos responsables.\n\nLas comunidades de indagación filosófica se convierten en espacios de crecimiento personal donde los adolescentes aprenden a escuchar, argumentar y construir consensos de manera respetuosa.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La secundaria bilingüe cercana a Centro Sur prepara a los alumnos con estándares internacionales que incluyen certificaciones de Cambridge y participación en programas de intercambio. El dominio del inglés se consolida a través de proyectos interdisciplinarios y presentaciones orales.\n\nEsta formación global permite que los egresados de la secundaria estén listos para continuar su educación en preparatorias nacionales e internacionales con una ventaja competitiva significativa.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la secundaria integra ciencias, tecnología, humanidades y arte en un programa que fomenta la curiosidad intelectual y el compromiso social. Los laboratorios de ciencias, salas de cómputo y espacios deportivos complementan la formación académica.\n\nEl acompañamiento socioemocional es fundamental en esta etapa, por lo que cada alumno cuenta con seguimiento personalizado que incluye orientación vocacional, talleres de habilidades para la vida y comunicación constante con las familias.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria cercana a Centro Sur prepara para preparatoria bilingüe?',
        answer:
          'Sí. Nuestros egresados de secundaria cuentan con certificaciones de inglés y una formación académica que les permite ingresar a las mejores preparatorias bilingües del país.',
      },
      {
        question: '¿Qué horario tiene la secundaria cerca de Centro Sur?',
        answer:
          'La secundaria tiene horario de 7:00 a 14:30 hrs, con opción de talleres extracurriculares por la tarde que incluyen deportes, arte, robótica y preparación para certificaciones.',
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
      'El Refugio es una zona residencial en constante crecimiento ubicada al norte de Querétaro, donde las familias valoran la tranquilidad y la cercanía a servicios de calidad. Newland School campus Zibatá se encuentra a pocos minutos de El Refugio, ofreciendo una propuesta educativa bilingüe integral para todas las edades.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Newland School campus Zibatá implementa la Filosofía para Niños como metodología central en todos los niveles. Los alumnos cercanos a El Refugio participan en comunidades de indagación donde aprenden a pensar con rigor, a dialogar con empatía y a construir conocimiento de forma colaborativa.\n\nEste programa filosófico transforma las aulas en espacios de reflexión donde cada estudiante desarrolla su capacidad de análisis, argumentación y toma de decisiones informadas.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe del campus Zibatá permite que los alumnos de El Refugio dominen el inglés desde temprana edad a través de un currículo integrado. Las certificaciones internacionales y los programas de intercambio complementan la formación lingüística.\n\nLos estándares globales que se aplican en cada nivel aseguran que los estudiantes estén preparados para competir y colaborar en un entorno internacional, abriendo puertas a oportunidades académicas en todo el mundo.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El campus Zibatá ofrece a las familias de El Refugio un modelo educativo que abarca desde maternal hasta secundaria, con instalaciones modernas, laboratorios equipados, canchas deportivas y espacios artísticos diseñados para cada etapa del desarrollo.\n\nLa atención personalizada, los grupos reducidos y la comunicación constante con las familias son pilares de un modelo que busca formar personas íntegras, seguras de sí mismas y comprometidas con su comunidad.',
      },
    ],
    faqs: [
      {
        question: '¿Qué niveles educativos ofrece la escuela cercana a El Refugio?',
        answer:
          'Newland School campus Zibatá ofrece maternal, kinder, primaria y secundaria, permitiendo que los alumnos realicen toda su trayectoria escolar en un mismo entorno educativo de calidad.',
      },
      {
        question: '¿Hay rutas de transporte desde El Refugio al campus Zibatá?',
        answer:
          'Sí. Contamos con servicio de transporte escolar que cubre El Refugio y zonas cercanas, con unidades equipadas con GPS, cinturones de seguridad y personal capacitado.',
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
      'Querétaro es una ciudad que destaca por su calidad de vida y su creciente oferta educativa. Newland School se posiciona como uno de los colegios privados bilingües más completos de la región, con 5 campus estratégicamente ubicados y un modelo educativo que forma estudiantes globales, críticos y comprometidos.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Newland School es pionero en la implementación de la Filosofía para Niños en Querétaro. Desde maternal hasta preparatoria, los alumnos participan en comunidades de indagación filosófica que desarrollan el pensamiento crítico, la capacidad argumentativa y la sensibilidad ética.\n\nEste programa distintivo transforma la experiencia educativa, formando estudiantes que no solo acumulan conocimiento sino que aprenden a cuestionarlo, analizarlo y aplicarlo de manera creativa y responsable.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Como colegio bilingüe, Newland School garantiza el dominio del inglés a través de un programa de inmersión que inicia desde los primeros años. Las certificaciones de Cambridge, los programas de intercambio y las alianzas con instituciones internacionales complementan la formación global.\n\nLos estudiantes se preparan para competir en un mundo globalizado con herramientas lingüísticas, culturales y académicas que les abren puertas en universidades nacionales e internacionales de prestigio.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de Newland School integra rigor académico, formación socioemocional, arte, deporte y tecnología en un programa diseñado para cada etapa del desarrollo. Los 5 campus cuentan con instalaciones de primer nivel y equipos docentes especializados.\n\nLa atención personalizada, los grupos reducidos y la comunicación estrecha con las familias permiten que cada alumno reciba el acompañamiento necesario para alcanzar su máximo potencial y desarrollar un amor genuino por el aprendizaje.',
      },
    ],
    faqs: [
      {
        question: '¿Cuántos campus tiene Newland School en Querétaro?',
        answer:
          'Newland School cuenta con 5 campus en Querétaro: Juriquilla, Zibatá, Corregidora, Milenio y San Miguel de Allende, cada uno con instalaciones completas y el mismo modelo educativo de excelencia.',
      },
      {
        question: '¿Qué niveles educativos ofrece el colegio bilingüe NWL?',
        answer:
          'Newland School ofrece desde maternal y kinder hasta primaria, secundaria y preparatoria, permitiendo una trayectoria educativa continua y coherente en un mismo sistema.',
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
      'Elegir un colegio particular en Querétaro es una decisión que impacta directamente en el futuro de los hijos. Newland School se distingue por ofrecer una educación 100% bilingüe con un enfoque humanista que forma personas íntegras, preparadas para un mundo globalizado y comprometidas con su comunidad.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Lo que hace particular a Newland School es su programa de Filosofía para Niños, una metodología que desarrolla el pensamiento crítico desde los primeros años. Los alumnos aprenden a cuestionar, reflexionar y dialogar en un ambiente de respeto y curiosidad intelectual.\n\nEsta formación filosófica se traduce en estudiantes con mayor capacidad analítica, mejor comprensión lectora y habilidades de comunicación que los distinguen en evaluaciones nacionales e internacionales.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Como colegio particular bilingüe, Newland School ofrece un programa de inmersión en inglés que abarca todas las áreas del conocimiento. Los alumnos obtienen certificaciones internacionales y participan en programas que los conectan con estudiantes de otros países.\n\nEsta visión internacional no solo se limita al idioma, sino que incluye una formación intercultural que prepara a los estudiantes para colaborar y liderar en contextos diversos y multiculturales.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de este colegio particular integra lo mejor de las pedagogías contemporáneas con innovación tecnológica y formación en valores. Los laboratorios STEAM, las actividades artísticas y los programas deportivos complementan una formación académica rigurosa.\n\nNewland School busca que cada alumno descubra y desarrolle sus talentos, por lo que ofrece una amplia gama de actividades extracurriculares, acompañamiento socioemocional y orientación vocacional desde etapas tempranas.',
      },
    ],
    faqs: [
      {
        question: '¿Por qué elegir un colegio particular bilingüe en Querétaro?',
        answer:
          'Un colegio particular bilingüe como Newland School ofrece grupos reducidos, atención personalizada, programas internacionales y un modelo educativo que forma personas íntegras con una visión global.',
      },
      {
        question: '¿Newland School ofrece becas o apoyos económicos?',
        answer:
          'Sí. Newland School cuenta con programas de apoyo económico para familias que lo requieran. Te invitamos a contactarnos para conocer las opciones disponibles según el campus y nivel de tu interés.',
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
      'El kinder es la etapa donde se construyen los cimientos del aprendizaje. En Newland School, los niños de Querétaro encuentran un espacio bilingüe diseñado para despertar su curiosidad, desarrollar su creatividad y fortalecer sus habilidades sociales desde los primeros años.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'El kinder de Newland School implementa la Filosofía para Niños como herramienta pedagógica fundamental. A través del juego, los cuentos y el diálogo, los pequeños aprenden a hacer preguntas, escuchar a otros y expresar sus ideas con claridad y confianza.\n\nEsta metodología desarrolla habilidades cognitivas y sociales que marcan una diferencia significativa en el rendimiento académico durante primaria y más allá, formando pensadores independientes desde la primera infancia.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe del kinder sumerge a los niños en el inglés de manera natural y lúdica. Las rutinas diarias, canciones, cuentos y actividades en ambos idiomas aprovechan la plasticidad cerebral de la primera infancia para desarrollar competencias lingüísticas sólidas.\n\nLos estándares internacionales del programa aseguran que los niños estén preparados para continuar su formación bilingüe en primaria con una base sólida de comprensión y expresión en ambos idiomas.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo del kinder de Newland School combina estimulación temprana, programa STEAM, expresión artística, psicomotricidad y formación socioemocional en un ambiente seguro y estimulante. Los espacios están diseñados específicamente para la primera infancia.\n\nLos docentes especializados trabajan con grupos reducidos y mantienen comunicación constante con las familias, asegurando que el desarrollo de cada niño sea acompañado de manera integral y personalizada.',
      },
    ],
    faqs: [
      {
        question: '¿Qué métodos de enseñanza utiliza el kinder de Newland School?',
        answer:
          'Nuestro kinder utiliza aprendizaje basado en el juego, Filosofía para Niños, programa STEAM, inmersión bilingüe y formación socioemocional, todo integrado en un modelo que respeta los ritmos de cada niño.',
      },
      {
        question: '¿En qué campus de Querétaro hay kinder de Newland School?',
        answer:
          'Newland School ofrece kinder en sus campus de Juriquilla, Zibatá, Corregidora y Milenio, todos con el mismo programa bilingüe y modelo educativo de excelencia.',
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
      'El maternal es la primera experiencia educativa formal de un niño, y elegir el lugar correcto marca la diferencia en su desarrollo. Newland School ofrece un programa de maternal bilingüe en Querétaro diseñado para estimular el desarrollo cognitivo, motriz y socioemocional desde los primeros meses de vida.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Incluso en maternal, Newland School introduce los principios de la Filosofía para Niños a través de actividades sensoriales, cuentos interactivos y experiencias de exploración guiada. Los pequeños comienzan a desarrollar su capacidad de asombro, curiosidad y comunicación.\n\nEstas primeras experiencias filosóficas crean una base sólida para el pensamiento crítico, ayudando a los niños a desarrollar habilidades que los acompañarán a lo largo de toda su trayectoria educativa.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'El programa bilingüe del maternal expone a los niños al inglés desde sus primeros meses en la escuela. A través de canciones, juegos, rutinas y actividades sensoriales en ambos idiomas, los pequeños desarrollan una familiaridad natural con el inglés que facilita su aprendizaje posterior.\n\nEsta exposición temprana aprovecha la extraordinaria capacidad de los bebés y niños pequeños para absorber patrones lingüísticos, sentando las bases de un bilingüismo auténtico y funcional.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El programa de maternal de Newland School se centra en la estimulación temprana integral: desarrollo sensorial, psicomotricidad gruesa y fina, lenguaje, socialización y autonomía. Los espacios están especialmente diseñados para bebés y niños pequeños con materiales seguros y estimulantes.\n\nEl equipo de docentes especializados en primera infancia trabaja con ratios reducidos que permiten una atención individualizada, respetando los ritmos de cada niño y comunicando diariamente los avances a las familias.',
      },
    ],
    faqs: [
      {
        question: '¿A partir de qué edad reciben niños en el maternal de NWL?',
        answer:
          'El maternal de Newland School recibe niños a partir de 1 año y medio de edad. El programa está diseñado para acompañar cada etapa del desarrollo temprano con actividades adecuadas a su madurez.',
      },
      {
        question: '¿El maternal de Newland School es bilingüe?',
        answer:
          'Sí. Desde el maternal, los niños están expuestos al inglés y español de forma natural a través de actividades cotidianas, canciones y juegos, aprovechando la plasticidad cerebral de esta etapa.',
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
      'Encontrar una escuela privada en Querétaro que ofrezca continuidad educativa desde los primeros años hasta la adolescencia es fundamental para el desarrollo integral. Newland School brinda kinder, primaria y secundaria bilingüe en 5 campus, con un modelo educativo que forma estudiantes con visión global y raíces sólidas.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'Lo que distingue a Newland School de otras escuelas privadas en Querétaro es su programa de Filosofía para Niños, presente en todos los niveles educativos. Los alumnos desarrollan pensamiento crítico, capacidad argumentativa y sensibilidad ética a través de comunidades de indagación filosófica.\n\nEsta metodología, aplicada desde kinder hasta secundaria, forma estudiantes que saben pensar, no solo repetir contenidos, preparándolos para enfrentar con éxito los retos académicos y personales que se presenten.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Newland School ofrece un programa 100% bilingüe que abarca kinder, primaria y secundaria. Los alumnos obtienen certificaciones internacionales de Cambridge y participan en programas de intercambio que amplían su perspectiva cultural y académica.\n\nLa formación internacional se complementa con alianzas educativas que abren puertas a oportunidades en universidades de prestigio tanto nacionales como internacionales.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo de Newland School integra rigor académico, formación socioemocional, tecnología STEAM, arte y deporte en cada nivel educativo. Las instalaciones de los 5 campus están diseñadas para ofrecer espacios de aprendizaje que inspiran y motivan a los estudiantes.\n\nLa continuidad educativa desde kinder hasta secundaria permite un seguimiento personalizado a largo plazo, donde cada alumno es conocido, acompañado y retado a alcanzar su máximo potencial en un entorno de calidez y exigencia.',
      },
    ],
    faqs: [
      {
        question: '¿Qué ventaja tiene una escuela privada con todos los niveles?',
        answer:
          'La continuidad educativa permite un seguimiento personalizado del desarrollo de cada alumno, coherencia en la metodología y una comunidad escolar donde las familias se sienten parte integral del proceso educativo.',
      },
      {
        question: '¿Dónde están ubicados los campus de Newland School?',
        answer:
          'Newland School tiene campus en Juriquilla, Zibatá, Corregidora, Milenio y San Miguel de Allende, estratégicamente ubicados para atender a las principales zonas residenciales de Querétaro.',
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
      'La primaria es una etapa decisiva en la formación académica y personal de los niños. Newland School ofrece una primaria bilingüe en Querétaro donde el rigor académico se combina con la formación en valores, el pensamiento crítico y la preparación para un mundo globalizado.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La primaria bilingüe de Newland School se distingue por su programa de Filosofía para Niños, que desarrolla habilidades de pensamiento crítico, argumentación y diálogo desde los primeros grados. Los alumnos aprenden a analizar, cuestionar y proponer en un ambiente de respeto intelectual.\n\nLas comunidades de indagación filosófica transforman cada clase en una oportunidad para pensar con profundidad, desarrollando estudiantes que sobresalen en comprensión lectora, redacción y resolución de problemas.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'En la primaria bilingüe, los alumnos consolidan su dominio del inglés a través de un programa de inmersión que abarca ciencias, matemáticas, arte y literatura. Las certificaciones de Cambridge validan su nivel de competencia lingüística ante estándares internacionales.\n\nAdemás, los programas de intercambio cultural y las actividades interescolares internacionales amplían la visión de los estudiantes, preparándolos para ser ciudadanos del mundo con sensibilidad intercultural.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'La primaria de Newland School integra un programa STEAM, formación artística, deporte competitivo y acompañamiento socioemocional en un modelo que atiende todas las dimensiones del desarrollo infantil. Los laboratorios, bibliotecas y espacios deportivos complementan la formación en aula.\n\nCada alumno cuenta con un seguimiento personalizado que incluye portafolios de evidencias, evaluaciones formativas y reuniones con las familias, asegurando que el progreso académico y personal sea constante y visible.',
      },
    ],
    faqs: [
      {
        question: '¿Qué certificaciones internacionales ofrece la primaria bilingüe?',
        answer:
          'Los alumnos de la primaria bilingüe presentan evaluaciones de Cambridge que certifican su nivel de inglés, además de participar en evaluaciones estandarizadas que miden su desempeño académico general.',
      },
      {
        question: '¿La primaria bilingüe incluye programa STEAM?',
        answer:
          'Sí. El programa STEAM de la primaria integra ciencia, tecnología, ingeniería, arte y matemáticas en proyectos interdisciplinarios que desarrollan la creatividad, el pensamiento lógico y la resolución de problemas.',
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
      'La secundaria es una etapa de grandes cambios y decisiones. En Newland School, los adolescentes de Querétaro encuentran un espacio bilingüe donde el rigor académico se complementa con acompañamiento socioemocional, orientación vocacional y experiencias internacionales que los preparan para la preparatoria y la vida.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La secundaria particular de Newland School lleva la Filosofía para Niños a un nivel más profundo, con debates, ensayos filosóficos y proyectos de investigación que desafían a los adolescentes a pensar con rigor y originalidad. Los estudiantes se convierten en pensadores autónomos y ciudadanos críticos.\n\nEsta formación filosófica es especialmente valiosa durante la adolescencia, una etapa donde la capacidad de reflexión, el diálogo y la toma de decisiones informadas marcan la diferencia en el desarrollo personal.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La secundaria bilingüe prepara a los alumnos con certificaciones de Cambridge de nivel intermedio-avanzado y participación en programas de intercambio con escuelas de otros países. El dominio del inglés se aplica en todas las materias y proyectos académicos.\n\nEsta preparación internacional asegura que los egresados de la secundaria estén listos para continuar su educación en preparatorias de alto nivel, con las competencias lingüísticas y culturales que exige el mundo actual.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la secundaria integra ciencias, humanidades, tecnología, arte y deporte en un programa que reconoce la diversidad de talentos y estilos de aprendizaje de los adolescentes. Los laboratorios, talleres y espacios deportivos son escenarios de un aprendizaje vivencial.\n\nEl acompañamiento socioemocional incluye orientación vocacional, talleres de habilidades para la vida, prevención de riesgos y comunicación con las familias, creando una red de apoyo integral para cada estudiante.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria particular de NWL ofrece orientación vocacional?',
        answer:
          'Sí. Desde segundo de secundaria, los alumnos participan en un programa de orientación vocacional que incluye evaluaciones de aptitudes, visitas a universidades y talleres de autoconocimiento.',
      },
      {
        question: '¿Qué nivel de inglés alcanzan los alumnos al terminar secundaria?',
        answer:
          'Los egresados de la secundaria bilingüe de Newland School alcanzan un nivel B2 certificado por Cambridge, lo que les permite comunicarse con fluidez y participar en programas académicos en inglés.',
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
      'El Mirador es una zona residencial de Querétaro donde las familias valoran la educación de calidad y la cercanía. Newland School campus Milenio ofrece una secundaria bilingüe a pocos minutos de El Mirador, con un modelo educativo que prepara adolescentes con pensamiento crítico y visión global.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La secundaria de campus Milenio, cercana a El Mirador, implementa la Filosofía para Niños como pilar de la formación. Los adolescentes participan en debates, escritura argumentativa y proyectos filosóficos que desarrollan su capacidad de análisis y su sentido ético.\n\nEstas experiencias transforman la manera en que los estudiantes se relacionan con el conocimiento, formando jóvenes que no solo aprenden contenidos sino que construyen criterio propio y capacidad de diálogo.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'Los alumnos de El Mirador que asisten a la secundaria de Newland School acceden a un programa bilingüe con certificaciones de Cambridge y oportunidades de intercambio internacional. El inglés se vive como herramienta de comunicación real, no solo como materia escolar.\n\nLa formación internacional prepara a los egresados para continuar su educación en cualquier preparatoria bilingüe del país o del extranjero, con un nivel de competencia lingüística y cultural que los distingue.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'La secundaria de campus Milenio ofrece a las familias de El Mirador un programa integral que combina ciencias, tecnología, humanidades y arte en espacios diseñados para el aprendizaje activo. Las canchas deportivas, laboratorios y aulas tecnológicas complementan la formación académica.\n\nEl acompañamiento personalizado incluye tutoría académica, orientación socioemocional y comunicación constante con las familias, asegurando que cada adolescente reciba el apoyo que necesita en esta etapa crucial de su desarrollo.',
      },
    ],
    faqs: [
      {
        question: '¿La secundaria cercana a El Mirador tiene actividades deportivas?',
        answer:
          'Sí. La secundaria de campus Milenio cuenta con programa deportivo que incluye fútbol, básquetbol, voleibol y atletismo, con participación en torneos interescolares y entrenamiento con profesionales.',
      },
      {
        question: '¿Hay transporte escolar desde El Mirador al campus Milenio?',
        answer:
          'Contamos con rutas de transporte escolar que cubren El Mirador y colonias aledañas, con unidades seguras y servicio puerta a puerta para la comodidad de las familias.',
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
      'Queretaro has become a top destination for international families seeking quality bilingual education. Newland School offers a Pre Kinder program that combines early stimulation, bilingual immersion, and Philosophy for Children in a warm and safe environment designed for the youngest learners.',
    sections: [
      {
        heading: 'Philosophy for Children',
        body: 'At Newland School\'s Pre Kinder, Philosophy for Children is introduced through sensory activities, interactive storytelling, and guided exploration. Even the youngest students begin developing their sense of wonder, curiosity, and ability to express their thoughts.\n\nThese early philosophical experiences build a strong foundation for critical thinking, helping children develop skills that will accompany them throughout their entire educational journey.',
      },
      {
        heading: 'International Programs',
        body: 'Our bilingual Pre Kinder program immerses children in both English and Spanish from their earliest school experience. Through songs, games, routines, and sensory activities in both languages, toddlers develop a natural familiarity with English.\n\nThis early exposure takes advantage of the extraordinary capacity of young children to absorb linguistic patterns, laying the groundwork for authentic and functional bilingualism in later years.',
      },
      {
        heading: 'Educational Model',
        body: 'The Pre Kinder program at Newland School focuses on comprehensive early stimulation: sensory development, gross and fine motor skills, language acquisition, socialization, and autonomy. The spaces are specifically designed for babies and toddlers with safe and stimulating materials.\n\nOur specialized early childhood team works with small groups, allowing individualized attention that respects each child\'s rhythm while communicating daily progress to families.',
      },
    ],
    faqs: [
      {
        question: 'What age does Newland School\'s Pre Kinder accept children?',
        answer:
          'Our Pre Kinder program accepts children from 1.5 years of age. The program is designed to support each stage of early development with age-appropriate activities and personalized attention.',
      },
      {
        question: 'Is the Pre Kinder program fully bilingual?',
        answer:
          'Yes. From the very first day, children are exposed to both English and Spanish through daily activities, songs, and play, taking advantage of the brain\'s plasticity during early childhood.',
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
      'For international families in Queretaro, finding a bilingual kindergarten that offers both academic excellence and a nurturing environment is essential. Newland School provides a kindergarten program where children learn through play, philosophy, and bilingual immersion in a safe and stimulating setting.',
    sections: [
      {
        heading: 'Philosophy for Children',
        body: 'Newland School\'s kindergarten integrates Philosophy for Children as a core pedagogical tool. Through play, storytelling, and dialogue, children learn to ask questions, listen to others, and express their ideas with clarity and confidence.\n\nThis methodology develops cognitive and social skills that make a significant difference in academic performance during elementary school and beyond, fostering independent thinkers from early childhood.',
      },
      {
        heading: 'International Programs',
        body: 'Our bilingual kindergarten program immerses children in English naturally and playfully. Daily routines, songs, stories, and activities in both languages take advantage of early childhood brain plasticity to build solid linguistic competencies.\n\nThe international standards of our program ensure that children are prepared to continue their bilingual education in elementary school with a strong foundation in comprehension and expression in both languages.',
      },
      {
        heading: 'Educational Model',
        body: 'The kindergarten educational model at Newland School combines early stimulation, STEAM activities, artistic expression, psychomotor development, and social-emotional learning in a safe and stimulating environment designed specifically for young children.\n\nSpecialized teachers work with small groups and maintain constant communication with families, ensuring that each child\'s development is supported in a comprehensive and personalized manner.',
      },
    ],
    faqs: [
      {
        question: 'What teaching methods does the kindergarten use?',
        answer:
          'Our kindergarten uses play-based learning, Philosophy for Children, STEAM programming, bilingual immersion, and social-emotional development, all integrated into a model that respects each child\'s learning pace.',
      },
      {
        question: 'Which campuses offer kindergarten in Queretaro?',
        answer:
          'Newland School offers kindergarten at our Juriquilla, Zibata, Corregidora, and Milenio campuses, all with the same bilingual program and educational model of excellence.',
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
      'Queretaro\'s growing international community needs elementary schools that deliver bilingual education at the highest level. Newland School offers a private bilingual elementary program where academic rigor meets character development, critical thinking, and global preparation.',
    sections: [
      {
        heading: 'Philosophy for Children',
        body: 'Newland School\'s bilingual elementary program stands out for its Philosophy for Children curriculum, which develops critical thinking, argumentation, and dialogue skills from the earliest grades. Students learn to analyze, question, and propose ideas in an atmosphere of intellectual respect.\n\nPhilosophical inquiry communities transform every class into an opportunity for deep thinking, producing students who excel in reading comprehension, writing, and problem-solving.',
      },
      {
        heading: 'International Programs',
        body: 'In our bilingual elementary school, students strengthen their English proficiency through an immersion program that covers science, mathematics, art, and literature. Cambridge certifications validate their linguistic competence against international standards.\n\nCultural exchange programs and international interschool activities broaden students\' perspectives, preparing them to be global citizens with intercultural sensitivity and awareness.',
      },
      {
        heading: 'Educational Model',
        body: 'Newland School\'s elementary program integrates STEAM education, artistic development, competitive sports, and social-emotional support in a model that addresses every dimension of child development. Laboratories, libraries, and sports facilities complement classroom instruction.\n\nEach student receives personalized monitoring through evidence portfolios, formative assessments, and family meetings, ensuring that academic and personal progress is constant and visible.',
      },
    ],
    faqs: [
      {
        question: 'What international certifications does the elementary school offer?',
        answer:
          'Students at our bilingual elementary school take Cambridge assessments that certify their English level, along with standardized evaluations that measure overall academic performance.',
      },
      {
        question: 'Does the elementary school include a STEAM program?',
        answer:
          'Yes. Our STEAM program integrates science, technology, engineering, art, and mathematics in interdisciplinary projects that develop creativity, logical thinking, and problem-solving skills.',
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
      'The junior high years are a critical time of growth, identity formation, and academic challenge. Newland School offers a bilingual junior high school in Queretaro where teenagers develop critical thinking, leadership skills, and global awareness in a supportive and challenging environment.',
    sections: [
      {
        heading: 'Philosophy for Children',
        body: 'At Newland School\'s junior high, Philosophy for Children reaches a deeper level through debates, philosophical essays, and research projects that challenge teenagers to think with rigor and originality. Students become autonomous thinkers and critical citizens.\n\nThis philosophical formation is especially valuable during adolescence, a stage where the capacity for reflection, dialogue, and informed decision-making makes all the difference in personal development.',
      },
      {
        heading: 'International Programs',
        body: 'Our bilingual junior high prepares students with intermediate-advanced Cambridge certifications and participation in exchange programs with schools in other countries. English proficiency is applied across all subjects and academic projects.\n\nThis international preparation ensures that junior high graduates are ready to continue their education at top-tier high schools, with the linguistic and cultural competencies that today\'s world demands.',
      },
      {
        heading: 'Educational Model',
        body: 'The junior high educational model integrates sciences, humanities, technology, art, and sports in a program that recognizes the diversity of talents and learning styles among teenagers. Laboratories, workshops, and sports facilities provide experiential learning environments.\n\nSocial-emotional support includes career guidance, life skills workshops, risk prevention, and family communication, creating a comprehensive support network for each student during these formative years.',
      },
    ],
    faqs: [
      {
        question: 'Does the junior high school offer career guidance?',
        answer:
          'Yes. From the second year of junior high, students participate in a career guidance program that includes aptitude assessments, university visits, and self-awareness workshops.',
      },
      {
        question: 'What English level do students achieve by the end of junior high?',
        answer:
          'Graduates of Newland School\'s bilingual junior high achieve a B2 level certified by Cambridge, enabling them to communicate fluently and participate in English-language academic programs.',
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
      'Queretaro continues to attract international families seeking world-class bilingual education. Newland School stands as one of the most comprehensive private bilingual schools in the region, with 5 campuses and an educational model that shapes globally-minded, critical-thinking, and socially committed students.',
    sections: [
      {
        heading: 'Philosophy for Children',
        body: 'Newland School is a pioneer in implementing Philosophy for Children in Queretaro. From preschool through high school, students participate in philosophical inquiry communities that develop critical thinking, argumentative capacity, and ethical sensitivity.\n\nThis distinctive program transforms the educational experience, shaping students who not only accumulate knowledge but learn to question, analyze, and apply it in creative and responsible ways.',
      },
      {
        heading: 'International Programs',
        body: 'As a bilingual school, Newland School guarantees English proficiency through an immersion program that begins in the earliest years. Cambridge certifications, exchange programs, and partnerships with international institutions complement the global education.\n\nStudents are prepared to compete in a globalized world with linguistic, cultural, and academic tools that open doors to prestigious national and international universities.',
      },
      {
        heading: 'Educational Model',
        body: 'Newland School\'s educational model integrates academic rigor, social-emotional development, art, sports, and technology in a program designed for each stage of development. All 5 campuses feature first-class facilities and specialized teaching teams.\n\nPersonalized attention, small group sizes, and close communication with families ensure that each student receives the support needed to reach their full potential and develop a genuine love for learning.',
      },
    ],
    faqs: [
      {
        question: 'How many campuses does Newland School have?',
        answer:
          'Newland School has 5 campuses: Juriquilla, Zibata, Corregidora, Milenio, and San Miguel de Allende, each with complete facilities and the same educational model of excellence.',
      },
      {
        question: 'What grade levels does Newland School offer?',
        answer:
          'Newland School offers preschool, kindergarten, elementary, junior high, and high school, providing a continuous and coherent educational path within the same bilingual system.',
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
      'La preparatoria es la etapa donde los jóvenes definen su futuro académico y profesional. Newland School ofrece una preparatoria bilingüe en Querétaro que combina rigor académico, pensamiento crítico y experiencias internacionales para formar egresados preparados para las mejores universidades del país y del mundo.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'En la preparatoria de Newland School, la Filosofía para Niños evoluciona hacia seminarios de pensamiento filosófico y ética aplicada. Los estudiantes analizan dilemas contemporáneos, construyen ensayos argumentativos y participan en debates que fortalecen su capacidad de reflexión crítica.\n\nEsta formación filosófica prepara jóvenes que saben pensar con profundidad, comunicar sus ideas con claridad y tomar decisiones informadas, habilidades fundamentales para el éxito universitario y profesional.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La preparatoria bilingüe de Newland School ofrece certificaciones de Cambridge avanzadas, programas de intercambio internacional y alianzas con universidades de prestigio. Los alumnos alcanzan un nivel de inglés que les permite cursar materias universitarias en ambos idiomas.\n\nAdemás, los estudiantes participan en ferias universitarias internacionales, programas de liderazgo y proyectos comunitarios que amplían su visión del mundo y fortalecen su perfil de ingreso universitario.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la preparatoria integra ciencias, humanidades, tecnología y emprendimiento en un programa que prepara a los jóvenes para los retos del siglo XXI. Los laboratorios, estudios de producción y espacios de innovación complementan la formación académica.\n\nLa orientación vocacional personalizada, las prácticas profesionales y las alianzas con universidades aseguran que cada egresado cuente con las herramientas necesarias para ingresar a la carrera y universidad de su elección.',
      },
    ],
    faqs: [
      {
        question: '¿Qué universidades aceptan egresados de la preparatoria NWL?',
        answer:
          'Los egresados de la preparatoria de Newland School son aceptados en universidades de prestigio como el Tec de Monterrey, UNAM, Ibero, UP, UDLAP y universidades en el extranjero gracias a su formación bilingüe y perfil académico destacado.',
      },
      {
        question: '¿La preparatoria bilingüe tiene programa de emprendimiento?',
        answer:
          'Sí. La preparatoria incluye un programa de emprendimiento e innovación donde los estudiantes desarrollan proyectos reales con mentoría de profesionales, preparándolos para el mundo laboral y empresarial.',
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
      'San Miguel de Allende es una ciudad cosmopolita con una comunidad internacional que demanda opciones educativas de alto nivel. Newland School campus San Miguel ofrece una preparatoria bilingüe donde los jóvenes reciben una formación de excelencia en un entorno culturalmente rico y estimulante.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La preparatoria de Newland School en San Miguel de Allende incorpora la Filosofía para Niños como eje del desarrollo intelectual. Los estudiantes participan en seminarios filosóficos, debates éticos y proyectos de investigación que los desafían a pensar con rigor y creatividad.\n\nEn una ciudad con tanta riqueza cultural como San Miguel de Allende, la formación filosófica adquiere una dimensión especial, conectando el pensamiento crítico con el patrimonio artístico e histórico del entorno.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La preparatoria bilingüe en San Miguel de Allende prepara a los alumnos con certificaciones internacionales de Cambridge y programas de intercambio que aprovechan la naturaleza cosmopolita de la ciudad. Los estudiantes interactúan con una comunidad multicultural que enriquece su formación.\n\nEsta exposición internacional natural, combinada con el programa académico bilingüe, produce egresados con un perfil global excepcional, listos para universidades nacionales e internacionales de prestigio.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la preparatoria en San Miguel integra ciencias, humanidades, arte y tecnología en un programa que capitaliza la riqueza cultural de la ciudad. Los espacios de aprendizaje, los laboratorios y las áreas creativas están diseñados para inspirar innovación y compromiso social.\n\nLa orientación vocacional, las alianzas con universidades y los proyectos comunitarios complementan una formación que busca formar líderes con sensibilidad social y preparación académica de primer nivel.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en San Miguel de Allende acepta alumnos internacionales?',
        answer:
          'Sí. Newland School campus San Miguel recibe alumnos de diversas nacionalidades y ofrece un programa bilingüe que facilita la integración de estudiantes internacionales con alto nivel académico.',
      },
      {
        question: '¿Qué actividades extracurriculares ofrece la prepa en San Miguel?',
        answer:
          'La preparatoria ofrece talleres de arte, música, fotografía, deportes, emprendimiento y servicio comunitario, aprovechando la riqueza cultural y artística de San Miguel de Allende.',
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
      'San Miguel de Allende\'s vibrant international community demands educational excellence that matches its cosmopolitan character. Newland School offers a bilingual high school where students receive a world-class education surrounded by the cultural richness that makes this UNESCO World Heritage city truly unique.',
    sections: [
      {
        heading: 'Philosophy for Children',
        body: 'Newland School\'s high school in San Miguel de Allende integrates Philosophy for Children as the cornerstone of intellectual development. Students engage in philosophical seminars, ethical debates, and research projects that challenge them to think with rigor and creativity.\n\nIn a city with such cultural richness as San Miguel de Allende, philosophical education takes on a special dimension, connecting critical thinking with the artistic and historical heritage of the surrounding environment.',
      },
      {
        heading: 'International Programs',
        body: 'The bilingual high school in San Miguel de Allende prepares students with Cambridge international certifications and exchange programs that leverage the city\'s cosmopolitan nature. Students interact with a multicultural community that enriches their educational experience.\n\nThis natural international exposure, combined with the bilingual academic program, produces graduates with an exceptional global profile, ready for prestigious national and international universities.',
      },
      {
        heading: 'Educational Model',
        body: 'The educational model integrates sciences, humanities, art, and technology in a program that capitalizes on San Miguel de Allende\'s cultural wealth. Learning spaces, laboratories, and creative areas are designed to inspire innovation and social commitment.\n\nCareer guidance, university partnerships, and community projects complement a program that aims to develop leaders with social awareness and first-rate academic preparation.',
      },
    ],
    faqs: [
      {
        question: 'Does the high school in San Miguel de Allende accept international students?',
        answer:
          'Yes. Newland School San Miguel campus welcomes students of diverse nationalities and offers a bilingual program that facilitates the integration of international students with high academic standards.',
      },
      {
        question: 'What extracurricular activities are available at the San Miguel high school?',
        answer:
          'The high school offers workshops in art, music, photography, sports, entrepreneurship, and community service, taking advantage of San Miguel de Allende\'s rich cultural and artistic heritage.',
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
      'El municipio de Corregidora se ha consolidado como una de las zonas de mayor crecimiento en el área metropolitana de Querétaro, con familias que buscan opciones educativas de calidad para la etapa preparatoria. Newland School campus Corregidora ofrece una preparatoria bilingüe de excelencia con un modelo que forma jóvenes líderes.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La preparatoria de Newland School en Corregidora aplica la Filosofía para Niños a través de seminarios de pensamiento crítico, debates éticos y análisis de dilemas contemporáneos. Los estudiantes desarrollan una capacidad argumentativa y reflexiva que los distingue en el ámbito académico.\n\nEsta formación filosófica transforma la manera en que los jóvenes se relacionan con el conocimiento y la sociedad, formando ciudadanos comprometidos con valores de justicia, respeto y responsabilidad.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La preparatoria bilingüe en Corregidora prepara a los alumnos con certificaciones de Cambridge de nivel avanzado y programas de intercambio que amplían su perspectiva cultural y académica. El dominio del inglés se convierte en una herramienta real para su futuro profesional.\n\nLas alianzas con universidades nacionales e internacionales facilitan el proceso de admisión de los egresados, quienes cuentan con un perfil competitivo y una visión global que los diferencia.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la preparatoria en Corregidora integra ciencias, tecnología, emprendimiento y humanidades en un programa diseñado para los retos del mundo actual. Los laboratorios, espacios de innovación y áreas deportivas complementan la formación en aula.\n\nLa orientación vocacional personalizada, las visitas a universidades y los proyectos de impacto social preparan a cada estudiante para tomar decisiones informadas sobre su futuro académico y profesional.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en Corregidora tiene convenios con universidades?',
        answer:
          'Sí. Newland School campus Corregidora tiene alianzas con universidades de prestigio que facilitan el proceso de admisión y ofrecen beneficios especiales a nuestros egresados.',
      },
      {
        question: '¿Qué perfil tienen los egresados de la prepa en Corregidora?',
        answer:
          'Nuestros egresados son jóvenes bilingües con pensamiento crítico, habilidades de liderazgo, certificaciones internacionales y un perfil académico que les abre las puertas de las mejores universidades.',
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
  // PAGE 44 — Preparatoria en Juriquilla
  // =========================================================================
  'preparatoria-bilingue-privada-en-juriquilla-queretaro': {
    slug: 'preparatoria-bilingue-privada-en-juriquilla-queretaro',
    lang: 'es',
    title: 'Preparatoria bilingüe privada en Juriquilla Queretaro | Newland School',
    h1: 'NWL ahora ofrece preparatoria en Juriquilla',
    description:
      'Preparatoria bilingüe privada en Juriquilla Querétaro con Filosofía para Niños, certificaciones internacionales y formación integral. Newland School campus Juriquilla.',
    uniqueIntro:
      'Juriquilla es sinónimo de calidad de vida, innovación y desarrollo en Querétaro. Newland School campus Juriquilla ahora ofrece preparatoria bilingüe, completando su oferta educativa para que los jóvenes de la zona norte continúen su formación de excelencia sin salir de su comunidad.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La preparatoria de Newland School en Juriquilla continúa el programa de Filosofía para Niños que los alumnos han vivido desde sus primeros años. Los seminarios filosóficos, los debates y los proyectos de investigación desafían a los jóvenes a pensar con profundidad y creatividad.\n\nEsta continuidad filosófica produce egresados con una madurez intelectual notable, capaces de analizar problemas complejos, comunicar ideas con claridad y actuar con responsabilidad ética.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La preparatoria bilingüe en Juriquilla ofrece certificaciones de Cambridge avanzadas, programas de intercambio y alianzas con universidades internacionales. Los alumnos dominan el inglés como herramienta de comunicación académica y profesional.\n\nLa cercanía de Juriquilla a centros de investigación y universidades de prestigio enriquece la experiencia educativa con visitas, conferencias y vinculación directa con el mundo académico y profesional.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la preparatoria en Juriquilla integra ciencias, tecnología, emprendimiento, arte y deporte en un programa que aprovecha las instalaciones de primer nivel del campus. Los laboratorios de ciencias, las salas de cómputo y los espacios creativos fomentan la innovación.\n\nLa orientación vocacional, las prácticas profesionales y los proyectos de servicio social preparan a los estudiantes para una transición exitosa a la universidad, con claridad sobre sus metas y las herramientas para alcanzarlas.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en Juriquilla es nueva?',
        answer:
          'Newland School campus Juriquilla ha ampliado su oferta educativa para incluir preparatoria bilingüe, manteniendo el mismo modelo de excelencia que lo ha distinguido en los demás niveles.',
      },
      {
        question: '¿Qué diferencia a la preparatoria de Juriquilla de otras opciones?',
        answer:
          'La preparatoria de NWL Juriquilla ofrece Filosofía para Niños, programa 100% bilingüe, certificaciones Cambridge, grupos reducidos y un enfoque en emprendimiento e innovación que prepara líderes del futuro.',
      },
    ],
    images: {
      hero: '/images/campus/juriquilla/juriquilla-hero.jpg',
      content: [
        '/images/levels/prepa/prepa-nwl-modern-classroom.jpg',
        '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg',
      ],
    },
    targetCampus: 'juriquilla',
    targetLevel: '/high-school',
    category: 'campus',
    keywords: [
      'preparatoria juriquilla queretaro',
      'prepa bilingüe juriquilla',
      'preparatoria privada juriquilla',
      'high school juriquilla queretaro',
    ],
  },

  // =========================================================================
  // PAGE 45 — Preparatoria en Zibatá
  // =========================================================================
  'preparatoria-bilingue-privada-en-zibata-queretaro': {
    slug: 'preparatoria-bilingue-privada-en-zibata-queretaro',
    lang: 'es',
    title: 'Preparatoria bilingüe privada en Zibatá Queretaro | Newland School',
    h1: 'NWL, Preparatoria en Zibatá para una educación integral',
    description:
      'Preparatoria bilingüe privada en Zibatá Querétaro con Filosofía para Niños, programas internacionales y formación integral. Newland School campus Zibatá.',
    uniqueIntro:
      'Zibatá es una comunidad residencial moderna que ofrece un estilo de vida familiar con acceso a servicios de primer nivel. Newland School campus Zibatá complementa esta experiencia con una preparatoria bilingüe que forma jóvenes con visión global, pensamiento crítico y compromiso social.',
    sections: [
      {
        heading: 'Filosofía para Niños',
        body: 'La preparatoria de Newland School en Zibatá hace de la Filosofía para Niños el eje de su propuesta formativa. Los estudiantes participan en seminarios de pensamiento crítico, debates sobre dilemas éticos y proyectos de reflexión filosófica que los preparan para la vida universitaria y profesional.\n\nEsta formación desarrolla jóvenes que no solo dominan contenidos académicos, sino que saben pensar, cuestionar y proponer soluciones innovadoras a los problemas de su entorno.',
      },
      {
        heading: 'Programas Internacionales',
        body: 'La preparatoria bilingüe en Zibatá prepara a los alumnos con certificaciones internacionales de Cambridge y oportunidades de intercambio que enriquecen su perfil académico y cultural. El inglés se vive como herramienta de comunicación real en todos los ámbitos.\n\nLos egresados cuentan con un nivel de competencia lingüística que les permite acceder a programas universitarios en inglés, tanto en México como en el extranjero, ampliando significativamente sus opciones de futuro.',
      },
      {
        heading: 'Modelo Educativo',
        body: 'El modelo educativo de la preparatoria en Zibatá combina rigor académico, innovación tecnológica, emprendimiento y formación socioemocional en un programa diseñado para las demandas del siglo XXI. Las instalaciones modernas del campus ofrecen espacios ideales para el aprendizaje integral.\n\nLa orientación vocacional personalizada, los proyectos de impacto social y las alianzas con universidades aseguran que cada egresado esté preparado para tomar decisiones informadas sobre su futuro y liderar con responsabilidad.',
      },
    ],
    faqs: [
      {
        question: '¿La preparatoria en Zibatá ofrece actividades deportivas?',
        answer:
          'Sí. La preparatoria cuenta con programa deportivo completo que incluye fútbol, básquetbol, voleibol y atletismo, con instalaciones modernas y participación en torneos interescolares.',
      },
      {
        question: '¿Qué ventajas tiene estudiar la prepa en Zibatá?',
        answer:
          'Los alumnos de la prepa en Zibatá disfrutan de un campus moderno, programa bilingüe, Filosofía para Niños, grupos reducidos, orientación vocacional y una comunidad escolar comprometida con su desarrollo integral.',
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
