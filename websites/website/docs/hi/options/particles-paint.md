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
- रंग एनीमेशन में स्वतंत्र OKLCH चैनल उपयोग होते हैं: `h` डिग्री में ह्यू,
  `c` OKLab इकाइयों में क्रोमा और `l` 0 से 100 तक लाइटनेस दर्शाता है। पुराना
  HSL चैनल `s` माइग्रेशन संदेश के साथ अस्वीकार किया जाता है।

## Stroke (`particles.paint.stroke`)

- Defines outline width and color.
- Useful to increase shape contrast.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
