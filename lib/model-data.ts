/**
 * NWL Australian School — Academic Model ("the wheel")
 * Content source: identity deck slide 14 (7 components · 21 capabilities).
 * Bilingual fields follow the campus-data pattern: { en, es } resolved at render.
 */

export type Localized = { en: string; es: string };

export interface ModelCapability {
  /** react-icons/fi icon key resolved in the page component */
  icon: string;
  name: Localized;
  description: Localized;
}

export interface ModelComponent {
  id: string;
  icon: string;
  /** Solid segment color (slide-derived, harmonized with the brand palette) */
  color: string;
  /** Whether the solid color needs dark text (light colors like gold) */
  darkText?: boolean;
  name: Localized;
  tagline: Localized;
  intro: Localized;
  capabilities: ModelCapability[];
}

/** Wheel order = slide order, clockwise from the top. */
export const MODEL_COMPONENTS: ModelComponent[] = [
  {
    id: 'academic-excellence',
    icon: 'award',
    color: '#0B224E', // Southern Cross navy
    name: { en: 'Academic Excellence', es: 'Excelencia Académica' },
    tagline: {
      en: 'Deep learning and high expectations',
      es: 'Aprendizaje profundo y altas expectativas',
    },
    intro: {
      en: 'Rigor without rote: knowledge is organized into real challenges, questioned through structured reasoning, and carried by the skills that make it usable in the real world.',
      es: 'Rigor sin memorización: el conocimiento se organiza en retos reales, se cuestiona con razonamiento estructurado y se sostiene con las habilidades que lo hacen útil en el mundo real.',
    },
    capabilities: [
      {
        icon: 'layers',
        name: { en: 'Knotion', es: 'Knotion' },
        description: {
          en: 'Project-based methodology that organizes knowledge into real-world challenges.',
          es: 'Metodología por proyectos que organiza el conocimiento en retos del mundo real.',
        },
      },
      {
        icon: 'target',
        name: { en: 'Critical Thinking', es: 'Pensamiento Crítico' },
        description: {
          en: 'Structured reasoning so students question, analyze and form their own ideas.',
          es: 'Razonamiento estructurado para cuestionar, analizar y formar ideas propias.',
        },
      },
      {
        icon: 'message-circle',
        name: { en: 'Soft Skills', es: 'Habilidades Blandas' },
        description: {
          en: 'Communication, collaboration and adaptability for life beyond the classroom.',
          es: 'Comunicación, colaboración y adaptabilidad para la vida más allá del aula.',
        },
      },
    ],
  },
  {
    id: 'wellbeing',
    icon: 'heart',
    color: '#1C7C70', // wellbeing teal (deck)
    name: { en: 'Wellbeing & Human Development', es: 'Bienestar y Desarrollo Humano' },
    tagline: {
      en: 'Wellbeing, emotional intelligence & relationships',
      es: 'Bienestar, inteligencia emocional y relaciones',
    },
    intro: {
      en: 'The Australian model puts wellbeing next to rigor, not after it. Children who feel safe, known and connected learn more and lead better.',
      es: 'El modelo australiano pone el bienestar junto al rigor, no después. Un niño que se siente seguro, visto y conectado aprende más y lidera mejor.',
    },
    capabilities: [
      {
        icon: 'smile',
        name: { en: 'Emotional Intelligence', es: 'Inteligencia Emocional' },
        description: {
          en: 'Recognizing and managing emotions to learn, relate and lead well.',
          es: 'Reconocer y gestionar emociones para aprender, convivir y liderar bien.',
        },
      },
      {
        icon: 'globe',
        name: { en: 'UNESCO 2030', es: 'UNESCO 2030' },
        description: {
          en: "Learning aligned to UNESCO's 2030 goals for global, sustainable education.",
          es: 'Aprendizaje alineado a las metas 2030 de la UNESCO para una educación global y sostenible.',
        },
      },
      {
        icon: 'users',
        name: { en: 'Positive Relationships', es: 'Relaciones Positivas' },
        description: {
          en: 'A culture of belonging, empathy and emotional intelligence.',
          es: 'Una cultura de pertenencia, empatía e inteligencia emocional.',
        },
      },
    ],
  },
  {
    id: 'global-english',
    icon: 'message-square',
    color: '#4A3A82', // Jacaranda
    name: { en: 'Global English Pathway', es: 'Global English Pathway' },
    tagline: {
      en: 'English for life & real communication',
      es: 'Inglés para la vida y la comunicación real',
    },
    intro: {
      en: 'English is the engine of the model, not a subject: a structured route to true bilingual fluency that students live every day, in and out of class.',
      es: 'El inglés es el motor del modelo, no una materia: una ruta estructurada hacia el bilingüismo real que los alumnos viven todos los días, dentro y fuera del aula.',
    },
    capabilities: [
      {
        icon: 'map',
        name: { en: 'Global English Pathway', es: 'Global English Pathway' },
        description: {
          en: 'A structured route to true bilingual fluency, grade by grade.',
          es: 'Una ruta estructurada hacia el bilingüismo real, grado por grado.',
        },
      },
      {
        icon: 'calendar',
        name: { en: 'English in School Activities', es: 'Inglés en la Vida Escolar' },
        description: {
          en: 'English lived daily across clubs, events and school life.',
          es: 'Inglés vivido a diario en clubes, eventos y la vida escolar.',
        },
      },
      {
        icon: 'mic',
        name: { en: 'English in Communications', es: 'Inglés en la Comunicación' },
        description: {
          en: 'Presentations, debates and projects that build real voice.',
          es: 'Presentaciones, debates y proyectos que construyen una voz propia.',
        },
      },
    ],
  },
  {
    id: 'future-skills',
    icon: 'trending-up',
    color: '#2A5C9A', // southern blue (deck)
    name: { en: 'Future Skills & Leadership', es: 'Habilidades del Futuro y Liderazgo' },
    tagline: {
      en: 'Leadership & competencies for the future',
      es: 'Liderazgo y competencias para el futuro',
    },
    intro: {
      en: 'Students don’t wait to lead: they run initiatives, turn ideas into action and learn to work with others. These are the competencies the world of 2030 will ask of them.',
      es: 'Los alumnos no esperan para liderar: impulsan iniciativas, convierten ideas en acción y aprenden a trabajar con otros. Son las competencias que el mundo de 2030 les va a exigir.',
    },
    capabilities: [
      {
        icon: 'flag',
        name: { en: 'Leadership & Student Voice', es: 'Liderazgo y Voz Estudiantil' },
        description: {
          en: 'Students lead initiatives and help shape their community.',
          es: 'Los alumnos lideran iniciativas y ayudan a dar forma a su comunidad.',
        },
      },
      {
        icon: 'zap',
        name: { en: 'Entrepreneurship', es: 'Emprendimiento' },
        description: {
          en: 'Turning ideas into action with creativity and initiative.',
          es: 'Convertir ideas en acción con creatividad e iniciativa.',
        },
      },
      {
        icon: 'share-2',
        name: { en: 'Families & Networking', es: 'Familias y Colaboración' },
        description: {
          en: 'Working and communicating effectively within teams.',
          es: 'Trabajar y comunicarse de manera efectiva en equipo.',
        },
      },
    ],
  },
  {
    id: 'portfolio',
    icon: 'folder',
    color: '#C8870E', // Outback Gold (deck)
    darkText: true,
    name: { en: 'Portfolio & Real Evidence', es: 'Portafolio y Evidencia Real' },
    tagline: {
      en: 'Evidence of growth & impact',
      es: 'Evidencia de crecimiento e impacto',
    },
    intro: {
      en: 'Progress you can see: every student builds a living record of real work, real projects and measurable growth, not just grades on a report card.',
      es: 'Progreso que se puede ver: cada alumno construye un registro vivo de trabajo real, proyectos reales y crecimiento medible, no solo calificaciones en una boleta.',
    },
    capabilities: [
      {
        icon: 'archive',
        name: { en: 'Digital Portfolio NWL', es: 'Portafolio Digital NWL' },
        description: {
          en: "A living digital record of each student's growth and work.",
          es: 'Un registro digital vivo del crecimiento y el trabajo de cada alumno.',
        },
      },
      {
        icon: 'command',
        name: { en: 'Using AI in Activities', es: 'Uso de IA en Actividades' },
        description: {
          en: 'Responsible, hands-on use of AI as a learning and creation tool.',
          es: 'Uso responsable y práctico de la IA como herramienta de aprendizaje y creación.',
        },
      },
      {
        icon: 'bar-chart-2',
        name: { en: 'Measurable Progress & Impact', es: 'Progreso e Impacto Medibles' },
        description: {
          en: 'Evidence and reports that make real progress visible.',
          es: 'Evidencias y reportes que hacen visible el progreso real.',
        },
      },
    ],
  },
  {
    id: 'stem-innovation',
    icon: 'cpu',
    color: '#2E6E78', // STEM teal (deck)
    name: { en: 'STEM & Innovation', es: 'STEM e Innovación' },
    tagline: {
      en: 'Science, technology & emerging tech',
      es: 'Ciencia, tecnología y tecnologías emergentes',
    },
    intro: {
      en: 'Hands-on science and technology with a maker’s mindset: students build, test, compete and iterate with the tools of the world they will inherit.',
      es: 'Ciencia y tecnología prácticas con mentalidad maker: los alumnos construyen, prueban, compiten e iteran con las herramientas del mundo que van a heredar.',
    },
    capabilities: [
      {
        icon: 'star',
        name: { en: 'Experiences in International Competition', es: 'Experiencias en Competencias Internacionales' },
        description: {
          en: 'Science, technology, engineering and math through hands-on inquiry.',
          es: 'Ciencia, tecnología, ingeniería y matemáticas a través de la indagación práctica.',
        },
      },
      {
        icon: 'monitor',
        name: { en: 'Educational Technology & AI', es: 'Tecnología Educativa e IA' },
        description: {
          en: 'Digital tools and AI fluency woven into everyday learning.',
          es: 'Herramientas digitales y fluidez en IA integradas al aprendizaje diario.',
        },
      },
      {
        icon: 'pen-tool',
        name: { en: 'Design Thinking & Innovation', es: 'Design Thinking e Innovación' },
        description: {
          en: 'Creative, iterative problem-solving for real challenges.',
          es: 'Resolución creativa e iterativa de problemas para retos reales.',
        },
      },
    ],
  },
  {
    id: 'international-mindset',
    icon: 'compass',
    color: '#B5532A', // outback terracotta (deck)
    name: { en: 'International Mindset', es: 'Mentalidad Internacional' },
    tagline: {
      en: 'Global citizens with purpose & empathy',
      es: 'Ciudadanos globales con propósito y empatía',
    },
    intro: {
      en: 'Rooted and open at the same time: pride in who they are, curiosity for every culture, and real experiences that widen their horizon.',
      es: 'Con raíces y apertura a la vez: orgullo por lo que son, curiosidad por todas las culturas y experiencias reales que amplían su horizonte.',
    },
    capabilities: [
      {
        icon: 'home',
        name: { en: 'Heritage, Culture & Traditions', es: 'Herencia, Cultura y Tradiciones' },
        description: {
          en: 'Pride in identity and roots as a foundation for openness.',
          es: 'Orgullo por la identidad y las raíces como base de la apertura.',
        },
      },
      {
        icon: 'eye',
        name: { en: 'Intercultural Understanding', es: 'Comprensión Intercultural' },
        description: {
          en: 'Respect and curiosity across cultures and perspectives.',
          es: 'Respeto y curiosidad entre culturas y perspectivas.',
        },
      },
      {
        icon: 'send',
        name: { en: 'International Experiences', es: 'Experiencias Internacionales' },
        description: {
          en: 'Exchanges and global experiences that broaden horizons.',
          es: 'Intercambios y experiencias globales que amplían horizontes.',
        },
      },
    ],
  },
];

