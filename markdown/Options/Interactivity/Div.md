# On Div Event

Configures interactions bound to specific DOM elements.

## Properties

| Key         | Type               | Example                             | Notes                                                |
| ----------- | ------------------ | ----------------------------------- | ---------------------------------------------------- |
| `enable`    | `boolean`          | `true` / `false`                    | Enables div-targeted interactions                    |
| `mode`      | `string` / `array` | `"bounce"`, `"bubble"`, `"repulse"` | Interactions applied when hovering matching elements |
| `selectors` | `string` / `array` | `"#cta"` / `[".card", ".hero"]`     | CSS selectors to bind                                |
| `type`      | `string`           | `"circle"` / `"rectangle"`          | Interaction area shape                               |

## Quick example

```json
{
  "interactivity": {
    "events": {
      "onDiv": {
        "enable": true,
        "selectors": [".interactive-zone"],
        "mode": "repulse",
        "type": "circle"
      }
    }
  }
}
```
