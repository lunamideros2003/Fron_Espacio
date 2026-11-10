# AstroIA — Frontend (Vite + React)

Aplicación web del explorador inteligente del universo. El menú principal es
una constelación: cada estrella abre una sección.

## Arranque

Con el backend FastAPI corriendo en el puerto 4000:

```bash
cd Fron_Espacio
npm install
npm run dev
```

Abre http://localhost:5173

Vite reenvía `/api` hacia FastAPI (`http://localhost:4000`). Para producción
configura `VITE_API_URL`; revisa `docs/ENV.md`.

## Qué incluye

- Inicio con menú constelación interactivo y accesible.
- Ubicación automática: GPS, perfil, IP o búsqueda de ciudad. **Sin latitud y
  longitud manuales.**
- Carta celeste circular con estrellas, planetas y Luna.
- Recomendaciones para esta noche con clima real.
- Catálogo, clasificador de luces, quiz y perfil.
- Registro y login con validación de correo (exige `@`), clave y nombre.
- Chatbot flotante con icono de robot que saluda.
- Rastreador de la ISS disponible en `/iss` (ya no aparece en el menú).

## Pruebas y build

```bash
npm test
npm run build
```

## Base de datos

El frontend no habla con Supabase. Solo consume la API de Render, que guarda
los datos en Postgres. La única variable necesaria es `VITE_API_URL`; nunca se
exponen claves de Supabase en el navegador.

## Documentación

- `docs/ARQUITECTURA.md`
- `docs/ESTRUCTURA.md`
- `docs/RUTAS.md`
- `docs/MENU.md`
- `docs/UBICACION.md`
- `docs/ACCESIBILIDAD.md`
- `docs/DESPLIEGUE.md`
- `docs/VERCEL.md`
- `docs/ENV.md`
- `docs/SUPABASE.md`
- `docs/CHAT.md`
- `docs/PRUEBAS.md`
- `docs/CONTRIBUCION.md`
