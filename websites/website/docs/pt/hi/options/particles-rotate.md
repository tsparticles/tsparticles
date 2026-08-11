# कण घूमते हैं

`particles.rotate` प्रति-कण घूर्णन व्यवहार को नियंत्रित करता है।

## उदाहरण

```ts
particles: {
  rotate: {
    value: {
      min: 0,
      max: 360,
    },
    direction: "clockwise",
    animation: {
      enable: true,
      speed: 8,
      sync: false,
    },
  },
}
```

- `direction`: दक्षिणावर्त या वामावर्त।
- `animation.speed`: कोणीय गति।
- `animation.sync`: साझा बनाम स्वतंत्र रोटेशन समय।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Rotate.md>
