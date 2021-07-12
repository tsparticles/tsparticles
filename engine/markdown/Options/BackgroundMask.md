# Background Mask

- [`composite`](#composite)
- [`cover`](#cover)
- [`enable`](#enable)

## Composite

This property is used to choose the composition mode for the background mask effect.

The default value is `destination-out`, which unveils the background below using drawn elements, any other valid value
can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

## Cover

The `cover` property can be set to a HEX string or to a {@link IColor | color object}, that is the same as the one used
in `particles.color` options.

The `cover` can also be a {@link IBackgroundMaskCover | cover object} like the one described below.

- [`color`](#color)
- [`opacity`](#opacity)

### Color

The `color` property can be set to a HEX string or to a {@link IColor | color object}, that is the same as the one used
in `particles.color` options.

This color is used to cover the background set in the `background` section on in a below element, if this property is
not set the cover will be transparent.

#### Samples

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

### Opacity

The `opacity` property sets the `color` property opacity, so you can set a semi-transparent cover.

This value is by default to `1` and it accepts any value between `0` and `1` included.

## Enable

This property set the background mask mode, this mode enables the `composite` option to all elements drawn.
