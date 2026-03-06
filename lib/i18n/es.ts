import type { Dictionary } from './types';

export const es: Dictionary = {
  nav: {
    links: [
      { name: 'Inicio', href: '#home' },
      { name: 'Conócenos', href: '#about' },
      {
        name: 'Oferta Académica',
        href: '#levels',
        children: [
          { name: 'Maternal', href: '/maternal' },
          { name: 'Kinder', href: '/kinder' },
          { name: 'Primaria', href: '/elementary' },
          { name: 'Secundaria', href: '/secundaria' },
          { name: 'Preparatoria', href: '/preparatoria' },
        ],
      },
      {
        name: 'Campus',
        href: '#campus',
        children: [
          { name: 'Juriquilla', href: '/campus/juriquilla' },
          { name: 'Milenio', href: '/campus/milenio' },
          { name: 'San Miguel de Allende', href: '/campus/san-miguel' },
          { name: 'Corregidora', href: '/campus/corregidora' },
          { name: 'Zibatá', href: '/campus/zibata' },
        ],
      },
      { name: 'Admisiones', href: '#admissions', highlight: true },
      { name: 'Contacto', href: '#contact' },
    ],
    scheduleVisit: 'Agenda tu Visita',
    whatsappUs: 'Escríbenos',
    whatsappAriaLabel: 'Chatea por WhatsApp',
  },
  hero: {
    headlineLeft: ['Desarrollamos', 'la', 'grandeza'],
    headlineRight: ['que', 'hay', 'en', 'cada', 'niño.'],
    subheadline:
      'Impulsamos el desarrollo académico, emocional y social de nuestros alumnos en un ambiente cercano y de confianza.',
    ctaPrimary: 'Comienza Aquí',
    ctaSecondary: 'Modelo Educativo',
    trustIndicators: ['5 Campus', 'Maternal a Preparatoria', 'Educación Bilingüe'],
  },
  beSection: {
    be: 'Be',
    words: ['Curious', 'Kind', 'Mindful', 'Resilient', 'Creative', 'Global', 'Proud', 'NWL'],
  },
  kangarooSpirit: {
    titleBefore: 'Nuestro',
    titleAccent: 'Espíritu',
    description:
      'El canguro representa el espíritu NWL: fortaleza, impulso hacia adelante y llevar a quienes cuidamos cerca del corazón. Siempre saltando hacia nuevos horizontes.',
    traits: ['Fortaleza', 'Cuidado', 'Progreso'],
  },
  benefits: {
    sectionTitle: '¿Por qué elegir',
    sectionTitleAccent: 'NWL?',
    sectionSubtitle: 'Un enfoque integral que acompaña el desarrollo completo de tu hijo',
    items: [
      {
        title: 'Desarrollo Emocional',
        description:
          'Formamos alumnos seguros y resilientes en un ambiente de confianza y acompañamiento.',
      },
      {
        title: 'Excelencia Académica',
        description:
          'Currículo bilingüe riguroso que prepara a nuestros alumnos para un mundo globalizado.',
      },
      {
        title: 'Comunidad Cercana',
        description:
          'Sé parte de la familia NWL, una comunidad donde cada alumno es conocido, valorado y acompañado.',
      },
      {
        title: 'Visión Global',
        description:
          'Formamos ciudadanos del mundo con pensamiento crítico y sensibilidad cultural.',
      },
    ],
    cta: 'Conoce Nuestro Enfoque',
  },
  philosophy: {
    sectionTitle: 'El Modelo',
    sectionTitleAccent: 'NWL',
    sectionTitleEnd: '',
    sectionDescription:
      'Nuestro modelo educativo integra tres metodologías comprobadas que desarrollan al alumno de forma integral: pensamiento crítico, liderazgo emocional y resolución de problemas reales.',
    pillars: [
      {
        title: 'Filosofía para Niños NWL (FpN)',
        subtitle: 'Pensamiento crítico en cada etapa',
        description:
          'A través del diálogo y el respeto despertamos el interés por el conocimiento. Fomentamos la confianza para indagar y buscar respuestas, respetando opiniones y generando diálogo en todo momento.',
      },
      {
        title: 'Yo Soy Líder NWL by Tec de Monterrey (YsL)',
        subtitle: 'Único en México, exclusivo de Colegio Newland',
        description:
          'Desarrollamos capacidades para trabajar en equipo. A través de una sana convivencia buscamos acuerdos para solucionar problemas. Programa diseñado y avalado exclusivamente para Colegio Newland S.C. por el Tec de Monterrey.',
      },
      {
        title: 'Knotion - Metodología Internacional',
        subtitle: 'Retos reales, aprendizaje real',
        description:
          'Fomentamos el uso de Tecnologías Digitales Educativas (TDEs). El aprendizaje combina conocimientos de diversas áreas y da respuesta a desafíos de la vida diaria con impacto social.',
      },
    ],
    cta: 'Descargar Modelo Completo (PDF)',
  },
  levels: {
    sectionTitle: 'Programas',
    sectionTitleAccent: 'Educativos',
    sectionSubtitle:
      'Desde la primera infancia hasta preparatoria, acompañamos el camino educativo completo de tu hijo',
    items: [
      {
        name: 'Maternal',
        ageRange: '2-3 años',
        description: 'Desarrollo temprano en un ambiente cálido basado en el juego y la exploración.',
        campuses: ['Los 5 Campus'],
        href: '/maternal',
      },
      {
        name: 'Kínder',
        ageRange: '4-5 años',
        description: 'Construyendo las bases a través de la exploración y el descubrimiento.',
        campuses: ['Los 5 Campus'],
        href: '/kinder',
      },
      {
        name: 'Primaria',
        ageRange: '6-11 años',
        description: 'Formación académica sólida y desarrollo del pensamiento crítico.',
        campuses: ['Los 5 Campus'],
        href: '/elementary',
      },
      {
        name: 'Secundaria',
        ageRange: '12-14 años',
        description: 'Fomentamos la independencia, el liderazgo y el autoconocimiento.',
        campuses: ['Los 5 Campus'],
        href: '/secundaria',
      },
      {
        name: 'Preparatoria',
        ageRange: '15-17 años',
        description: 'Preparación universitaria con perspectiva global y orientación vocacional.',
        campuses: ['Corregidora', 'Zibatá', 'San Miguel'],
        href: '/preparatoria',
      },
    ],
    availableAt: 'Disponible en:',
    learnMore: 'Conocer Más →',
    cta: 'Solicita Información',
  },
  campus: {
    sectionTitleLine1: 'Encuentra tu',
    sectionTitleLine2: 'Campus Perfecto!',
    sectionSubtitle: '5 ubicaciones increíbles · Infinitas posibilidades',
    items: [
      {
        levels: 'Maternal a Secundaria',
        description: 'Nuestro campus insignia con tradición de excelencia.',
        href: '/campus/juriquilla',
      },
      {
        levels: 'Maternal a Secundaria',
        description: 'Un espacio seguro y acogedor con excelentes instalaciones para crecer.',
        href: '/campus/milenio',
      },
      {
        levels: 'Maternal a Preparatoria',
        description: 'Donde la riqueza cultural se encuentra con la excelencia académica.',
        href: '/campus/san-miguel',
      },
      {
        levels: 'Maternal a Preparatoria',
        description: 'Un campus cálido y comunitario en el corazón de Corregidora.',
        href: '/campus/corregidora',
      },
      {
        levels: 'Maternal a Preparatoria',
        description: 'Instalaciones modernas en una comunidad en crecimiento.',
        href: '/campus/zibata',
      },
    ],
    exploreCta: 'Explorar Campus →',
    contactCard: {
      title: '¿Necesitas Ayuda?',
      description: '¡Encontremos juntos el campus perfecto para tu familia!',
      whatsappCta: 'Chatea por WhatsApp',
    },
  },
  testimonials: {
    sectionTitle: 'Lo que dicen',
    sectionTitleAccent: 'las Familias',
    sectionSubtitle: 'Conoce la experiencia de quienes ya eligieron NWL para la educación de sus hijos',
    items: [
      {
        quote:
          'Newland ha sido transformador para nuestra hija. Los maestros genuinamente se preocupan por su crecimiento, no solo académico sino también emocional.',
        role: 'Mamá - Kínder, Juriquilla',
      },
      {
        quote:
          'El programa bilingüe es excelente. Mi hijo cambió de otra escuela y su inglés mejoró muchísimo en solo un año.',
        role: 'Papá - Primaria, Zibatá',
      },
      {
        quote:
          'Lo que más nos impresionó fue el sentido de comunidad. Padres, maestros y alumnos se sienten como una gran familia.',
        role: 'Mamá - Secundaria, SMA',
      },
    ],
    stats: [
      { value: '+2,500', label: 'Familias Felices' },
      { value: '+16', label: 'Años de Excelencia' },
      { value: '90%', label: 'Tasa de Reinscripción' },
      { value: '5', label: 'Campus' },
    ],
  },
  finalCta: {
    title: 'Comienza tu',
    titleAccent: 'Experiencia NWL',
    subtitle:
      'Únete a una comunidad donde tu hijo crece académica, emocional y socialmente.',
    // TODO: Replace with actual Spanish GHL form ID
    formId: 'mEu0WdVekHsj57MYz8DE',
    formName: 'Formulario para pag web - ES',
    formTitle: 'Agenda tu Visita - NWL',
    campusVisitTitle: 'Agenda tu Visita',
    campusVisitDesc:
      'Conoce nuestras instalaciones y a nuestro equipo docente. Personalizamos la visita según la edad de tu hijo.',
    requestInfoTitle: 'Solicita Información',
    requestInfoDesc:
      'Recibe detalles sobre programas, costos y proceso de admisión. Sin compromiso, solo la información que necesitas.',
    whatsappTitle: 'Escríbenos',
    whatsappDesc:
      '¿Tienes preguntas? Envíanos un mensaje por WhatsApp y te respondemos de inmediato.',
  },
  footer: {
    brandDescription:
      'En NWL despertamos la grandeza de cada alumno a través de excelencia académica, desarrollo emocional y conexión con la comunidad.',
    schoolHeading: 'Nuestra Escuela',
    schoolLinks: [
      { name: 'Conócenos', href: '#about' },
      { name: 'Nuestro Modelo', href: '#philosophy' },
      { name: 'Nuestros Campus', href: '#campus' },
      { name: 'Equipo', href: '#team' },
    ],
    programsHeading: 'Programas',
    programLinks: [
      { name: 'Maternal', href: '#levels' },
      { name: 'Kínder', href: '#levels' },
      { name: 'Primaria', href: '#levels' },
      { name: 'Secundaria', href: '#levels' },
      { name: 'Preparatoria', href: '#levels' },
    ],
    contactHeading: 'Contacto',
    campusesLine1: '5 Campus en',
    campusesLine2: 'Querétaro y Guanajuato',
    copyright: '© 2026 Colegio NWL. Todos los derechos reservados.',
    privacyPolicy: 'Aviso de Privacidad',
    termsOfService: 'Términos y Condiciones',
    scheduleVisitFixed: 'Inscríbete',
  },
  brochure: {
    selectLevel: 'Selecciona un nivel',
    modalSubtitle: 'Modelo Educativo',
    downloadPdf: 'Descargar PDF',
    closeAriaLabel: 'Cerrar folleto',
    levels: {
      maternalKinder: 'Maternal y Kínder',
      primaria: 'Primaria',
      secundaria: 'Secundaria',
      preparatoria: 'Preparatoria',
    },
  },
  maternal: {
    ageBadge: '2-3 años',
    tagline: 'Pequeños Pasos, Grandes Sueños',
    subtitle: 'Los primeros pasos de tu hijo en un entorno de inmersión en inglés',
    description:
      'En el Colegio NWL tenemos la mejor opción para iniciar con la formación de tu hijo desde los dos años. Dedicamos especial cuidado y atención en su seguridad y desarrollo integral a través de la lúdica y nuestro programa bilingüe "Brain Up".',
    statBilingual: 'Inmersión en Inglés',
    statCampuses: 'Campus',
    schedule: '8:20–1:30',
    statSchedule: 'Horario',
    uniqueBadge: 'Único en Qro y San Miguel',
    featuresTitle: 'Lo Que Hace Único a Maternal NWL',
    features: [
      {
        title: 'Brain Up: Inglés desde los 2 Años',
        description:
          'Inmersión temprana en inglés que desarrolla fluidez real. El inglés es parte de su aprendizaje diario desde el primer día.',
      },
      {
        title: 'Estimulación Multisensorial',
        description:
          'Salas especializadas que potencializan el desarrollo neurológico en la etapa más crítica. El ÚNICO programa escolar de su tipo en Querétaro.',
      },
      {
        title: 'Filosofía para Niños (FpN)',
        description:
          'Enseñamos a los niños a pensar, no qué pensar. Desarrollo del pensamiento crítico adaptado para los más pequeños a través del diálogo.',
      },
      {
        title: 'Programa de Desapego Seguro',
        description:
          'Transición gradual con padres presentes los primeros días, facilitando la adaptación emocional de tu hijo con apoyo profesional.',
      },
      {
        title: 'Yo Soy Líder NWL by Tec de Monterrey',
        description:
          'Desarrollo socioemocional, trabajo en equipo e inteligencia emocional desde sus primeros pasos. Exclusivo de NWL, avalado por el Tec de Monterrey.',
      },
    ],
    testimonial:
      'Me siento tranquila al dejarla. Las maestras la reciben por su nombre cada mañana y ya no llora. Eso lo es todo.',
    testimonialAuthor: 'Mamá NWL, Maternal',
    cta: 'Agenda tu Visita',
    ctaSecondary: 'Descargar Folleto',
  },
  maternalPage: {
    heroHeadline: 'Donde Cada Primer Paso Importa',
    heroSubheadline:
      'NWL Maternal es el único programa de educación temprana en Querétaro que combina inmersión 100% en inglés, aprendizaje basado en neurociencia, y la calidez que tu hijo merece, desde los 2 años.',
    backToHome: 'Volver al Inicio',
    dayTitle: 'Un Día en',
    dayTitleAccent: 'Maternal NWL',
    daySubtitle: 'Cada día está diseñado para estimular el crecimiento a través del juego, la exploración y la conexión.',
    daySchedule: [
      { time: '8:20', activity: 'Bienvenida cálida y juego libre', icon: 'sun' },
      { time: '9:00', activity: 'Brain Up: Círculo de inglés', icon: 'globe' },
      { time: '9:45', activity: 'Sala de estimulación multisensorial', icon: 'star' },
      { time: '10:30', activity: 'Snack saludable y juego al aire libre', icon: 'heart' },
      { time: '11:15', activity: 'P4C diálogo guiado y creatividad', icon: 'book' },
      { time: '12:00', activity: 'Música, movimiento y expresión', icon: 'music' },
      { time: '12:45', activity: 'Hora del cuento y cierre en calma', icon: 'moon' },
      { time: '1:30', activity: 'Recogida y conexión con papás', icon: 'home' },
    ],
    philosophyTitle: 'Nuestro',
    philosophyTitleAccent: 'Enfoque',
    philosophyDescription:
      'Nuestro programa Maternal está construido sobre el entendimiento de que las edades de 2-3 años representan la ventana más crítica para el desarrollo cerebral. Cada actividad, espacio e interacción está diseñada intencionalmente.',
    philosophyPillars: [
      {
        title: 'Inmersión 100% en Inglés',
        description:
          'Desde el primer día, tu hijo está inmerso en inglés a través de nuestra metodología Brain Up. El bilingüismo natural sucede cuando más importa.',
      },
      {
        title: 'Aprendizaje Basado en Neurociencia',
        description:
          'Nuestras salas multisensoriales son las únicas de su tipo en Querétaro, diseñadas para maximizar las conexiones neuronales durante esta etapa crítica de desarrollo.',
      },
      {
        title: 'Seguridad Emocional Primero',
        description:
          'Nuestro programa de Desapego Seguro garantiza una transición suave con los padres presentes durante los primeros días. El bienestar emocional de tu hijo es nuestra prioridad.',
      },
      {
        title: 'Liderazgo desde el Inicio',
        description:
          'A través de "Soy Líder NWL" avalado por el Tec de Monterrey, desarrollamos habilidades socioemocionales, trabajo en equipo e inteligencia emocional desde sus primeros pasos.',
      },
    ],
    galleryTitle: 'La Vida en',
    galleryTitleAccent: 'Maternal',
  },
  kinder: {
    ageBadge: '3–5 años',
    tagline: 'Mentes que Crecen, Futuros que se Construyen',
    description:
      'Creemos que cada niño tiene un potencial extraordinario. Nuestro programa de Kinder nutre la curiosidad a través de la inmersión en inglés, aprendizaje basado en proyectos y nuestro Programa Multisensorial único.',
    statBilingual: 'Inmersión en Inglés',
    statCampuses: 'Campus',
    schedule: '8:20–1:50',
    statSchedule: 'Horario',
    testimonial:
      'Empezó a preguntar "¿pero por qué?" sobre todo en casa. Al principio pensé que era una fase, luego me di cuenta de que realmente está razonando las cosas.',
    testimonialAuthor: 'Papá NWL, Kinder',
    cta: 'Agenda tu Visita',
    ctaSecondary: 'Descargar Folleto',
  },
  kinderPage: {
    heroHeadline: 'Mentes que Crecen, Futuros que se Construyen',
    heroSubheadline:
      'Pensadores críticos que viven el inglés cada día. Aprendizaje basado en proyectos, sin tarea tradicional, y un enfoque multisensorial único en Querétaro.',
    backToHome: 'Volver al Inicio',
    overviewTitle: 'Descubre',
    overviewTitleAccent: 'Kinder NWL',
    pillarsTitle: 'El Modelo',
    pillarsTitleAccent: 'NWL',
    pillarsSubtitle: 'Tres pilares que definen cómo educamos desde el inicio.',
    pillars: [
      {
        title: 'Knotion',
        subtitle: 'Metodología Internacional',
        description:
          'Aprendizaje basado en proyectos desde Kinder. Retos reales que desarrollan pensamiento creativo y resolución de problemas. Sin tarea tradicional.',
      },
      {
        title: 'Filosofía para Niños',
        subtitle: 'FpN',
        description:
          'Enseñamos cómo pensar, no qué pensar. Desde Kinder, aprenden a cuestionar, dialogar y formar su propio criterio.',
      },
      {
        title: 'Yo Soy Líder NWL',
        subtitle: 'by Tec de Monterrey',
        description:
          'Habilidades blandas, trabajo en equipo e inteligencia emocional desde temprana edad. Programa avalado por el Tec de Monterrey, exclusivo de NWL.',
      },
    ],
    galleryTitle: 'La Vida en',
    galleryTitleAccent: 'Kinder',
    dayTitle: 'Un Día en',
    dayTitleAccent: 'Kinder NWL',
    daySchedule: [
      { time: '8:20', activity: 'Llegada y Círculo de Indagación', icon: 'compass' },
      { time: '9:00', activity: 'Laboratorio Knotion: investigación con las manos', icon: 'lightbulb' },
      { time: '9:50', activity: 'Inmersión en Inglés: lectura, escritura y conversación', icon: 'globe' },
      { time: '10:40', activity: 'Colación saludable y exploración al aire libre', icon: 'sun' },
      { time: '11:15', activity: 'P4C: diálogo filosófico y pensamiento crítico', icon: 'brain' },
      { time: '12:00', activity: 'Taller STEAM: ciencia, arte y tecnología', icon: 'rocket' },
      { time: '12:45', activity: 'Actividades de liderazgo y colaboración', icon: 'users' },
      { time: '1:30', activity: 'Círculo de reflexión y salida', icon: 'star' },
    ],
  },
  elementary: {
    ageBadge: '6–11 años',
    tagline: 'Construyendo el Futuro, Proyecto a Proyecto',
    description:
      'En Primaria, los alumnos se adueñan de su aprendizaje a través del modelo IMPACT, laboratorios STEAM maker y un programa de filosofía que les enseña cómo pensar — no qué pensar. Inmersión en inglés en todas las materias. Sin tarea tradicional.',
    statBilingual: 'Inmersión en Inglés',
    statCampuses: 'Campus',
    statNoHomework: 'Sin Tarea',
    schedule: '7:40–2:30',
    statSchedule: 'Horario',
    testimonial:
      'Antes no quería ir a la escuela. Ahora me cuenta de sus proyectos en la cena. Algo cambió, y estoy agradecida.',
    testimonialAuthor: 'Papá NWL, Primaria',
    cta: 'Agenda tu Visita',
    ctaSecondary: 'Descargar Folleto',
  },
  elementaryPage: {
    heroHeadline: 'Construyendo el Futuro, Proyecto a Proyecto',
    heroSubheadline:
      'Pensadores de diseño que resuelven retos reales, lideran con propósito y viven el inglés cada día. Laboratorios maker, sin tarea y certificación internacional.',
    backToHome: 'Volver al Inicio',
    overviewTitle: 'Descubre',
    overviewTitleAccent: 'Primaria NWL',
    pillarsTitle: 'El Modelo',
    pillarsTitleAccent: 'NWL',
    pillarsSubtitle: 'Tres pilares que definen cómo desarrollamos pensadores críticos y líderes.',
    pillars: [
      {
        title: 'Knotion / Modelo IMPACT',
        subtitle: 'Design Thinking en Acción',
        description:
          'Retos del mundo real a través de la metodología IMPACT. Los alumnos investigan, crean y presentan soluciones con impacto social. Sin tarea tradicional.',
      },
      {
        title: 'Filosofía para Niños',
        subtitle: 'FpN + Diploma para Padres',
        description:
          'Enseñamos cómo pensar, no qué pensar. Diálogo filosófico que construye razonamiento crítico, argumentación y empatía. Incluye Diploma para Padres.',
      },
      {
        title: 'Yo Soy Líder NWL',
        subtitle: 'by Tec de Monterrey',
        description:
          'Habilidades blandas, trabajo en equipo, inteligencia emocional y liderazgo. Programa avalado por el Tec de Monterrey, exclusivo de NWL.',
      },
    ],
    knotionTitle: 'Potenciado por',
    knotionTitleAccent: 'Knotion',
    knotionSubtitle: 'Un ecosistema de aprendizaje internacional que reemplaza la memorización con la resolución de problemas reales.',
    knotionPhases: [
      { name: 'Identifico', title: 'Conectar con el reto' },
      { name: 'Mapeo', title: 'Investigar y comprender' },
      { name: 'Prototipo', title: 'Diseñar una solución' },
      { name: 'Actúo', title: 'Implementar y compartir' },
    ],
    steamTitle: 'TecniKids',
    steamTitleAccent: 'Laboratorio STEAM',
    steamSubtitle: 'Donde las ideas se hacen realidad. Nuestros espacios maker ponen herramientas profesionales en manos de jóvenes innovadores.',
    steamFeatures: [
      {
        title: 'Impresión 3D',
        description: 'Los alumnos diseñan y fabrican prototipos, llevando ideas de la pantalla a la realidad.',
      },
      {
        title: 'Corte Láser',
        description: 'Fabricación de precisión que enseña principios de ingeniería a través de la creación práctica.',
      },
      {
        title: 'Robótica',
        description: 'Programar y construir robots que resuelven desafíos reales, desarrollando pensamiento computacional.',
      },
      {
        title: 'Espacios Maker',
        description: 'Talleres abiertos donde la creatividad se encuentra con herramientas, materiales y colaboración.',
      },
    ],
    differentiatorsSectionTitle: 'Lo Que Nos Distingue',
    differentiators: [
      {
        title: 'Viajes Internacionales',
        description: 'Desde 5to grado, los alumnos viven aprendizaje global a través de viajes educativos al extranjero.',
      },
      {
        title: 'Corazones Mágicos',
        description: 'Programa certificado de prevención que construye resiliencia emocional y cultura escolar segura.',
      },
      {
        title: 'Certificación Cognia',
        description: 'Certificación internacional de calidad presente en más de 88 países, validando nuestros estándares.',
      },
      {
        title: 'Escuela Libre de Bullying',
        description: 'Ambiente certificado libre de bullying con protocolos claros y cultura de respeto.',
      },
    ],
    activitiesTitle: 'Más Allá del',
    activitiesTitleAccent: 'Aula',
    activitiesSubtitle: 'Liderazgo, disciplina y trabajo en equipo a través del deporte, el arte y la expresión creativa.',
    activities: [
      'Fútbol',
      'Básquetbol',
      'Taekwondo',
      'Dance Team',
      'Arte',
      'Música',
      'Teatro',
      'Gladiators Race',
    ],
    activitiesFeatureTitle: 'Gladiators Race · Reto NWL',
    activitiesFeatureDescription:
      'Un reto de circuito de obstáculos que fortalece la confianza, disciplina y resiliencia física. Los alumnos superan sus límites en equipo.',
    activitiesNote: 'Las actividades varían por campus — pregunta por la oferta en tu sede preferida.',
    galleryTitle: 'La Vida en',
    galleryTitleAccent: 'Primaria',
    galleryComingSoon: 'Galería próximamente. Visita un campus para conocer nuestros espacios.',
  },
  campusDetail: {
    facilitiesTitle: 'Nuestras',
    facilitiesTitleAccent: 'Instalaciones',
    activitiesTitle: 'Más Allá del',
    activitiesTitleAccent: 'Aula',
    directorTitle: 'Mensaje de',
    directorTitleAccent: 'Nuestro Director',
    ctaTitle: '¿Listo para Visitar',
    ctaTitleAccent: 'Zibatá?',
    ctaSubtitle: 'Conoce nuestro campus y vive la experiencia NWL de primera mano.',
    ctaScheduleVisit: 'Agenda tu Visita',
    ctaWhatsapp: 'Escríbenos por WhatsApp',
    backToHome: '← Volver al Inicio',
    // Location Map
    locationTitle: 'Cómo',
    locationTitleAccent: 'Llegar',
    getDirections: 'Abrir en Google Maps',
    // Admissions Process
    admissionsTitle: 'Proceso de',
    admissionsTitleAccent: 'Admisión',
    admissionsSubtitle: 'Inscribirse en NWL es fácil. Te acompañamos en cada paso del camino.',
    admissionsStepLabel: 'Paso',
    admissionsSteps: [
      {
        title: 'Contáctanos',
        description: 'Escríbenos por WhatsApp, redes sociales o llena el formulario. Te respondemos en minutos.',
      },
      {
        title: 'Visita el Campus',
        description: 'Agenda un recorrido personalizado para conocer las instalaciones y al equipo docente.',
      },
      {
        title: 'Perfil de Admisión',
        description: 'Realizamos un perfil de admisión para conocer las fortalezas de tu hijo.',
      },
      {
        title: 'Inscripción',
        description: 'Completa tu documentación y referencia de pago para asegurar tu lugar.',
      },
      {
        title: '¡Bienvenidos a NWL!',
        description: 'Tu familia se une a la comunidad NWL. Prepárate para el primer día de una gran experiencia.',
      },
    ],
    // Campus Life Gallery
    galleryTitle: 'Vida en',
    galleryTitleAccent: 'Campus',
    // Testimonials
    testimonialsTitle: 'Familias',
    testimonialsTitleAccent: 'Reales',
    testimonialsReviewsLabel: 'reseñas',
  },
  metadata: {
    title: 'Colegio Newland | En Newland, despertamos tu grandeza',
    description:
      'En Newland impulsamos el desarrollo académico, emocional y social de nuestros alumnos en un ambiente cercano y de confianza.',
  },
};
