# Interactivity

`interactivity` options define how particles react to hover/click.

For focused references:

- [`Interactivity Click`](/options/interactivity-click)
- [`Interactivity Hover`](/options/interactivity-hover)
- [`Interactivity Div`](/options/interactivity-div)
- [`Interactivity Events`](/options/interactivity-events)
- [`Interactivity Modes`](/options/interactivity-modes)

## Base structure

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## Most used events

- `onHover`: immediate feedback for users.
- `onClick`: bursts or targeted actions.
- `resize`: keeps canvas behavior consistent on window resize.
- `onDiv`: target interactions on specific elements.

## Best practice

- Avoid enabling too many modes at once on low-end devices.
- Keep `distance` moderate to avoid performance spikes.
- If the effect is heavy, use manual control with `Start/Pause`.

## Detailed references

- Click: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- Hover: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- Div: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
