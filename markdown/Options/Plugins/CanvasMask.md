# CanvasMask Plugin Options

The canvas mask plugin accepts a rich set of options that define how an HTML canvas (or image/text) is used as a mask for particle emission/drawing.

Properties (summary)

| Property   |                  Type | Default       | Description                                                 |
| ---------- | --------------------: | ------------- | ----------------------------------------------------------- |
| `element`  |   `HTMLCanvasElement` | —             | Optional canvas element used directly as source.            |
| `enable`   |             `boolean` | `false`       | Enable the canvas mask plugin.                              |
| `image`    |          `IImageMask` | —             | Image mask options (when using an image as mask).           |
| `override` |  `CanvasMaskOverride` | `{}`          | Override options (see class for fields).                    |
| `pixels`   |    `CanvasMaskPixels` | `{}`          | Pixel-based sampling options.                               |
| `position` | `{x:number,y:number}` | `{x:50,y:50}` | Position (percent) of the mask origin.                      |
| `scale`    |              `number` | `1`           | Scale factor applied to the mask.                           |
| `selector` |              `string` | —             | CSS selector used to locate a canvas element.               |
| `text`     |            `TextMask` | —             | Text mask options (render text to a canvas to use as mask). |

Behavior & notes

- `override`, `pixels`, `image`, and `text` are nested option objects — see the plugin's `Options` classes for nested fields and defaults.
- `position` is expressed in percent by default (50/50 centers the mask).
- When `element` is provided it must be a real `HTMLCanvasElement` instance (the class checks instanceof before assigning).

Example

```json
{
  "canvasMask": {
    "enable": true,
    "selector": "#my-mask-canvas",
    "position": { "x": 50, "y": 50 },
    "scale": 1
  }
}
```
