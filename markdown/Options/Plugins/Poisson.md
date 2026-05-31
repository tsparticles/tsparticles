# Poisson Plugin Options

Options used by the `poisson` plugin (Poisson-disk sampling for emitters/placement). This file provides a short reference
for the options referenced by the plugin options classes.

Common fields

| Property | Type | Description |
|---|---|---|
| `radius` | `number` | Minimum distance between sampled points. |
| `tries` | `number` | Maximum attempts per sample. |
| `enable` | `boolean` | Enable Poisson sampling for the target emitter or placement. |

Example

```json
{
  "poisson": {
    "enable": true,
    "radius": 10,
    "tries": 30
  }
}
```

