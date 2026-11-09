# Variables del frontend

## Producción (Vercel)

| Variable | Ejemplo | Obligatoria |
| --- | --- | --- |
| `VITE_API_URL` | `https://astroia-api.onrender.com` | Sí |

Se configura en **Vercel → Project → Settings → Environment Variables**, en
Production (y Preview si se desea). Después hay que hacer **Redeploy**: Vite
inyecta el valor en tiempo de build, no en tiempo de ejecución.

## Desarrollo

No hace falta ninguna variable. `vite.config.js` redirige `/api` a
`http://localhost:4000`.

## Reglas

- Sin barra final en la URL.
- Usar `https://` en producción.
- No poner secretos en variables `VITE_*`.
- Si cambia la URL del backend, se vuelve a desplegar el frontend.
- El backend debe incluir el dominio de Vercel en CORS.

## Comprobar

Con la app abierta en Vercel, revisar la pestaña Network del navegador:

- Las peticiones deben ir a `https://TU-BACKEND.onrender.com/api/...`.
- `GET /api/place` debe responder `200` con `{ "place": ... }`.
- `GET /api/health/db` debe responder `{ "ok": true, "database": "up" }`.
