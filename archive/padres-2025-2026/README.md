# Portal de Padres — ciclo 2025–2026 (archivado)

Documentos del ciclo **2025–2026** retirados del portal de padres el **2026-08-07**.
Nada de esta carpeta se sirve públicamente: vive fuera de `public/`, así que las
URLs `/padres/<campus>/...` de estos PDFs ya no responden.

## Qué hay aquí

- `padres-data.ts.bak` — copia exacta de `lib/padres-data.ts` justo antes del cambio
  (con todas las rutas 2025–2026 intactas).
- `<campus>/calendario/NWL-Calendar-2025-2026.pdf`
- `<campus>/comunicados/Manual-de-convivencia-2025-2026.pdf`
- `<campus>/comunicados/Responsiva-iPad-2025-2026.pdf`
- `<campus>/utiles/*-Materiales-2025-2026.pdf` (13 grados por campus)

Campus: `corregidora`, `juriquilla`, `milenio`, `san-miguel`, `zibata` — 80 PDFs en total.

## Qué NO se tocó

Los documentos sin año siguen publicados y enlazados en el portal:

- `public/padres/shared/acuerdo-SEP-PROFECO.pdf`
- `public/padres/shared/Decreto-deduccion-colegiaturas.pdf`
- `public/padres/<campus>/AVISO-PRIVACIDAD-*.pdf`

## Cómo restaurar todo (rollback)

```bash
# 1. Devolver la configuración del portal
cp archive/padres-2025-2026/padres-data.ts.bak lib/padres-data.ts

# 2. Devolver los PDFs a public/ y borrar el archivo
rsync -a --exclude README.md --exclude padres-data.ts.bak \
  archive/padres-2025-2026/ public/padres/
rm -rf archive/padres-2025-2026
```

O, más simple, revertir el commit que hizo el cambio:

```bash
git revert <sha>
```

Nota: `lib/i18n/*` ganó las llaves `padres.pendingDocument` y
`padres.pendingDocumentHint`, y `PortalDocument` ganó `pending?: boolean` con
`pdfUrl?` opcional. Restaurar solo el `.bak` es compatible — las entradas nuevas
traen `pdfUrl`, así que ninguna queda marcada como pendiente.

## Publicar el ciclo 2026–2027

1. Copiar los PDFs nuevos a `public/padres/<campus>/{calendario,comunicados,utiles}/`.
2. En `lib/padres-data.ts`, en `buildCalendario` / `buildComunicados` / `buildUtiles`,
   agregar `pdfUrl` y quitar `pending: true` de cada entrada publicada.
3. `CURRENT_CYCLE` en ese mismo archivo controla el año que se muestra en los títulos.
