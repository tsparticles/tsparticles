# Responsive Plugin Options

The `responsive` plugin lets you define configuration overrides that apply when the canvas (or screen) width is below a given threshold. Each responsive entry contains `maxWidth`, a `mode` that controls behavior, and an `options` object that will be merged with the main configuration.

Properties (summary)

| Property   |                       Type |    Default | Description                                                                       |
| ---------- | -------------------------: | ---------: | --------------------------------------------------------------------------------- |
| `maxWidth` |                   `number` | `Infinity` | Maximum width (px) to apply these options.                                        |
| `mode`     | `ResponsiveMode` or string |   `canvas` | Mode used to determine target for responsive changes (e.g. `canvas` or `screen`). |
| `options`  |           `ISourceOptions` |       `{}` | Options object to be deep-merged when the rule matches.                           |

Notes

- `maxWidth` is compared against either the canvas width or the screen width depending on `mode`.
- `options` should contain valid top-level particle engine configuration that will override the base config when the responsive rule applies.

Example

```json
{
  "responsive": [
    {
      "maxWidth": 600,
      "mode": "canvas",
      "options": {
        "particles": {
          "number": { "value": 30 }
        }
      }
    }
  ]
}
```

See `plugins/responsive/src/Options/Classes/Responsive.ts` and `plugins/responsive/src/Options/Interfaces/IResponsive.ts` for implementation details and defaults.
