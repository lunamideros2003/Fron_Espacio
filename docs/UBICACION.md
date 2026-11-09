# Ubicación sin coordenadas manuales

El profesor tenía razón: pedir latitud y longitud a mano es incómodo y
propenso a errores. Ahora la app resuelve el lugar en este orden:

1. **GPS del navegador** (preciso). Se pide permiso una vez y se guarda 12 h.
2. **Perfil del usuario** (si ya tiene coordenadas guardadas).
3. **IP pública** (aproximada, para cuando el GPS está bloqueado).
4. **Ciudad buscada por nombre** (el usuario escribe "Pasto" y elige un
   resultado; no escribe números).
5. **Cielo de ejemplo** (Bogotá) si nada funciona.

## Privacidad

- El navegador solo envía coordenadas al backend propio.
- La ciudad se guarda en `localStorage` durante 12 h y se puede cambiar con el
  botón "Cambiar".
- Si el usuario inicia sesión y aún no tiene ubicación, se guarda en su perfil.
- No se usan cookies de terceros ni se muestra la coordenada exacta en la UI.

## Endpoints

- `GET /api/place?lat=&lng=` → `{ place: { latitude, longitude, label, source } }`
- `GET /api/place/search?q=...` → `{ results: [...] }`

`source` puede ser `browser`, `profile`, `ip`, `search` o `fallback`, y la UI
muestra un mensaje distinto para cada uno.
