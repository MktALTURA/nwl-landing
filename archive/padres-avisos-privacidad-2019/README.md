# Avisos de Privacidad — versiones 2019 (archivadas)

Los avisos de privacidad que estuvieron publicados hasta el **9 de septiembre de
2026**. Los PDF originales datan de **julio–septiembre de 2019** (salvo Zibatá,
ver abajo) y fueron reemplazados por la versión vigente desde el **20 de agosto
de 2026**, que agrega cláusulas de videovigilancia, cookies/web beacons y un
mecanismo de negativa a finalidades no esenciales.

Nada de esta carpeta se sirve públicamente: vive fuera de `public/`.

## Qué hay aquí

- `<campus>/AVISO-PRIVACIDAD-*.pdf` — los cinco archivos retirados.
- `_fuente-docx-2026/*.docx` — los Word que envió el colegio, tal como llegaron.
- `_fuente-docx-2026/docx2pdf.py` — el script que los convirtió a PDF.

## El caso Zibatá

`zibata/AVISO-PRIVACIDAD-NWL.pdf` **no era un aviso de privacidad**. Era un PDF
de una página generado con ReportLab el 24 de mayo de 2026 cuyo único contenido
eran enlaces a los avisos de los otros cuatro campus. Zibatá no tuvo aviso
propio publicado hasta ahora.

El nombre de archivo `AVISO-PRIVACIDAD-NWL.pdf` (y no `-ZIBATA`) se conservó
porque `privacyMap` en `lib/padres-data.ts` mapea `zibata: 'NWL'`.

## Correos de contacto

Los .docx llegaron con `direccion@sanmiguel.nwl.mx` en los cinco campus —los
cuatro restantes derivan de la plantilla de San Miguel— y con el campo de
negativa en blanco (`________`) en cuatro de ellos. Al convertir se sustituyó
por el correo de cada campus, según indicación del colegio:

| Campus      | Correo                                    |
|-------------|-------------------------------------------|
| Juriquilla  | `direccion.juriquilla@colegionwl.edu.mx`  |
| Milenio     | `direccion.milenio@colegionwl.edu.mx`     |
| Corregidora | `direccion.corregidora@colegionwl.edu.mx` |
| San Miguel  | `direccion.sanmiguel@colegionwl.edu.mx`   |
| Zibatá      | `direccion.zibata@colegionwl.edu.mx`      |

Los espacios en blanco del bloque de firma (`Nombre del Alumno(a):`, `Fecha:`)
se dejaron en blanco a propósito: son campos del formulario.

## Regenerar los PDF

```bash
python3 _fuente-docx-2026/docx2pdf.py \
  "_fuente-docx-2026/Aviso de Privacidad - NWL Juriquilla.docx" \
  salida.pdf "Campus Juriquilla" "direccion.juriquilla@colegionwl.edu.mx"
```

## Restaurar los de 2019

```bash
for c in corregidora juriquilla milenio san-miguel zibata; do
  cp archive/padres-avisos-privacidad-2019/$c/*.pdf public/padres/$c/
done
```
