export type Locale = 'en' | 'es';

export interface Dictionary {
  nav: {
    links: {
      name: string;
      href: string;
      highlight?: boolean;
      children?: { name: string; href: string }[];
    }[];
    scheduleVisit: string;
    whatsappUs: string;
    whatsappAriaLabel: string;
  };
  hero: {
    headlineLeft: string[];
    headlineRight: string[];
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustIndicators: string[];
  };
  beSection: {
    be: string;
    words: string[];
  };
  kangarooSpirit: {
    titleBefore: string;
    titleAccent: string;
    description: string;
    traits: string[];
  };
  benefits: {
    sectionTitle: string;
    sectionTitleAccent: string;
    sectionSubtitle: string;
    items: { title: string; description: string }[];
    cta: string;
  };
  philosophy: {
    sectionTitle: string;
    sectionTitleAccent: string;
    sectionTitleEnd: string;
    sectionDescription: string;
    pillars: { title: string; subtitle: string; description: string }[];
    cta: string;
  };
  levels: {
    sectionTitle: string;
    sectionTitleAccent: string;
    sectionSubtitle: string;
    items: { name: string; ageRange: string; description: string; campuses: string[]; href: string }[];
    availableAt: string;
    learnMore: string;
    cta: string;
  };
  campus: {
    sectionTitleLine1: string;
    sectionTitleLine2: string;
    sectionSubtitle: string;
    items: { levels: string; description: string; href: string }[];
    exploreCta: string;
    contactCard: {
      title: string;
      description: string;
      whatsappCta: string;
    };
  };
  testimonials: {
    sectionTitle: string;
    sectionTitleAccent: string;
    sectionSubtitle: string;
    items: { quote: string; role: string }[];
    stats: { value: string; label: string }[];
  };
  finalCta: {
    title: string;
    titleAccent: string;
    subtitle: string;
    formId: string;
    formName: string;
    formTitle: string;
    campusVisitTitle: string;
    campusVisitDesc: string;
    requestInfoTitle: string;
    requestInfoDesc: string;
    whatsappTitle: string;
    whatsappDesc: string;
  };
  footer: {
    brandDescription: string;
    schoolHeading: string;
    schoolLinks: { name: string; href: string }[];
    programsHeading: string;
    programLinks: { name: string; href: string }[];
    contactHeading: string;
    campusesLine1: string;
    campusesLine2: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    scheduleVisitFixed: string;
  };
  brochure: {
    selectLevel: string;
    modalSubtitle: string;
    downloadPdf: string;
    closeAriaLabel: string;
    levels: {
      maternalKinder: string;
      primaria: string;
      secundaria: string;
      preparatoria: string;
    };
  };
  campusDetail: {
    facilitiesTitle: string;
    facilitiesTitleAccent: string;
    activitiesTitle: string;
    activitiesTitleAccent: string;
    directorTitle: string;
    directorTitleAccent: string;
    ctaTitle: string;
    ctaTitleAccent: string;
    ctaSubtitle: string;
    ctaScheduleVisit: string;
    ctaWhatsapp: string;
    backToHome: string;
    // Location Map
    locationTitle: string;
    locationTitleAccent: string;
    getDirections: string;
    // Admissions Process
    admissionsTitle: string;
    admissionsTitleAccent: string;
    admissionsSubtitle: string;
    admissionsStepLabel: string;
    admissionsSteps: { title: string; description: string }[];
    // Campus Life Gallery
    galleryTitle: string;
    galleryTitleAccent: string;
    // Testimonials
    testimonialsTitle: string;
    testimonialsTitleAccent: string;
    testimonialsReviewsLabel: string;
  };
  metadata: {
    title: string;
    description: string;
  };
}
