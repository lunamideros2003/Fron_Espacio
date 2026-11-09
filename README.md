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
configura `VITE_API_URL`; revisa `.env.example`.

## Qué incluye

- Inicio con menú constelación interactivo y accesible.
- Ubicación automática: GPS, perfil, IP o búsqueda de ciudad. **Sin latitud y
  longitud manuales.**
- Carta celeste circular con estrellas, planetas y Luna.
- Recomendaciones para esta noche con clima real.
- Catálogo, clasificador de luces, quiz y perfil.
- Chatbot flotante.
- Rastreador de la ISS disponible en `/iss` (ya no aparece en el menú).

## Pruebas y build

```bash
npm test
npm run build
```

## Documentación

- `docs/ARQUITECTURA.md`
- `docs/RUTAS.md`
- `docs/UBICACION.md`
- `docs/ACCESIBILIDAD.md`
- `docs/DESPLIEGUE.md`
- `docs/SUPABASE.md`
