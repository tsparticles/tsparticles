# कण प्रतिकर्षण

`particles.repulse` कण-से-कण अंतःक्रिया में प्रतिकर्षण व्यवहार को नियंत्रित करता है।

## उदाहरण

```ts
particles: {
  repulse: {
    value: 0,
    enabled: true,
    distance: 200,
    duration: 0.4,
  },
}
```

## व्यावहारिक मार्गदर्शन

- अचानक गति में उछाल से बचने के लिए मध्यम दूरी का उपयोग करें।
- जब दोनों सक्रिय हों तो `interactivity.modes.repulse` के साथ एक साथ ट्यून करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Repulse.md>
