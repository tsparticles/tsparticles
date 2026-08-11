# Versioning & Migration

Usa esta seccion para navegar entre las versiones principales de `tsParticles`, seguir las releases y entender el versionado.

## Guias de migracion

- [`Migrar desde v3.x`](/es/migrations/from-v3)
- [`Migrar desde v2.x`](/es/migrations/from-v2)
- [`Migrar desde v1.x`](/es/migrations/from-v1)

## Ruta rapida

- Desde `v3.x`: empieza por [`/es/migrations/from-v3`](/es/migrations/from-v3) (enfoque: cambios de claves de opciones + renombrados de paquetes).
- Desde `v2.x`: empieza por [`/es/migrations/from-v2`](/es/migrations/from-v2) (enfoque: API `load(...)` + opciones).
- Desde `v1.x`: empieza por [`/es/migrations/from-v1`](/es/migrations/from-v1) (enfoque: paquetes, loaders, opciones).

## Donde suele romperse la migracion

Las migraciones entre versiones principales suelen romperse en dos puntos:

1. **Forma de la API Load** (viejos parametros posicionales vs nuevo parametro objeto).
2. **Esquema de opciones** (claves renombradas/movidas).

Si tu app compila pero el renderizado es incorrecto, empieza por las opciones.

## Busqueda rapida

- [Matriz de renombres de opciones](/es/migrations/option-rename-matrix) — mapeo entre claves legacy y actuales.

## Tambien util

- [Changelog](/es/migrations/changelog) — ultimas notas de version.
- [Releases y Versionado](/es/migrations/releases) — reglas de alineacion de versiones y checklist de publicacion.
- [Migracion desde particles.js](/es/migrations/particles-js) — migrar desde `particles.js` o `canvas-confetti`.
