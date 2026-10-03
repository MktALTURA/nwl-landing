import type { BecaCategoria, BecaPublicStatus } from './contract';

/* ------------------------------------------------------------------ */
/*  Copy for the becas page, status and verify pages. ES is the        */
/*  primary language (the page renders Spanish first); EN mirrors it  */
/*  for the site-wide toggle. Brand constants stay in English.        */
/*                                                                     */
/*  Kept out of lib/i18n/* on purpose: the global dictionary ships on  */
/*  every page and this is a few KB that only /becas needs.           */
/* ------------------------------------------------------------------ */

export type Locale = 'es' | 'en';

export interface CategoryCopy {
  key: BecaCategoria;
  name: string;
  tagline: string;
  requirement: string;
  needs: string[];
  forWhom: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface BecasCopy {
  brand: { eyebrow: string; slogan: string };
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    pct: string;
    pctLabel: string;
    ctaApply: string;
    ctaCalc: string;
    noCounter: string;
  };
  counter: { eyebrow: string; label: string; perCampus: string; updated: string; full: string };
  categories: { eyebrow: string; title: string; titleAccent: string; intro: string; needsLabel: string; choose: string; items: CategoryCopy[] };
  calculator: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    campus: string;
    ciclo: string;
    cicloActual: string;
    cicloSiguiente: string;
    grado: string;
    gradoPlaceholder: string;
    referrals: string;
    referralsHint: string;
    referralsMax: string;
    listPrice: string;
    withBeca: string;
    perMonth: string;
    savingsMonth: string;
    savingsYear: string;
    pctOff: string;
    bars: string;
    barsHint: string;
    pickToSee: string;
    referencia: string;
    finePrint: string[];
    cta: string;
    srTable: { caption: string; concept: string; amount: string };
  };
  how: { eyebrow: string; title: string; titleAccent: string; steps: { n: string; title: string; body: string }[]; limited: string };
  apply: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    stepLabel: (n: number, total: number) => string;
    steps: { contact: string; student: string; category: string; review: string };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    hints: Record<string, string>;
    consent: string;
    consentLink: string;
    newFamilyQ: string;
    newFamilyYes: string;
    newFamilyNo: string;
    newFamilyBlock: string;
    nivelOptions: { value: string; label: string }[];
    yesNo: { yes: string; no: string };
    fromCalc: string;
    change: string;
    uploadTitle: Record<'boleta' | 'evidencia', string>;
    uploadHint: string;
    uploadOrLink: string;
    uploadBtn: string;
    uploadRemove: string;
    uploadRetry: string;
    uploadStates: Record<'compressing' | 'uploading' | 'done' | 'error', string>;
    reviewTitle: string;
    reviewEdit: string;
    next: string;
    back: string;
    submit: string;
    submitting: string;
    errors: Record<string, string>;
    retry: string;
    whatsappFallback: string;
    success: { eyebrow: string; title: string; body: string; folio: string; cta: string; secondary: string };
    alreadySent: { title: string; cta: string };
    draftRestored: string;
  };
  rules: { eyebrow: string; title: string; titleAccent: string; intro: string; campus: string; levels: string; items: string[] };
  referrals: { eyebrow: string; title: string; titleAccent: string; body: string; ladder: string; note: string };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  finalCta: { title: string; body: string; whatsapp: string; whatsappText: string };
  status: {
    eyebrow: string;
    title: string;
    labels: Record<BecaPublicStatus, string>;
    folio: string;
    daysLeft: (n: number) => string;
    deadline: string;
    extended: string;
    carta: string;
    whatsapp: string;
    whatsappText: (folio: string) => string;
    conditions: string;
    nextStep: string;
    notFound: { title: string; body: string; cta: string };
  };
  verify: {
    eyebrow: string;
    title: string;
    valid: string;
    invalid: string;
    invalidBody: string;
    estado: Record<'vigente' | 'confirmada' | 'vencida' | 'no_vigente', string>;
    fields: { folio: string; alumno: string; categoria: string; campus: string; ciclo: string; beca: string; vence: string; emitida: string };
  };
  demoRibbon: string;
  closed: { title: string; body: string; cta: string };
}

const CATEGORY_NAMES: Record<BecaCategoria, { es: string; en: string }> = {
  deportiva: { es: 'Beca Deportiva', en: 'Sports Scholarship' },
  academica: { es: 'Beca Académica', en: 'Academic Scholarship' },
  cultural: { es: 'Beca Cultural', en: 'Arts Scholarship' },
  espiritu: { es: 'Beca Espíritu NWL', en: 'NWL Spirit Scholarship' },
};

export function categoryName(key: BecaCategoria, locale: Locale): string {
  return CATEGORY_NAMES[key][locale];
}

