# 粒子移动

`particles.move` 定义方向、速度和画布外行为。

## 示例

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`：打开移动。
- `speed`：主要感知运动强度。
- `direction`：固定方向或自由移动。
- `outModes`：画布边界处的行为。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
