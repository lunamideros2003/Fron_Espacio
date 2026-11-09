# Despliegue del frontend

## Orden recomendado

1. Supabase: crear proyecto y ejecutar `Back_Espacio/supabase/schema.sql`.
2. Render: desplegar el backend con la cadena de Supabase.
3. Vercel: desplegar el frontend apuntando a Render.

## Vercel

1. Importa el repositorio `Fron_Espacio`.
2. Framework: **Vite**. Build: `npm run build`. Output: `dist`.
3. Variable de entorno:
   - `VITE_API_URL=https://<tu-backend>.onrender.com`
4. Redeploy. `vercel.json` ya reescribe todas las rutas a `index.html` para que
   React Router funcione al recargar.

## Local

```bash
npm install
npm run dev
```

Vite hace proxy de `/api` a `http://localhost:4000`. Si tu backend usa otro
puerto, cambia `vite.config.js`.

## Checklist

- [ ] `npm run build` sin errores.
- [ ] `npm test` en verde.
- [ ] `VITE_API_URL` apunta a Render (sin barra final).
- [ ] El backend permite el origen de Vercel en CORS.
- [ ] `/api/health/db` responde 200 antes de probar la app.
- [ ] La portada muestra la constelación sin pedir coordenadas.
- [ ] `/carta` dibuja el cielo con la ubicación automática.
