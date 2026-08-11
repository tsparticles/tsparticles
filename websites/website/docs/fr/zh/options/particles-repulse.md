# 粒子排斥

`particles.repulse` 控制粒子间相互作用中的排斥行为。

## 示例

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## 实用指导

- 使用适中的距离以避免突然的运动跳跃。
- 当两者都处于活动状态时，与 `interactivity.modes.repulse` 一起调整。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
