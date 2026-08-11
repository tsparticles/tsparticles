# Migration von v1.x

Von `v1.x` aus empfiehlt sich eine Migration in drei Schritten: Pakete, `load(...)`, Optionen.

## Moderne Load-API

Vorher:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Nachher:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Renames zuerst pruefen

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ressourcen

- Option-Rename-Matrix: [`/migrations/option-rename-matrix`](/de/migrations/option-rename-matrix)
- Migration von particles.js: [`/migrations/particles-js`](/de/migrations/particles-js)
