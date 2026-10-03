'use client';

import { useId, useRef } from 'react';

export interface PillOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
  disabled?: boolean;
}

/**
 * Radio-group of pills with roving tabindex: arrow keys move, Space/Enter
 * select. Used for campus and ciclo in the calculator and the form, where a
 * native <select> would hide the four options behind a tap.
 */
export default function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  tone = 'light',
  columns,
}: {
  label: string;
  options: PillOption<T>[];
  value?: T;
  onChange: (v: T) => void;
  tone?: 'light' | 'navy';
  columns?: 2 | 3 | 4;
}) {
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const dark = tone === 'navy';
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));

  const move = (from: number, dir: 1 | -1) => {
    let i = from;
    for (let n = 0; n < options.length; n++) {
      i = (i + dir + options.length) % options.length;
      if (!options[i].disabled) break;
    }
    refs.current[i]?.focus();
    onChange(options[i].value);
  };

  const gridCols = columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div>
      <div id={`${id}-label`} className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-2.5 ${dark ? 'text-paper/60' : 'text-n-500'}`}>
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={`${id}-label`} className={`grid ${gridCols} gap-2`}>
        {options.map((o, i) => {
          const selected = o.value === value;
          return (
            <button
              key={o.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={o.disabled}
              tabIndex={value === undefined ? (i === 0 ? 0 : -1) : i === selectedIndex ? 0 : -1}
              onClick={() => onChange(o.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  move(i, 1);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  move(i, -1);
                }
              }}
              className={`min-h-[44px] rounded-full px-4 py-2.5 text-sm font-semibold border transition-all duration-200 text-left sm:text-center leading-tight disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                selected
                  ? 'bg-gold text-[#1C0F00] border-gold shadow-gold'
                  : dark
                    ? 'bg-paper/5 text-paper border-paper/20 hover:border-gold/70'
                    : 'bg-white text-navy border-n-300 hover:border-gold'
              }`}
            >
              <span className="block">{o.label}</span>
              {o.hint && <span className={`block font-mono font-normal text-[10px] tracking-wide mt-0.5 ${selected ? 'text-[#1C0F00]/70' : dark ? 'text-paper/55' : 'text-n-500'}`}>{o.hint}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
