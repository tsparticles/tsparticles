# 互动点击

`interactivity.events.onClick` 定义当用户单击/点击画布时会发生什么。

## 示例

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## 实用指导

- 从一种模式开始，然后仅在需要时组合模式。
- 保持 `quantity` 和 `distance` 适度以获得稳定的 FPS。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
