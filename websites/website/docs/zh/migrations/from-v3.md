# 从 v3.x 迁移

从 `v3.x` 迁移时，主要风险是**选项兼容性**和**包变更**。

## 优先变更

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## 包重命名

部分 `v3.x` 包已重命名或重组：

| v3 包 | 当前包 | 说明 |
|---|---|---|
| `@tsparticles/move-base` | `@tsparticles/plugin-move` | 合并为单个插件 |
| `@tsparticles/move-parallax` | `@tsparticles/plugin-move` | 合并为单个插件 |
| `@tsparticles/updater-color` | `@tsparticles/updater-paint` | 被 paint 系统取代 |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint` | 被 paint 系统取代 |
| `@tsparticles/plugin-hsv-color` | `@tsparticles/plugin-hsv-color` | 移动到 `plugins/colors/hsv/`，名称不变 |

## 选项映射示例

迁移前（`v3.x` 风格）：

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

迁移后（当前）：

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Load API 迁移

迁移前（旧式位置参数）：

```ts
await tsParticles.load("tsparticles", options);
```

迁移后（对象参数）：

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## 推荐步骤

1. 将所有 `@tsparticles/*` 包对齐到最新版本。
2. 将弃用的选项键（`particles.color`、`particles.stroke`）替换为 `particles.paint.*`。
3. 在 `package.json` 中更新重命名的包（见上表）。
4. 确保自定义插件/形状在 `tsParticles.load(...)` 之前加载。
5. 重新测试交互和性能敏感场景。

## 参考

- 重命名矩阵: [`/migrations/option-rename-matrix`](/zh/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/zh/options/particles-paint)
