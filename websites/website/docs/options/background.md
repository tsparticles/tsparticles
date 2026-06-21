# Background & Canvas

This section controls the canvas layer and full-screen behavior.

## Main properties

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

- `color`: canvas background color.
- `opacity`: alpha channel for the background layer.
- `image`: optional background image.
- `position`, `repeat`, `size`: CSS-like behavior.
- `element`: optional CSS selector, `HTMLCanvasElement`, or `OffscreenCanvas` for the custom draw callback target. If omitted, the particles canvas is used.
- `draw`: optional per-frame callback `(context, delta) => void` for custom background rendering. Receives the 2D context of the target element (or the particles canvas) and the frame delta.

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: makes the canvas full viewport.
- `zIndex`: useful to place particles behind your content.

For embedded playgrounds and inline docs previews, set:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Improves rendering on HiDPI screens, but increases GPU/CPU load.

## Practical notes

- For landing pages, use `fullScreen.enable: true` with `zIndex: -1`.
- If you see slowdowns on mobile, try `detectRetina: false`.
- If a config is designed for fullscreen, disable `fullScreen` before embedding it in a bounded section.
