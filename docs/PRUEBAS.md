# Pruebas del frontend

Las pruebas usan el runner nativo de Node (`node --test`), sin dependencias extra.
Solo cubren lógica pura: constelaciones, formato, almacenamiento, validación y
textos.

## Comandos

```bash
npm test        # ejecuta todos los archivos de tests/
npm run build   # compila con Vite y detecta errores de imports
```

## Qué se prueba

| Archivo | Cubre |
| --- | --- |
| `tests/stars.test.js` | Estrellas del menú, rutas y ausencia de la ISS |
| `tests/lines.test.js` | Conexiones entre estrellas |
| `tests/geometry.test.js` | Porcentajes y extremos de línea |
| `tests/viewBox.test.js` | Dimensiones de los viewBox |
| `tests/placeStore.test.js` | Lugar guardado y caducidad |
| `tests/storage.test.js` | Lectura y escritura segura de localStorage |
| `tests/placeCopy.test.js` | Mensajes según el origen del lugar |
| `tests/documentTitle.test.js` | Títulos por ruta |
| `tests/dust.test.js` | Polvo estelar decorativo |
| `tests/accountStar.test.js` | Etiqueta dinámica de la cuenta |
| `tests/format.test.js` | Formatos de fecha, hora y números |
| `tests/moment.test.js` | Hora AM/PM, fecha completa y años 1900 a 2026 |
| `tests/validate.test.js` | Correo con @, clave de 8 y nombre de 2 letras |
| `tests/menuRoutes.test.js` | Rutas y etiquetas del menú |

## Al agregar pruebas

- Un archivo por módulo.
- Sin red ni DOM: si hace falta, se simula con un objeto mínimo.
- Nombres de test en inglés y mensajes claros.
