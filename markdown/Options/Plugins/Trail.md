# Trail Plugin Options

The `trail` plugin creates a trailing effect by emitting or retaining particle states for a number of frames. Options include enabling the effect, the trail length and fill options.

Properties (summary)

| Property |        Type | Default | Description                                                    |
| -------- | ----------: | ------: | -------------------------------------------------------------- |
| `enable` |   `boolean` | `false` | Enable the trail effect.                                       |
| `length` |    `number` |    `10` | Number of steps/frames to keep the trail.                      |
| `fill`   | `TrailFill` |    `{}` | Fill options used when the trail draws (see class for fields). |

Notes

- `length` controls how long the trail persists — larger values create longer, smoother trails but increase drawing work.
- The `fill` nested object describes whether the trail should fill the canvas between steps and its color/opacity.

Example

```json
{
  "trail": {
    "enable": true,
    "length": 20,
    "fill": { "color": { "value": "#ffffff" } }
  }
}
```

See `plugins/trail/src/Options/Classes/Trail.ts` and `plugins/trail/src/Options/Classes/TrailFill.ts` for implementation and defaults.
