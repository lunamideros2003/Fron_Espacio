# Chatbot

El chatbot vive en `src/components/ChatWidget.jsx` y se abre con el botón
flotante de la esquina inferior derecha.

## Icono

El botón usa `RobotIcon.jsx`: un robot amigable que saluda, dibujado en SVG y
sin imágenes externas. Antes era un destello (✦) y no se entendía que fuera un
chat.

- En el botón flotante el robot mide 76 px dentro de un círculo de 96 px.
- Al pasar el cursor se inclina un poco, como si saludara.
- El mismo robot aparece en la cabecera del panel, a 56 px.
- El panel mide 430 px de ancho y 640 px de alto como máximo, para leer mejor
  las respuestas.
- El SVG es decorativo (`aria-hidden`); el botón tiene su propia etiqueta
  "Abrir chat de AstroIA".
- Con `prefers-reduced-motion` el movimiento se desactiva.

## Conversación

- El historial se guarda en memoria y se envían los últimos 8 mensajes.
- Si no hay proveedor de IA configurado, responde en modo local.
- Los errores del backend se muestran como un mensaje del asistente.

## Estilos

- `.chat-fab` y `.chat-fab-robot`: botón e icono.
- `.chat-head-id` y `.chat-head-robot`: cabecera del panel.
- `.chat-panel`, `.chat-messages` y `.chat-form`: panel y conversación.

## Probar

1. Abrir la app.
2. Pulsar el robot.
3. Escribir "¿Qué es Betelgeuse?".
4. Confirmar que responde y que la cabecera muestra el proveedor.
5. Cerrar con la ✕ y volver a abrir.
