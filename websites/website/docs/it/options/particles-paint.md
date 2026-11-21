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
- L’animazione usa canali OKLCH indipendenti: `h` misura la tonalità in gradi,
  `c` il croma in unità OKLab e `l` la luminosità da 0 a 100. Il vecchio
  canale HSL `s` viene rifiutato con un messaggio di migrazione.

## Stroke (`particles.paint.stroke`)

- Defines outline width and color.
- Useful to increase shape contrast.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
