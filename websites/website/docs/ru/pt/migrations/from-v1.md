# Migrar de v1.x

De `v1.x`, o recomendado e migrar em tres passos: pacotes, `load(...)`, opcoes.

## Load API moderna

Antes:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Depois:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Renomes para validar primeiro

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Recursos

- Matriz de renomeacao: [`/migrations/option-rename-matrix`](/pt/migrations/option-rename-matrix)
- Migracao de particles.js: [`/migrations/particles-js`](/pt/migrations/particles-js)
