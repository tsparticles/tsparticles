# कण ZIndex

`particles.zIndex` ड्रॉ लेयरिंग और वैकल्पिक z-इंडेक्स एनीमेशन को नियंत्रित करता है।

## उदाहरण

```ts
particles: {
  zIndex: {
    value: {
      min: 0,
      max: 100,
    },
    opacityRate: 1,
    sizeRate: 1,
    velocityRate: 1,
  },
}
```

## व्यावहारिक मार्गदर्शन

- गहराई की धारणा बनाने के लिए z-सूचकांक भिन्नता का उपयोग करें।
- दृश्य स्थिरता बनाए रखने के लिए सीमाएं मध्यम रखें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/ZIndex.md>
