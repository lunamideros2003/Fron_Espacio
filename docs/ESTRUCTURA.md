# Estructura del frontend

```
Fron_Espacio/
├── public/            Archivos estáticos (robots, sitemap, manifest, icono)
├── src/
│   ├── api.js         Cliente HTTP del backend
│   ├── App.jsx        Rutas
│   ├── main.jsx       Punto de entrada y límite de errores
│   ├── styles.css     Estilos generales
│   ├── constellation.css  Estilos del menú constelación
│   ├── components/    Piezas reutilizables
│   ├── constellation/ Datos puros del menú (estrellas, líneas, geometría)
│   ├── context/       Sesión de usuario
│   ├── hooks/         Lógica reutilizable (lugar, búsqueda, título)
│   ├── lib/           Utilidades sin React (formato, almacenamiento)
│   └── pages/         Una página por ruta
├── tests/             Pruebas con node --test
└── docs/              Documentación
```

## Reglas

- `pages/` solo compone; la lógica vive en `hooks/` o `lib/`.
- `constellation/` no importa React para poder probarse con Node.
- Los textos de interfaz van en español; nombres de código en inglés.
- Ningún componente guarda coordenadas manuales: el lugar llega de
  `useSkyPlace`.
