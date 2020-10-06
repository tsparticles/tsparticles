# Colors

**tsParticles** colors can have a lot of values and every color (except {@link IParticles.color | particles color}) in options can accept all of these values.

All `color` properties accepts `string`s and `object`s. The color `object` has a single property: `value`.

Let's explore all valid values.

## Strings

### hex short syntax

```javascript
color: '#fff'
```

### hex full syntax

```javascript
color: '#ffffff'
```

### rgb syntax

*alpha will be ignored, there are `opacity` values for that*

```javascript
color: 'rgb(255, 255, 255)'
```

### hsl syntax

*alpha will be ignored, there are `opacity` values for that*

```javascript
color: 'hsl(0, 100%, 100%)'
```

### hsv syntax

*alpha will be ignored, there are `opacity` values for that*

```javascript
color: 'hsv(0°, 100%, 100%)'
```

### random

```javascript
random: 'random' // a random color will be picked
```

That's the easier part, now we go deeper.

---

## Color Object

### strings, again

```javascript
color: {
  value: '#fff' // I won't repeat myself, all the string values above will be valid here too
}
```

### rgb object

```javascript
color: {
  value: {
    r: 255,
    g: 255,
    b: 255
  }
}
```

### hsl object

```javascript
color: {
  value: {
    h: 0,
    s: 100,
    l: 100
  }
}
```

### hsv object

```javascript
color: {
  value: {
    h: 0,
    s: 100,
    v: 100
  }
}
```

### rgb/hsl nested object

```javascript
color: {
  value: {
    rgb: { r: 255, g: 255, b: 255 } // inlined for brevity, it's the same rgb object as above
    hsl: { h: 0, s: 100, l: 100 } // inlined for brevity, it's the same hsl object as above
  }
}
```

*if `rgb` and `hsl` properties are set together only `rgb` will be used*

---

## Multiple colors

Every `color.value` property accepts a mixed array of its values, but be careful, the color will be random picked.

For some objects this behavior will work fine, other objects like `links` are runtime generated and will have a different color every frame.
