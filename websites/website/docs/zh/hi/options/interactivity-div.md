# इंटरैक्टिविटी प्रभाग

`interactivity.events.onDiv` विशिष्ट HTML तत्वों पर इंटरेक्शन मोड लागू करता है।

## उदाहरण

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## व्यावहारिक मार्गदर्शन

- पूर्ण-कैनवास प्रतिक्रियाओं के बजाय लक्षित यूएक्स ज़ोन के लिए इसका उपयोग करें।
- चयनकर्ता सूचियों को स्पष्ट और बनाए रखने में आसान रखें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
