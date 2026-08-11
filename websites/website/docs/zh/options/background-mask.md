# 背景蒙版

`backgroundMask` 让粒子穿透或与蒙版背景图层混合。

## 示例

### 静态覆盖 (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### 动态绘制回调 _(自 4.3.0 起)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### 外部元素 _(自 4.3.0 起)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## 属性

| 属性        | 类型                       | 描述                                         |
| ----------- | -------------------------- | -------------------------------------------- |
| `enable`    | `boolean`                  | 激活背景屏蔽                                 |
| `composite` | `GlobalCompositeOperation` | Canvas 复合操作（默认：`"destination-out"`） |
| `cover`     | `BackgroundMaskCover`      | 覆盖配置                                     |

### `cover` (BackgroundMaskCover)

| 属性      | 类型                                                                                         | 描述                                                   |
| --------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `color`   | `string` / `OptionsColor`                                                                    | 覆盖颜色                                               |
| `image`   | `string`                                                                                     | 覆盖图像 URL                                           |
| `opacity` | `number`                                                                                     | 覆盖透明级别（0..1，默认：`1`）                        |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | 外部元素或 CSS 选择器，每帧自动绘制 _(自 4.3.0 起)_    |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | 每帧在主 canvas 上下文中自定义绘制回调 _(自 4.3.0 起)_ |

### 图层顺序 _(自 4.3.0 起)_

1. `clear()` — 清除画布像素
2. `cover.element` 自动绘制（如果设置）
3. `cover.draw` 回调（如果设置）
4. 静态覆盖（颜色/图像）— 回退
5. 全局复合操作

## 何时使用

- 类似聚光灯的效果。
- 对比强烈的英雄部分。
- 深色背景上的分层交互。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
