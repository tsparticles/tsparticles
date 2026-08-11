# 交互悬停

`interactivity.events.onHover` 控制指针悬停反应。

## 示例

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## 实用指导

- 悬停效果在密集场景中成本更高。
- 在移动设备上，考虑禁用悬停重模式。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
