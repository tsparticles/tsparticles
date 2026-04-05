# Full Screen

Controls whether the particles canvas covers the full viewport and its stacking order.

## Properties

| Key      | Type      | Default | Notes                                                               |
| -------- | --------- | ------- | ------------------------------------------------------------------- |
| `enable` | `boolean` | `true`  | Sets canvas to full viewport size, acting as an animated background |
| `zIndex` | `number`  | `0`     | CSS `z-index` applied to the canvas element                         |

## enable

When `true`, tsParticles sets the canvas `position`, `width`, and `height` automatically to cover the full window — no CSS needed.

```json
{
  "fullScreen": {
    "enable": true
  }
}
```

Set to `false` when you want the canvas to stay inside a specific container element and inherit its dimensions.

## zIndex

Controls whether the canvas appears in front of or behind page content.

```json
{
  "fullScreen": {
    "enable": true,
    "zIndex": -1
  }
}
```

With `zIndex: -1` the canvas is behind all page content.  
If you use a negative `zIndex`, set `interactivity.detectsOn` to `"window"` so mouse events still reach the canvas.

## Quick examples

### Fullscreen background (most common)

```json
{
  "fullScreen": {
    "enable": true,
    "zIndex": -1
  },
  "interactivity": {
    "detectsOn": "window"
  }
}
```

### Contained canvas (inside a div)

```json
{
  "fullScreen": {
    "enable": false
  }
}
```

Then size and position the container `<div>` via CSS.

## Common pitfalls

- Setting `zIndex: -1` but keeping `detectsOn: "canvas"` — mouse events will not reach the canvas because it is behind other elements
- Using `fullScreen: false` without giving the target element explicit dimensions — the canvas will have zero size
- Using `fullScreen: true` inside a small container `<div>` — the canvas will still expand to full viewport

## Related docs

- Interactivity (detectsOn): [Interactivity](./Interactivity.md)
- Options root: [Options](../Options.md)
