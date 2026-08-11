# 粒子数

`particles.number` 控制有多少粒子处于活动状态。

## 示例

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`：粒子的基本数量。
- `density.enable`：使计数适应画布大小。
- `density.area`：用于缩放的参考区域。

## 性能提示

当 FPS 下降时，首先降低 `value`。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
