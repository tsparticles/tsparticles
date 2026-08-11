# 手动粒子

`manualParticles` 在固定位置添加显式粒子。

## 示例

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## 何时使用

- 锚定视觉标记。
- 混合固定和动态粒子的混合效果。
- 控制演示或教程中的初始状态。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
