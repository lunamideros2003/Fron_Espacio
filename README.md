# AstroIA

Hice esta página para aprender del cielo de una forma fácil. El menú es una
constelación y cada estrella abre una sección distinta.

## Cómo verla en mi computador

1. Abro una terminal en `Back_Espacio` y enciendo el backend:

   ```bash
   .venv\Scripts\python.exe -m uvicorn app.main:app --port 4000
   ```

2. Abro otra terminal en `Fron_Espacio`, instalo lo necesario la primera vez y
   arranco la página:

   ```bash
   npm install
   npm run dev
   ```

3. Entro a http://localhost:5173

Si el backend está apagado, la página me avisa que no puede conectar con el
servidor.

## Qué se puede hacer

- Ver el cielo de esta noche con mi ubicación automática.
- Abrir la carta celeste con estrellas, planetas y Luna.
- Buscar objetos, clasificar luces y hacer cuestionarios.
- Crear mi cuenta, entrar y guardar mis observaciones.
- Hablar con el chatbot, que tiene un robot que saluda.

## Cómo la publico

Uso Vercel. En las variables del proyecto pongo la dirección del backend:

```env
VITE_API_URL=https://back-espacio.onrender.com
```

Sin barra al final. Después hago un redeploy para que tome el cambio. Nunca
pongo claves de Supabase en el frontend.

## Pruebas

```bash
npm test
npm run build
```

## Más detalles

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
