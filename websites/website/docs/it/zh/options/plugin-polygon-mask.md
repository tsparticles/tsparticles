# 插件选项：多边形遮罩

`polygonMask` 将粒子约束到 SVG 或基于多边形的区域。

## 示例

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## 注释

- 使用优化的 SVG 路径以获得更好的运行时性能。
- 验证路径加载和回退行为。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
