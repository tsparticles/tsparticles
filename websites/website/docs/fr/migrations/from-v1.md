# Migrer depuis v1.x

Depuis `v1.x`, il est recommande de migrer en trois etapes: paquets, `load(...)`, options.

## Load API moderne

Avant:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Apres:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Renommages a verifier en premier

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ressources

- Matrice des renommages: [`/migrations/option-rename-matrix`](/fr/migrations/option-rename-matrix)
- Migration depuis particles.js: [`/migrations/particles-js`](/fr/migrations/particles-js)
