'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCheck, FiEdit2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Crest from '@/components/ui/Crest';
import type { BecaCategoria, NivelCompetencia, SiteCampusSlug } from '@/lib/becas/contract';
import { becasApi, ApiError, uploadToTicket } from '@/lib/becas/client';
import { prepareFile } from '@/lib/becas/compress';
import { clearDraft, loadDraft, saveDraft } from '@/lib/becas/draft';
import { formatCiclo } from '@/lib/becas/format';
import { categoryName } from '@/lib/becas/copy';
import { fireLeadConversion, toDetection } from '@/lib/conversions';
import { fireMetaEvent, isMetaTrackingHost, newEventId } from '@/lib/meta-pixel';
import { normalizePhoneMX } from '@/lib/phone';
import { collectAttribution } from '@/lib/wa-attribution';
import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';
import PillGroup from './PillGroup';
import { Checkbox, Choice, SelectField, TextField, TextareaField } from './application/Field';
import FileDrop from './application/FileDrop';
import {
  evidenceKind,
  initialState,
  reducer,
  validateStep1,
  validateStep2,
  validateStep3,
  type AppState,
  type Errors,
  type Step,
  type UploadItem,
} from './application/state';
import { BECAS_WHATSAPP } from './BecasFinalCTA';

const TOTAL_STEPS = 4;
const FORM_LABEL = 'becas_application';

function uuid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/* ------------------------------------------------------------------ */
/*  The application. Four steps, no <form>, draft persisted, one Lead.  */
/* ------------------------------------------------------------------ */

