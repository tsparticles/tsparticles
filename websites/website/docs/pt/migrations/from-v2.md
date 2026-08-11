# Migrar de v2.x

De `v2.x`, os pontos principais sao: API `load(...)` e renomeacao de opcoes.

## Migracao da Load API

Antes:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

Depois:

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

## Renomes principais

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Recursos

- Matriz de renomeacao: [`/migrations/option-rename-matrix`](/pt/migrations/option-rename-matrix)
- Migracao v1: [`/migrations/from-v1`](/pt/migrations/from-v1)
