# कणों का आकार

`particles.shape` परिभाषित करता है कि कण कैसे खींचे जाते हैं।

## उदाहरण

```ts
particles: {
  shape: {
    type: ["circle", "square"],
  },
}
```

- `type`: एक आकृति या आकृतियों की सूची।
- सामान्य मान: `circle`, `square`, `triangle`, `polygon`, `image`, `emoji`, `text`।

## विकल्पों के साथ

```ts
particles: {
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 6,
      },
    },
  },
}
```

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shape.md>
