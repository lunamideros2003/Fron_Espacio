# Supabase desde el frontend

El frontend **no** se conecta directo a Supabase. Todas las consultas pasan por
el backend FastAPI, que es quien tiene la cadena de conexión Postgres y el JWT
propio de la app.

Esto evita exponer la `service_role` key en el navegador y mantiene las reglas
de negocio en un solo lugar.

## Qué configurar en Vercel

Solo la URL del backend:

```
VITE_API_URL=https://astroia-api.onrender.com
```

## Si más adelante usas Supabase Auth

1. Crea el cliente en `src/lib/supabase.js` con
   `@supabase/supabase-js` y `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
2. Reemplaza el login JWT de `AuthContext` por `supabase.auth`.
3. El backend debe validar el JWT de Supabase (`SUPABASE_JWT_SECRET`) y mapear
   `auth.users.id` a la tabla `users`.
4. Activa Row Level Security en todas las tablas y escribe políticas por
   `auth.uid()`.

La guía completa del backend está en
`Back_Espacio/docs/SUPABASE.md`.
