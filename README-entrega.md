# NeuroAr — Entrega de refactorización

## 1. Revisión de archivos faltantes (necesito esto para cerrar producción)

Solo pude leer el sitio publicado (texto, enlaces, imágenes), **no su código fuente**. Estos puntos están resueltos con suposiciones razonables; confírmalos pegándome los archivos:

| Qué | Por qué | Qué pegarme |
|---|---|---|
| Formulario de #contacto | Solo vi el texto "Enviar solicitud"; desconozco los `name`/`id`, el `action` y el backend | El `<form>…</form>` de index y el PHP que lo recibe |
| CSS actual | No vi paleta, fuentes ni variables. Usé una paleta nueva (acento `#0A5CFF`) | El `<link>` o `<style>` de index (y el logo en vectorial si existe) |
| JS actual | No vi el modal, ticker ni selector de idioma antiguos | Los `<script>` de index |
| `<head>` real | Favicon y og:image reales | Las etiquetas `<meta>` y `<link rel="icon">` |
| Brochure de NeuroAr Cognitivo | El único PDF visible es el de **sostenibilidad** (verde) | El PDF, o su ruta final |
| Página y formulario de `app.neuroar.com.co` | Es otra aplicación; solo vi su HTML visible | El código de su login si quieres que lo modifique |

Suposiciones activas: la portada vive en la raíz como `index.html` (si es `index.php`, cambia la extensión; no hay PHP dentro), y el envío del formulario abre el correo del usuario hasta que definas `CONFIG.formEndpoint` en `main.js`.

## 2. Mapa de arquitectura e inventario de reducción

| Bloque | Antes | Después |
|---|---|---|
| Header | Logo + ☰ + 9 enlaces + "ESEN" pegado + App | Logo + 5 enlaces + ES \| EN con estado + App (outline) + 1 CTA primario |
| Modal inicial | Automático, GIF + 5 enlaces + Cerrar | Eliminado. Widget colapsado "¿Hablamos?" con 2 botones (WhatsApp, formulario) |
| WhatsApp flotante | Botón aparte | Unificado en el widget |
| Hero | 2 CTA + 5 píldoras + scroll + ticker (8 enlaces) | H1 + subtítulo + 1 primario + 1 outline |
| Soluciones | "Qué hacemos" (7 tarjetas) + "Explora" (6 tarjetas, 6 botones iguales) | 1 componente de 5 pestañas, 1 botón contextual por pestaña |
| Mejoramiento | Texto + 2 botones + 5 tarjetas | Línea de tiempo D-M-A-I-C con rol de IA y de especialistas, sin botones duplicados |
| Conocimiento | Sección propia con 2 fotos | Pestaña 3 (`#conocimiento`); `Gafas_2` sale de aquí |
| Inmersivo | 3 etiquetas apiladas + botón a #contacto | 1 etiqueta + datos reales del producto + App y Brochure |
| Trayectoria | 10 tarjetas (5 repetidas) + aviso prominente | 5 tarjetas + aviso sutil |
| Visión + Presencia | 2 secciones | 1 sección "Sobre NeuroAr y presencia en Colombia" |
| Footer | `sostenibilidad.php` relativo (404) | `/sostenibilidad` (ruta limpia) + © 2026 |

**Estructura final, de arriba abajo:** header → `#inicio` hero → 3 pilares → `#soluciones` (tabs) → `#mejoramiento` / `#dmaic` → `#inmersivo` → `#referencias` → `#nosotros` → `#contacto` → footer → widget.

**Anclas:** `#soluciones`, `#mejoramiento`, `#dmaic`, `#conocimiento` (panel de la pestaña 3), `#inmersivo`, `#referencias`, `#nosotros`, `#contacto`, todas únicas, con `scroll-margin-top` global. Los `#detalle-*` viejos se eliminaron del HTML; `main.js` los redirige a su pestaña por si hay enlaces externos guardados. `#presencia` ya no existe (pasa a `#nosotros`).

