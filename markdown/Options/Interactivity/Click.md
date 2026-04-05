# On Click Event

Configures interactions triggered by click/tap events.

## Properties

| Key      | Type               | Example                                                                          | Notes                              |
| -------- | ------------------ | -------------------------------------------------------------------------------- | ---------------------------------- |
| `enable` | `boolean`          | `true` / `false`                                                                 | Enables click interaction handling |
| `mode`   | `string` / `array` | `"push"`, `"remove"`, `"repulse"`, `"bubble"`, `"attract"`, `"pause"`, `"trail"` | One or multiple click modes        |

`"emitter"` and `"absorber"` modes require their related plugin packages.

## Quick examples

### Add particles on click

```json
{
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      }
    }
  }
}
```

### Combine push and bubble

```json
{
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": ["push", "bubble"]
      }
    }
  }
}
```
