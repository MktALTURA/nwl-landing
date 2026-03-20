import type { Dictionary } from './types';

export const en: Dictionary = {
  nav: {
    links: [
      { name: 'Home', href: '#home' },
      { name: 'Our School', href: '#about' },
      {
        name: 'Academic Offer',
        href: '#levels',
        children: [
          { name: 'Maternal', href: '/maternal' },
          { name: 'Kinder', href: '/kinder' },
          { name: 'Elementary', href: '/elementary' },
          { name: 'Middle School', href: '/middle-school' },
          { name: 'High School', href: '/high-school' },
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
          { name: 'Zibata', href: '/campus/zibata' },
        ],
      },
      { name: 'Admissions', href: '#admissions', highlight: true },
      { name: 'Contact', href: '#contact' },
    ],
    scheduleVisit: 'Schedule a Visit',
    whatsappUs: 'WhatsApp Us',
    whatsappAriaLabel: 'Chat on WhatsApp',
  },
  hero: {
    headlineLeft: ['We', 'unlock', 'greatness'],
    headlineRight: ['in', 'every', 'child.'],
    subheadline:
      'We drive the academic, emotional, and social development of our students in a close and trusting environment.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Educational Model',
    trustIndicators: ['5 Campuses', 'Maternal - Preparatoria', 'Bilingual Education'],
  },
  beSection: {
    be: 'Be',
    words: ['Curious', 'Kind', 'Mindful', 'Resilient', 'Creative', 'Global', 'Proud', 'NWL'],
  },
  kangarooSpirit: {
    titleBefore: 'Our',
    titleAccent: 'Spirit',
    description:
      'The kangaroo embodies the NWL spirit: strength, forward momentum, and carrying those we nurture closest to our hearts. Always leaping toward new horizons.',
    traits: ['Strength', 'Nurture', 'Progress'],
  },
  benefits: {
    sectionTitle: 'Why Choose',
    sectionTitleAccent: 'NWL',
    sectionSubtitle: 'Our comprehensive approach to education focuses on the whole child',
    items: [
      {
        title: 'Emotional Development',
        description:
          'We nurture confident, resilient students through a supportive and trusting environment.',
      },
      {
        title: 'Academic Excellence',
        description:
          'Rigorous bilingual curriculum that prepares students for global opportunities.',
      },
      {
        title: 'Close Community',
        description:
          'Join the NWL family, a welcoming community where every student is known, valued, and supported.',
      },
      {
        title: 'Global Mindset',
        description:
          'We develop world-ready citizens with critical thinking and cultural awareness.',
      },
    ],
    cta: 'Discover Our Approach',
  },
  philosophy: {
    sectionTitle: 'The',
    sectionTitleAccent: 'NWL',
    sectionTitleEnd: 'Model',
    sectionDescription:
      'Our educational model integrates three proven methodologies that develop the whole child: critical thinking, emotional leadership, and real-world problem solving.',
    pillars: [
      {
        title: 'Philosophy for Children (P4C)',
        subtitle: 'Critical thinking at every stage',
        description:
          'Students learn how to think, not what to think. Guided dialogue and philosophical inquiry develop autonomous, analytical thinkers.',
      },
      {
        title: "I'm NWL Leader by Tec de Monterrey",
        subtitle: 'Unique program in Mexico - Exclusive to NWL',
        description:
          'Leadership, emotional intelligence, and social-emotional growth from early childhood onward. Endorsed by Tec de Monterrey exclusively for NWL.',
      },
      {
        title: 'Knotion - International Methodology',
        subtitle: 'Real challenges, real learning',
        description:
          'Project-based learning through real-world challenges with social impact. No traditional homework, just creative problem solving.',
      },
    ],
    cta: 'Download Full Model (PDF)',
  },
  partnerships: {
    sectionTitle: 'Partnerships that',
    sectionTitleAccent: 'Inspire Excellence',
    sectionSubtitle:
      'We collaborate with world-class institutions to deliver an education that transcends borders.',
  },
  levels: {
    sectionTitle: 'Educational',
    sectionTitleAccent: 'Programs',
    sectionSubtitle:
      'From early childhood through high school, we guide your child\'s complete educational journey',
    items: [
      {
        name: 'Maternal',
        ageRange: '2-3 years',
        description: 'Early childhood development in a nurturing, play-based environment.',
        campuses: ['All 5 Campuses'],
        href: '/maternal',
      },
      {
        name: 'Kinder',
        ageRange: '4-5 years',
        description: 'Building foundation skills through exploration and discovery.',
        campuses: ['All 5 Campuses'],
        href: '/kinder',
      },
      {
        name: 'Elementary',
        ageRange: '6-11 years',
        description: 'Developing academic excellence and critical thinking skills.',
        campuses: ['All 5 Campuses'],
        href: '/elementary',
      },
      {
        name: 'Middle School',
        ageRange: '12-14 years',
        description: 'Fostering independence, leadership, and self-discovery.',
        campuses: ['All 5 Campuses'],
        href: '/middle-school',
      },
      {
        name: 'High School',
        ageRange: '15-17 years',
        description: 'College prep with global perspective and career readiness.',
        campuses: ['Corregidora', 'Zibatá', 'San Miguel'],
        href: '/high-school',
      },
    ],
    availableAt: 'Available at:',
    learnMore: 'Learn More →',
    cta: 'Request Information',
  },
  campus: {
    sectionTitleLine1: 'Find Your',
    sectionTitleLine2: 'Perfect Campus!',
    sectionSubtitle: '5 amazing locations · Infinite possibilities',
    items: [
      {
        levels: 'Maternal - Middle School',
        description: 'Our flagship campus with a tradition of excellence.',
        href: '/campus/juriquilla',
      },
      {
        levels: 'Maternal - Middle School',
        description: 'A safe, nurturing space with great facilities for expanded growth.',
        href: '/campus/milenio',
      },
      {
        levels: 'Maternal - High School',
        description: 'Cultural richness meets academic excellence.',
        href: '/campus/san-miguel',
      },
      {
        levels: 'Maternal - High School',
        description: 'A warm, community-centered campus in the heart of Corregidora.',
        href: '/campus/corregidora',
      },
      {
        levels: 'Maternal - High School',
        description: 'Modern facilities in a growing community.',
        href: '/campus/zibata',
      },
    ],
    exploreCta: 'Explore Campus →',
    contactCard: {
      title: 'Need Help?',
      description: "Let's find your perfect campus together!",
      whatsappCta: 'Chat on WhatsApp',
    },
  },
  testimonials: {
    sectionTitle: 'What',
    sectionTitleAccent: 'Parents Say',
    sectionSubtitle: "Hear from families who have chosen NWL for their children's education",
    items: [
      {
        quote:
          'Newland has been transformational for our daughter. The teachers genuinely care about her growth, not just academically but emotionally too.',
        role: 'Parent - Kinder, Juriquilla',
      },
      {
        quote:
          'The bilingual program is excellent. My son switched from another school and his English improved dramatically in just one year.',
        role: 'Parent - Primaria, Zibatá',
      },
      {
        quote:
          'What impressed us most was the sense of community. Parents, teachers, and students all feel like one big family.',
        role: 'Parent - Secundaria, SMA',
      },
    ],
    stats: [
      { value: '2,500+', label: 'Happy Families' },
      { value: '16+', label: 'Years of Excellence' },
      { value: '90%', label: 'Re-enrollment Rate' },
      { value: '5', label: 'Campus Locations' },
    ],
  },
  finalCta: {
    title: 'Begin Your',
    titleAccent: 'NWL Journey',
    subtitle:
      'Join a community where your child can grow academically, emotionally, and socially.',
    formId: 'Y8BSzINaStvWVeBWBMyb',
    formName: 'Formulario para pag web - EN',
    formTitle: 'Schedule a Visit - NWL',
    campusVisitTitle: 'Schedule a Visit',
    campusVisitDesc:
      "Experience our facilities and meet our educators in person. We'll tailor the visit to your child's age group.",
    requestInfoTitle: 'Request Information',
    requestInfoDesc:
      'Get details about our programs, tuition, and admissions process. No commitment, just the info you need.',
    whatsappTitle: 'Chat with Us',
    whatsappDesc:
      'Have questions? Message us on WhatsApp for a quick, personal response.',
  },
  footer: {
    brandDescription:
      'At NWL, we unlock greatness in every student through academic excellence, emotional development, and community connection.',
    schoolHeading: 'Our School',
    schoolLinks: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Model', href: '#philosophy' },
      { name: 'Our Campus', href: '#campus' },
      { name: 'Team', href: '#team' },
      { name: 'Work with Us', href: '/trabaja-con-nosotros' },
    ],
    programsHeading: 'Programs',
    programLinks: [
      { name: 'Maternal', href: '#levels' },
      { name: 'Kinder', href: '#levels' },
      { name: 'Primaria', href: '#levels' },
      { name: 'Secundaria', href: '#levels' },
      { name: 'Preparatoria', href: '#levels' },
    ],
    contactHeading: 'Contact',
    campusesLine1: '5 Campuses in',
    campusesLine2: 'Querétaro & Guanajuato',
    copyright: '© 2026 Colegio NWL. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    scheduleVisitFixed: 'Apply Now',
  },
  brochure: {
    selectLevel: 'Select a level',
    modalSubtitle: 'Educational Model',
    downloadPdf: 'Download PDF',
    closeAriaLabel: 'Close brochure',
    levels: {
      maternalKinder: 'Maternal & Kinder',
      primaria: 'Elementary',
      secundaria: 'Middle School',
      preparatoria: 'High School',
    },
  },
  maternal: {
    ageBadge: 'Ages 2-3',
    tagline: 'Little Steps, Big Dreams',
    subtitle: 'Your child\'s first steps in an English-immersive environment',
    description:
      'At NWL we have the best option to begin your child\'s education from age two. We dedicate special care and attention to their safety and comprehensive development through play-based learning and our bilingual "Brain Up" program.',
    statBilingual: 'English Immersion',
    statCampuses: 'Campuses',
    schedule: '8:20–1:30',
    statSchedule: 'Schedule',
    uniqueBadge: 'Unique in Qro & San Miguel',
    featuresTitle: 'What Makes Maternal NWL Unique',
    features: [
      {
        title: 'Brain Up: English from Age 2',
        description:
          'Early English immersion that develops real fluency. English is part of their everyday learning from the very beginning.',
      },
      {
        title: 'Multisensory Stimulation',
        description:
          'Specialized rooms that maximize neural development during the most critical stage. The ONLY school program of its kind in Querétaro.',
      },
      {
        title: 'Philosophy for Children (P4C)',
        description:
          'We teach children how to think, not what to think. Critical thinking development adapted for toddlers through guided dialogue.',
        logo: '/images/logos/partners/CFPN(es).png',
      },
      {
        title: "I'm NWL Leader by Tec de Monterrey",
        description:
          'A unique program in Mexico that develops habits and mindsets so children grow holistically, take responsibility for their actions, make conscious decisions, become resilient, and achieve their goals. Exclusive to NWL, endorsed by Tec de Monterrey.',
        logo: '/images/logos/partners/Yo_soy_lider_nwl(es).png',
        logo2: '/images/logos/partners/tecnologico-de-monterrey.png',
      },
      {
        title: 'Corazones Mágicos',
        description:
          'Child sexual violence prevention program. Includes a parent training diploma.',
      },
      {
        title: 'Safe Detachment + BFS',
        description:
          'Gradual transition with parents present during the first days. Certified Bullying Free School (BFS): a safe, bullying-free environment.',
      },
    ],
    testimonial:
      'I just feel calm dropping her off. The teachers greet her by name every morning, and she doesn\'t cry anymore. That\'s everything.',
    testimonialAuthor: 'NWL Parent, Maternal',
    cta: 'Schedule a Visit',
    ctaSecondary: 'Download Brochure',
  },
  maternalPage: {
    heroHeadline: 'Where Every First Step Matters',
    heroSubheadline:
      'NWL Maternal is the only early childhood program in Querétaro that combines 100% English immersion, neuroscience-based learning, and the warmth your child deserves, from age 2.',
    backToHome: 'Back to Home',
    dayTitle: 'A Day in',
    dayTitleAccent: 'Maternal NWL',
    daySubtitle: 'Each day is designed to stimulate growth through play, exploration, and connection.',
    daySchedule: [
      { time: '8:20', activity: 'Warm welcome & free play', icon: 'sun' },
      { time: '9:00', activity: 'Brain Up: English circle time', icon: 'globe' },
      { time: '9:45', activity: 'Multisensory stimulation room', icon: 'star' },
      { time: '10:30', activity: 'Healthy snack & outdoor play', icon: 'heart' },
      { time: '11:15', activity: 'P4C: guided dialogue & creativity', icon: 'book' },
      { time: '12:00', activity: 'Music, movement & expression', icon: 'music' },
      { time: '12:45', activity: 'Story time & calm closure', icon: 'moon' },
      { time: '1:30', activity: 'Pick-up & parent connection', icon: 'home' },
    ],
    philosophyTitle: 'Our',
    philosophyTitleAccent: 'Approach',
    philosophyDescription:
      'Our Maternal program is built on the understanding that ages 2-3 represent the most critical window for brain development. Every activity, space, and interaction is intentionally designed.',
    philosophyPillars: [
      {
        title: '100% English Immersion',
        description:
          'From day one, your child is immersed in English through our Brain Up methodology. Natural bilingual development happens when it matters most.',
      },
      {
        title: 'Neuroscience-Based Learning',
        description:
          'Our multisensory rooms are the only ones of their kind in Querétaro, designed to maximize neural pathways during this critical development stage.',
      },
      {
        title: 'Emotional Safety First',
        description:
          'Our Safe Detachment program ensures a gentle transition with parents present during the first days. Your child\'s emotional well-being is our priority.',
      },
      {
        title: 'Leadership from the Start',
        description:
          'Through "I\'m NWL Leader" by Tec de Monterrey, we develop habits and mindsets so children grow holistically, take responsibility, make conscious decisions, and achieve their goals.',
      },
    ],
    galleryTitle: 'Life in',
    galleryTitleAccent: 'Maternal',
  },
  kinder: {
    ageBadge: 'Ages 3–5',
    tagline: 'Growing Minds, Building Futures',
    description:
      'We believe every child holds extraordinary potential. Our Kinder program nurtures curiosity through English immersion, project-based learning, and our unique Multisensory Program.',
    statBilingual: 'English Immersion',
    statCampuses: 'Campuses',
    schedule: '8:20–1:50',
    statSchedule: 'Schedule',
    testimonial:
      'He started asking "but why?" about everything at home. At first I thought it was just a phase, then I realized he\'s actually thinking things through.',
    testimonialAuthor: 'NWL Parent, Kinder',
    cta: 'Schedule a Visit',
    ctaSecondary: 'Download Brochure',
  },
  kinderPage: {
    heroHeadline: 'Growing Minds, Building Futures',
    heroSubheadline:
      'Critical thinkers who live English every day. Project-based learning, no traditional homework, and a multisensory approach unique in Querétaro.',
    backToHome: 'Back to Home',
    overviewTitle: 'Discover',
    overviewTitleAccent: 'Kinder NWL',
    pillarsTitle: 'The NWL',
    pillarsTitleAccent: 'Model',
    pillarsSubtitle: 'Three pillars that define how we educate from the start.',
    pillars: [
      {
        title: 'Knotion',
        subtitle: 'International Methodology',
        description:
          'Project-based learning from Kinder. Real challenges that develop creative thinking and problem-solving. No traditional homework.',
        logo: '/images/logos/knotion.png',
      },
      {
        title: 'Philosophy for Children (P4C)',
        subtitle: 'P4C',
        description:
          'We teach how to think, not what to think. From Kinder, they learn to question, dialogue, and form their own criteria.',
        logo: '/images/logos/partners/CFPN(es).png',
      },
      {
        title: "I'm NWL Leader",
        subtitle: 'by Tec de Monterrey',
        description:
          'A unique program in Mexico that develops habits and mindsets so children grow holistically, take responsibility, make conscious decisions, become resilient, and achieve their goals. Endorsed by Tec de Monterrey, exclusive to NWL.',
        logo: '/images/logos/partners/Yo_soy_lider_nwl(es).png',
        logo2: '/images/logos/partners/tecnologico-de-monterrey.png',
      },
    ],
    galleryTitle: 'Life in',
    galleryTitleAccent: 'Kinder',
    dayTitle: 'A Day in',
    dayTitleAccent: 'Kinder NWL',
    daySchedule: [
      { time: '8:20', activity: 'NWL Routine: welcome & morning routine', icon: 'compass' },
      { time: '9:00', activity: 'Knotion Project Lab: hands-on investigation', icon: 'lightbulb' },
      { time: '9:50', activity: 'English Immersion: reading, writing & conversation', icon: 'globe' },
      { time: '10:40', activity: 'Healthy snack & outdoor exploration', icon: 'sun' },
      { time: '11:15', activity: 'P4C: philosophical dialogue & critical thinking', icon: 'brain' },
      { time: '12:00', activity: 'Leadership & collaboration activities', icon: 'users' },
      { time: '12:45', activity: 'Music, movement & creative expression', icon: 'music' },
      { time: '1:30', activity: 'Reflection circle & dismissal', icon: 'star' },
    ],
  },
  elementary: {
    ageBadge: 'Ages 6–11',
    tagline: 'Building the Future, One Project at a Time',
    description:
      'In Elementary, students take ownership of their learning through the IMPACT model, STEAM maker labs, and a philosophy program that teaches them how to think — not what to think. Bilingual model. No traditional homework.',
    statBilingual: 'Bilingual Model',
    statCampuses: 'Campuses',
    statNoHomework: 'No Homework',
    schedule: '7:40–2:30',
    statSchedule: 'Schedule',
    testimonial:
      'She used to hate going to school. Now she tells me about her projects at dinner. Something changed, and I\'m grateful.',
    testimonialAuthor: 'NWL Parent, Elementary',
    cta: 'Schedule a Visit',
    ctaSecondary: 'Download Brochure',
  },
  elementaryPage: {
    heroHeadline: 'Building the Future, One Project at a Time',
    heroSubheadline:
      'Design thinkers who solve real challenges, lead with purpose, and live English every day. Maker labs, no homework, and international certification.',
    backToHome: 'Back to Home',
    overviewTitle: 'Discover',
    overviewTitleAccent: 'Elementary NWL',
    pillarsTitle: 'The NWL',
    pillarsTitleAccent: 'Model',
    pillarsSubtitle: 'Three pillars that define how we develop critical thinkers and leaders.',
    pillars: [
      {
        title: 'Knotion / IMPACT Model',
        subtitle: 'Design Thinking in Action',
        description:
          'Real-world challenges through the IMPACT methodology. Students investigate, create, and present solutions with social impact. No traditional homework.',
        logo: '/images/logos/knotion.png',
      },
      {
        title: 'Philosophy for Children (P4C)',
        subtitle: 'P4C + Parent Diploma',
        description:
          'We teach how to think, not what to think. Philosophical dialogue that builds critical reasoning, argumentation, and empathy. Includes a Parent Diploma.',
        logo: '/images/logos/partners/CFPN(es).png',
      },
      {
        title: "I'm NWL Leader",
        subtitle: 'by Tec de Monterrey',
        description:
          'A unique program in Mexico that develops habits and mindsets so students grow holistically, take responsibility for their actions, make conscious decisions, become resilient, and achieve their goals. Endorsed by Tec de Monterrey, exclusive to NWL.',
        logo: '/images/logos/partners/Yo_soy_lider_nwl(es).png',
        logo2: '/images/logos/partners/tecnologico-de-monterrey.png',
      },
    ],
    knotionTitle: 'Powered by',
    knotionTitleAccent: 'Knotion',
    knotionSubtitle: 'An international learning ecosystem that replaces memorization with real-world problem solving.',
    knotionPhases: [
      { name: 'Identify', title: 'Connect with the challenge' },
      { name: 'Map', title: 'Research and understand' },
      { name: 'Prototype', title: 'Design a solution' },
      { name: 'Act', title: 'Implement and share' },
    ],
    steamTitle: 'TecniKids',
    steamTitleAccent: 'STEAM Lab',
    steamSubtitle: 'Where ideas become real. Our maker spaces put professional tools in the hands of young innovators.',
    steamFeatures: [
      {
        title: '3D Printing',
        description: 'Students design and fabricate prototypes, bringing ideas from screen to reality.',
      },
      {
        title: 'Laser Cutting',
        description: 'Precision fabrication that teaches engineering principles through hands-on creation.',
      },
      {
        title: 'Robotics',
        description: 'Programming and building robots that solve real challenges and develop computational thinking.',
      },
      {
        title: 'Maker Spaces',
        description: 'Open workshops where creativity meets tools, materials, and collaboration.',
      },
    ],
    differentiatorsSectionTitle: 'What Sets Us Apart',
    differentiators: [
      {
        title: 'International Trips',
        description: 'From 5th grade, students experience global learning through educational travel abroad.',
      },
      {
        title: 'Corazones Mágicos',
        description: 'Certified prevention program that builds emotional resilience and a safe school culture.',
      },
      {
        title: 'Cognia Certified',
        description: 'International quality certification present in 88+ countries, validating our standards.',
      },
      {
        title: 'BFS: Bullying Free School',
        description: 'Certified bullying prevention and eradication program with clear protocols and a culture of respect.',
      },
    ],
    activitiesTitle: 'Beyond the',
    activitiesTitleAccent: 'Classroom',
    activitiesSubtitle: 'Leadership, discipline, and teamwork through sports, arts, and creative expression.',
    activities: [
      { name: 'Sports', description: 'Soccer, basketball, taekwondo, and the Gladiators Race obstacle challenge.' },
      { name: 'Arts & Culture', description: 'Dance team, theater, and visual arts that spark creativity and confidence.' },
      { name: 'Music', description: 'Instrumental lessons and ensemble performances that nurture discipline and expression.' },
      { name: 'STEAM', description: 'Hands-on science, technology, and creative problem-solving projects.' },
    ],
    activitiesNote: 'Activities vary by campus — ask about offerings at your preferred location.',
    galleryTitle: 'Life in',
    galleryTitleAccent: 'Elementary',
    galleryComingSoon: 'Gallery coming soon. Visit a campus to see our spaces firsthand.',
  },
  middleSchool: {
    ageBadge: 'Ages 12–15',
    tagline: 'From Ideas to Impact',
    description:
      'In Middle School, students become entrepreneurs, earn dual international certifications, and develop the critical thinking and leadership skills that define their future. Real projects, not textbook exercises. Global credentials, not just grades.',
    statBilingual: 'English Immersion',
    statCampuses: 'Campuses',
    statCertifications: 'International Certifications',
    schedule: '7:30–2:30',
    statSchedule: 'Schedule',
    testimonial:
      "My son is quieter by nature, but lately he's been speaking up more. His teacher noticed before I did. That kind of attention matters to me.",
    testimonialAuthor: 'NWL Parent, Middle School',
    cta: 'Schedule a Visit',
    ctaSecondary: 'Download Brochure',
  },
  middleSchoolPage: {
    heroHeadline: 'From Ideas to Impact',
    heroSubheadline:
      'Where young entrepreneurs earn international credentials, develop real-world skills, and become the leaders of tomorrow.',
    backToHome: 'Back to Home',
    // Transformation
    transformationTitle: 'The Middle School',
    transformationTitleAccent: 'Transformation',
    transformationBefore: 'They arrive as...',
    transformationBeforeItems: [
      'Students who follow instructions',
      'Learners absorbing information',
      'Kids finding their voice',
    ],
    transformationAfter: 'They leave as...',
    transformationAfterItems: [
      'Leaders who take initiative',
      'Thinkers who solve real problems',
      'Young adults ready for the world',
    ],
    // Pillars
    pillarsTitle: 'The NWL',
    pillarsTitleAccent: 'Model',
    pillarsSubtitle:
      'Three pillars that develop critical thinkers, empathetic leaders, and real-world problem solvers.',
    pillars: [
      {
        title: 'Knotion',
        subtitle: 'International Methodology',
        description:
          'Problem-solving through real-world challenges with social impact. No traditional homework. Students learn by doing, creating, and presenting solutions.',
        logo: '/images/logos/knotion.png',
      },
      {
        title: 'Philosophy for Children (P4C)',
        subtitle: 'P4C / Critical Thinking',
        description:
          'We teach how to think, not what to think. Guided dialogue develops autonomous judgment, ethical reasoning, and the confidence to defend their ideas. Includes a Parent Diploma.',
        logo: '/images/logos/partners/CFPN(es).png',
      },
      {
        title: "I'm NWL Leader",
        subtitle: 'by Tec de Monterrey',
        description:
          'A unique program in Mexico that develops habits and mindsets so students grow holistically, take responsibility, make conscious decisions, become resilient, and achieve their goals. Endorsed by Tec de Monterrey.',
        logo: '/images/logos/partners/Yo_soy_lider_nwl(es).png',
        logo2: '/images/logos/partners/tecnologico-de-monterrey.png',
      },
    ],
    // Exclusive Programs
    exclusiveTitle: 'Exclusive',
    exclusiveTitleAccent: 'Programs',
    exclusiveSubtitle:
      'Two programs that set NWL Middle School apart from any other school in the region.',
    exclusivePrograms: [
      {
        title: 'Entrepreneurship Program',
        partner: 'Universidad Mondragón',
        description:
          "Students develop real business projects with mentorship from one of the world's leading cooperative universities.",
        highlights: [
          'Real entrepreneurship projects from concept to pitch',
          'Business fundamentals and financial literacy',
          'Annual pitch day with community judges',
        ],
      },
      {
        title: 'Double International Certification',
        partner: 'Hokku Academy',
        description:
          'Students graduate with both US and Mexican academic credentials, opening doors to universities worldwide.',
        highlights: [
          'US-aligned curriculum alongside Mexican SEP standards',
          'Internationally recognized dual diploma',
          'Seamless pathway to global higher education',
        ],
      },
    ],
    exclusiveQuote: 'Global credentials for global citizens',
    // Knotion
    knotionTitle: 'Powered by',
    knotionTitleAccent: 'Knotion',
    knotionSubtitle:
      'An international learning ecosystem where memorization gives way to real-world problem solving.',
    knotionPhases: [
      { name: 'Identify', title: 'Connect with the challenge', description: 'Students engage with real-world problems that matter, from community issues to global sustainability, sparking curiosity and purpose.' },
      { name: 'Map', title: 'Research and understand', description: 'Through collaborative investigation and critical analysis, they map the problem landscape, gathering data and perspectives from multiple sources.' },
      { name: 'Prototype', title: 'Design a solution', description: 'Teams brainstorm, iterate, and build working prototypes using design thinking methodology and hands-on maker tools.' },
      { name: 'Act', title: 'Implement and share', description: 'Solutions are put into action and presented to real audiences, building confidence, communication skills, and a lasting sense of impact.' },
    ],
    // Differentiators
    differentiatorsSectionTitle: 'What Sets Us Apart',
    differentiators: [
      {
        title: 'International Experiences',
        description:
          'Global learning through educational travel that broadens perspectives and builds cultural intelligence.',
      },
      {
        title: 'Cognia Certified',
        description:
          'International quality certification recognized in 88+ countries, validating our academic standards.',
      },
      {
        title: 'Corazones Mágicos',
        description:
          'Certified violence prevention program that builds emotional resilience and a safe school culture.',
      },
      {
        title: 'BFS: Bullying Free School',
        description:
          'Certified bullying prevention and eradication program with clear protocols and a culture of mutual respect.',
      },
      {
        title: '90+ Security Cameras',
        description:
          '24/7 monitored security across all campuses, ensuring peace of mind for every family.',
      },
      {
        title: 'Personalized Attention',
        description:
          'Small class sizes and dedicated advisors who know every student by name.',
      },
    ],
    // Activities
    activitiesTitle: 'Beyond the',
    activitiesTitleAccent: 'Classroom',
    activitiesSubtitle:
      'Leadership, discipline, and self-expression through competitive sports, performing arts, and public speaking.',
    activities: [
      { name: 'Sports', description: 'Soccer, basketball, volleyball, and more in competitive leagues.' },
      { name: 'Arts', description: 'Visual arts, digital design, and creative expression programs.' },
      { name: 'Music', description: 'Instrumental, vocal, and music production opportunities.' },
      { name: 'Public Speaking', description: 'Debate, Model UN, and presentation skills for confident communicators.' },
    ],
    activitiesNote: 'Activities vary by campus. Ask about offerings at your preferred location.',
    // Gallery
    galleryTitle: 'Life in',
    galleryTitleAccent: 'Middle School',
  },
  highSchool: {
    ageBadge: 'Ages 15–17',
    tagline: 'A Preparation for Life',
    description:
      'Prepa NWL prepares students for a future full of challenges, with a growth mindset and skills that go far beyond academics. Through the Life Project model, every semester builds real-world abilities, from financial intelligence to entrepreneurship.',
    statBilingual: 'Bilingual Program',
    statCampuses: 'Campuses',
    statCertifications: 'Certifications',
    statProjects: 'Personal Projects',
    schedule: '7:30–2:30',
    statSchedule: 'Schedule',
    cta: 'Schedule a Visit',
    ctaSecondary: 'Download Brochure',
  },
  highSchoolPage: {
    heroHeadline: 'More Than High School',
    heroSubheadline:
      'A preparation for life. Where growth mindset, real-world skills, and personal purpose come together in every semester.',
    backToHome: 'Back to Home',
    // Value Props
    valuePropsTitle: 'What Makes Us',
    valuePropsTitleAccent: 'Different',
    valuePropsSubtitle:
      'Prepa NWL isn\'t a traditional high school. It\'s a life project designed to prepare students for the real world.',
    valueProps: [
      {
        title: 'Life Project',
        description: 'A personalized journey with Life Mentors guiding each student to discover their talents and build their purpose.',
      },
      {
        title: 'Project-Based Learning',
        description: 'No traditional homework. Continuous assessment through projects, presentations, and real-world applications. Kn U High certifications include their own coursework and evaluations.',
      },
      {
        title: 'Kn U High Certifications (Coursera)',
        description: 'From 1st semester, students earn certifications from world-class universities through Kn U High in partnership with Coursera.',
      },
      {
        title: 'Financial Intelligence',
        description: 'Personal finance education every semester, from budgeting basics to entrepreneurial economics and adult financial planning.',
      },
      {
        title: 'Dual Diploma',
        description: 'Students graduate with both a U.S.-accredited high school diploma (Cognia) and their Mexican SEP diploma, opening doors to universities worldwide.',
      },
      {
        title: 'AI & Modern Technology',
        description: 'Students learn to use AI and digital tools as everyday instruments, transforming how they learn, create, and solve problems.',
      },
      {
        title: 'University & Career Prep',
        description: 'Scholarship preparation, professional skills, and a clear pathway to higher education through dual diplomas and global credentials.',
      },
    ],
    // Life Project Journey
    journeyTitle: 'The Life Project',
    journeyTitleAccent: 'Journey',
    journeySubtitle:
      '6 semesters. 6 transformations. Each one builds on the last, guiding students from self-discovery to being future-ready.',
    semesters: [
      {
        number: '01',
        theme: 'Growth Mindset & Personal Mastery',
        skills: ['Self-Awareness', 'Resilience & Grit', 'Emotional Intelligence'],
        project: 'My Life Book',
      },
      {
        number: '02',
        theme: 'Social Skills & Effective Communication',
        skills: ['Conflict Management', 'Assertive Communication', 'Leadership'],
        project: 'My Voice, My Influence',
      },
      {
        number: '03',
        theme: 'Innovation & Critical Thinking',
        skills: ['Critical Thinking', 'Strategic Problem-Solving', 'Creativity'],
        project: 'Ideas That Transform',
      },
      {
        number: '04',
        theme: 'Entrepreneurship & Business Creation',
        skills: ['Entrepreneurial Mindset', 'Leadership', 'Interdisciplinary Collaboration'],
        project: 'My First Venture',
      },
      {
        number: '05',
        theme: 'Social Impact & Responsibility',
        skills: ['Ethical Decision-Making', 'Social Responsibility', 'Financial Stewardship'],
        project: 'Choosing with Purpose',
      },
      {
        number: '06',
        theme: 'Future-Ready: University & Career Prep',
        skills: ['Professional Teamwork', 'University Prep', 'Digital & Future Skills'],
        project: 'My Future in Action',
      },
    ],
    // Life Project Model
    pillarsTitle: 'The Life Project',
    pillarsTitleAccent: 'Model',
    pillarsSubtitle:
      'Three dimensions that develop complete individuals: not just academically prepared, but life-ready.',
    pillars: [
      {
        title: 'Growth Mindset',
        subtitle: 'Self-Growth & Resilience',
        description:
          'Students develop the inner strength to face challenges, learn from failure, and continuously grow. The foundation for everything else.',
      },
      {
        title: 'Emotional Empowerment',
        subtitle: 'Social & Communication Skills',
        description:
          'From assertive communication to ethical leadership, students learn to connect, collaborate, and lead with empathy and purpose.',
      },
      {
        title: 'Fundamental Life Abilities',
        subtitle: 'Entrepreneurship & Future Skills',
        description:
          'Financial literacy, digital competence, entrepreneurship, and professional preparation. The practical skills that make the difference.',
      },
    ],
    // Exclusive Programs
    exclusiveTitle: 'Exclusive',
    exclusiveTitleAccent: 'Programs',
    exclusiveSubtitle:
      'Partnerships and programs that set Prepa NWL apart, giving students credentials and experiences no other school in the region offers.',
    exclusivePrograms: [
      {
        title: 'US + Mexican Dual Diploma',
        partner: 'Hokku Academy',
        description:
          'Students graduate with both a US-accredited high school diploma (Cognia accredited) and their Mexican SEP diploma, opening doors to universities worldwide.',
        highlights: [
          'US Cognia-accredited diploma alongside Mexican SEP standards',
          'Project-based learning with AI-guided mastery',
          'Direct pathway to US and international universities',
        ],
      },
      {
        title: 'In-School Fitness Program',
        partner: 'HIT & Hyrox-Style Training',
        description:
          'An on-campus functional fitness program with coached sessions: sled pushes, tire flips, and circuit training. Building discipline, resilience, and physical wellness.',
        highlights: [
          'Professional coached HIT & Hyrox-style workouts',
          'On-campus training facilities and equipment',
          'Physical resilience integrated into the school day',
        ],
      },
      {
        title: 'Personal Projects Portfolio',
        partner: 'Life Project',
        description:
          'Over 6 semesters, each student builds a portfolio of meaningful projects, from "My Life Book" to "My Future in Action", documenting their personal growth journey.',
        highlights: [
          '6 personal projects across 3 years',
          '6 integrative team projects with real-world impact',
          'A tangible portfolio for university applications',
        ],
      },
      {
        title: 'International Exchange',
        partner: 'Global Experience',
        description:
          'Optional international exchange program in semesters 5-6. Cultural immersion, language mastery, and a global perspective that transforms their worldview.',
        highlights: [
          'Cultural immersion in international settings',
          'Language mastery through real-world experience',
          'Global network and perspective',
        ],
      },
    ],
    // Academic section (McGraw-Hill)
    academicTitle: 'Academic',
    academicTitleAccent: 'Excellence',
    academicDescription:
      'Our academic curriculum is powered by McGraw-Hill, a world-leading educational publisher trusted by top institutions globally. This ensures rigorous, internationally recognized academic content alongside our Life Project model.',
    academicHighlights: [
      'Internationally recognized academic content',
      'Adaptive learning technology for personalized progress',
      'Digital platforms and virtual lab experiences',
      'Aligned with Mexican SEP standards and global benchmarks',
    ],
    academicPlanCta: 'View Academic Plan',
    // University Pathways
    universityPathwaysTitle: 'University',
    universityPathwaysTitleAccent: 'Pathways',
    universityPathwaysSubtitle: 'Preparing students for Mexico\'s top universities and beyond',
    universityPathwaysDescription: 'Through our dual diploma program, strategic university partnerships, and the Life Project model, Prepa NWL students are building the credentials and skills to thrive at leading institutions.',
    universityPathwaysFootnote: 'University partnerships and pathways are actively developed as part of our academic alliances.',
    // Gallery
    galleryTitle: 'Life at',
    galleryTitleAccent: 'Prepa NWL',
  },
  campusDetail: {
    facilitiesTitle: 'Our',
    facilitiesTitleAccent: 'Facilities',
    activitiesTitle: 'Beyond the',
    activitiesTitleAccent: 'Classroom',
    directorTitle: 'A Message from',
    directorTitleAccent: 'Our Director',
    ctaTitle: 'Ready to Visit',
    ctaTitleAccent: 'Our Campus?',
    ctaSubtitle: 'Schedule a personalized tour and discover why NWL is the right choice for your family.',
    ctaScheduleVisit: 'Schedule a Visit',
    ctaWhatsapp: 'Chat on WhatsApp',
    backToHome: '← Back to Home',
    // Location Map
    locationTitle: 'How to',
    locationTitleAccent: 'Get Here',
    getDirections: 'Open in Google Maps',
    // Admissions Process
    admissionsTitle: 'Admissions',
    admissionsTitleAccent: 'Process',
    admissionsSubtitle: 'Enrolling at NWL is simple. We guide you every step of the way.',
    admissionsStepLabel: 'Step',
    admissionsSteps: [
      {
        title: 'Get in Touch',
        description: 'Reach out via WhatsApp, social media, or our form. We respond within minutes.',
      },
      {
        title: 'Visit the Campus',
        description: 'Schedule a personalized tour to see our facilities and meet our team.',
      },
      {
        title: 'Admission Profile',
        description: 'We create an admission profile to understand your child\'s strengths.',
      },
      {
        title: 'Enrollment',
        description: 'Complete your documentation and payment reference to secure your spot.',
      },
      {
        title: 'Welcome to NWL!',
        description: 'Your family joins the NWL community. Get ready for day one of a great experience.',
      },
    ],
    // Campus Life Gallery
    galleryTitle: 'Campus',
    galleryTitleAccent: 'Life',
    // Testimonials
    testimonialsTitle: 'Real',
    testimonialsTitleAccent: 'Families',
    testimonialsReviewsLabel: 'reviews',
  },
  careers: {
    heroTitle: 'Join Our',
    heroTitleAccent: 'Team',
    heroSubtitle: 'Be part of a community that transforms lives through education. Discover your next opportunity at Newland School.',
    heroCta: 'View Open Positions',
    whyTitle: 'Why Work at',
    whyTitleAccent: 'Newland',
    whySubtitle: 'More than a workplace — a community committed to educational excellence.',
    whyBenefits: [
      { title: 'Professional Growth', description: 'Continuous training, certifications, and development opportunities to advance your career in education.' },
      { title: 'Collaborative Environment', description: 'Work alongside passionate educators in a supportive, innovative, and close-knit community.' },
      { title: 'Educational Innovation', description: 'Access cutting-edge methodologies, technology, and resources like Knotion, Apple, and international programs.' },
      { title: 'Community Impact', description: 'Shape the future of thousands of students across our 5 campuses in Querétaro and San Miguel de Allende.' },
    ],
    jobsTitle: 'Open',
    jobsTitleAccent: 'Positions',
    jobsSubtitle: 'Explore our current opportunities across all campuses.',
    jobsFilterAll: 'All Campuses',
    jobsNoPositions: 'No open positions match your filter at the moment. Check back soon or submit your CV below.',
    jobsApplyBtn: 'Apply Now',
    jobsRequirements: 'Requirements',
    jobsDepartment: 'Department',
    processTitle: 'Application',
    processTitleAccent: 'Process',
    processSubtitle: 'Our application process is designed to get to know you comprehensively. Here are the steps:',
    processSteps: [
      { title: 'Personal Information', description: 'Name, contact, and location details.' },
      { title: 'Professional Experience', description: 'Your work history and relevant positions.' },
      { title: 'Academic Formation', description: 'Degrees, diplomas, and education background.' },
      { title: 'Courses & Certifications', description: 'Professional development and specialized training.' },
      { title: 'Technical Skills', description: 'Technology tools and platforms you master.' },
      { title: 'Languages', description: 'Language proficiencies and certifications.' },
      { title: 'Specialties', description: 'Areas of expertise and specialization levels.' },
      { title: 'Skills & CV Upload', description: 'Upload your CV and highlight your key strengths.' },
    ],
    applicationFormId: 'XDVtGU9rtg9amiqI7lrB',
    applicationFormName: 'Career Application Form - EN',
    applicationFormTitle: 'Apply Now',
    partnerTitle: 'Become a',
    partnerTitleAccent: 'Partner',
    partnerSubtitle: 'Join our network of strategic allies.',
    partnerDescription: 'We collaborate with leading institutions, companies, and organizations to enrich our educational offering and create meaningful opportunities for our community.',
    partnerFormId: 'PLACEHOLDER_PARTNER_FORM_EN',
    partnerFormName: 'Partnership Inquiry Form - EN',
    partnerFormTitle: 'Partner with Us',
    partnerBenefits: [
      { title: 'Brand Visibility', description: 'Reach thousands of families across our 5 campuses.' },
      { title: 'Educational Impact', description: 'Contribute to innovative programs that shape young minds.' },
      { title: 'Community Access', description: 'Connect with an engaged community of parents, educators, and students.' },
      { title: 'Strategic Alliance', description: 'Co-create programs, events, and initiatives that benefit both organizations.' },
    ],
  },
  admin: {
    loginTitle: 'Admin Access',
    loginSubtitle: 'Enter your password to manage job listings.',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: 'Enter admin password',
    loginButton: 'Sign In',
    loginError: 'Invalid password. Please try again.',
    loginRateLimit: 'Too many attempts. Please try again in 15 minutes.',
    dashboardTitle: 'Job Listings',
    newJobButton: 'New Position',
    logoutButton: 'Sign Out',
    noJobs: 'No job listings yet. Create your first position.',
    tableTitle: 'Title',
    tableCampus: 'Campus',
    tableStatus: 'Status',
    tableCreated: 'Created',
    tableActions: 'Actions',
    statusActive: 'Active',
    statusInactive: 'Inactive',
    deleteConfirm: 'Are you sure you want to delete this position? This action cannot be undone.',
    formCreateTitle: 'Create Position',
    formEditTitle: 'Edit Position',
    formTitleEn: 'Title (English)',
    formTitleEs: 'Title (Spanish)',
    formCampus: 'Campus',
    formDescriptionEn: 'Description (English)',
    formDescriptionEs: 'Description (Spanish)',
    formRequirementsEn: 'Requirements (English)',
    formRequirementsEs: 'Requirements (Spanish)',
    formDepartmentEn: 'Department (English)',
    formDepartmentEs: 'Department (Spanish)',
    formActive: 'Active',
    formSave: 'Save',
    formCancel: 'Cancel',
    formSaving: 'Saving...',
    campusLabels: {
      all: 'All Campuses',
      juriquilla: 'Juriquilla',
      milenio: 'Milenio',
      'san-miguel': 'San Miguel de Allende',
      corregidora: 'Corregidora',
      zibata: 'Zibatá',
    },
  },
  metadata: {
    title: 'Newland School | At Newland, we unlock greatness',
    description:
      'At Newland, we drive the academic, emotional, and social development of our students in a close and trusting environment.',
  },
};
