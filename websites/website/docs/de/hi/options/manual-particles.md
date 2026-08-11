# मैनुअल कण

`manualParticles` निश्चित स्थानों पर स्पष्ट कण जोड़ता है।

## उदाहरण

```ts
manualParticles: [
  {
    position: {
      x: 20,
      y: 40,
    },
    options: {
      move: {
        enable: false,
      },
      fill: {
        color: {
          value: "#ff6699",
        },
        enable: true,
      },
    },
  },
];
```

## इसका उपयोग कब करना है

- एंकर दृश्य मार्कर।
- स्थिर और गतिशील कणों को मिश्रित करने वाला हाइब्रिड प्रभाव।
- डेमो या ट्यूटोरियल में प्रारंभिक अवस्थाओं को नियंत्रित किया।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/ManualParticles.md>
