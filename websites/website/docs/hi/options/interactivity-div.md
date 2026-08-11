# Interactivity Div

`interactivity.events.onDiv` applies interaction modes to specific HTML elements.

## Example

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## Practical guidance

- Use it for targeted UX zones instead of full-canvas reactions.
- Keep selector lists explicit and easy to maintain.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
