# Plugin Option: Emitters

`emitters` spawns particles dynamically and is plugin-driven.

## Example

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## Drawing and dragging

Emitters are drawn behind particles when `draw` is enabled (default) and can be made interactive with
`draggable`:

```json
{
  "emitters": {
    "draw": true,
    "draggable": true,
    "position": { "x": 50, "y": 50 },
    "size": { "width": 20, "height": 20, "mode": "percent" },
    "spawn": {
      "fill": { "color": "#ff0000" },
      "stroke": { "color": "#000000", "width": 2 }
    }
  }
}
```

- `draw` (default `true`): renders the emitter shape, filled with `spawn.fill.color` (default black)
  and stroked with `spawn.stroke.color` when provided.
- `draggable` (default `false`): when `true`, the emitter can be grabbed and dragged inside its shape
  bounds; emitters linked to a `domId` are never draggable.

## Notes

- Great for burst effects and dynamic particle generation.
- Keep emission rates balanced to avoid performance spikes.
- `draw: false` keeps the emitter invisible, preserving the legacy behavior.
- Dragging works inside the emitter shape bounds and keeps the emitter emitting while it moves.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
