# 粒子旋转

`particles.rotate` 控制每个粒子的旋转行为。

## 示例

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction`：顺时针或逆时针。
- `animation.speed`：角速度。
- `animation.sync`：共享与独立轮换时序。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
