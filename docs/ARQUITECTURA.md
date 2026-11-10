# Arquitectura del frontend

React 19 + Vite + React Router. El backend es la única fuente de datos
astronómicos; el navegador solo aporta coordenadas cuando el usuario acepta el
GPS.

## Carpetas

- `src/components`: piezas reutilizables (menú constelación, ubicación, chat,
  robot del chat).
- `src/constellation`: datos y utilidades puras del menú (estrellas, líneas,
  geometría, polvo estelar). Se pueden probar con Node sin DOM.
- `src/hooks`: estado con efectos (`useSkyPlace`, `usePlaceSearch`, ...).
- `src/lib`: utilidades sin React (formato, almacenamiento, caché de ubicación,
  validación de correo, clave y nombre).
- `src/pages`: una página por ruta.
- `src/context`: sesión JWT del usuario.

## Flujo de ubicación

1. `useSkyPlace` lee una ubicación guardada (12 h) en `localStorage`.
2. Si no existe, pide GPS con `readGps()`.
3. Llama a `GET /api/place` para resolver etiqueta y origen.
4. Si el usuario elige una ciudad, `LocationPicker` usa
   `GET /api/place/search` y guarda esa ubicación.
5. Cada página usa `place.latitude` y `place.longitude`; nunca hay inputs de
   latitud/longitud.

## Flujo de datos

`api.js` centraliza `fetch`, el token JWT y los errores. `VITE_API_URL` apunta
al backend en producción. En desarrollo Vite hace proxy de `/api` a
`http://localhost:4000`.

## Pruebas

```bash
npm test      # Node test runner, solo módulos puros
npm run build # verifica que la app compile
```
