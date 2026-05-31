# Zoom Plugin Options

The `zoom` plugin provides zoom interaction configuration (min/max zoom levels and whether the interaction is enabled).

Properties (summary)

| Property |      Type |   Default | Description                                                     |
| -------- | --------: | --------: | --------------------------------------------------------------- |
| `enable` | `boolean` |   `false` | Enable zoom interactions.                                       |
| `min`    |  `number` | `minZoom` | Minimum zoom level (see `plugins/zoom/src/Utils/Constants.ts`). |
| `max`    |  `number` | `maxZoom` | Maximum zoom level.                                             |

Notes

- Default `min` and `max` values are defined via constants in the plugin (`minZoom`, `maxZoom`).
- When `enable` is `true`, the plugin listens for configured input (mouse wheel / gestures) and applies scale to the canvas or container accordingly.

Example

```json
{
  "zoom": {
    "enable": true,
    "min": 0.5,
    "max": 2
  }
}
```

See `plugins/zoom/src/Options/Classes/Zoom.ts` for defaults and implementation details.
