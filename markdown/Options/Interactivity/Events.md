# Interactivity Events

Defines which user interactions trigger particle behaviors.

## Properties

| Key       | Type      | Notes                                                                       |
| --------- | --------- | --------------------------------------------------------------------------- |
| `onClick` | `object`  | Triggered on mouse/touch click — see {@link IClickEvent}                    |
| `onDiv`   | `object`  | Triggered when cursor enters a specific DOM element — see {@link IDivEvent} |
| `onHover` | `object`  | Triggered when cursor hovers over the canvas — see {@link IHoverEvent}      |
| `resize`  | `boolean` | When `true`, recalculates layout on window resize (default: `true`)         |

## Quick examples

### Hover repulse + click push

```json
{
  "interactivity": {
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
    }
  }
}
```

### Hover grab (connect nearby particles to cursor)

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "grab"
      }
    }
  }
}
```

### Click remove

```json
{
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "remove"
      }
    }
  }
}
```

## Available event modes

`onHover.mode` and `onClick.mode` accept a string or array of strings from these values:

| Mode       | Description                                    |
| ---------- | ---------------------------------------------- |
| `attract`  | Pulls particles toward cursor                  |
| `bounce`   | Bounces particles away from cursor             |
| `bubble`   | Enlarges / changes opacity of nearby particles |
| `connect`  | Draws lines between particles near the cursor  |
| `grab`     | Draws a line from cursor to nearby particles   |
| `light`    | Simulates a light source at cursor position    |
| `parallax` | Moves particles slightly in response to cursor |
| `pause`    | Pauses all animation while hovering            |
| `push`     | Adds new particles at cursor position          |
| `remove`   | Removes particles near cursor                  |
| `repulse`  | Pushes particles away from cursor              |
| `slow`     | Slows particles near cursor                    |
| `trail`    | Emits particles along the cursor path          |

> Modes are configured under `interactivity.modes` — see [Modes](./Modes.md).

## Common pitfalls

- Enabling events without loading the required interaction plugin (e.g. `connect`, `bubble` require `@tsparticles/slim` or higher)
- Using `onDiv` without targeting a real DOM selector
- Using multiple modes in an array and not configuring each mode's options under `interactivity.modes`

## Related docs

- Modes configuration: [Modes](./Modes.md)
- Interactivity root: [Interactivity](../Interactivity.md)
- Options root: [Options](../../Options.md)
