'use client';

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

/* Form primitives for the application. No <form> element anywhere: GHL's
   external-tracking.js hooks every <form> on the site and would create blank
   contacts. Enter inside an input advances via the onEnter callback. */

const base =
  'w-full rounded-xl border bg-white px-4 text-[16px] text-navy placeholder:text-n-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold min-h-[48px]';

function Wrap({
  id,
  label,
  hint,
  error,
  children,
  className = '',
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-navy mb-1.5">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-[#77011B]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-n-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  onEnter,
  className,
  prefix,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string; onEnter?: () => void; prefix?: string }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} hint={hint} error={error} className={className}>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-n-500 pointer-events-none select-none">{prefix}</span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) {
              e.preventDefault();
              onEnter();
            }
          }}
          className={`${base} ${error ? 'border-[#77011B]/60' : 'border-n-300'} ${prefix ? 'pl-14' : ''}`}
          {...rest}
        />
      </div>
    </Wrap>
  );
}

export function SelectField({
  label,
  hint,
  error,
  children,
  className,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} hint={hint} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${base} appearance-none pr-10 ${error ? 'border-[#77011B]/60' : 'border-n-300'}`}
          {...rest}
        >
          {children}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-n-500">
          ▾
        </span>
      </div>
    </Wrap>
  );
}

export function TextareaField({
  label,
  hint,
  error,
  className,
  counter,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string; error?: string; counter?: string }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={`${base} py-3 leading-relaxed min-h-[160px] resize-y ${error ? 'border-[#77011B]/60' : 'border-n-300'}`}
        {...rest}
      />
      {counter && <div className="mt-1 text-right font-mono text-[11px] text-n-500 tabular-nums">{counter}</div>}
    </Wrap>
  );
}

export function Choice({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: { value: string; label: string }[];
  value?: string | null;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <div id={`${id}-label`} className="block text-sm font-semibold text-navy mb-1.5">
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={`${id}-label`} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.value)}
              className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                selected ? 'bg-navy text-paper border-navy' : 'bg-white text-navy border-n-300 hover:border-gold'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-[#77011B]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex gap-3 items-start cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="mt-1 h-5 w-5 shrink-0 rounded border-n-300 accent-[#CB8606] focus:ring-gold/60"
        />
        <span className="text-sm text-n-700 leading-relaxed">{children}</span>
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-[#77011B]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
