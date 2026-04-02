# Shape

Controls the visual shape of particles. Supports built-in shapes, images, emoji, and custom registered shapes.

## Core properties

| Key       | Type               | Example                           | Notes                                                               |
| --------- | ------------------ | --------------------------------- | ------------------------------------------------------------------- |
| `type`    | `string` / `array` | `"circle"` / `["circle", "star"]` | Shape type(s) to use; if array, one is picked randomly per particle |
| `options` | `object`           |                                   | Per-shape configuration — keys match shape type names               |

## Built-in shape types

| Value                    | Description                  | Bundle required      |
| ------------------------ | ---------------------------- | -------------------- |
| `"circle"`               | Filled circle                | `@tsparticles/basic` |
| `"edge"` / `"square"`    | Square                       | `@tsparticles/slim`  |
| `"triangle"`             | Triangle                     | `@tsparticles/slim`  |
| `"polygon"`              | Regular polygon with N sides | `@tsparticles/slim`  |
| `"star"`                 | Star with N points           | `@tsparticles/slim`  |
| `"line"`                 | Straight line                | `@tsparticles/slim`  |
| `"image"` / `"images"`   | External image or SVG        | `@tsparticles/slim`  |
| `"character"` / `"char"` | Text / emoji character       | `@tsparticles/slim`  |

## Quick examples

### Circle (default)

```json
{
  "shape": {
    "type": "circle"
  }
}
```

### Random mix of shapes

```json
{
  "shape": {
    "type": ["circle", "triangle", "star"]
  }
}
```

### Polygon (hexagon)

```json
{
  "shape": {
    "type": "polygon",
    "options": {
      "polygon": {
        "sides": 6
      }
    }
  }
}
```

### Star

```json
{
  "shape": {
    "type": "star",
    "options": {
      "star": {
        "sides": 5,
        "inset": 2
      }
    }
  }
}
```

### Emoji particles

```json
{
  "shape": {
    "type": "character",
    "options": {
      "character": {
        "value": ["❄️", "⛄", "🌨️"],
        "font": "Segoe UI Emoji",
        "style": "",
        "weight": "400"
      }
    }
  }
}
```

### Image

```json
{
  "shape": {
    "type": "image",
    "options": {
      "image": {
        "src": "https://example.com/logo.png",
        "width": 32,
        "height": 32,
        "replaceColor": false
      }
    }
  }
}
```

Set `replaceColor: true` for SVG images to tint them with the particle `color`.

### Custom registered shape

```javascript
tsParticles.addShape("myShape", drawer);
```

```json
{
  "shape": {
    "type": "myShape",
    "options": {
      "myShape": {
        "close": true,
        "fill": true
      }
    }
  }
}
```

## Shape options common properties

All shape types accept these properties inside their `options` object:

| Key         | Type      | Notes                                                        |
| ----------- | --------- | ------------------------------------------------------------ |
| `fill`      | `boolean` | Fill the shape with color                                    |
| `close`     | `boolean` | Close the shape path                                         |
| `particles` | `object`  | Per-shape particle overrides (see {@link IParticlesOptions}) |

## Common pitfalls

- Using `"square"` or `"triangle"` with `@tsparticles/basic` — these shapes require `@tsparticles/slim` or the dedicated shape package
- Using `"image"` without providing `width` and `height` — the image may render at unexpected sizes
- Using `"character"` with an emoji that relies on an external font without including that font in the page
- Using `replaceColor: true` on raster images (PNG/JPG) — only works with SVG

## Related docs

- Particles root: [Particles](../Particles.md)
- Custom shapes (plugins): [Plugins](../../Plugins.md)
- Options root: [Options](../../Options.md)