const es: BecasCopy = {
  brand: { eyebrow: 'Programa de Becas · NWL Australian School', slogan: 'Be Proud. Be NWL.' },
  hero: {
    title: 'Tu talento tiene',
    titleAccent: 'beca.',
    subtitle:
      'Deporte, promedio, arte o simplemente ganas de pertenecer. Toda familia nueva puede aplicar. Respuesta al siguiente día hábil.',
    pct: '30%',
    pctLabel: 'en colegiatura',
    ctaApply: 'Solicita tu beca',
    ctaCalc: 'Calcula tu ahorro',
    noCounter: 'Respuesta al siguiente día hábil',
  },
  counter: {
    eyebrow: 'Becas disponibles',
    label: 'en los 4 campus',
    perCampus: 'por campus',
    updated: 'actualizado hace un momento',
    full: 'sin cupo',
  },
  categories: {
    eyebrow: 'Cuatro caminos',
    title: 'Una beca para cada',
    titleAccent: 'tipo de talento.',
    intro: 'Elige la categoría que mejor describe a tu hijo o hija. Solo se aplica a una.',
    needsLabel: 'Qué necesitas',
    choose: 'Aplicar con esta',
    items: [
      {
        key: 'deportiva',
        name: 'Beca Deportiva',
        tagline: 'Para quien ya compite.',
        requirement: 'Competencia a nivel estatal o superior en los últimos dos años.',
        needs: ['Constancia, credencial de liga o federación, o liga a resultados', 'El alumno sigue en su equipo y representa a NWL'],
        forWhom: 'Cualquier deporte, cualquier grado.',
      },
      {
        key: 'academica',
        name: 'Beca Académica',
        tagline: 'Para quien ya destaca.',
        requirement: 'Promedio de 8.5 o más en la última boleta oficial SEP.',
        needs: ['Foto o PDF de la última boleta', 'Promedio general declarado'],
        forWhom: 'De 2º de Primaria en adelante.',
      },
      {
        key: 'cultural',
        name: 'Beca Cultural',
        tagline: 'Para quien ya crea.',
        requirement: 'Un año o más de formación, o una presentación, exposición o concurso público.',
        needs: ['Constancia de academia, programa del evento o liga a video', 'Música, danza, teatro o artes visuales'],
        forWhom: 'Cualquier grado.',
      },
      {
        key: 'espiritu',
        name: 'Beca Espíritu NWL',
        tagline: 'Para quien quiere pertenecer.',
        requirement: 'Una carta breve: por qué su familia y NWL se entienden.',
        needs: ['Solo la carta, escrita en el formulario', 'Sin documentos'],
        forWhom: 'Todos los grados, incluidos Maternal y Kinder.',
      },
    ],
  },
  calculator: {
    eyebrow: 'Calculadora',
    title: 'Cuánto pagarías',
    titleAccent: 'con beca.',
    intro: 'Elige campus, ciclo y grado. Agrega las familias que recomendarías.',
    campus: 'Campus',
    ciclo: 'Ciclo escolar',
    cicloActual: 'Ingreso inmediato',
    cicloSiguiente: 'Próximo ciclo',
    grado: 'Grado',
    gradoPlaceholder: 'Elige el grado',
    referrals: 'Familias referidas',
    referralsHint: '+10% por cada familia que recomiendes y se inscriba',
    referralsMax: 'Tope: colegiatura al 100%',
    listPrice: 'Colegiatura de lista',
    withBeca: 'Con beca',
    perMonth: 'al mes, pagando del 1 al 10',
    savingsMonth: 'Ahorras al mes',
    savingsYear: 'Ahorras al año',
    pctOff: 'de descuento en colegiatura',
    bars: 'de cada 10 colegiaturas',
    barsHint: 'Cada barra es una colegiatura del ciclo. Lo dorado es lo que no pagas.',
    pickToSee: 'Elige campus, ciclo y grado para ver tu estimado.',
    referencia: 'La lista {ciclo} aún no se publica. Se muestra la lista {ref} con un ajuste estimado de {ajuste}.',
    finePrint: [
      'La beca aplica sobre la colegiatura mensual pagando del día 1 al 10.',
      'No se combina con el descuento por pronto pago.',
      'No aplica a inscripción, cuota única ni materiales.',
      'Estimado informativo. Tu hoja de inversión oficial la entrega el campus.',
    ],
    cta: 'Aplicar con estos datos',
    srTable: { caption: 'Resumen del cálculo', concept: 'Concepto', amount: 'Monto' },
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos.',
    titleAccent: 'Un día hábil.',
    steps: [
      { n: '01', title: 'Aplica en línea', body: 'Cinco minutos desde tu celular. Tu asesora CAP te contacta ese mismo día.' },
      { n: '02', title: 'Recibe tu respuesta', body: 'Al siguiente día hábil, por correo y WhatsApp, con tu carta de beca.' },
      { n: '03', title: 'Inscríbete en 14 días', body: 'Tu beca queda apartada dos semanas. Después, el lugar vuelve a estar disponible.' },
    ],
    limited: 'Cupo limitado por campus',
  },
  apply: {
    eyebrow: 'Solicitud',
    title: 'Aplica a tu',
    titleAccent: 'beca.',
    intro: 'Cuatro pasos cortos. Puedes guardar y seguir después desde el mismo celular.',
    stepLabel: (n, total) => `Paso ${n} de ${total}`,
    steps: { contact: 'Tus datos', student: 'El alumno', category: 'La beca', review: 'Revisar y enviar' },
    fields: {
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      email: 'Correo electrónico',
      telefono: 'WhatsApp',
      calle: 'Calle y número',
      colonia: 'Colonia',
      ciudad: 'Ciudad',
      cp: 'Código postal',
      alumnoNombres: 'Nombre(s) del alumno',
      alumnoApPaterno: 'Apellido paterno',
      alumnoApMaterno: 'Apellido materno',
      nacimiento: 'Fecha de nacimiento',
      campus: 'Campus',
      ciclo: 'Ciclo de ingreso',
      grado: 'Grado al que ingresa',
      escuela: 'Escuela actual',
      gradoActual: 'Grado actual',
      categoria: 'Categoría de beca',
      promedio: 'Promedio general de la última boleta',
      deporte: 'Deporte',
      nivelCompetencia: 'Nivel más alto en el que ha competido',
      anioCompetencia: 'Año de esa competencia',
      disciplina: 'Disciplina',
      anosFormacion: 'Años de formación',
      presentacionPublica: '¿Ha participado en una presentación, exposición o concurso público?',
      evidenciaUrl: 'Liga a video, resultados o constancia (opcional)',
      cartaMotivos: 'Carta de motivos',
      referidoPor: '¿Quién te recomendó NWL? (opcional)',
      referidoCodigo: 'Código de referido (opcional)',
    },
    placeholders: {
      nombre: 'María',
      apellidos: 'García López',
      email: 'maria@correo.com',
      telefono: '442 123 4567',
      calle: 'Av. de las Pitahayas 120',
      colonia: 'Zibatá',
      ciudad: 'Querétaro',
      cp: '76269',
      alumnoNombres: 'Sofía',
      alumnoApPaterno: 'García',
      alumnoApMaterno: 'López',
      escuela: 'Nombre de la escuela',
      promedio: '9.2',
      deporte: 'Natación',
      disciplina: 'Piano',
      evidenciaUrl: 'https://',
      cartaMotivos: 'Cuéntanos quién es tu hijo o hija, qué le gusta y por qué NWL. Con tus palabras.',
      referidoPor: 'Nombre de la familia o alumno',
      referidoCodigo: 'NWL-XXXXXX',
    },
    hints: {
      telefono: 'A 10 dígitos. Te escribimos aquí.',
      promedio: 'Escala 5 a 10. La boleta la subes en el siguiente paso.',
      cartaMotivos: 'Entre 400 y 3,000 caracteres.',
      nacimiento: 'Nos ayuda a ubicar al alumno si ya tenemos una solicitud.',
    },
    consent: 'He leído el aviso de privacidad y acepto que NWL Australian School use estos datos para evaluar la solicitud de beca.',
    consentLink: 'Leer aviso de privacidad',
    newFamilyQ: '¿El alumno ya estudia en algún campus NWL?',
    newFamilyYes: 'No, somos familia nueva',
    newFamilyNo: 'Sí, ya estudia en NWL',
    newFamilyBlock:
      'Las becas de este programa son para familias nuevas. Si ya estudian con nosotros, el programa de referidos sí aplica: recomienda una familia y recibe 10% al inscribirse. Escríbenos por WhatsApp y te explicamos.',
    nivelOptions: [
      { value: 'estatal', label: 'Estatal' },
      { value: 'regional', label: 'Regional' },
      { value: 'nacional', label: 'Nacional' },
      { value: 'internacional', label: 'Internacional' },
    ],
    yesNo: { yes: 'Sí', no: 'No' },
    fromCalc: 'Tomado de tu cálculo',
    change: 'Cambiar',
    uploadTitle: { boleta: 'Última boleta oficial', evidencia: 'Constancia o evidencia' },
    uploadHint: 'Foto o PDF. Hasta 10 MB. Las fotos se comprimen solas.',
    uploadOrLink: 'O pega una liga abajo.',
    uploadBtn: 'Subir archivo',
    uploadRemove: 'Quitar',
    uploadRetry: 'Reintentar',
    uploadStates: { compressing: 'Preparando…', uploading: 'Subiendo…', done: 'Listo', error: 'No se pudo subir' },
    reviewTitle: 'Revisa antes de enviar',
    reviewEdit: 'Editar',
    next: 'Continuar',
    back: 'Atrás',
    submit: 'Enviar solicitud',
    submitting: 'Enviando…',
    errors: {
      required: 'Este campo es necesario.',
      email: 'Revisa el correo.',
      phone: 'Son 10 dígitos, sin espacios ni lada internacional.',
      cp: 'Son 5 dígitos.',
      date: 'Revisa la fecha.',
      promedio: 'Un número entre 5 y 10.',
      promedioLow: 'Con menos de 8.5 la Beca Académica no aplica. Puedes elegir Espíritu NWL con un clic.',
      switchEspiritu: 'Cambiar a Espíritu NWL',
      url: 'Revisa la liga (debe empezar con https://).',
      carta: 'Cuéntanos un poco más: mínimo 400 caracteres.',
      cartaLong: 'Máximo 3,000 caracteres.',
      evidence: 'Sube un archivo o pega una liga.',
      boleta: 'Sube la boleta para continuar.',
      consent: 'Necesitamos tu consentimiento para continuar.',
      newFamily: 'Elige una opción.',
      categoria: 'Elige una categoría.',
      year: 'Debe ser de los últimos dos años.',
      network: 'No pudimos conectar. Tus datos siguen aquí: inténtalo de nuevo.',
      rate_limited: 'Demasiados intentos. Espera unos minutos.',
      duplicate: 'Ya tenemos una solicitud para este alumno. Te reenviamos tu liga por correo.',
      closed: 'La convocatoria está cerrada por ahora.',
      no_cupo: 'Ese campus no tiene becas disponibles hoy. Puedes elegir otro o quedar en lista de espera.',
      too_large: 'El archivo es demasiado grande. Toma una foto o pega una liga.',
      bad_type: 'Solo fotos (JPG, PNG, HEIC) o PDF.',
      upstream: 'Algo falló de nuestro lado. Inténtalo de nuevo en un momento.',
    },
    retry: 'Reintentar',
    whatsappFallback: 'O envíanos tus datos por WhatsApp',
    success: {
      eyebrow: 'Solicitud recibida',
      title: 'Listo.',
      body: 'Te enviamos la confirmación por correo y WhatsApp. Tu respuesta llega el siguiente día hábil.',
      folio: 'Folio',
      cta: 'Ver el estatus de mi solicitud',
      secondary: 'Aplicar para otro hijo o hija',
    },
    alreadySent: { title: 'Ya enviaste una solicitud desde este dispositivo.', cta: 'Ver estatus' },
    draftRestored: 'Recuperamos lo que llevabas.',
  },
  rules: {
    eyebrow: 'Campus y condiciones',
    title: 'Lo que debes',
    titleAccent: 'saber.',
    intro: 'Las becas se asignan por campus y por nivel. Así de claro.',
    campus: 'Campus',
    levels: 'Niveles con beca',
    items: [
      'La beca pertenece al campus donde se otorga. No se transfiere entre campus.',
      'Aplica solo en los niveles que el campus ofrece. Se conserva al pasar de nivel dentro del mismo campus.',
      'Se renueva cada ciclo mientras la familia esté al corriente en pagos y el alumno siga inscrito.',
      '30% sobre la colegiatura mensual pagando del día 1 al 10. No incluye inscripción, cuota única ni materiales.',
      'No se combina con el descuento por pronto pago ni con otras promociones.',
      'Una solicitud por alumno. Una categoría por solicitud.',
      'Programa exclusivo para familias de nuevo ingreso.',
    ],
  },
  referrals: {
    eyebrow: 'Referidos',
    title: 'Recomienda y',
    titleAccent: 'suma 10%.',
    body: 'Por cada familia que recomiendes y se inscriba, tu beca crece 10%. Sin tope hasta llegar al 100% de la colegiatura. Cualquier familia NWL puede recomendar, sea becaria o no.',
    ladder: 'Así crece tu descuento',
    note: 'La familia referida no puede ser familiar directo. El 10% se aplica una vez que la familia referida se inscribe y paga.',
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que nos preguntan',
    items: [
      { id: 'quien', q: '¿Quién puede aplicar?', a: 'Cualquier familia nueva en NWL con un alumno que ingrese a Maternal, Kinder, Primaria, Secundaria o Preparatoria en Milenio, Corregidora, San Miguel de Allende o Juriquilla. Una solicitud por alumno.' },
      { id: 'cuanto', q: '¿Cuánto es la beca?', a: '30% sobre la colegiatura mensual, pagando del día 1 al 10. Es el mismo monto para las cuatro categorías. Puede crecer 10% por cada familia que recomiendes y se inscriba.' },
      { id: 'tiempo', q: '¿Cuánto tarda la respuesta?', a: 'La recibes el siguiente día hábil por correo y WhatsApp. El mismo día que aplicas, tu asesora CAP te contacta.' },
      { id: 'ventana', q: '¿Qué pasa si no me inscribo en 14 días?', a: 'La beca se libera y el lugar vuelve al cupo. Tu asesora puede revisar una extensión única de 7 días si la pides a tiempo.' },
      { id: 'documentos', q: '¿Qué documentos necesito?', a: 'Depende de la categoría: la última boleta SEP para la Académica, una constancia o liga para la Deportiva y la Cultural, y nada para Espíritu NWL. Se suben desde el celular.' },
      { id: 'hermanos', q: '¿Aplica si tengo dos hijos?', a: 'Sí. Cada alumno nuevo presenta su propia solicitud. El descuento por hermanos del campus se aplica además de la beca en la hoja de inversión.' },
      { id: 'zibata', q: '¿Y el campus Zibatá?', a: 'Por ahora Zibatá no participa en el programa. Si te interesa ese campus, escríbenos y te atendemos con las opciones disponibles.' },
      { id: 'renovar', q: '¿La beca es para siempre?', a: 'Se renueva cada ciclo escolar mientras la familia esté al corriente y el alumno siga inscrito en el mismo campus.' },
      { id: 'inscripcion', q: '¿Incluye inscripción?', a: 'No. La beca aplica a la colegiatura mensual. La inscripción, la cuota única y los materiales se pagan según la hoja de inversión de tu campus.' },
      { id: 'privacidad', q: '¿Qué pasa con mis documentos?', a: 'Se guardan en un almacén privado al que solo accede el personal de admisiones de tu campus, únicamente para evaluar la solicitud, conforme a nuestro aviso de privacidad.' },
    ],
  },
  finalCta: {
    title: '¿Tienes dudas? Hablemos.',
    body: 'Tu asesora CAP te ayuda a llenar la solicitud y resuelve cualquier pregunta sobre tu campus.',
    whatsapp: 'Escríbenos por WhatsApp',
    whatsappText: 'Hola, quiero información sobre el Programa de Becas NWL.',
  },
  status: {
    eyebrow: 'Mi solicitud',
    title: 'Estatus de tu beca',
    labels: {
      en_revision: 'En revisión',
      lista_espera: 'En lista de espera',
      aprobada: 'Beca aprobada',
      inscrita: 'Inscripción confirmada',
      vencida: 'Ventana vencida',
      no_aprobada: 'No aprobada',
      cancelada: 'Cancelada',
    },
    folio: 'Folio',
    daysLeft: (n) => (n === 1 ? '1 día' : `${n} días`),
    deadline: 'para inscribirte',
    extended: 'Ventana extendida',
    carta: 'Descargar carta de beca',
    whatsapp: 'Escribir a mi asesora',
    whatsappText: (folio) => `Hola, tengo la solicitud de beca ${folio} y quiero agendar mi inscripción.`,
    conditions: 'Condiciones de tu beca',
    nextStep: 'Siguiente paso',
    notFound: { title: 'No encontramos esa solicitud.', body: 'La liga puede haber caducado. Escríbenos por WhatsApp con el nombre del alumno y te la reenviamos.', cta: 'Escribir por WhatsApp' },
  },
  verify: {
    eyebrow: 'Verificación',
    title: 'Carta de beca',
    valid: 'Carta válida',
    invalid: 'No pudimos verificar esta carta',
    invalidBody: 'El folio o el código no coinciden con ninguna beca emitida. Si tienes dudas, contacta al campus.',
    estado: { vigente: 'Vigente', confirmada: 'Inscripción confirmada', vencida: 'Vencida', no_vigente: 'No vigente' },
    fields: { folio: 'Folio', alumno: 'Alumno', categoria: 'Categoría', campus: 'Campus', ciclo: 'Ciclo', beca: 'Beca', vence: 'Vigente hasta', emitida: 'Emitida' },
  },
  demoRibbon: 'Demo · precios ilustrativos',
  closed: {
    title: 'La calculadora no está disponible en este momento.',
    body: 'Escríbenos por WhatsApp y tu asesora te comparte las opciones de beca de tu campus.',
    cta: 'Escribir por WhatsApp',
  },
};

