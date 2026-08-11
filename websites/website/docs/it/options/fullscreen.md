# Full Screen

Use `fullScreen` to control whether the canvas takes the full viewport.

## Typical setup

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`: toggles full-viewport behavior.
- `zIndex`: useful to keep particles behind app content.

## Embedded sections

For docs previews, cards, and playground panels:

```ts
fullScreen: {
  enable: false,
}
```

This avoids overlap with page layout and other canvases.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
