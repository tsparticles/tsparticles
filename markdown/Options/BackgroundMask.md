# Background Mask

Configures masking between particles and the background/cover layer.

## Properties

| Key         | Type                | Example             | Notes                                                     |
| ----------- | ------------------- | ------------------- | --------------------------------------------------------- |
| `enable`    | `boolean`           | `true` / `false`    | Enables background mask mode                              |
| `composite` | `string`            | `"destination-out"` | Canvas composite operation                                |
| `cover`     | `string` / `object` | `"#000000"`         | Cover color config, supports {@link IBackgroundMaskCover} |

## Cover properties

| Key       | Type                | Example                                | Notes                                |
| --------- | ------------------- | -------------------------------------- | ------------------------------------ |
| `color`   | `string` / `object` | `"#bada55"` / `{ "value": "#bada55" }` | Cover color, supports {@link IColor} |
| `opacity` | `number`            | `1` / `0.5`                            | Cover alpha, from `0` to `1`         |

## Quick examples

### Enable default mask behavior

```json
{
  "backgroundMask": {
    "enable": true
  }
}
```

### Custom composite and cover

```json
{
  "backgroundMask": {
    "enable": true,
    "composite": "destination-out",
    "cover": {
      "color": {
        "value": "#111827"
      },
      "opacity": 0.9
    }
  }
}
```
