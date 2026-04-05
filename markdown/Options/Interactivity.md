# Interactivity

Controls how tsParticles responds to mouse and touch interactions.

## Properties

| Key         | Type     | Notes                                                                                           |
| ----------- | -------- | ----------------------------------------------------------------------------------------------- |
| `detectsOn` | `string` | Which element catches interactions; see below                                                   |
| `events`    | `object` | Which events are enabled and which modes they trigger — see [Events](./Interactivity/Events.md) |
| `modes`     | `object` | Fine-tuning parameters for each mode — see [Modes](./Interactivity/Modes.md)                    |

## detectsOn

Determines which HTML element listens for mouse/touch events.

| Value      | Behavior                                                             |
| ---------- | -------------------------------------------------------------------- |
| `"canvas"` | Only the particles canvas is targeted                                |
| `"parent"` | The canvas parent element is targeted                                |
| `"window"` | The full window is targeted — works with negative `z-index` canvases |

Use `"window"` when the canvas is positioned behind page content (e.g. as a background layer with `z-index: -1`).

## Quick example

```json
{
  "interactivity": {
    "detectsOn": "canvas",
    "events": {
      "onHover": {
        "enable": true,
        "mode": "repulse"
      },
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "repulse": {
        "distance": 150
      },
      "push": {
        "quantity": 4
      }
    }
  }
}
```

## Common pitfalls

- Using `detectsOn: "canvas"` when the canvas is behind page content — hover/click events won't fire; use `"window"` instead
- Enabling a mode in `events` but not configuring its options in `modes`
- Forgetting to load interaction plugins (`@tsparticles/slim` or higher) for modes like `bubble`, `connect`, `grab`

## Related docs

- Events: [Events](./Interactivity/Events.md)
- Modes: [Modes](./Interactivity/Modes.md)
- Options root: [Options](../Options.md)
