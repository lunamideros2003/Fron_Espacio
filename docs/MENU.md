# Menú constelación

La página de inicio no usa una barra de navegación tradicional: cada sección es
una estrella de una constelación inspirada en el Carro Mayor.

## Estructura

- `src/constellation/stars.js`: posición, etiqueta y ruta de cada estrella.
- `src/constellation/lines.js`: pares de estrellas que se conectan.
- `src/constellation/viewBox.js`: dimensiones del lienzo.
- `src/constellation/geometry.js`: conversión de coordenadas a porcentajes.
- `src/components/ConstellationMenu.jsx`: dibuja el SVG y los enlaces.
- `src/constellation.css`: estilos, foco y animaciones.

## Dos variantes

| Variante | Uso | viewBox |
| --- | --- | --- |
| `HOME_STARS` | Portada | 1000 × 600 |
| `COMPACT_STARS` | Resto de páginas | 1000 × 190 |

Las dos variantes comparten las mismas rutas para que el menú sea consistente.
La ISS no forma parte del menú; su página sigue disponible en `/iss`.

## Señalización

- Encima de la constelación hay un recuadro visible con la palabra `MENÚ`.
- En la portada, debajo del recuadro, aparece una línea discreta que invita a
  elegir una sección.
- La estrella de la sección actual se ve al triple de su tamaño base, el doble
  de cómo se veía antes.
- Al pasar el cursor o llegar con el teclado, la estrella elegida duplica su
  tamaño base.

## Accesibilidad

- Cada estrella es un enlace real con texto visible.
- El foco del teclado se dibuja con un halo.
- En pantallas pequeñas el menú compacto se desplaza en horizontal.
- Las animaciones respetan `prefers-reduced-motion`.

## Cómo cambiar el menú

1. Edita `stars.js` y agrega o mueve la estrella.
2. Ajusta `lines.js` si necesitas una conexión nueva.
3. Verifica que `x` e `y` estén dentro del viewBox correspondiente.
4. Ejecuta `npm test`; la prueba de estrellas valida ids y límites.
