# On Hover Event

Configures interactions triggered while the pointer is over the canvas.

## Properties

| Key      | Type               | Example                                                              | Notes                       |
| -------- | ------------------ | -------------------------------------------------------------------- | --------------------------- |
| `enable` | `boolean`          | `true` / `false`                                                     | Enables hover interactions  |
| `mode`   | `string` / `array` | `"grab"`, `"bubble"`, `"repulse"`, `"connect"`, `["grab", "bubble"]` | One or multiple hover modes |

## Quick examples

### Repulse on hover

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}
```

### Combined grab and bubble

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": ["grab", "bubble"]
      }
    }
  }
}
```
