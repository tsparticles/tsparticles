# 从 v3.x 迁移

从 `v3.x` 迁移时，主要风险是**选项兼容性**和**包变更**。

## 优先变更

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## 包重命名

部分 `v3.x` 包已重命名或重组：

| v3 包                               | 当前包                          | 说明                                   |
| ----------------------------------- | ------------------------------- | -------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | 合并为单个插件                         |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | 合并为单个插件                         |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | 被 paint 系统取代                      |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | 被 paint 系统取代                      |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | 移动到 `plugins/colors/hsv/`，名称不变 |
| (v3 中不需要 - 内置)                | `@tsparticles/plugin-interactivity` | 所有交互插件（grab, bubble, repulse 等）正常工作所必需 |

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
4. 如果你使用交互插件（grab, bubble, repulse 等），请安装 `@tsparticles/plugin-interactivity` 并在加载任何交互插件之前使用 `await loadInteractivityPlugin(tsParticles)` 加载它。
5. 确保自定义插件/形状在 `tsParticles.load(...)` 之前加载。
6. 重新测试交互和性能敏感场景。

## 粒度加载函数

一些包提供单独的加载函数，以便只加载所需的部分，从而减小打包体积。

### 插件

- **`@tsparticles/plugin-absorbers`**：`loadAbsorbersPluginSimple`（仅吸收器的生命周期和绘制）、`loadAbsorbersInteraction`（仅点击/悬停交互）或 `loadAbsorbersPlugin`（两者）。
- **`@tsparticles/plugin-emitters`**：`loadEmittersPluginSimple`（仅发射器的生命周期和绘制）、`loadEmittersInteraction`（仅点击/悬停交互）或 `loadEmittersPlugin`（两者）。

### 形状

- **`@tsparticles/shape-polygon`**：`loadGenericPolygonShape`（多边形）或 `loadTriangleShape`（三角形）单独加载，或使用 `loadPolygonShape` 加载两者。
- **`@tsparticles/shape-cards`**：`loadClubsSuitShape`、`loadDiamondsSuitShape`、`loadHeartsSuitShape`、`loadSpadesSuitShape`（单个花色）、`loadCardSuitsShape`（所有花色）、`loadFullCardsShape`（卡牌图像）或 `loadCardsShape`（全部）。

所有其他形状包（arrow, circle, cog, emoji, heart, image, infinity, line, matrix, path, rounded-polygon, rounded-rect, spiral, square, squircle, star, text）直接导出单个 `load*Shape` 函数。

## 参考

- 重命名矩阵: [`/migrations/option-rename-matrix`](/zh/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/zh/options/particles-paint)
