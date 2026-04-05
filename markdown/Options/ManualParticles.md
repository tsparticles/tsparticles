# Manual Particles

Allows placing specific particles at defined positions when the container loads, instead of random spawning.

Useful for creating fixed reference points, logos, or custom visual arrangements.

## Properties

| Key        | Type     | Notes                                                              |
| ---------- | -------- | ------------------------------------------------------------------ |
| `position` | `object` | Canvas position as a percentage — `{ x: 50, y: 50 }` is center     |
| `options`  | `object` | Full {@link IParticlesOptions} override for this specific particle |

## Position

Coordinates are expressed as percentages of canvas dimensions, not absolute pixels.

- `{ x: 0, y: 0 }` → top-left corner
- `{ x: 50, y: 50 }` → center
- `{ x: 100, y: 100 }` → bottom-right corner

If `position` is omitted, a random position is used.

## Quick examples

### Single centered particle

```json
{
  "manualParticles": [
    {
      "position": { "x": 50, "y": 50 },
      "options": {
        "size": { "value": 20 },
        "color": { "value": "#ff0000" }
      }
    }
  ]
}
```

### Multiple fixed particles at corners

```json
{
  "manualParticles": [
    { "position": { "x": 10, "y": 10 } },
    { "position": { "x": 90, "y": 10 } },
    { "position": { "x": 10, "y": 90 } },
    { "position": { "x": 90, "y": 90 } }]
}
```

### Mixed — manual + random

Manual particles are added on top of the normal random `number.value` count.

```json
{
  "particles": {
    "number": { "value": 40 }
  },
  "manualParticles": [
    {
      "position": { "x": 50, "y": 50 },
      "options": {
        "size": { "value": 30 },
        "color": { "value": "#ffffff" },
        "move": { "enable": false }
      }
    }
  ]
}
```

## Common pitfalls

- Manual particles are **additional** to `number.value` — they do not replace the random pool
- Omitting `options` gives the manual particle the same config as regular particles — override only what you need
- Coordinates above `100` or below `0` place the particle outside the visible canvas

## Related docs

- Particles options: [Particles](./Particles.md)
- Options root: [Options](../Options.md)
