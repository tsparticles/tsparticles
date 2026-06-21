# 背景和画布

此部分控制画布层和全屏行为。

## 图层顺序（从后到前）

1. **CSS 背景**（`color`、`image`、`position`、`repeat`、`size`）— 作为 DOM 画布样式应用
2. **`clear()`** — 每帧清除画布像素
3. **`background.element` 自动绘制** — 如果设置，`ctx.drawImage(element, ...)` 合成外部元素
4. **`background.draw` 回调** — 如果设置，使用主渲染上下文 + delta 调用
5. **粒子** — 绘制在上面

`element` 和 `draw` 是**独立的图层**。两者都是可选的，可以一起或单独使用。

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

| 键         | 类型                                                                                         | 描述                                                    |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | 画布背景颜色。                                          |
| `opacity`  | `number`                                                                                     | 背景颜色的 Alpha 通道，从 `0` 到 `1`。                  |
| `image`    | `string`                                                                                     | CSS `background-image` 值（例如 `url('...')`）。        |
| `position` | `string`                                                                                     | CSS `background-position` 值。                          |
| `repeat`   | `string`                                                                                     | CSS `background-repeat` 值。                            |
| `size`     | `string`                                                                                     | CSS `background-size` 值。                              |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | 每帧通过 `drawImage` 自动绘制的外部元素。不由引擎管理。 |
| `draw`     | `(context, delta) => void`                                                                   | 在主画布上下文上进行自定义背景绘制的逐帧回调。          |

### `element`

当设置 `element` 后，元素的当前视觉内容每帧通过 `ctx.drawImage()` 绘制到主画布上。该元素**不由引擎管理**——外部代码负责其渲染。

支持的元素类型：

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement`（绘制当前帧）
- `HTMLImageElement`
- DOM 中匹配上述任一元素的 CSS 选择器字符串

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// 自动绘制外部 <video> 元素作为背景
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

用于自定义背景渲染的逐帧回调。始终接收**主画布上下文**（`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`），从不接收元素的上下文。

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

（TypeScript 使用函数引用，而不是字符串。）

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### 组合使用 element + draw

两个图层每帧独立运行。先绘制元素，然后执行 draw 回调：

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

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
