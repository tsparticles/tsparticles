# कण लिंक

`particles.links` पास के कणों के बीच कनेक्शन रेखाएँ खींचता है।

## उदाहरण

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance`: एक लिंक के लिए अधिकतम दूरी।
- `opacity`: रेखा की दृश्य शक्ति।
- `color`: रेखा का रंग।
- `width`: स्ट्रोक मोटाई।

## प्रदर्शन युक्ति

उच्च कण गणना के कारण लिंक महंगे हो सकते हैं। `number.value` और `distance` को एक साथ ट्यून करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
