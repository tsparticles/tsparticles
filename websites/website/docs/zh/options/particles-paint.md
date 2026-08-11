# 粒子涂料

`particles.paint` 对粒子填充和描边样式选项进行分组。

## 示例

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## 填充 (`particles.paint.fill`)

- 定义粒子内部颜色。
- 支持静态值、数组和颜色动画。

## 行程 (`particles.paint.stroke`)

- 定义轮廓宽度和颜色。
- 有助于增加形状对比度。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
