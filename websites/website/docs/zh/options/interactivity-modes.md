# 交互模式

`interactivity.modes` 定义事件使用的特定于模式的设置。

## 示例

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## 实用指导

- 仅启用您真正使用的模式。
- 保持适度的距离以获得稳定的性能。
- 使用开始/暂停控件进行昂贵的模式组合。

相关页面：

- [`Interactivity Click`](/zh/options/interactivity-click)
- [`Interactivity Hover`](/zh/options/interactivity-hover)
- [`Interactivity Div`](/zh/options/interactivity-div)

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
