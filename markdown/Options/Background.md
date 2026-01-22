# Background

- [`color`](#color)
- [`opacity`](#opacity)
- [`image`](#image)
- [`position`](#position)
- [`repeat`](#repeat)
- [`size`](#size)

## Color

The `color` property can be set to a HEX string or to a {@link IColor | color object}, that is the same as the one used in `particles.color`
options.

This color is set to canvas style `background-color` property, if this property is not set the background will be
transparent.

### Samples

<table>
<tr>
<td>
HEX sample

```json
{
  "color": "#bada55"
}
```

</td>
<td>
HEX IColor sample

```json
{
  "color": {
    "value": "#bada55"
  }
}
```

</td>
<td>
Rgb sample

```json
{
  "color": {
    "value": {
      "r": 255,
      "g": 127,
      "b": 0
    }
  }
}
```

</td>
<td>
Hsl sample

```json
{
  "color": {
    "h": 180,
    "s": 100,
    "l": 50
  }
}
```

</td>
</tr>
</table>

## Opacity

The `opacity` property sets the `color` property opacity, so you can set a semi-transparent background.

This value is by default to `1` and it accepts any value between `0` and `1` included.

## Image

The `image` property sets the canvas style `background-image` property.

This property doesn't have a default value, anyway if you need a background image you need to specify the same CSS
syntax with the `url()` function.

### Samples

```json
{
  "image": "url('https://particles.js.org/images/background3.jpg')"
}
```

## Position

The `position` property sets the canvas style `background-position` property.

This [link](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) can be useful to set the right value
to this property.

## Repeat

The `repeat` property sets the canvas style `background-repeat` property.

This [link](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat) can be useful to set the right value to
this property.

## Size

The `size` property sets the canvas style `background-size` property.

This [link](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) can be useful to set the right value to
this property.
