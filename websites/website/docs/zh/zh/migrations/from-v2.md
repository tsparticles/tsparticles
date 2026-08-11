# 从 v2.x 迁移

从 `v2.x` 迁移的重点是 `load(...)` API 和选项重命名。

## Load API 迁移

迁移前:

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
  },
});
```

迁移后:

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

## 主要重命名

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## 参考

- 重命名矩阵: [`/migrations/option-rename-matrix`](/zh/migrations/option-rename-matrix)
- v1 迁移: [`/migrations/from-v1`](/zh/migrations/from-v1)
