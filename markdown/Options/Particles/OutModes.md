# Particles Out Modes

Controls what happens when a particle exits the canvas boundary. Configured under `particles.move.outModes`.

## Per-edge configuration

| Key       | Type     | Example     | Notes                                         |
| --------- | -------- | ----------- | --------------------------------------------- |
| `default` | `string` | `"out"`     | Default behavior for all edges not overridden |
| `top`     | `string` | `"destroy"` | Behavior for the top edge                     |
| `bottom`  | `string` | `"bounce"`  | Behavior for the bottom edge                  |
| `left`    | `string` | `"none"`    | Behavior for the left edge                    |
| `right`   | `string` | `"out"`     | Behavior for the right edge                   |

## Mode values

| Value                 | Behavior                         |
| --------------------- | -------------------------------- |
| `"out"`               | Wraps to the opposite side       |
| `"destroy"`           | Removes the particle             |
| `"bounce"`            | Bounces off the boundary         |
| `"bounce-horizontal"` | Bounces only on horizontal edges |
| `"bounce-vertical"`   | Bounces only on vertical edges   |
| `"none"`              | No special behavior              |
| `"split"`             | Splits the particle on exit      |

## Quick example

```json
{
  "particles": {
    "move": {
      "outModes": {
        "default": "out",
        "top": "destroy",
        "bottom": "bounce"
      }
    }
  }
}
```

`default` applies to all sides not explicitly overridden. You can set `top`, `bottom`, `left`, `right` independently.

## Related docs

- Move: [Move](./Move.md)
- Destroy: [Destroy](./Destroy.md)
- Options root: [Options](../../Options.md)
