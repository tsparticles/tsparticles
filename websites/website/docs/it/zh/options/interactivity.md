# 互动性

`interactivity` 选项定义粒子对悬停/单击的反应方式。

重点参考：

- [`Interactivity Click`](/zh/options/interactivity-click)
- [`Interactivity Hover`](/zh/options/interactivity-hover)
- [`Interactivity Div`](/zh/options/interactivity-div)
- [`Interactivity Events`](/zh/options/interactivity-events)
- [`Interactivity Modes`](/zh/options/interactivity-modes)

## 基础结构

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## 最常用的事件

- `onHover`：为用户提供即时反馈。
- `onClick`：爆发或有针对性的行动。
- `resize`：在窗口调整大小时保持画布行为一致。
- `onDiv`：特定元素上的目标交互。

## 最佳实践

- 避免在低端设备上同时启用太多模式。
- 保持 `distance` 适度以避免性能峰值。
- 如果效果很重，请使用 `Start/Pause` 进行手动控制。

## 详细参考资料

- 点击：<https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- 悬停：<https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- 分区：<https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
