#!/usr/bin/env bash
# ==========================================================================
# NeuroAr — renombrado a kebab-case + conversión a WebP
# Ejecutar DENTRO de la carpeta /neuroAR2/img/  (haz una copia de seguridad antes)
#   cd neuroAR2/img && bash rename-images.sh
# Requiere: cwebp  (Linux/Mac: paquete "webp")
# Los archivos originales de fotos NO se borran: index.html los usa como
# respaldo (<picture>) por si algún navegador no soporta WebP.
# ==========================================================================
set -euo pipefail

# Renombra un archivo solo si existe y el destino no existe todavía
ren() {
  if [ -e "$1" ]; then
    mv -n -- "$1" "$2"
    echo "renombrado: $1  ->  $2"
  else
    echo "omitido (no existe): $1"
  fi
}

# Convierte una imagen a WebP (calidad 80) conservando el original
to_webp() {
  if [ -e "$1" ]; then
    cwebp -quiet -q 80 "$1" -o "$2"
    echo "webp: $1  ->  $2"
  else
    echo "omitido (no existe): $1"
  fi
}

echo "== /neuroAR2/img/ =="
ren "Mujer saludando con auriculares brillantes.gif" "asistente-neuroar.gif"
ren "icono-blanco-ubicación.png"                     "icono-blanco-ubicacion.png"
ren "icono whatsapp-01.png"                          "icono-whatsapp.png"
ren "icono blanco telefono.png"                      "icono-blanco-telefono.png"
ren "icono blanco correo.png"                        "icono-blanco-correo.png"
ren "icono gris bombillo.png"                        "icono-gris-bombillo.png"
ren "icono gris cuadro.png"                          "icono-gris-cuadro.png"
ren "icono gris trofeo.png"                          "icono-gris-trofeo.png"
ren "icono gris personas.png"                        "icono-gris-personas.png"
ren "icono linkedin.png"                             "icono-linkedin.png"
ren "icono instagram.png"                            "icono-instagram.png"
ren "Apoyo de-17.png"                                "apoyo-de.png"
ren "Logo_Blanco_NeuroAR-01.png"                     "logo-blanco-neuroar.png"
ren "idioma_gris.png"                                "idioma-gris.png"

to_webp "IMG_1404.JPG" "conocimiento-empresarial.webp"
to_webp "Gafas_2.jpg"  "realidad-virtual-gafas.webp"

echo "== /neuroAR2/img/pdf/ =="
( cd pdf 2>/dev/null && ren "Brochure_NeuroAR_Verde_Español.pdf" "brochure-neuroar-verde-espanol.pdf" ) || echo "omitido: carpeta pdf"

echo "== /neuroAR2/img/sostenibilidad/ =="
cd sostenibilidad
ren "logo texto_gris.png"                  "logo-texto-gris.png"
ren "icono_inicio de sesión_verde.png"     "icono-inicio-sesion-verde.png"
ren "Etacion_sostenibilidad_blanca-20.png" "estacion-sostenibilidad-blanca.png"

to_webp "Contacto.jpg"                  "hero-sostenibilidad.webp"
to_webp "Gafas_verdes_sostenibilidad.jpg" "gafas-verdes-sostenibilidad.webp"
to_webp "Carrusel_01.jpg"               "carrusel-01.webp"
to_webp "Carrusel_02.jpg"               "carrusel-02.webp"
to_webp "Carrusel_03.jpg"               "carrusel-03.webp"
to_webp "Carrusel_04.jpg"               "carrusel-04.webp"
to_webp "Nosotros.jpg"                  "nosotros.webp"
to_webp "contactanos.jpg"               "contactanos.webp"
to_webp "Sección_ventajas_verdes.png"   "seccion-ventajas-verdes.webp"

echo "Listo. Revisa que no queden referencias antiguas:  grep -rn \"%20\\|Sección\\|ubicación\" ../../../*.html ../../../*.php"
