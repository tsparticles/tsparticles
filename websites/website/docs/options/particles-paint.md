# Particles Paint

`particles.paint` groups particle fill and stroke style options.

## Example

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## Fill (`particles.paint.fill`)

- Defines the particle inner color.
- Supports static values, arrays, and color animation.
- Color animation uses independent OKLCH channels: `h` (hue in degrees), `c`
  (chroma in OKLab units), and `l` (lightness from 0 to 100).

```ts
color: {
  value: "oklch(65% 0.2 285)",
  animation: {
    h: { enable: true, speed: 12 },
    c: { enable: true, speed: 0.04, min: 0.08 },
    l: { enable: true, speed: 3, min: 45, max: 80 },
  },
}
```

The channel ranges are in their own units; HSL `s` animation is rejected with a
migration error. Convert the base color to OKLCH and choose chroma bounds for
the intended effect. HSL saturation values do not map directly to chroma.

## Stroke (`particles.paint.stroke`)

- Defines outline width and color.
- Useful to increase shape contrast.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
