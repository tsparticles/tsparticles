# Particle Effect

Effect options let you supply shape-based data that particle renderers or shape providers consume. The `Effect` class
initializes sensible defaults used by the engine and accepts arbitrary `ShapeData` in `options`.

Properties

| Property  |                  Type | Default | Description                                                                                         |
| --------- | --------------------: | ------- | --------------------------------------------------------------------------------------------------- |
| `type`    | `string` / `string[]` | `[]`    | Effect name (or array) identifying the effect/shape provider.                                       |
| `options` |           `ShapeData` | `{}`    | Per-effect options object. Each effect name may define its own shape payload.                       |
| `close`   |             `boolean` | `true`  | Whether the effect path should be closed (useful for filled shapes). Set to `false` for open paths. |

Behavior & notes

- The `Effect` class stores `options` as a map where each effect name can hold effect-specific `IShapeValues`.
- When loading, the engine deep-merges provided options into existing defaults (`deepExtend`).
- Use `type` to select which effect implementations will interpret the `options` payload.

Example

```json
{
  "particles": {
    "effect": {
      "type": "star",
      "options": {
        "star": {
          "points": 5,
          "innerRadius": 0.4
        }
      },
      "close": true
    }
  }
}
```
