# EmittersShapes Plugin

The `plugins/emittersShapes/` plugins supply additional emitter shape implementations. They do not define a top-level options schema — shapes are selected via the emitter's `shape.type` property.

## Available emitter shape packages

| Package                                     | Shape     | Description                            |
| ------------------------------------------- | --------- | -------------------------------------- |
| `@tsparticles/plugin-emitter-shape-canvas`  | `canvas`  | Use an HTML Canvas as the emitter area |
| `@tsparticles/plugin-emitter-shape-circle`  | `circle`  | Circular emitter area                  |
| `@tsparticles/plugin-emitter-shape-path`    | `path`    | SVG path-based emitter area            |
| `@tsparticles/plugin-emitter-shape-polygon` | `polygon` | Polygon-shaped emitter area            |
| `@tsparticles/plugin-emitter-shape-square`  | `square`  | Square/rectangle emitter area          |

For emitter options see [Emitters](./Emitters.md). Use the shape name (e.g. `"circle"`, `"path"`) as the value of `emitters.shape.type`.
