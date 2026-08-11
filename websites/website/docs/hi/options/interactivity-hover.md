# इंटरैक्टिविटी होवर

`interactivity.events.onHover` पॉइंटर-होवर प्रतिक्रियाओं को नियंत्रित करता है।

## उदाहरण

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## व्यावहारिक मार्गदर्शन

- सघन दृश्यों पर होवर प्रभाव अधिक महंगे होते हैं।
- मोबाइल पर, होवर-हेवी मोड को अक्षम करने पर विचार करें।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
