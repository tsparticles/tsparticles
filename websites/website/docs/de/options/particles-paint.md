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
- Die Farbanimation verwendet unabhängige OKLCH-Kanäle: `h` misst den Farbton
  in Grad, `c` die Chroma in OKLab-Einheiten und `l` die Helligkeit von 0 bis 100. Der alte HSL-Kanal `s` wird mit einem Migrationshinweis abgelehnt.

## Stroke (`particles.paint.stroke`)

- Defines outline width and color.
- Useful to increase shape contrast.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
