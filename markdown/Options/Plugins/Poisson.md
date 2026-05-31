# Poisson Plugin Options

Options for the `poisson` plugin control Poisson-disc (blue-noise) sampling used by the plugin to place particles with a minimum separation.

Properties (summary)

| Property     |      Type | Default | Description                                                       |
| ------------ | --------: | ------- | ----------------------------------------------------------------- |
| `enable`     | `boolean` | `false` | Enable the Poisson sampling plugin.                               |
| `dimensions` |  `number` | `2`     | Sampling dimensionality (usually `2` for canvas).                 |
| `radius`     |  `number` | `0`     | Minimum allowed distance between points (sampling radius).        |
| `retries`    |  `number` | `30`    | Number of attempts to place a sample before giving up for a cell. |
| `steps`      |  `number` | `0`     | Additional algorithm parameter; plugin default is `0`.            |

Notes

- `radius` controls how far apart generated points will be. A value of `0` effectively disables spacing and yields denser placement (depending on how the plugin uses the sampling results).
- `dimensions` is typically `2` for 2D canvas sampling. Some algorithms support `1` (line) sampling but the plugin's implementation uses `2` by default.
- `retries` sets how many candidate points the algorithm will try per active sample before removing it from the active list — higher values can produce a more uniform distribution at the cost of runtime.
- `steps` is present on the interface and has a default of `0` in the `Poisson` class. Consult the plugin source for any advanced uses of `steps` — it may be reserved for implementation details or future features.

Example

```json
{
  "poisson": {
    "enable": true,
    "dimensions": 2,
    "radius": 20,
    "retries": 30,
    "steps": 0
  }
}
```

For implementation details and the class defaults see `plugins/poisson/src/Options/Classes/Poisson.ts` and the interface `plugins/poisson/src/Options/Interfaces/IPoisson.ts`.