/** "Our promise" bar (slide 14 bottom). */
export const MODEL_PROMISE = {
  label: { en: 'Our Promise', es: 'Nuestra Promesa' },
  text: {
    en: 'An Australian-inspired education that nurtures the whole student to thrive academically, personally and globally.',
    es: 'Una educación de inspiración australiana que cultiva al alumno completo para florecer académica, personal y globalmente.',
  },
  outcomes: [
    { icon: 'smile', en: 'Confident Learners', es: 'Alumnos Seguros' },
    { icon: 'target', en: 'Critical Thinkers', es: 'Pensadores Críticos' },
    { icon: 'heart', en: 'Compassionate Leaders', es: 'Líderes Empáticos' },
    { icon: 'globe', en: 'Global Citizens', es: 'Ciudadanos Globales' },
  ],
};

/** "Globally recognized" strip — logos already shipped with the site. */
export const MODEL_RECOGNITIONS: { name: string; image: string | Localized }[] = [
  { name: 'Cognia Accredited', image: '/images/logos/partners/Cognia_ACCRED-Badge-GREY-684x684-1.png' },
  { name: 'Knotion', image: '/images/logos/partners/knotion.png' },
  { name: 'Hokku Academy', image: '/images/logos/partners/hokku-academy.webp' },
  { name: 'Tecnológico de Monterrey', image: '/images/logos/partners/tecnologico-de-monterrey.png' },
  {
    name: 'Philosophy for Children',
    image: { en: '/images/logos/partners/CFPN-en.png', es: '/images/logos/partners/CFPN-es.png' },
  },
  { name: 'Apple Distinguished School', image: '/images/logos/partners/Apple-Distinguished-School.png' },
];
