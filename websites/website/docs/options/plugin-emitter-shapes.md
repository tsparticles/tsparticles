# Plugin Option: Emitter Shapes

`emittersShapes` provides additional emitter shape implementations for particle emitters.

## Available shapes

| Package                        | Shape name | Description                 |
| ------------------------------ | ---------- | --------------------------- |
| `plugin-emitter-shape-canvas`  | `canvas`   | Canvas-based emitter area   |
| `plugin-emitter-shape-circle`  | `circle`   | Circular emitter area       |
| `plugin-emitter-shape-path`    | `path`     | SVG path-based emitter area |
| `plugin-emitter-shape-polygon` | `polygon`  | Polygon-shaped emitter area |
| `plugin-emitter-shape-square`  | `square`   | Square emitter area         |

## Notes

- Select a shape via `emitters.shape.type`.
- Requires the `@tsparticles/plugin-emitters` package.
- When the emitter `draw` option is enabled (default), the selected shape is rendered on the canvas
  behind the particles. Set `emitters.draw: false` to keep the emitter invisible.
- Emitters of every shape can be dragged with the mouse when `emitters.draggable` is enabled.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/EmittersShapes.md>
