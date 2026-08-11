# 粒子弹跳

`particles.bounce` 自定义碰撞或边界应用弹跳逻辑时的弹跳行为。

## 示例

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## 实用指导

- `1` 附近的值保持自然反弹。
- 较高的值可能看起来精力充沛，但不太现实。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
