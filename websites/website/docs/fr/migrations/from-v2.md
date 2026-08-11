# Migrer depuis v2.x

Depuis `v2.x`, les points principaux sont: API `load(...)` et renommages d'options.

## Migration de la Load API

Avant:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

Apres:

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

## Renommages principaux

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ressources

- Matrice des renommages: [`/migrations/option-rename-matrix`](/fr/migrations/option-rename-matrix)
- Migration v1: [`/migrations/from-v1`](/fr/migrations/from-v1)
