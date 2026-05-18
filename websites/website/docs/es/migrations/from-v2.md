# Migrar desde v2.x

Desde `v2.x`, los puntos principales son: API de `load(...)` y renombre de opciones.

## Migracion API load

Antes:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

Despues:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
    },
  },
});
```

## Renombres principales

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Recursos

- Matriz de renombres: [`/migrations/option-rename-matrix`](/es/migrations/option-rename-matrix)
- Migracion v1: [`/migrations/from-v1`](/es/migrations/from-v1)
