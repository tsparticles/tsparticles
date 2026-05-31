# Particle Effect

Defines shape-based visual effects that can be applied to particles. This file documents the `IEffect` options
included by the engine interfaces.

| Property | Type | Description |
|---|---|---|
| `type` | `string` / `string[]` | Effect name or array of effect names. Effects map to shape data or custom effect providers. |
| `options` | `ShapeData` | Options payload for the effect; structure depends on the selected effect/type. See specific effect shape docs. |
| `close` | `boolean` | When `true`, the effect path is closed (fills a shape). Set to `false` for open shapes (strokes/path only). |

Notes

- `type` may be a single string or an array of strings when multiple effect variants are allowed.
- `options` is forwarded to the shape/effect renderer; its structure is effect-dependent and is validated by the shape implementation.
- Typical uses: polygonal masks, custom shapes, composite shapes used as particle artwork or special emission shapes.

Example

```json
{
  "particles": {
    "effect": {
      "type": "star",
      "options": {
        "points": 5,
        "innerRadius": 0.4
      },
      "close": true
    }
  }
}
```

