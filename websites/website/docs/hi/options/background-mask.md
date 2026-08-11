# बैकग्राउंड मास्क

`backgroundMask` कणों को एक नकाबपोश पृष्ठभूमि परत के साथ टकराने या मिश्रित होने देता है।

## उदाहरण

### स्थिर कवर (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### डायनामिक ड्रॉ कॉलबैक _(4.3.0 से)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### बाहरी तत्व _(4.3.0 से)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## गुण

| गुण         | प्रकार                     | विवरण                                                   |
| ----------- | -------------------------- | ------------------------------------------------------- |
| `enable`    | `boolean`                  | बैकग्राउंड मास्किंग को सक्रिय करता है                   |
| `composite` | `GlobalCompositeOperation` | Canvas कम्पोज़िट ऑपरेशन (डिफ़ॉल्ट: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | कवर कॉन्फ़िगरेशन                                        |

### `cover` (BackgroundMaskCover)

| गुण       | प्रकार                                                                                       | विवरण                                                                      |
| --------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `color`   | `string` / `OptionsColor`                                                                    | कवर का रंग                                                                 |
| `image`   | `string`                                                                                     | कवर इमेज URL                                                               |
| `opacity` | `number`                                                                                     | अल्फ़ा स्तर (0..1, डिफ़ॉल्ट: `1`)                                          |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | बाहरी तत्व या CSS सेलेक्टर जो प्रत्येक फ्रेम ऑटो-ड्रा होता है _(4.3.0 से)_ |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | मुख्य canvas कॉन्टेक्स्ट पर प्रत्येक फ्रेम कस्टम ड्रॉ कॉलबैक _(4.3.0 से)_  |

### लेयर क्रम _(4.3.0 से)_

1. `clear()` — canvas पिक्सेल साफ़ करें
2. `cover.element` ऑटो-ड्रा (यदि सेट किया गया हो)
3. `cover.draw` कॉलबैक (यदि सेट किया गया हो)
4. स्थिर कवर (रंग/इमेज) — फ़ॉलबैक
5. वैश्विक कम्पोज़िट ऑपरेशन

## इसका उपयोग कब करना है

- स्पॉटलाइट जैसे प्रभाव।
- कंट्रास्ट-भारी नायक अनुभाग।
- गहरे रंग की पृष्ठभूमि पर स्तरित इंटरैक्शन।

## स्रोत संदर्भ

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
