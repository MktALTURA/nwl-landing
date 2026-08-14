'use client';

/**
 * A Spanish + English pair for one localized field.
 *
 * Spanish is the one that matters: Marlene writes in Spanish and an empty
 * English box falls back to it on the /en site. The English input says so,
 * so nobody feels obliged to paste Spanish into it just to fill the gap.
 */
interface BilingualFieldProps {
  label: string;
  help: string;
  valueEs: string;
  valueEn: string;
  onChangeEs: (v: string) => void;
  onChangeEn: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
  max: number;
  /** Above this the text still saves but is likely to wrap badly on a card. */
  softMax?: number;
  placeholder?: string;
}

export default function BilingualField({
  label,
  help,
  valueEs,
  valueEn,
  onChangeEs,
  onChangeEn,
  required,
  multiline,
  max,
  softMax,
  placeholder,
}: BilingualFieldProps) {
  const over = softMax !== undefined && valueEs.length > softMax;
  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors';

  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80">
        {label} {required && <span className="text-wine">*</span>}
      </label>
      <p className="text-xs text-charcoal/50 mt-0.5 mb-2">{help}</p>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/40">
              Español
            </span>
            <span className={`text-[11px] ${over ? 'text-amber-600' : 'text-charcoal/35'}`}>
              {valueEs.length}/{max}
            </span>
          </div>
          {multiline ? (
            <textarea
              value={valueEs}
              onChange={(e) => onChangeEs(e.target.value)}
              maxLength={max}
              rows={4}
              placeholder={placeholder}
              className={inputClass}
            />
          ) : (
            <input
              type="text"
              value={valueEs}
              onChange={(e) => onChangeEs(e.target.value)}
              maxLength={max}
              placeholder={placeholder}
              className={inputClass}
            />
          )}
          {over && (
            <p className="text-[11px] text-amber-600 mt-1">
              Va largo — puede cortarse en celular.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/40">
              Inglés <span className="normal-case font-normal">(opcional)</span>
            </span>
            <span className="text-[11px] text-charcoal/35">
              {valueEn.length}/{max}
            </span>
          </div>
          {multiline ? (
            <textarea
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              maxLength={max}
              rows={4}
              placeholder="Si lo dejas vacío se muestra el español"
              className={inputClass}
            />
          ) : (
            <input
              type="text"
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              maxLength={max}
              placeholder="Si lo dejas vacío se muestra el español"
              className={inputClass}
            />
          )}
        </div>
      </div>
    </div>
  );
}
