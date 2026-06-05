# 颜色格式

tsParticles 接受跨选项（例如 `background`、`particles.paint` 和插件设置）的多种颜色格式。

## 常用格式

```ts
color: "#60a5fa";
```

```ts
color: {
  value: {
    r: 96,
    g: 165,
    b: 250,
  },
}
```

```ts
color: {
  value: "hsl(220, 90%, 70%)",
}
```

## 实用指导

- 为了文档和示例的可读性，更喜欢十六进制。
- 使用颜色数组来实现更丰富的随机场景。
- 在文本后面使用效果时保持高对比度。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Color.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Color.md>
