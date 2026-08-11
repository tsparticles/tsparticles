# 粒子阴影

`particles.shadow` 在粒子周围添加阴影。

## 示例

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## 实用指导

- 阴影可以提高深度，但在密集场景中可能会很昂贵。
- 首先使用低模糊并在移动设备上进行基准测试。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
