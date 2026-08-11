# इंटरैक्टिविटी मोड

`interactivity.modes` ईवेंट द्वारा उपयोग की जाने वाली मोड-विशिष्ट सेटिंग्स को परिभाषित करता है।

## उदाहरण

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## व्यावहारिक मार्गदर्शन

- केवल वही मोड सक्षम करें जिनका आप वास्तव में उपयोग करते हैं।
- स्थिर प्रदर्शन के लिए दूरियां मध्यम रखें।
- महंगे मोड संयोजनों के लिए प्रारंभ/रोकें नियंत्रण का उपयोग करें।

संबंधित पृष्ठ:

- [`Interactivity Click`](/hi/options/interactivity-click)
- [`Interactivity Hover`](/hi/options/interactivity-hover)
- [`Interactivity Div`](/hi/options/interactivity-div)

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
