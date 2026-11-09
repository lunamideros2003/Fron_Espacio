# Rutas de la aplicación

| Ruta | Página | En el menú |
| --- | --- | --- |
| `/` | Inicio / constelación | Estrella "Inicio" |
| `/explorar` | Catálogo de objetos | Sí |
| `/objeto/:slug` | Detalle de un objeto | No (desde el catálogo) |
| `/observar` | Qué observar esta noche | Sí |
| `/carta` | Carta celeste circular | Sí |
| `/clasificar` | Clasificador de luces | Sí |
| `/quiz` | Quiz del cielo | Sí |
| `/entrar` | Iniciar sesión / registro | Solo si no hay sesión |
| `/perfil` | Perfil y bitácora | Solo si hay sesión |
| `/iss` | Rastreador de la ISS | **No** (se quitó del menú) |
| `*` | Página no encontrada | No |

La constelación de inicio es el menú principal. En el resto de páginas se
muestra una versión compacta de la misma constelación.

## Parámetros

- `/observar` y `/carta` no reciben latitud ni longitud por la URL. El lugar se
  resuelve con `useSkyPlace` y se envía a la API.
- `/carta` acepta un selector de fecha y hora; la ubicación sigue siendo
  automática.
- `/objeto/:slug` usa el nivel del perfil cuando existe.

## Navegación

- El menú compacto se desplaza en horizontal en pantallas pequeñas.
- `ScrollToTop` vuelve al inicio en cada cambio de ruta.
- Cualquier ruta desconocida muestra la página 404 con salida al inicio.
