# इंटरएक्टिविटी इवेंट

`interactivity.events` इंटरैक्शन मोड चालू होने पर नियंत्रण करता है।

## उदाहरण

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
    resize: true,
  },
}
```

- `onHover`: पॉइंटर होवर व्यवहार।
- `onClick`: क्लिक/टैप व्यवहार।
- `resize`: व्यूपोर्ट परिवर्तन के बाद व्यवहार को सुसंगत रखता है।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Events.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
