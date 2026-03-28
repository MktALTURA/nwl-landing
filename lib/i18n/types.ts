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
  partnerships: {
    sectionTitle: string;
    sectionTitleAccent: string;
    sectionSubtitle: string;
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
  maternal: {
    ageBadge: string;
    tagline: string;
    subtitle: string;
    description: string;
    statBilingual: string;
    statCampuses: string;
    schedule: string;
    statSchedule: string;
    uniqueBadge: string;
    featuresTitle: string;
    features: { title: string; description: string; logo?: string; logo2?: string }[];
    testimonial: string;
    testimonialAuthor: string;
    cta: string;
    ctaSecondary: string;
  };
  maternalPage: {
    heroHeadline: string;
    heroSubheadline: string;
    backToHome: string;
    dayTitle: string;
    dayTitleAccent: string;
    daySubtitle: string;
    daySchedule: { time: string; activity: string; icon: string }[];
    philosophyTitle: string;
    philosophyTitleAccent: string;
    philosophyDescription: string;
    philosophyPillars: { title: string; description: string }[];
    galleryTitle: string;
    galleryTitleAccent: string;
  };
  kinder: {
    ageBadge: string;
    tagline: string;
    description: string;
    statBilingual: string;
    statCampuses: string;
    schedule: string;
    statSchedule: string;
    testimonial: string;
    testimonialAuthor: string;
    cta: string;
    ctaSecondary: string;
  };
  kinderPage: {
    heroHeadline: string;
    heroSubheadline: string;
    backToHome: string;
    overviewTitle: string;
    overviewTitleAccent: string;
    pillarsTitle: string;
    pillarsTitleAccent: string;
    pillarsSubtitle: string;
    pillars: { title: string; subtitle: string; description: string; logo?: string; logo2?: string }[];
    galleryTitle: string;
    galleryTitleAccent: string;
    dayTitle: string;
    dayTitleAccent: string;
    daySchedule: { time: string; activity: string; icon: string }[];
  };
  elementary: {
    ageBadge: string;
    tagline: string;
    description: string;
    statBilingual: string;
    statCampuses: string;
    statNoHomework: string;
    schedule: string;
    statSchedule: string;
    testimonial: string;
    testimonialAuthor: string;
    cta: string;
    ctaSecondary: string;
  };
  elementaryPage: {
    heroHeadline: string;
    heroSubheadline: string;
    backToHome: string;
    overviewTitle: string;
    overviewTitleAccent: string;
    pillarsTitle: string;
    pillarsTitleAccent: string;
    pillarsSubtitle: string;
    pillars: { title: string; subtitle: string; description: string; logo?: string; logo2?: string }[];
    knotionTitle: string;
    knotionTitleAccent: string;
    knotionSubtitle: string;
    knotionPhases: { name: string; title: string }[];
    steamTitle: string;
    steamTitleAccent: string;
    steamSubtitle: string;
    steamFeatures: { title: string; description: string }[];
    differentiatorsSectionTitle: string;
    differentiators: { title: string; description: string }[];
    activitiesTitle: string;
    activitiesTitleAccent: string;
    activitiesSubtitle: string;
    activities: { name: string; description: string }[];
    activitiesNote: string;
    galleryTitle: string;
    galleryTitleAccent: string;
    galleryComingSoon: string;
  };
  middleSchool: {
    ageBadge: string;
    tagline: string;
    description: string;
    statBilingual: string;
    statCampuses: string;
    statCertifications: string;
    schedule: string;
    statSchedule: string;
    testimonial: string;
    testimonialAuthor: string;
    cta: string;
    ctaSecondary: string;
  };
  middleSchoolPage: {
    heroHeadline: string;
    heroSubheadline: string;
    backToHome: string;
    // Transformation section
    transformationTitle: string;
    transformationTitleAccent: string;
    transformationBefore: string;
    transformationBeforeItems: string[];
    transformationAfter: string;
    transformationAfterItems: string[];
    // Pillars
    pillarsTitle: string;
    pillarsTitleAccent: string;
    pillarsSubtitle: string;
    pillars: { title: string; subtitle: string; description: string; logo?: string; logo2?: string }[];
    // Exclusive programs
    exclusiveTitle: string;
    exclusiveTitleAccent: string;
    exclusiveSubtitle: string;
    exclusivePrograms: {
      title: string;
      partner: string;
      description: string;
      highlights: string[];
    }[];
    exclusiveQuote: string;
    // Knotion
    knotionTitle: string;
    knotionTitleAccent: string;
    knotionSubtitle: string;
    knotionPhases: { name: string; title: string; description: string }[];
    // Differentiators
    differentiatorsSectionTitle: string;
    differentiators: { title: string; description: string }[];
    // Activities
    activitiesTitle: string;
    activitiesTitleAccent: string;
    activitiesSubtitle: string;
    activities: { name: string; description: string }[];
    activitiesNote: string;
    // Gallery
    galleryTitle: string;
    galleryTitleAccent: string;
  };
  highSchool: {
    ageBadge: string;
    tagline: string;
    description: string;
    statBilingual: string;
    statCampuses: string;
    statCertifications: string;
    statProjects: string;
    schedule: string;
    statSchedule: string;
    cta: string;
    ctaSecondary: string;
  };
  highSchoolPage: {
    heroHeadline: string;
    heroSubheadline: string;
    backToHome: string;
    // Value props
    valuePropsTitle: string;
    valuePropsTitleAccent: string;
    valuePropsSubtitle: string;
    valueProps: { title: string; description: string }[];
    // Life Project Journey (6-semester timeline)
    journeyTitle: string;
    journeyTitleAccent: string;
    journeySubtitle: string;
    semesters: {
      number: string;
      theme: string;
      skills: string[];
      project: string;
    }[];
    // Life Project Model (3 pillars)
    pillarsTitle: string;
    pillarsTitleAccent: string;
    pillarsSubtitle: string;
    pillars: { title: string; subtitle: string; description: string }[];
    // Exclusive Programs
    exclusiveTitle: string;
    exclusiveTitleAccent: string;
    exclusiveSubtitle: string;
    exclusivePrograms: {
      title: string;
      partner: string;
      description: string;
      highlights: string[];
    }[];
    // McGraw-Hill Academic section
    academicTitle: string;
    academicTitleAccent: string;
    academicDescription: string;
    academicHighlights: string[];
    academicPlanCta: string;
    // University Pathways
    universityPathwaysTitle: string;
    universityPathwaysTitleAccent: string;
    universityPathwaysSubtitle: string;
    universityPathwaysDescription: string;
    universityPathwaysFootnote: string;
    // Gallery
    galleryTitle: string;
    galleryTitleAccent: string;
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
  careers: {
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    heroCta: string;
    // Why Work at NWL
    whyTitle: string;
    whyTitleAccent: string;
    whySubtitle: string;
    whyBenefits: { title: string; description: string }[];
    // Job Listings
    jobsTitle: string;
    jobsTitleAccent: string;
    jobsSubtitle: string;
    jobsFilterAll: string;
    jobsNoPositions: string;
    jobsApplyBtn: string;
    jobsRequirements: string;
    jobsDepartment: string;
    // Application Process
    processTitle: string;
    processTitleAccent: string;
    processSubtitle: string;
    processSteps: { title: string; description: string }[];
    // GHL Form
    applicationFormId: string;
    applicationFormName: string;
    applicationFormTitle: string;
    // Become a Partner
    partnerTitle: string;
    partnerTitleAccent: string;
    partnerSubtitle: string;
    partnerDescription: string;
    partnerFormId: string;
    partnerFormName: string;
    partnerFormTitle: string;
    partnerBenefits: { title: string; description: string }[];
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    loginPasswordLabel: string;
    loginPasswordPlaceholder: string;
    loginButton: string;
    loginError: string;
    loginRateLimit: string;
    // Dashboard
    dashboardTitle: string;
    newJobButton: string;
    logoutButton: string;
    noJobs: string;
    tableTitle: string;
    tableCampus: string;
    tableStatus: string;
    tableCreated: string;
    tableActions: string;
    statusActive: string;
    statusInactive: string;
    deleteConfirm: string;
    // Job Form
    formCreateTitle: string;
    formEditTitle: string;
    formTitleEn: string;
    formTitleEs: string;
    formCampus: string;
    formDescriptionEn: string;
    formDescriptionEs: string;
    formRequirementsEn: string;
    formRequirementsEs: string;
    formDepartmentEn: string;
    formDepartmentEs: string;
    formActive: string;
    formSave: string;
    formCancel: string;
    formSaving: string;
    campusLabels: Record<string, string>;
  };
  padres: {
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    selectCampus: string;
    selectCampusSubtitle: string;
    // Password gate
    passwordTitle: string;
    passwordSubtitle: string;
    passwordPlaceholder: string;
    passwordButton: string;
    passwordError: string;
    // Portal dashboard
    welcomeMessage: string;
    changeCampus: string;
    logoutButton: string;
    // Tabs
    tabCalendario: string;
    tabCafeteria: string;
    tabComunicados: string;
    tabUtiles: string;
    // Documents
    viewDocument: string;
    downloadDocument: string;
    noDocuments: string;
    noDocumentsDescription: string;
    // Campus portal link on campus pages
    campusPortalTitle: string;
    campusPortalDescription: string;
    campusPortalCta: string;
  };
  metadata: {
    title: string;
    description: string;
  };
}
