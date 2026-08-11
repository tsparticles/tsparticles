# प्लगइन विकल्प: बहुभुज मास्क

`polygonMask` कणों को SVG या बहुभुज-आधारित क्षेत्रों तक सीमित करता है।

## उदाहरण

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## नोट्स

- बेहतर रनटाइम प्रदर्शन के लिए अनुकूलित एसवीजी पथ का उपयोग करें।
- पथ लोडिंग और फ़ॉलबैक व्यवहार को मान्य करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
