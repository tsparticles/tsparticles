# Colors

This page explains all color formats accepted by tsParticles options.

Most color fields accept either:

- a `string`
- an object with a `value` property

Note: particle base color has additional behaviors, see {@link IParticlesOptions.color}.

## Quick examples

```json
{
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "links": {
      "color": "#4f46e5"
    }
  }
}
```

```json
{
  "background": {
    "color": {
      "value": "rgb(15, 23, 42)"
    }
  }
}
```

## String formats

### Hex (short)

```json
"#fff"
```

### Hex (full)

```json
"#ffffff"
```

### RGB

Alpha in color strings is ignored; use dedicated opacity options.

```json
"rgb(255, 255, 255)"
```

### HSL

Alpha in color strings is ignored; use dedicated opacity options.

```json
"hsl(0, 100%, 100%)"
```

### HSV

Alpha in color strings is ignored; use dedicated opacity options.

```json
"hsv(0, 100%, 100%)"
```

### Random

```json
"random"
```

## Object formats

### String value

```json
{
  "value": "#fff"
}
```

### RGB object

```json
{
  "value": {
    "r": 255,
    "g": 255,
    "b": 255
  }
}
```

### HSL object

```json
{
  "value": {
    "h": 0,
    "s": 100,
    "l": 100
  }
}
```

### HSV object

```json
{
  "value": {
    "h": 0,
    "s": 100,
    "v": 100
  }
}
```

### Mixed object (`rgb` and `hsl`)

```json
{
  "value": {
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "hsl": {
      "h": 0,
      "s": 100,
      "l": 100
    }
  }
}
```

If both `rgb` and `hsl` are provided, `rgb` is used.

## Multiple colors

`color.value` can be an array of mixed valid values; one is picked randomly.

This works well for most elements, but runtime-generated entities (like some `links`) can produce frequent color
changes.

## Related docs

- Root options: [Options](./Options.md)
- Container runtime API: [Container](./Container.md)
