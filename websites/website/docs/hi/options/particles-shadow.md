# कण छाया

`particles.shadow` कणों के चारों ओर एक छाया जोड़ता है।

## उदाहरण

```ts
particles: {
  shadow: {
    enable: true,
    blur: 8,
    color: {
      value: "#60a5fa",
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
}
```

## व्यावहारिक मार्गदर्शन

- छायाएं गहराई में सुधार करती हैं लेकिन घने दृश्यों पर महंगी पड़ सकती हैं।
- मोबाइल पर पहले लो ब्लर और बेंचमार्क का उपयोग करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Shadow.md>
