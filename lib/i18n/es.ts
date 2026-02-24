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
          { name: 'Primaria', href: '/primaria' },
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
        href: '/primaria',
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
        levels: 'Maternal a Preparatoria',
        description: 'Nuestro campus insignia con oferta educativa completa.',
        href: '/campus/juriquilla',
      },
      {
        levels: 'Kínder a Primaria',
        description: 'Un espacio seguro y acogedor con excelentes instalaciones para crecer.',
        href: '/campus/milenio',
      },
      {
        levels: 'Kínder a Secundaria',
        description: 'Donde la riqueza cultural se encuentra con la excelencia académica.',
        href: '/campus/san-miguel',
      },
      {
        levels: 'Maternal a Primaria',
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
      { value: '95%', label: 'Satisfacción Familiar' },
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
      'Recibe detalles sobre programas, costos y proceso de admisión. Sin compromiso — solo la información que necesitas.',
    enrollTitle: 'Inicia tu Inscripción',
    enrollDesc:
      '¿Listo para dar el siguiente paso? Comienza el proceso de admisión de tu hijo hoy.',
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
  metadata: {
    title: 'Colegio Newland | En Newland, despertamos tu grandeza',
    description:
      'En Newland impulsamos el desarrollo académico, emocional y social de nuestros alumnos en un ambiente cercano y de confianza.',
  },
};
