# 粒子 ZIndex

`particles.zIndex` 控制绘制分层和可选的 z-index 动画。

## 示例

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## 实用指导

- 使用 z 索引变化来创建深度感知。
- 保持适度的范围以保持视觉一致性。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
