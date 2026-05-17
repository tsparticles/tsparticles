# Migration von v2.x

Von `v2.x` aus sind die Hauptpunkte: `load(...)`-API und Option-Renames.

## Load-API-Migration

Vorher:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

Nachher:

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

## Wichtige Renames

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ressourcen

- Option-Rename-Matrix: [`/migrations/option-rename-matrix`](/de/migrations/option-rename-matrix)
- Migration v1: [`/migrations/from-v1`](/de/migrations/from-v1)
