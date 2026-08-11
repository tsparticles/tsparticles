# कण संख्या

`particles.number` नियंत्रित करता है कि कितने कण सक्रिय हैं।

## उदाहरण

```ts
particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      area: 800,
    },
  },
}
```

- `value`: कणों की आधार मात्रा।
- `density.enable`: गिनती को कैनवास के आकार के अनुसार अनुकूलित करता है।
- `density.area`: स्केलिंग के लिए उपयोग किया जाने वाला संदर्भ क्षेत्र।

## प्रदर्शन युक्ति

FPS गिरने पर सबसे पहले `value` कम करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Number.md>