**Sostenibilidad:** WhatsApp corregido a `wa.me/573003743575`; header y footer unificados; sin modal de contraseña; enlaces `#` reemplazados; galería con 4 imágenes únicas y `alt` propio, sin `src` vacío; `Carrusel_01` ya no se duplica.

## 3. Sistema de diseño → `styles.css`
Tema oscuro tecnológico: tokens en `:root`, rejilla y brillos en el hero, red de capacidades animada (SVG), tarjetas de vidrio, tipografía Space Grotesk + JetBrains Mono (Google Fonts), animaciones que respetan `prefers-reduced-motion`. Acento único cian (sólido solo en CTAs). Contrastes calculados: texto 16.9:1, secundario 8.9:1, botón primario 10.5:1, bordes de campo ≥ 3.8:1.

## 4. Código → `index.html`, `sostenibilidad.html`, `styles.css`, `main.js`, `.htaccess`
- `.htaccess`: 301 de `/neuroAR2/login.php`, `recovery.php` y `/vrprueba/vrweb/*` a `app.neuroar.com.co`; 301 de `sostenibilidad.php` y `/neuroAR2/home/sostenibilidad.php` a `/sostenibilidad`.
- `rename-images.sh`: renombra a kebab-case y convierte a WebP. **Ejecútalo antes de publicar**: el HTML ya apunta a los nombres nuevos (las dos fotos grandes de la portada tienen respaldo al original).
- Mejoras sugeridas para `app.neuroar.com.co` (en su código): enlace "← Volver a neuroar.com.co" arriba (hoy solo hay uno pequeño abajo), mismo logo `letra-neuroar.png`, pie "© 2026 NeuroAr", y título de página en español.

**Limitaciones conocidas:** el selector EN traduce navegación, hero, títulos de sección, formulario, footer y widget; el cuerpo de las pestañas, el flujo DMAIC y las referencias siguen en español. Los textos de "IA / Especialistas" de cada paso DMAIC son redacción mía: valídalos.

## 5. Checklist de QA técnico

**Anclas y navegación**
- [ ] Cada enlace del header lleva a su sección y el título no queda tapado por el header
- [ ] `/#conocimiento` y `/#detalle-software` abren la pestaña correcta
- [ ] Menú móvil: abre/cierra con botón y Esc, cierra al elegir enlace
- [ ] Teclado: Tab recorre todo en orden; flechas/Home/End cambian de pestaña
- [ ] ES | EN cambia textos y recuerda la elección al recargar

**Formulario**
- [ ] Campos vacíos muestran error y enfocan el primero
- [ ] Los botones "Consultar este servicio" preseleccionan el `<select>` correcto
- [ ] `/?servicio=sostenibilidad#contacto` llega con el servicio preseleccionado
- [ ] Envío real (con `formEndpoint`) o apertura de correo (sin él)
- [ ] El campo trampa `sitio_web` no es visible

**Enlaces y rutas**
- [ ] `/sostenibilidad` carga; `/sostenibilidad.php`, `/sostenibilidad.html` y `/neuroAR2/home/sostenibilidad.php` redirigen (301)
- [ ] `/neuroAR2/login.php` y `/vrprueba/vrweb/` redirigen (301) a la app
- [ ] `wa.me/573003743575` abre en ambas páginas
- [ ] Sin 404 en la pestaña Network (imágenes renombradas, brochures)
- [ ] Enlaces externos con `rel="noopener noreferrer"`

**Rendimiento y móvil**
- [ ] Lighthouse móvil ≥ 90 en rendimiento y accesibilidad
- [ ] Imágenes en WebP con `loading="lazy"`; sin salto de diseño
- [ ] 360 px sin scroll horizontal (salvo la botonera de pestañas)
- [ ] Widget no tapa el botón de enviar del formulario
- [ ] Probar con `prefers-reduced-motion` activado