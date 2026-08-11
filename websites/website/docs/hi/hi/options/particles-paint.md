# कण पेंट

`particles.paint` कण भरण और स्ट्रोक शैली विकल्पों को समूहित करता है।

## उदाहरण

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

## भरें (`particles.paint.fill`)

- कण के आंतरिक रंग को परिभाषित करता है।
- स्थिर मान, सरणियाँ और रंग एनीमेशन का समर्थन करता है।

## स्ट्रोक (`particles.paint.stroke`)

- रूपरेखा की चौड़ाई और रंग को परिभाषित करता है।
- आकार कंट्रास्ट बढ़ाने के लिए उपयोगी।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
