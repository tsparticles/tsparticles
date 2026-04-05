# Background

Controls the canvas background layer rendered behind particles.

## Properties

| Key        | Type                | Example                                                    | Notes                                     |
| ---------- | ------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| `color`    | `string` / `object` | `"#bada55"` / `{ "value": "#bada55" }`                     | Background color, supports {@link IColor} |
| `opacity`  | `number`            | `1` / `0.5`                                                | Background color alpha, from `0` to `1`   |
| `image`    | `string`            | `"url('https://particles.js.org/images/background3.jpg')"` | CSS `background-image` value              |
| `position` | `string`            | `"50% 50%"`                                                | CSS `background-position` value           |
| `repeat`   | `string`            | `"no-repeat"`                                              | CSS `background-repeat` value             |
| `size`     | `string`            | `"cover"`                                                  | CSS `background-size` value               |

## Quick examples

### Solid color

```json
{
  "background": {
    "color": "#0f172a"
  }
}
```

### Semi-transparent color

```json
{
  "background": {
    "color": {
      "value": "#0ea5e9"
    },
    "opacity": 0.2
  }
}
```

### Background image

```json
{
  "background": {
    "image": "url('https://particles.js.org/images/background3.jpg')",
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover"
  }
}
```
