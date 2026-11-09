# Supabase desde el frontend

El frontend **no** se conecta directo a Supabase. Todo pasa por el backend
FastAPI, que guarda la cadena Postgres y emite el JWT propio de AstroIA.

## Lo que se configura en Vercel

Una sola variable:

```env
VITE_API_URL=https://TU-BACKEND.onrender.com
```

Sin barra final. Todo lo que empieza con `VITE_` termina en el navegador, así
que nunca debe contener:

- `DATABASE_URL`
- `SUPABASE_SECRET_KEY` o `service_role`
- contraseñas de la base

## Claves de Supabase

| Clave | Dónde va | ¿Se usa hoy? |
| --- | --- | --- |
| `SUPABASE_URL` | Solo referencia | No |
| `SUPABASE_PUBLISHABLE_KEY` | Solo si se usa Supabase Auth | No |
| `SUPABASE_SECRET_KEY` | Nunca en el navegador | No |
| `SUPABASE_JWKS_URL` | Solo si se valida Auth de Supabase | No |

La versión actual usa JWT propio y SQLAlchemy, por lo que solo hace falta la
cadena Postgres en Render. Las demás claves quedan reservadas para una futura
migración a Supabase Auth.

## Si algún día se usa Supabase Auth

1. Crear `src/lib/supabase.js` con `@supabase/supabase-js`.
2. Usar `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Reemplazar el login de `AuthContext` por `supabase.auth`.
4. Validar el JWT en el backend con el JWKS del proyecto.
5. Activar Row Level Security y políticas por `auth.uid()`.

La guía del backend está en `Back_Espacio/docs/SUPABASE.md`.
