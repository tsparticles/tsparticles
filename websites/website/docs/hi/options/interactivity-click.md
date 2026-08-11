# इंटरैक्टिविटी क्लिक करें

`interactivity.events.onClick` परिभाषित करता है कि जब उपयोगकर्ता कैनवास पर क्लिक/टैप करते हैं तो क्या होता है।

## उदाहरण

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## व्यावहारिक मार्गदर्शन

- एक मोड से शुरू करें, फिर जरूरत पड़ने पर ही मोड को संयोजित करें।
- स्थिर एफपीएस के लिए `quantity` और `distance` को मध्यम रखें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
