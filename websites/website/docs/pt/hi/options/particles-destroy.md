# कण नष्ट हो जाते हैं

`particles.destroy` यह नियंत्रित करता है कि जब कण नष्ट हो जाते हैं तो क्या होता है।

## उदाहरण

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## व्यावहारिक मार्गदर्शन

- जटिल विभाजन श्रृंखलाओं से पहले सरल `mode` सेटअप से प्रारंभ करें।
- बड़ी स्प्लिट गणनाओं का उपयोग करते समय प्रदर्शन की पुनः जाँच करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
