# 粒子调色板

`particles.palette` 导入命名调色板并应用粒子颜色默认值。

## 示例

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## 改变了什么

- 根据调色板配置设置 `particles.paint.fill` 或 `particles.paint.stroke`。
- 如果调色板具有多种颜色变体，则 `particles.paint` 将作为变体数组导入。
- 使用调色板混合模式启用 `particles.blend`。
- 重复使用颜色集时保持配置紧凑。

## 新的调色板格式（用于自定义调色板）

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` 可以是：

- 单个变体对象 (`{ fill?, stroke? }`)
- 变体对象数组（每个变体可以定义 `fill`、`stroke` 或两者）

## 注释

- 未知的调色板 ID 会被忽略。
- 显式 `particles.paint.fill`、`particles.paint.stroke` 或 `particles.blend` 值覆盖导入的默认值。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
