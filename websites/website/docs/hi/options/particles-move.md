# कण हिलते हैं

`particles.move` दिशा, गति और कैनवास से बाहर के व्यवहार को परिभाषित करता है।

## उदाहरण

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: मूवमेंट चालू करता है।
- `speed`: प्राथमिक अनुमानित गति तीव्रता।
- `direction`: निश्चित दिशा या मुक्त संचलन।
- `outModes`: कैनवास सीमा पर व्यवहार।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
