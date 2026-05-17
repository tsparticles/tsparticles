# 从 v1.x 迁移

从 `v1.x` 开始，建议按三步迁移: 包、`load(...)`、选项。

## 新版 Load API

迁移前:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

迁移后:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## 优先检查的重命名

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## 参考

- 重命名矩阵: [`/migrations/option-rename-matrix`](/zh/migrations/option-rename-matrix)
- particles.js 迁移: [`/migrations/particles-js`](/zh/migrations/particles-js)
