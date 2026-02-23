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
    headlineLeft: ['We', 'unlock', 'the', 'greatness'],
    headlineRight: ['in', 'every', 'child.'],
    subheadline:
      'We drive the academic, emotional, and social development of our students in a close and trusting environment.',
    ctaPrimary: 'Schedule a Visit',
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
        levels: 'Maternal - High School',
        description: 'Our flagship campus with complete educational offerings.',
        href: '/campus/juriquilla',
      },
      {
        levels: 'Kinder - Elementary',
        description: 'A safe, nurturing space with great facilities for expanded growth.',
        href: '/campus/milenio',
      },
      {
        levels: 'Kinder - Middle School',
        description: 'Cultural richness meets academic excellence.',
        href: '/campus/san-miguel',
      },
      {
        levels: 'Maternal - Elementary',
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
      { value: '95%', label: 'Family Satisfaction' },
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
    campusVisitTitle: 'Campus Visit',
    campusVisitDesc:
      "Experience our facilities and meet our educators in person. We'll tailor the visit to your child's age group.",
    admissionsTitle: 'Admissions Guide',
    admissionsDesc:
      'Download our complete admissions process guide with tuition details and enrollment steps.',
    chatTitle: 'Chat With Us',
    chatDesc: 'Prefer a quick chat? Our admissions team is ready on WhatsApp.',
    openWhatsapp: 'Open WhatsApp',
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
    scheduleVisitFixed: 'Schedule Visit',
  },
  metadata: {
    title: 'Newland School | At Newland, we unlock greatness',
    description:
      'At Newland, we drive the academic, emotional, and social development of our students in a close and trusting environment.',
  },
};