const en: BecasCopy = {
  brand: { eyebrow: 'Scholarship Program · NWL Australian School', slogan: 'Be Proud. Be NWL.' },
  hero: {
    title: 'Your talent has a',
    titleAccent: 'scholarship.',
    subtitle: 'Sport, grades, the arts, or simply the will to belong. Every new family can apply. Answer the next business day.',
    pct: '30%',
    pctLabel: 'off monthly tuition',
    ctaApply: 'Apply now',
    ctaCalc: 'Calculate your savings',
    noCounter: 'Answer the next business day',
  },
  counter: { eyebrow: 'Scholarships available', label: 'across 4 campuses', perCampus: 'per campus', updated: 'updated a moment ago', full: 'full' },
  categories: {
    eyebrow: 'Four paths',
    title: 'A scholarship for every',
    titleAccent: 'kind of talent.',
    intro: 'Pick the category that best describes your child. One per application.',
    needsLabel: 'What you need',
    choose: 'Apply with this one',
    items: [
      { key: 'deportiva', name: 'Sports Scholarship', tagline: 'For those who already compete.', requirement: 'State-level competition or above in the last two years.', needs: ['Certificate, league or federation credential, or a results link', 'The student stays on their team and represents NWL'], forWhom: 'Any sport, any grade.' },
      { key: 'academica', name: 'Academic Scholarship', tagline: 'For those who already stand out.', requirement: 'Grade average of 8.5 or higher on the latest official SEP report card.', needs: ['Photo or PDF of the latest report card', 'Declared overall average'], forWhom: 'From 2nd grade of Primary School onward.' },
      { key: 'cultural', name: 'Arts Scholarship', tagline: 'For those who already create.', requirement: 'One year or more of training, or a public performance, exhibition or contest.', needs: ['Academy certificate, event programme or video link', 'Music, dance, theatre or visual arts'], forWhom: 'Any grade.' },
      { key: 'espiritu', name: 'NWL Spirit Scholarship', tagline: 'For those who want to belong.', requirement: 'A short letter: why your family and NWL fit.', needs: ['Just the letter, written in the form', 'No documents'], forWhom: 'All grades, including Maternal and Kinder.' },
    ],
  },
  calculator: {
    eyebrow: 'Calculator',
    title: 'What you would pay',
    titleAccent: 'with a scholarship.',
    intro: 'Choose campus, school year and grade. Add the families you would refer.',
    campus: 'Campus',
    ciclo: 'School year',
    cicloActual: 'Start now',
    cicloSiguiente: 'Next year',
    grado: 'Grade',
    gradoPlaceholder: 'Choose a grade',
    referrals: 'Referred families',
    referralsHint: '+10% for every family you refer that enrolls',
    referralsMax: 'Cap: 100% of tuition',
    listPrice: 'List tuition',
    withBeca: 'With scholarship',
    perMonth: 'per month, paying by the 10th',
    savingsMonth: 'Monthly savings',
    savingsYear: 'Yearly savings',
    pctOff: 'off monthly tuition',
    bars: 'of every 10 tuition payments',
    barsHint: 'Each bar is one monthly payment of the year. Gold is what you do not pay.',
    pickToSee: 'Choose campus, year and grade to see your estimate.',
    referencia: 'The {ciclo} list is not published yet. Showing the {ref} list with an estimated {ajuste} adjustment.',
    finePrint: [
      'The scholarship applies to monthly tuition paid between the 1st and the 10th.',
      'Not combinable with the early-payment discount.',
      'Does not apply to enrollment, the one-time fee or materials.',
      'Estimate for information only. Your official investment sheet comes from the campus.',
    ],
    cta: 'Apply with these details',
    srTable: { caption: 'Calculation summary', concept: 'Item', amount: 'Amount' },
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps.',
    titleAccent: 'One business day.',
    steps: [
      { n: '01', title: 'Apply online', body: 'Five minutes from your phone. Your CAP advisor contacts you the same day.' },
      { n: '02', title: 'Get your answer', body: 'The next business day, by email and WhatsApp, with your scholarship letter.' },
      { n: '03', title: 'Enroll within 14 days', body: 'Your scholarship is held for two weeks. After that, the spot opens up again.' },
    ],
    limited: 'Limited spots per campus',
  },
  apply: {
    eyebrow: 'Application',
    title: 'Apply for your',
    titleAccent: 'scholarship.',
    intro: 'Four short steps. You can save and continue later from the same phone.',
    stepLabel: (n, total) => `Step ${n} of ${total}`,
    steps: { contact: 'Your details', student: 'The student', category: 'The scholarship', review: 'Review and send' },
    fields: {
      nombre: 'First name',
      apellidos: 'Last name',
      email: 'Email',
      telefono: 'WhatsApp',
      calle: 'Street and number',
      colonia: 'Neighbourhood',
      ciudad: 'City',
      cp: 'Postal code',
      alumnoNombres: "Student's first name(s)",
      alumnoApPaterno: "Father's surname",
      alumnoApMaterno: "Mother's surname",
      nacimiento: 'Date of birth',
      campus: 'Campus',
      ciclo: 'Starting year',
      grado: 'Grade entering',
      escuela: 'Current school',
      gradoActual: 'Current grade',
      categoria: 'Scholarship category',
      promedio: 'Overall average on the latest report card',
      deporte: 'Sport',
      nivelCompetencia: 'Highest level competed at',
      anioCompetencia: 'Year of that competition',
      disciplina: 'Discipline',
      anosFormacion: 'Years of training',
      presentacionPublica: 'Has the student taken part in a public performance, exhibition or contest?',
      evidenciaUrl: 'Link to video, results or certificate (optional)',
      cartaMotivos: 'Letter of motivation',
      referidoPor: 'Who referred you to NWL? (optional)',
      referidoCodigo: 'Referral code (optional)',
    },
    placeholders: es.apply.placeholders,
    hints: {
      telefono: '10 digits. We will write to you here.',
      promedio: 'Scale 5 to 10. You upload the report card in the next step.',
      cartaMotivos: 'Between 400 and 3,000 characters.',
      nacimiento: 'Helps us find the student if we already have an application.',
    },
    consent: 'I have read the privacy notice and agree that NWL Australian School may use these details to evaluate the scholarship application.',
    consentLink: 'Read the privacy notice',
    newFamilyQ: 'Is the student already enrolled at an NWL campus?',
    newFamilyYes: 'No, we are a new family',
    newFamilyNo: 'Yes, already at NWL',
    newFamilyBlock:
      'This program is for new families. If you are already with us, the referral program does apply: refer a family and get 10% when they enroll. Write to us on WhatsApp and we will explain.',
    nivelOptions: [
      { value: 'estatal', label: 'State' },
      { value: 'regional', label: 'Regional' },
      { value: 'nacional', label: 'National' },
      { value: 'internacional', label: 'International' },
    ],
    yesNo: { yes: 'Yes', no: 'No' },
    fromCalc: 'From your calculation',
    change: 'Change',
    uploadTitle: { boleta: 'Latest official report card', evidencia: 'Certificate or evidence' },
    uploadHint: 'Photo or PDF. Up to 10 MB. Photos are compressed automatically.',
    uploadOrLink: 'Or paste a link below.',
    uploadBtn: 'Upload file',
    uploadRemove: 'Remove',
    uploadRetry: 'Retry',
    uploadStates: { compressing: 'Preparing…', uploading: 'Uploading…', done: 'Done', error: 'Upload failed' },
    reviewTitle: 'Review before sending',
    reviewEdit: 'Edit',
    next: 'Continue',
    back: 'Back',
    submit: 'Send application',
    submitting: 'Sending…',
    errors: {
      required: 'This field is required.',
      email: 'Check the email address.',
      phone: '10 digits, no spaces or country code.',
      cp: '5 digits.',
      date: 'Check the date.',
      promedio: 'A number between 5 and 10.',
      promedioLow: 'Below 8.5 the Academic Scholarship does not apply. You can switch to NWL Spirit in one click.',
      switchEspiritu: 'Switch to NWL Spirit',
      url: 'Check the link (it must start with https://).',
      carta: 'Tell us a bit more: at least 400 characters.',
      cartaLong: 'At most 3,000 characters.',
      evidence: 'Upload a file or paste a link.',
      boleta: 'Upload the report card to continue.',
      consent: 'We need your consent to continue.',
      newFamily: 'Choose an option.',
      categoria: 'Choose a category.',
      year: 'Must be within the last two years.',
      network: 'We could not connect. Your details are still here: try again.',
      rate_limited: 'Too many attempts. Wait a few minutes.',
      duplicate: 'We already have an application for this student. We are resending your link by email.',
      closed: 'Applications are closed for now.',
      no_cupo: 'That campus has no scholarships left today. Choose another or join the waitlist.',
      too_large: 'The file is too large. Take a photo or paste a link.',
      bad_type: 'Photos (JPG, PNG, HEIC) or PDF only.',
      upstream: 'Something failed on our side. Try again in a moment.',
    },
    retry: 'Retry',
    whatsappFallback: 'Or send us your details on WhatsApp',
    success: {
      eyebrow: 'Application received',
      title: 'Done.',
      body: 'We sent a confirmation by email and WhatsApp. Your answer arrives the next business day.',
      folio: 'Reference',
      cta: 'See my application status',
      secondary: 'Apply for another child',
    },
    alreadySent: { title: 'You already sent an application from this device.', cta: 'See status' },
    draftRestored: 'We restored what you had.',
  },
  rules: {
    eyebrow: 'Campuses and conditions',
    title: 'What you should',
    titleAccent: 'know.',
    intro: 'Scholarships are assigned per campus and per level. Plain and simple.',
    campus: 'Campus',
    levels: 'Levels with scholarships',
    items: [
      'The scholarship belongs to the campus that grants it. It does not transfer between campuses.',
      'It applies only at levels the campus offers, and carries over between levels within the same campus.',
      'It renews every school year while payments are current and the student stays enrolled.',
      '30% off monthly tuition paid between the 1st and the 10th. Enrollment, the one-time fee and materials are not included.',
      'Not combinable with the early-payment discount or other promotions.',
      'One application per student. One category per application.',
      'For new families only.',
    ],
  },
  referrals: {
    eyebrow: 'Referrals',
    title: 'Refer and',
    titleAccent: 'add 10%.',
    body: 'For every family you refer that enrolls, your scholarship grows by 10%, all the way to 100% of tuition. Any NWL family can refer, scholarship or not.',
    ladder: 'How your discount grows',
    note: 'The referred family cannot be an immediate relative. The 10% applies once the referred family enrolls and pays.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'What families ask us',
    items: [
      { id: 'quien', q: 'Who can apply?', a: 'Any family new to NWL with a student entering Maternal, Kinder, Primary, Secondary or Senior School at Milenio, Corregidora, San Miguel de Allende or Juriquilla. One application per student.' },
      { id: 'cuanto', q: 'How much is the scholarship?', a: '30% off monthly tuition paid by the 10th. The same amount for all four categories. It can grow by 10% for every family you refer that enrolls.' },
      { id: 'tiempo', q: 'How long does the answer take?', a: 'You get it the next business day by email and WhatsApp. The day you apply, your CAP advisor contacts you.' },
      { id: 'ventana', q: 'What if I do not enroll within 14 days?', a: 'The scholarship is released and the spot returns to the pool. Your advisor can review a single 7-day extension if you ask in time.' },
      { id: 'documentos', q: 'What documents do I need?', a: 'It depends on the category: the latest SEP report card for Academic, a certificate or link for Sports and Arts, and nothing for NWL Spirit. Everything uploads from your phone.' },
      { id: 'hermanos', q: 'Does it apply if I have two children?', a: 'Yes. Each new student files their own application. The campus sibling discount applies on top of the scholarship in the investment sheet.' },
      { id: 'zibata', q: 'What about the Zibatá campus?', a: 'Zibatá is not part of the program for now. If you are interested in that campus, write to us and we will walk you through the options.' },
      { id: 'renovar', q: 'Is the scholarship for good?', a: 'It renews every school year while the family is current on payments and the student stays enrolled at the same campus.' },
      { id: 'inscripcion', q: 'Does it include enrollment?', a: 'No. The scholarship applies to monthly tuition. Enrollment, the one-time fee and materials follow your campus investment sheet.' },
      { id: 'privacidad', q: 'What happens to my documents?', a: 'They are kept in private storage that only your campus admissions staff can access, solely to evaluate the application, under our privacy notice.' },
    ],
  },
  finalCta: {
    title: 'Questions? Let’s talk.',
    body: 'Your CAP advisor helps you fill out the application and answers anything about your campus.',
    whatsapp: 'Write to us on WhatsApp',
    whatsappText: 'Hola, quiero información sobre el Programa de Becas NWL.',
  },
  status: {
    eyebrow: 'My application',
    title: 'Scholarship status',
    labels: {
      en_revision: 'Under review',
      lista_espera: 'On the waitlist',
      aprobada: 'Scholarship approved',
      inscrita: 'Enrollment confirmed',
      vencida: 'Window expired',
      no_aprobada: 'Not approved',
      cancelada: 'Cancelled',
    },
    folio: 'Reference',
    daysLeft: (n) => (n === 1 ? '1 day' : `${n} days`),
    deadline: 'to enroll',
    extended: 'Window extended',
    carta: 'Download scholarship letter',
    whatsapp: 'Message my advisor',
    whatsappText: (folio) => `Hola, tengo la solicitud de beca ${folio} y quiero agendar mi inscripción.`,
    conditions: 'Your scholarship conditions',
    nextStep: 'Next step',
    notFound: { title: 'We could not find that application.', body: 'The link may have expired. Write to us on WhatsApp with the student’s name and we will resend it.', cta: 'Write on WhatsApp' },
  },
  verify: {
    eyebrow: 'Verification',
    title: 'Scholarship letter',
    valid: 'Valid letter',
    invalid: 'We could not verify this letter',
    invalidBody: 'The reference or code does not match any issued scholarship. If in doubt, contact the campus.',
    estado: { vigente: 'Valid', confirmada: 'Enrollment confirmed', vencida: 'Expired', no_vigente: 'Not valid' },
    fields: { folio: 'Reference', alumno: 'Student', categoria: 'Category', campus: 'Campus', ciclo: 'School year', beca: 'Scholarship', vence: 'Valid until', emitida: 'Issued' },
  },
  demoRibbon: 'Demo · illustrative prices',
  closed: {
    title: 'The calculator is not available right now.',
    body: 'Write to us on WhatsApp and your advisor will share the scholarship options at your campus.',
    cta: 'Write on WhatsApp',
  },
};

export const BECAS_COPY: Record<Locale, BecasCopy> = { es, en };

/** FAQ copy used for the FAQPage JSON-LD (always the primary language). */
export const BECAS_FAQ_ES = es.faq.items;
