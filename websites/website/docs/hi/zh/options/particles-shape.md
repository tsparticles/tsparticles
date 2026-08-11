# 粒子形状

`particles.shape` 定义如何绘制粒子。

## 示例

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`：一个形状或一系列形状。
- 常用值：`circle`、`square`、`triangle`、`polygon`、`image`、`emoji`、`text`。

## 带选项

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