export default function BecasApplication() {
  const { catalog, copy, calc, locale, track, refreshLive, ref: refCode, scrollTo } = useBecas();
  const a = copy.apply;
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState(uuid(), newEventId()));
  const [errors, setErrors] = useState<Errors>({});
  const [hydrated, setHydrated] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interactedAt = useRef<number | null>(null);
  const formStarted = useRef(false);
  const stepSeen = useRef<Set<number>>(new Set());

  /* ── hydrate draft once ── */
  useEffect(() => {
    const draft = loadDraft<Partial<AppState>>();
    if (draft) {
      // Uploads that never finished can't resume without the bytes.
      const uploads = (draft.uploads ?? []).filter((u) => u.status === 'done');
      dispatch({ type: 'hydrate', state: { ...draft, uploads } });
      if (!draft.submitted) setDraftRestored(true);
      track('becas_draft_restored', { step: draft.step });
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── persist draft (debounced) ── */
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      const { request: _r, ...rest } = state;
      if (state.submitted) {
        saveDraft({ submitted: state.submitted, idempotencyKey: state.idempotencyKey, leadEventId: state.leadEventId, leadFired: state.leadFired });
      } else {
        saveDraft(rest);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [state, hydrated]);

  /* ── prefill from the calculator and the category cards ── */
  useEffect(() => {
    dispatch({
      type: 'prefill',
      contact: { campus: calc.campus, ciclo: calc.ciclo },
      student: { grado: calc.grado },
      categoria: calc.categoria,
    });
  }, [calc.campus, calc.ciclo, calc.grado, calc.categoria]);

  /* ── step change: focus heading, announce, track ── */
  useEffect(() => {
    if (!hydrated) return;
    if (!stepSeen.current.has(state.step)) {
      stepSeen.current.add(state.step);
      track('becas_step_view', { step: state.step });
    }
    if (stepSeen.current.size > 1) headingRef.current?.focus({ preventScroll: true });
  }, [state.step, hydrated, track]);

  const campusData = useMemo(() => catalog?.campuses.find((c) => c.slug === state.contact.campus), [catalog, state.contact.campus]);
  const cicloData = campusData && state.contact.ciclo ? campusData.ciclos[state.contact.ciclo] : undefined;
  const grados = cicloData?.grados ?? [];
  const gradoData = grados.find((g) => g.key === state.student.grado);
  const availableCategories = useMemo(() => {
    const enabled = new Set(catalog?.categorias.filter((c) => c.enabled).map((c) => c.key) ?? []);
    const byGrado = gradoData ? new Set(gradoData.categorias) : null;
    return copy.categories.items.filter((c) => enabled.has(c.key) && (!byGrado || byGrado.has(c.key)));
  }, [catalog, gradoData, copy.categories.items]);

  const err = (key: string) => (errors[key] ? a.errors[errors[key]] ?? errors[key] : undefined);
  const markInteract = () => {
    if (interactedAt.current === null) interactedAt.current = Date.now();
    if (!formStarted.current) {
      formStarted.current = true;
      track('becas_form_start');
    }
  };

  const goTo = useCallback(
    (step: Step) => {
      dispatch({ type: 'step', step });
      setErrors({});
      scrollTo('solicitud');
    },
    [scrollTo],
  );

  /* ── step 1 → start ── */
  const submitStep1 = useCallback(async () => {
    const e = validateStep1(state.contact);
    setErrors(e);
    if (Object.keys(e).length) return;
    dispatch({ type: 'request', request: { status: 'pending', stage: 'start' } });
    try {
      const res = await becasApi.start({
        idempotencyKey: state.idempotencyKey,
        campus: state.contact.campus,
        ciclo: state.contact.ciclo,
        grado: state.student.grado,
        padre: {
          nombre: state.contact.nombre.trim(),
          apellidos: state.contact.apellidos.trim(),
          email: state.contact.email.trim(),
          telefono: state.contact.telefono,
        },
        consent: { version: catalog?.consentVersion ?? '2026-10-a', aceptado: true },
        referido: refCode ? { codigo: refCode } : undefined,
        attribution: collectAttribution(),
        fromToken: state.token,
        eventId: state.leadEventId,
      });
      dispatch({ type: 'started', token: res.token });

      // The ONE Lead for this application. Persisted before firing so a reload
      // between the response and the flag can't double it.
      if (!state.leadFired && isMetaTrackingHost()) {
        dispatch({ type: 'leadFired' });
        fireLeadConversion(FORM_LABEL, 'lead', toDetection('native', interactedAt.current), state.leadEventId, {
          email: state.contact.email.trim(),
          phone: normalizePhoneMX(state.contact.telefono) ?? undefined,
        });
      } else if (!state.leadFired) {
        dispatch({ type: 'leadFired' });
      }
      track('becas_step_complete', { step: 1 });
      goTo(2);
    } catch (e2) {
      const code = e2 instanceof ApiError ? e2.code : 'upstream';
      const fields = e2 instanceof ApiError ? e2.fields : undefined;
      dispatch({ type: 'request', request: { status: 'error', stage: 'start', code, fields } });
      track('becas_error', { stage: 'start', code });
    }
  }, [state, catalog?.consentVersion, refCode, track, goTo]);

  /* ── step 2 ── */
  const submitStep2 = () => {
    const e = validateStep2(state.student);
    setErrors(e);
    if (Object.keys(e).length) return;
    track('becas_step_complete', { step: 2 });
    goTo(3);
  };

  /* ── step 3 ── */
  const submitStep3 = () => {
    const e = validateStep3(state.category, state.uploads, catalog);
    setErrors(e);
    if (Object.keys(e).length) return;
    track('becas_step_complete', { step: 3, category: state.category.id });
    goTo(4);
  };

  /* ── uploads ── */
  const runUpload = useCallback(
    async (localId: string, file: File, kind: 'boleta' | 'evidencia') => {
      if (!state.token) return;
      dispatch({ type: 'upload.update', localId, patch: { status: 'compressing', progress: 0.1, error: undefined } });
      const prepared = await prepareFile(file);
      if ('error' in prepared) {
        dispatch({ type: 'upload.update', localId, patch: { status: 'error', error: prepared.error } });
        track('becas_upload', { result: 'error', kind, code: prepared.error });
        return;
      }
      try {
        dispatch({ type: 'upload.update', localId, patch: { status: 'uploading', progress: 0.15, sizeKb: Math.round(prepared.blob.size / 1024) } });
        const ticket = await becasApi.documentTicket({
          token: state.token,
          kind,
          filename: prepared.filename,
          contentType: prepared.contentType,
          size: prepared.blob.size,
        });
        await uploadToTicket(ticket.uploadUrl, ticket.headers, prepared.blob, (f) =>
          dispatch({ type: 'upload.update', localId, patch: { progress: 0.15 + f * 0.85 } }),
        );
        dispatch({ type: 'upload.update', localId, patch: { status: 'done', progress: 1, docId: ticket.docId } });
        track('becas_upload', { result: 'ok', kind, size_bucket: prepared.blob.size > 2_000_000 ? 'large' : prepared.blob.size > 500_000 ? 'medium' : 'small' });
      } catch (e) {
        const code = e instanceof ApiError ? e.code : 'upstream';
        dispatch({ type: 'upload.update', localId, patch: { status: 'error', error: code } });
        track('becas_upload', { result: 'error', kind, code });
      }
    },
    [state.token, track],
  );

  const pendingFiles = useRef<Map<string, File>>(new Map());
  const onPick = (kind: 'boleta' | 'evidencia') => (files: FileList) => {
    markInteract();
    Array.from(files).forEach((file) => {
      const localId = uuid();
      pendingFiles.current.set(localId, file);
      dispatch({
        type: 'upload.add',
        item: { localId, kind, name: file.name, sizeKb: Math.round(file.size / 1024), status: 'compressing', progress: 0 },
      });
      void runUpload(localId, file, kind);
    });
  };
  const onRetry = (localId: string) => {
    const file = pendingFiles.current.get(localId);
    const item = state.uploads.find((u) => u.localId === localId);
    if (file && item) void runUpload(localId, file, item.kind);
    else dispatch({ type: 'upload.remove', localId });
  };

  /* ── submit ── */
  const submitAll = useCallback(async () => {
    if (!state.token) {
      goTo(1);
      return;
    }
    const e = { ...validateStep2(state.student), ...validateStep3(state.category, state.uploads, catalog) };
    if (Object.keys(e).length) {
      setErrors(e);
      goTo(errors.grado || e.alumnoNombres ? 2 : 3);
      return;
    }
    dispatch({ type: 'request', request: { status: 'pending', stage: 'submit' } });
    const c = state.category;
    const declarado: Record<string, unknown> = {};
    if (c.id === 'academica') declarado.promedio = Number(c.promedio.replace(',', '.'));
    if (c.id === 'deportiva') {
      declarado.deporte = c.deporte.trim();
      declarado.nivelCompetencia = c.nivelCompetencia;
      declarado.anioCompetencia = Number(c.anioCompetencia);
    }
    if (c.id === 'cultural') {
      declarado.disciplina = c.disciplina.trim();
      declarado.anosFormacion = Number(c.anosFormacion);
      declarado.presentacionPublica = c.presentacionPublica === true;
    }
    if (c.id === 'espiritu') declarado.cartaMotivos = c.cartaMotivos.trim();
    if (c.evidenciaUrl.trim()) declarado.evidenciaUrl = c.evidenciaUrl.trim();

    try {
      const res = await becasApi.submit({
        token: state.token,
        campus: state.contact.campus,
        ciclo: state.contact.ciclo,
        grado: state.student.grado,
        categoria: c.id,
        alumno: {
          nombres: state.student.nombres.trim(),
          apPaterno: state.student.apPaterno.trim(),
          apMaterno: state.student.apMaterno.trim() || undefined,
          nacimiento: state.student.nacimiento,
          gradoActual: state.student.gradoActual.trim() || undefined,
          escuelaProcedencia: state.student.escuela.trim() || undefined,
        },
        padre: {
          nombre: state.contact.nombre.trim(),
          apellidos: state.contact.apellidos.trim(),
          email: state.contact.email.trim(),
          telefono: state.contact.telefono,
          domicilio: {
            calle: state.student.calle.trim(),
            colonia: state.student.colonia.trim(),
            ciudad: state.student.ciudad.trim(),
            cp: state.student.cp.trim(),
          },
        },
        declarado,
        consent: { version: catalog?.consentVersion ?? '2026-10-a', aceptado: true },
        referido: c.referidoPor.trim() || c.referidoCodigo.trim() || refCode ? { por: c.referidoPor.trim() || undefined, codigo: (c.referidoCodigo.trim() || refCode || undefined)?.toUpperCase() } : undefined,
        documentIds: state.uploads.filter((u) => u.status === 'done' && u.docId).map((u) => u.docId),
      });
      dispatch({ type: 'submitted', folio: res.folio, statusUrl: res.statusUrl, token: res.token });
      track('becas_application_submit', {
        category: c.id,
        campus: state.contact.campus,
        ciclo: state.contact.ciclo,
        level: gradoData?.nivel,
        has_file: state.uploads.some((u) => u.status === 'done'),
        has_link: Boolean(c.evidenciaUrl.trim()),
        has_referrer: Boolean(c.referidoPor.trim() || c.referidoCodigo.trim() || refCode),
        calc_used: Boolean(calc.grado),
      });
      fireMetaEvent('CompleteRegistration', { content_name: 'beca', status: 'submitted' }, { eventId: `${state.leadEventId}-cr` });
      refreshLive();
      scrollTo('solicitud');
    } catch (e2) {
      const code = e2 instanceof ApiError ? e2.code : 'upstream';
      dispatch({ type: 'request', request: { status: 'error', stage: 'submit', code } });
      track('becas_error', { stage: 'submit', code });
    }
  }, [state, catalog, refCode, track, goTo, errors.grado, gradoData?.nivel, calc.grado, refreshLive, scrollTo]);

  /* ── closed program ── */
  if (!catalog) return null;

  const pending = state.request.status === 'pending';
  const requestError = state.request.status === 'error' ? a.errors[state.request.code ?? 'upstream'] ?? a.errors.upstream : null;
  const stepTitles = [a.steps.contact, a.steps.student, a.steps.category, a.steps.review];

  return (
    <section id="solicitud" className="section-padding bg-paper animate-section">
      <div className="container-custom">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} accent={a.titleAccent} intro={a.intro} />

        <div className="mt-10 max-w-3xl">
          {state.submitted ? (
            <SuccessCard folio={state.submitted.folio} statusUrl={state.submitted.statusUrl} onAnother={() => {
              clearDraft();
              dispatch({ type: 'reset', idempotencyKey: uuid(), leadEventId: newEventId() });
              setErrors({});
            }} />
          ) : (
            <div className="rounded-3xl bg-white border border-n-200 shadow-navy-md overflow-hidden" data-clarity-mask="true">
              {/* progress rail */}
              <ol className="grid grid-cols-4 border-b border-n-200" aria-label={a.eyebrow}>
                {stepTitles.map((title, i) => {
                  const n = (i + 1) as Step;
                  const active = state.step === n;
                  const done = state.step > n;
                  return (
                    <li key={title} aria-current={active ? 'step' : undefined} className="relative px-3 py-3 text-center">
                      <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-[3px] ${done || active ? 'bg-gold' : 'bg-transparent'}`} />
                      <button
                        type="button"
                        disabled={!done}
                        onClick={() => goTo(n)}
                        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${active ? 'text-navy' : done ? 'text-gold-600 hover:text-navy' : 'text-n-400'}`}
                      >
                        <span className="block tabular-nums">{String(n).padStart(2, '0')}</span>
                        <span className="hidden sm:block mt-0.5 normal-case tracking-normal font-sans text-xs font-semibold">{title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="p-6 md:p-10">
                <div aria-live="polite" className="sr-only">
                  {a.stepLabel(state.step, TOTAL_STEPS)}
                </div>
                <h3 ref={headingRef} tabIndex={-1} className="font-display font-bold text-2xl md:text-3xl text-navy outline-none">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-1">{a.stepLabel(state.step, TOTAL_STEPS)}</span>
                  {stepTitles[state.step - 1]}
                </h3>

                {draftRestored && state.step > 1 && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-n-50 border border-n-200 px-3 py-1 text-xs text-n-600">
                    <FiCheck className="text-[#2E7D52]" /> {a.draftRestored}
                  </p>
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={state.step}
                    initial={reduce ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8"
                    onFocusCapture={markInteract}
                  >
                    {state.step === 1 && (
                      <StepContact state={state} dispatch={dispatch} err={err} onNext={submitStep1} grados={grados} />
                    )}
                    {state.step === 2 && (
                      <StepStudent state={state} dispatch={dispatch} err={err} onNext={submitStep2} grados={grados} />
                    )}
                    {state.step === 3 && (
                      <StepCategory
                        state={state}
                        dispatch={dispatch}
                        err={err}
                        onNext={submitStep3}
                        grados={grados}
                        categories={availableCategories}
                        onPick={onPick}
                        onRetry={onRetry}
                        onRemove={(id) => dispatch({ type: 'upload.remove', localId: id })}
                        setErrors={setErrors}
                      />
                    )}
                    {state.step === 4 && <StepReview state={state} goTo={goTo} grados={grados} />}
                  </motion.div>
                </AnimatePresence>

                {requestError && (
                  <div role="alert" className="mt-6 rounded-xl border border-[#77011B]/30 bg-[#77011B]/[0.04] px-4 py-3 text-sm text-[#77011B]">
                    {requestError}
                    {(state.request.code === 'network' || state.request.code === 'upstream' || state.request.code === 'timeout') && (
                      <a
                        href={`https://wa.me/${BECAS_WHATSAPP}?text=${encodeURIComponent(copy.finalCta.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 underline"
                      >
                        {a.whatsappFallback}
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                  {state.step > 1 ? (
                    <button type="button" onClick={() => goTo((state.step - 1) as Step)} className="inline-flex items-center gap-2 text-navy hover:text-gold-600 font-semibold py-3">
                      <FiArrowLeft /> {a.back}
                    </button>
                  ) : (
                    <span />
                  )}
                  {state.step < 4 ? (
                    <button
                      type="button"
                      data-cta={`becas_step_${state.step}_next`}
                      disabled={pending}
                      onClick={state.step === 1 ? submitStep1 : state.step === 2 ? submitStep2 : submitStep3}
                      className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {pending ? a.submitting : a.next} <FiArrowRight />
                    </button>
                  ) : (
                    <button type="button" data-cta="becas_submit" disabled={pending} onClick={submitAll} className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60">
                      {pending ? a.submitting : a.submit} <FiCheck />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════ steps ═══════════════════════════════ */

type StepProps = {
  state: AppState;
  dispatch: React.Dispatch<import('./application/state').Action>;
  err: (key: string) => string | undefined;
  onNext: () => void;
  grados: { key: string; label: string }[];
};

function StepContact({ state, dispatch, err, onNext }: StepProps) {
  const { catalog, copy, calc } = useBecas();
  const a = copy.apply;
  const c = state.contact;
  const set = (patch: Partial<AppState['contact']>) => dispatch({ type: 'contact', patch });
  const fromCalc = (k: 'campus' | 'ciclo') => calc[k] && !state.touched[k] && c[k] === calc[k];

  return (
    <div role="group" aria-label={a.steps.contact} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label={a.fields.nombre} placeholder={a.placeholders.nombre} value={c.nombre} onChange={(e) => set({ nombre: e.target.value })} error={err('nombre')} autoComplete="given-name" autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.apellidos} placeholder={a.placeholders.apellidos} value={c.apellidos} onChange={(e) => set({ apellidos: e.target.value })} error={err('apellidos')} autoComplete="family-name" autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.email} placeholder={a.placeholders.email} value={c.email} onChange={(e) => set({ email: e.target.value })} error={err('email')} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.telefono} placeholder={a.placeholders.telefono} hint={a.hints.telefono} value={c.telefono} onChange={(e) => set({ telefono: e.target.value })} error={err('telefono')} type="tel" inputMode="tel" autoComplete="tel-national" prefix="+52" enterKeyHint="done" onEnter={onNext} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <PillGroup<SiteCampusSlug>
            label={a.fields.campus}
            options={(catalog?.campuses ?? []).map((cp) => ({ value: cp.slug, label: cp.label }))}
            value={c.campus}
            onChange={(v) => dispatch({ type: 'contact', patch: { campus: v }, touched: 'campus' })}
            columns={2}
          />
          {fromCalc('campus') && <FromCalc />}
          {err('campus') && <p className="mt-1.5 text-sm text-[#77011B]" role="alert">{err('campus')}</p>}
        </div>
        <div>
          <PillGroup
            label={a.fields.ciclo}
            options={(catalog?.ciclos ?? []).map((ci) => ({ value: ci.key, label: ci.tipo === 'actual' ? copy.calculator.cicloActual : copy.calculator.cicloSiguiente, hint: formatCiclo(ci.key) }))}
            value={c.ciclo}
            onChange={(v) => dispatch({ type: 'contact', patch: { ciclo: v }, touched: 'ciclo' })}
            columns={2}
          />
          {fromCalc('ciclo') && <FromCalc />}
          {err('ciclo') && <p className="mt-1.5 text-sm text-[#77011B]" role="alert">{err('ciclo')}</p>}
        </div>
      </div>

      {/* honeypot — real browsers never fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Checkbox checked={c.consent} onChange={(v) => set({ consent: v })} error={err('consent')}>
        {a.consent}{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-600 underline">
          {a.consentLink}
        </a>
      </Checkbox>
    </div>
  );
}

function StepStudent({ state, dispatch, err, onNext, grados }: StepProps) {
  const { copy, calc } = useBecas();
  const a = copy.apply;
  const s = state.student;
  const set = (patch: Partial<AppState['student']>) => dispatch({ type: 'student', patch });
  const blocked = s.newFamily === 'no';

  return (
    <div role="group" aria-label={a.steps.student} className="space-y-6">
      <Choice
        label={a.newFamilyQ}
        options={[
          { value: 'yes', label: a.newFamilyYes },
          { value: 'no', label: a.newFamilyNo },
        ]}
        value={s.newFamily}
        onChange={(v) => set({ newFamily: v as 'yes' | 'no' })}
        error={err('newFamily')}
      />
      {blocked && (
        <div className="rounded-2xl bg-navy text-paper p-5">
          <p className="leading-relaxed">{a.newFamilyBlock}</p>
          <a href={`https://wa.me/${BECAS_WHATSAPP}?text=${encodeURIComponent(copy.finalCta.whatsappText)}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-flex items-center gap-2 text-sm">
            <FaWhatsapp /> {copy.finalCta.whatsapp}
          </a>
        </div>
      )}

      <div className={`grid sm:grid-cols-3 gap-4 ${blocked ? 'opacity-40 pointer-events-none' : ''}`}>
        <TextField label={a.fields.alumnoNombres} placeholder={a.placeholders.alumnoNombres} value={s.nombres} onChange={(e) => set({ nombres: e.target.value })} error={err('alumnoNombres')} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.alumnoApPaterno} placeholder={a.placeholders.alumnoApPaterno} value={s.apPaterno} onChange={(e) => set({ apPaterno: e.target.value })} error={err('alumnoApPaterno')} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.alumnoApMaterno} placeholder={a.placeholders.alumnoApMaterno} value={s.apMaterno} onChange={(e) => set({ apMaterno: e.target.value })} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
      </div>

      <div className={`grid sm:grid-cols-2 gap-4 ${blocked ? 'opacity-40 pointer-events-none' : ''}`}>
        <TextField label={a.fields.nacimiento} hint={a.hints.nacimiento} value={s.nacimiento} onChange={(e) => set({ nacimiento: e.target.value })} error={err('nacimiento')} type="date" max={new Date().toISOString().slice(0, 10)} enterKeyHint="next" onEnter={onNext} />
        <div>
          <SelectField label={a.fields.grado} value={s.grado ?? ''} onChange={(e) => dispatch({ type: 'student', patch: { grado: e.target.value }, touched: 'grado' })} error={err('grado')}>
            <option value="" disabled>
              {copy.calculator.gradoPlaceholder}
            </option>
            {grados.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}
              </option>
            ))}
          </SelectField>
          {calc.grado && !state.touched.grado && s.grado === calc.grado && <FromCalc />}
        </div>
        <TextField label={a.fields.escuela} placeholder={a.placeholders.escuela} value={s.escuela} onChange={(e) => set({ escuela: e.target.value })} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.gradoActual} value={s.gradoActual} onChange={(e) => set({ gradoActual: e.target.value })} enterKeyHint="next" onEnter={onNext} />
      </div>

      <div className={`grid sm:grid-cols-6 gap-4 ${blocked ? 'opacity-40 pointer-events-none' : ''}`}>
        <TextField className="sm:col-span-3" label={a.fields.calle} placeholder={a.placeholders.calle} value={s.calle} onChange={(e) => set({ calle: e.target.value })} error={err('calle')} autoComplete="street-address" enterKeyHint="next" onEnter={onNext} />
        <TextField className="sm:col-span-3" label={a.fields.colonia} placeholder={a.placeholders.colonia} value={s.colonia} onChange={(e) => set({ colonia: e.target.value })} error={err('colonia')} autoComplete="address-level3" enterKeyHint="next" onEnter={onNext} />
        <TextField className="sm:col-span-4" label={a.fields.ciudad} placeholder={a.placeholders.ciudad} value={s.ciudad} onChange={(e) => set({ ciudad: e.target.value })} error={err('ciudad')} autoComplete="address-level2" enterKeyHint="next" onEnter={onNext} />
        <TextField className="sm:col-span-2" label={a.fields.cp} placeholder={a.placeholders.cp} value={s.cp} onChange={(e) => set({ cp: e.target.value.replace(/\D/g, '').slice(0, 5) })} error={err('cp')} inputMode="numeric" autoComplete="postal-code" maxLength={5} enterKeyHint="done" onEnter={onNext} />
      </div>
    </div>
  );
}

function StepCategory({
  state,
  dispatch,
  err,
  onNext,
  categories,
  onPick,
  onRetry,
  onRemove,
  setErrors,
}: StepProps & {
  categories: { key: BecaCategoria; name: string; tagline: string }[];
  onPick: (kind: 'boleta' | 'evidencia') => (files: FileList) => void;
  onRetry: (localId: string) => void;
  onRemove: (localId: string) => void;
  setErrors: (e: Errors) => void;
}) {
  const { copy, catalog } = useBecas();
  const a = copy.apply;
  const c = state.category;
  const set = (patch: Partial<AppState['category']>) => dispatch({ type: 'category', patch });
  const kind = evidenceKind(c.id);
  const cfg = catalog?.categorias.find((x) => x.key === c.id);
  const cartaMin = cfg?.cartaMinChars ?? 400;
  const cartaMax = cfg?.cartaMaxChars ?? 3000;
  const uploadsOf = (k: 'boleta' | 'evidencia') => state.uploads.filter((u) => u.kind === k);

  return (
    <div role="group" aria-label={a.steps.category} className="space-y-6">
      <div>
        <div className="block text-sm font-semibold text-navy mb-2">{a.fields.categoria}</div>
        <div role="radiogroup" className="grid sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const selected = c.id === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  dispatch({ type: 'category', patch: { id: cat.key }, touched: 'categoria' });
                  setErrors({});
                }}
                className={`text-left rounded-2xl border px-4 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                  selected ? 'border-gold bg-gold/10 shadow-gold' : 'border-n-300 bg-white hover:border-gold'
                }`}
              >
                <span className="block font-display font-bold text-navy">{cat.name}</span>
                <span className="block text-sm text-n-600 italic">{cat.tagline}</span>
              </button>
            );
          })}
        </div>
        {err('categoria') && <p className="mt-1.5 text-sm text-[#77011B]" role="alert">{err('categoria')}</p>}
      </div>

      {c.id === 'academica' && (
        <div className="space-y-4">
          <TextField label={a.fields.promedio} hint={a.hints.promedio} placeholder={a.placeholders.promedio} value={c.promedio} onChange={(e) => set({ promedio: e.target.value })} error={err('promedio')} inputMode="decimal" enterKeyHint="done" onEnter={onNext} />
          {err('promedio') === a.errors.promedioLow && (
            <button type="button" onClick={() => { dispatch({ type: 'category', patch: { id: 'espiritu' }, touched: 'categoria' }); setErrors({}); }} className="btn-secondary text-sm">
              {a.errors.switchEspiritu}
            </button>
          )}
        </div>
      )}

      {c.id === 'deportiva' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label={a.fields.deporte} placeholder={a.placeholders.deporte} value={c.deporte} onChange={(e) => set({ deporte: e.target.value })} error={err('deporte')} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
          <SelectField label={a.fields.nivelCompetencia} value={c.nivelCompetencia ?? ''} onChange={(e) => set({ nivelCompetencia: e.target.value as NivelCompetencia })} error={err('nivelCompetencia')}>
            <option value="" disabled>
              —
            </option>
            {a.nivelOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectField>
          <TextField label={a.fields.anioCompetencia} value={c.anioCompetencia} onChange={(e) => set({ anioCompetencia: e.target.value.replace(/\D/g, '').slice(0, 4) })} error={err('anioCompetencia')} inputMode="numeric" maxLength={4} placeholder={String(new Date().getFullYear())} enterKeyHint="next" onEnter={onNext} />
        </div>
      )}

      {c.id === 'cultural' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label={a.fields.disciplina} placeholder={a.placeholders.disciplina} value={c.disciplina} onChange={(e) => set({ disciplina: e.target.value })} error={err('disciplina')} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
          <TextField label={a.fields.anosFormacion} value={c.anosFormacion} onChange={(e) => set({ anosFormacion: e.target.value.replace(/\D/g, '').slice(0, 2) })} error={err('anosFormacion')} inputMode="numeric" maxLength={2} enterKeyHint="next" onEnter={onNext} />
          <div className="sm:col-span-2">
            <Choice
              label={a.fields.presentacionPublica}
              options={[
                { value: 'yes', label: a.yesNo.yes },
                { value: 'no', label: a.yesNo.no },
              ]}
              value={c.presentacionPublica === null ? null : c.presentacionPublica ? 'yes' : 'no'}
              onChange={(v) => set({ presentacionPublica: v === 'yes' })}
              error={err('presentacionPublica')}
            />
          </div>
        </div>
      )}

      {c.id === 'espiritu' && (
        <TextareaField
          label={a.fields.cartaMotivos}
          hint={a.hints.cartaMotivos}
          placeholder={a.placeholders.cartaMotivos}
          value={c.cartaMotivos}
          onChange={(e) => set({ cartaMotivos: e.target.value.slice(0, cartaMax + 200) })}
          error={err('cartaMotivos')}
          counter={`${c.cartaMotivos.trim().length} / ${cartaMin}–${cartaMax}`}
          rows={7}
        />
      )}

      {kind && (
        <div className="space-y-3">
          <FileDrop
            kind={kind}
            title={a.uploadTitle[kind]}
            hint={kind === 'evidencia' ? `${a.uploadHint} ${a.uploadOrLink}` : a.uploadHint}
            buttonLabel={a.uploadBtn}
            items={uploadsOf(kind)}
            max={catalog?.uploads.maxPorTipo ?? 3}
            onPick={onPick(kind)}
            onRemove={onRemove}
            onRetry={onRetry}
            stateLabels={a.uploadStates}
            removeLabel={a.uploadRemove}
            retryLabel={a.uploadRetry}
            error={err('boleta') ?? err('evidencia')}
          />
          {kind === 'evidencia' && (
            <TextField label={a.fields.evidenciaUrl} placeholder={a.placeholders.evidenciaUrl} value={c.evidenciaUrl} onChange={(e) => set({ evidenciaUrl: e.target.value })} error={err('evidenciaUrl')} type="url" inputMode="url" autoCapitalize="none" spellCheck={false} enterKeyHint="done" onEnter={onNext} />
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-n-200">
        <TextField label={a.fields.referidoPor} placeholder={a.placeholders.referidoPor} value={c.referidoPor} onChange={(e) => set({ referidoPor: e.target.value })} autoCapitalize="words" enterKeyHint="next" onEnter={onNext} />
        <TextField label={a.fields.referidoCodigo} placeholder={a.placeholders.referidoCodigo} value={c.referidoCodigo} onChange={(e) => set({ referidoCodigo: e.target.value.toUpperCase() })} autoCapitalize="characters" spellCheck={false} enterKeyHint="done" onEnter={onNext} />
      </div>
    </div>
  );
}

function StepReview({ state, goTo, grados }: { state: AppState; goTo: (s: Step) => void; grados: { key: string; label: string }[] }) {
  const { copy, catalog, locale } = useBecas();
  const a = copy.apply;
  const campus = catalog?.campuses.find((c) => c.slug === state.contact.campus)?.label ?? state.contact.campus;
  const grado = grados.find((g) => g.key === state.student.grado)?.label ?? state.student.grado;
  const c = state.category;
  const rows: { step: Step; title: string; lines: string[] }[] = [
    {
      step: 1,
      title: a.steps.contact,
      lines: [`${state.contact.nombre} ${state.contact.apellidos}`, state.contact.email, `+52 ${state.contact.telefono}`, `${campus} · ${formatCiclo(state.contact.ciclo ?? '')}`],
    },
    {
      step: 2,
      title: a.steps.student,
      lines: [
        `${state.student.nombres} ${state.student.apPaterno} ${state.student.apMaterno}`.trim(),
        `${grado}`,
        state.student.escuela ? `${a.fields.escuela}: ${state.student.escuela}` : '',
        `${state.student.calle}, ${state.student.colonia}, ${state.student.ciudad} ${state.student.cp}`,
      ].filter(Boolean),
    },
    {
      step: 3,
      title: a.steps.category,
      lines: [
        c.id ? categoryName(c.id, locale) : '',
        c.id === 'academica' ? `${a.fields.promedio}: ${c.promedio}` : '',
        c.id === 'deportiva' ? `${c.deporte} · ${a.nivelOptions.find((o) => o.value === c.nivelCompetencia)?.label ?? ''} · ${c.anioCompetencia}` : '',
        c.id === 'cultural' ? `${c.disciplina} · ${c.anosFormacion} ${a.fields.anosFormacion.toLowerCase()}` : '',
        c.id === 'espiritu' ? `${a.fields.cartaMotivos}: ${c.cartaMotivos.trim().slice(0, 120)}…` : '',
        ...state.uploads.filter((u) => u.status === 'done').map((u) => `📎 ${u.name}`),
        c.evidenciaUrl ? c.evidenciaUrl : '',
        c.referidoPor || c.referidoCodigo ? `${a.fields.referidoPor.replace(' (opcional)', '').replace(' (optional)', '')}: ${[c.referidoPor, c.referidoCodigo].filter(Boolean).join(' · ')}` : '',
      ].filter(Boolean),
    },
  ];

  return (
    <div role="group" aria-label={a.steps.review} className="space-y-4">
      <p className="text-n-600">{a.reviewTitle}</p>
      {rows.map((r) => (
        <div key={r.step} className="rounded-2xl border border-n-200 bg-n-50 p-5 flex gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-600">{r.title}</div>
            <ul className="mt-2 space-y-0.5 text-navy">
              {r.lines.map((l, i) => (
                <li key={i} className="truncate">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => goTo(r.step)} className="self-start inline-flex items-center gap-1 text-sm text-gold-600 hover:text-navy">
            <FiEdit2 size={14} /> {a.reviewEdit}
          </button>
        </div>
      ))}
    </div>
  );
}

function SuccessCard({ folio, statusUrl, onAnother }: { folio: string; statusUrl: string; onAnother: () => void }) {
  const { copy } = useBecas();
  const s = copy.apply.success;
  return (
    <div className="rounded-3xl nwl-bg-dawn p-8 md:p-12 text-paper shadow-navy-xl">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <Crest level="gold" size={96} showBanner={false} />
        <div className="flex-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{s.eyebrow}</div>
          <h3 className="font-display font-bold text-5xl mt-2">{s.title}</h3>
          <p className="mt-3 text-paper/80 leading-relaxed max-w-lg">{s.body}</p>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-paper/10 border border-paper/20 px-4 py-2 font-mono text-sm">
            <span className="text-paper/60 uppercase tracking-[0.18em] text-[10px]">{s.folio}</span>
            <span className="text-gold">{folio}</span>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={statusUrl} data-cta="becas_success_status" className="btn-primary inline-flex items-center justify-center gap-2">
              {s.cta} <FiArrowRight />
            </a>
            <button type="button" onClick={onAnother} className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold border border-paper/35 text-paper hover:border-gold hover:text-gold transition-colors">
              {s.secondary}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FromCalc() {
  const { copy } = useBecas();
  return <span className="mt-1.5 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-gold-600">{copy.apply.fromCalc}</span>;
}

export type { UploadItem };
