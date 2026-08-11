# 粒子寿命

`particles.life` 控制每个粒子的生命周期计数和持续时间。

## 示例

```ts
particles: {
  life: {
    count: 2,
    duration: {
      value: {
        min: 2,
        max: 5,
      },
    },
  },
}
```

- `count`：每个粒子有多少个生命周期。
- `duration`：每个周期持续多长时间。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Life.md>
