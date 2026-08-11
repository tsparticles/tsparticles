# v2.x から移行

`v2.x` からは、`load(...)` API とオプション改名が主な変更点です。

## Load API 移行

Before:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

After:

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

## 主な改名

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## リソース

- 改名マトリクス: [`/migrations/option-rename-matrix`](/ja/migrations/option-rename-matrix)
- v1 移行: [`/migrations/from-v1`](/ja/migrations/from-v1)
