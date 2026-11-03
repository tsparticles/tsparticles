# 从 v2.x 迁移

从 `v2.x` 迁移到当前版本通常有两个主要破坏性变更区域：

1. `tsParticles.load(...)` 签名迁移。
2. 选项键迁移（尤其是 color 和 stroke）。

## 迁移 Load API（重要）

在现代版本中，`load` 接受**单个参数对象**。

之前（`v2.x` 位置参数风格）：

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

之后（单个对象）：

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

也可以在同一对象中传入 `element`、`url` 和 `index`。

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## 主要选项迁移

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

之前：

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

之后：

```ts
particles: {
  paint: {
    fill: { color: { value: "#00ffcc" } },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## 建议步骤

1. 一起升级所有 `@tsparticles/*` 包。
2. 检查 wrapper（React/Vue/Angular 等）版本是否在同一 major 线上。
3. 将所有旧的 `tsParticles.load(id, options)` 调用转换为对象参数。
4. 将已知键（`color`、`stroke`）迁移到 `paint.fill`/`paint.stroke`。
5. 在最复杂的配置上执行视觉回归检查。

## 检查清单

- 确认 lockfile 中没有混用 major 版本。
- 确认所选 bundle（`basic`、`slim`、`all`）仍与启用的功能匹配。
- 重新测试 canvas 生命周期钩子（`loaded`、`particlesLoaded`、cleanup 路径）。

## 有用的选项文档

- 重命名矩阵: [`/migrations/option-rename-matrix`](/zh/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/zh/options/particles-paint)
- `particles.color` 迁移说明: [`/options/particles-color`](/zh/options/particles-color)
- `particles.stroke` 迁移说明: [`/options/particles-stroke`](/zh/options/particles-stroke)

## 参考资料

- 版本对齐规则: [`/migrations/releases`](/zh/migrations/releases)
- 仓库发布: <https://github.com/tsparticles/tsparticles/releases>
