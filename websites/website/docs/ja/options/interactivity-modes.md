# Interactivity Modes

`interactivity.modes` defines mode-specific settings used by events.

## Example

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## Practical guidance

- Enable only the modes you really use.
- Keep distances moderate for stable performance.
- Use Start/Pause controls for expensive mode combinations.

Related pages:

- [`Interactivity Click`](/options/interactivity-click)
- [`Interactivity Hover`](/options/interactivity-hover)
- [`Interactivity Div`](/options/interactivity-div)

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
