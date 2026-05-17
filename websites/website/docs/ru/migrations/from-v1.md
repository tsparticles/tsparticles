# Миграция с v1.x

Для `v1.x` лучше идти в три шага: пакеты, `load(...)`, опции.

## Современный Load API

До:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

После:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Что проверить в первую очередь

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Ресурсы

- Матрица переименований: [`/migrations/option-rename-matrix`](/ru/migrations/option-rename-matrix)
- Миграция с particles.js: [`/migrations/particles-js`](/ru/migrations/particles-js)
