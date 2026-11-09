# Accesibilidad y experiencia

- El menú constelación usa enlaces reales (`<Link>`), navegables con Tab.
- Cada estrella tiene `aria-label`, `title`, `aria-current` en la ruta activa y
  un anillo de foco visible.
- El enlace "Saltar al contenido" aparece al enfocar con Tab.
- Las animaciones se desactivan con `prefers-reduced-motion`.
- Las etiquetas de las estrellas se reducen en móvil y cambian de lado para no
  taparse entre sí.
- Los estados de ubicación usan `role="status"` y mensajes en español.
- El buscador de ciudad tiene `aria-label` y cierra el panel al hacer clic
  fuera o al elegir un resultado.
- Las páginas tienen título propio (`document.title`) y la 404 tiene salida
  clara hacia el inicio.
