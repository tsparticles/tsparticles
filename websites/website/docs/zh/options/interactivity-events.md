# 互动活动

`interactivity.events` 控制何时触发交互模式。

## 示例

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
    resize: true,
  },
}
```

- `onHover`：指针悬停行为。
- `onClick`：单击/点击行为。
- `resize`：在视口更改后保持行为一致。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Events.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
