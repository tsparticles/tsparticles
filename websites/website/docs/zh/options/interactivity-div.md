# 互动部门

`interactivity.events.onDiv` 将交互模式应用于特定的 HTML 元素。

## 示例

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## 实用指导

- 将其用于目标用户体验区域，而不是全画布反应。
- 保持选择器列表明确且易于维护。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
