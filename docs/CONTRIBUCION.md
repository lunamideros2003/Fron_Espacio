# Contribuir

## Flujo

1. Crea una rama corta: `feat/menu`, `fix/lugar`, `docs/supabase`.
2. Haz cambios pequeños y verificables.
3. Ejecuta `npm test` y `npm run build`.
4. Haz commits cortos, en imperativo y sin punto final.
5. Abre el pull request con una descripción breve.

## Mensajes de commit

- `Menu constelacion`
- `Lugar automatico`
- `Test de titulos`
- `Doc de Supabase`

Máximo recomendado: 50 caracteres. Un commit debe explicar un solo cambio.

## Estilo de código

- JavaScript moderno, sin punto y coma al final.
- Componentes en PascalCase, hooks con prefijo `use`.
- Textos visibles en español; identificadores en inglés.
- Sin coordenadas manuales en la interfaz.
- No se suben credenciales ni archivos `.env`.

## Antes de desplegar

- `npm test` en verde.
- `npm run build` sin advertencias nuevas.
- Revisar `/observar`, `/carta` y `/perfil` con ubicación automática.
