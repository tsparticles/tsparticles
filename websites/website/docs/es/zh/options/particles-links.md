# 粒子链接

`particles.links` 在附近粒子之间绘制连接线。

## 示例

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`：链接的最大距离。
- `opacity`：线条的视觉强度。
- `color`：线条颜色。
- `width`：笔画粗细。

## 性能提示

由于粒子数较多，链接可能会变得昂贵。一起调整 `number.value` 和 `distance`。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
