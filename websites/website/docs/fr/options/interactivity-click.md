# Interactivity Click

`interactivity.events.onClick` defines what happens when users click/tap the canvas.

## Example

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## Practical guidance

- Start with one mode, then combine modes only if needed.
- Keep `quantity` and `distance` moderate for stable FPS.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
