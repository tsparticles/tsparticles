# 背景和画布

此部分控制画布层和全屏行为。

## 主要属性

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color`：画布背景颜色。
- `opacity`：背景层的 Alpha 通道。
- `image`：可选背景图像。
- `position`、`repeat`、`size`：类似 CSS 的行为。
- `element`：可选的 CSS 选择器、`HTMLCanvasElement` 或 `OffscreenCanvas`，用于自定义 draw 回调。省略时使用粒子画布。
- `draw`：可选的逐帧回调 `(context, delta) => void`，用于自定义背景渲染。

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`：使画布充满视口。
- `zIndex`：用于将粒子放置在内容后面。

对于嵌入式 Playground 和内联文档预览，请设置：

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

改进了 HiDPI 屏幕上的渲染，但增加了 GPU/CPU 负载。

## 实用笔记

- 对于登陆页面，请使用 `fullScreen.enable: true` 和 `zIndex: -1`。
- 如果您发现移动设备速度变慢，请尝试 `detectRetina: false`。
- 如果配置是为全屏设计的，请在将其嵌入有界部分之前禁用 `fullScreen`。
