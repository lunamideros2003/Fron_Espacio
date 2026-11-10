# Vercel

## Datos del proyecto

- Proyecto: `fron-espacio`
- Project ID: `prj_GmjlESjunz1EvAu5o2Pu8vZCG9Aa`
- Framework: Vite
- Build: `npm run build`
- Output: `dist`

## Pasos

1. Entrar a Vercel → proyecto `fron-espacio`.
2. **Settings → Environment Variables**.
3. Crear o editar `VITE_API_URL` con la URL del backend en Render, sin barra
   final:
   ```
   VITE_API_URL=https://TU-BACKEND.onrender.com
   ```
4. Guardar en Production.
5. Ir a **Deployments → Redeploy** del último commit.
6. Abrir la app y comprobar que `/api/place` responde.

## Dominios

- El dominio estable es `https://fron-espacio.vercel.app`.
- El backend acepta el dominio principal y los previews
  `fron-espacio-*.vercel.app`, así que no hay que agregarlos uno por uno.
- Si usas un dominio propio, agrégalo a `CORS_ORIGINS` en Render.

## Problemas frecuentes

| Síntoma | Causa probable |
| --- | --- |
| “No pudimos conectar con el servidor” | `VITE_API_URL` vacía o con barra final |
| CORS bloqueado | Dominio de Vercel ausente en el backend |
| 404 en `/api/place` | Backend viejo, sin el router de lugares |
| Primera carga lenta | Render free despertando el servicio |
