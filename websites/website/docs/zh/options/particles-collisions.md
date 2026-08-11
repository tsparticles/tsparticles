# 粒子碰撞

`particles.collisions` 控制粒子间的碰撞行为。

## 示例

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`：激活碰撞。
- `mode`：碰撞行为（`bounce` 是最常见的）。

## 性能提示

在高粒子数的情况下，碰撞的代价可能会很高。首先使用 `particles.number` 进行调整。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
