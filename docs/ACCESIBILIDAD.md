# Accesibilidad y experiencia

- El menú constelación usa enlaces reales (`<Link>`), navegables con Tab.
- Cada estrella tiene `aria-label`, `title`, `aria-current` en la ruta activa y
  un anillo de foco visible.
- El enlace "Saltar al contenido" aparece al enfocar con Tab.
- Las animaciones se desactivan con `prefers-reduced-motion`.
- En `forced-colors` se usan colores del sistema y se quitan los brillos.
- Las etiquetas de las estrellas se reducen en móvil y cambian de lado para no
  taparse entre sí.
- Los objetivos táctiles miden al menos 40 px.
- Los estados de ubicación usan `role="status"` y mensajes en español.
- El buscador de ciudad tiene `aria-label`, cierra con Escape, con clic fuera o
  al elegir un resultado.
- Las páginas tienen título propio (`document.title`) y la 404 tiene salida
  clara hacia el inicio.
- El formulario de cuenta muestra el error debajo de cada campo con
  `role="alert"`, `aria-invalid` y `aria-describedby`.
- El correo exige `@` y dominio; la clave exige 8 caracteres al registrarse.
- Los errores desaparecen al escribir y al cambiar entre entrar y registrarse.
- Los campos usan `autocomplete` y `inputMode="email"` para teclados móviles.
- El botón del chat tiene etiqueta "Abrir chat de AstroIA"; el robot interior
  es decorativo (`aria-hidden`) y no se anuncia dos veces.

## Revisión rápida

1. Recorrer la portada solo con Tab y Enter.
2. Activar el modo de contraste alto del sistema.
3. Reducir el tamaño de la ventana hasta 360 px de ancho.
4. Activar "reducir movimiento" en el sistema operativo.
