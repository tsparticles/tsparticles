# Interactivity Hover

`interactivity.events.onHover` controls pointer-hover reactions.

## Example

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## Practical guidance

- Hover effects are more expensive on dense scenes.
- On mobile, consider disabling hover-heavy modes.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
