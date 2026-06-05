# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, लोडर: `loadFull`) आधिकारिक फुल बंडल है। इसमें Slim से सब कुछ प्लस एमिटर, एब्ज़ॉर्बर, टेक्स्ट शेप और उन्नत एनिमेशन (वॉबल, रोल, टिल्ट, ट्विंकल, डिस्ट्रॉय) शामिल हैं।

## शामिल सुविधाएँ

`@tsparticles/slim` से सब कुछ इनहेरिट करता है, साथ ही:

**अतिरिक्त शेप:** text (कस्टम फ़ॉन्ट के साथ)

**अतिरिक्त बाहरी इंटरैक्शन:**

- drag (कणों को माउस से खींचें)
- trail (माउस के पीछे कण ट्रेल)

**अतिरिक्त अपडेटर:**

- destroy (कण विनाश एनिमेशन)
- roll (रोलिंग)
- tilt (3D झुकाव)
- twinkle (आंतरायिक चमक)
- wobble (दोलन)

**प्लगइन:**

- absorbers (ब्लैक होल जो कणों को सोख लेते हैं)
- emitters (निरंतर कण स्रोत)
- emitters-shape-circle, emitters-shape-square (एमिटर शेप)

## कब उपयोग करें

- एमिटर (लगातार कण उत्पन्न करना) की आवश्यकता
- एब्ज़ॉर्बर (कणों को सोखना) की आवश्यकता
- कस्टम फ़ॉन्ट के साथ टेक्स्ट शेप की आवश्यकता
- उन्नत एनिमेशन (वॉबल, टिल्ट, रोल, ट्विंकल) की आवश्यकता
- व्यक्तिगत प्लगइन पर जाने से पहले अच्छा कदम

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## `tsparticles` और `@tsparticles/all` के बीच अंतर

| पहलू            | `tsparticles` (full)                                    | `@tsparticles/all`                                                                 |
| --------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| आकार            | मध्यम                                                   | बहुत बड़ा                                                                          |
| शेप             | circle, square, star, polygon, line, image, emoji, text | सभी शेप (heart, cards, arrow, spiral, cog, rounded-rect, आदि)                      |
| इंटरैक्शन       | Slim + drag + trail                                     | सभी (cannon, light, pop, particle, repulse)                                        |
| पथ              | केवल Quad easing                                        | 14 पथ जनरेटर                                                                       |
| इफ़ेक्ट         | कोई नहीं                                                | 5 इफ़ेक्ट (bubble, filter, shadow, आदि)                                            |
| एक्सपोर्ट       | कोई नहीं                                                | Image, JSON, Video                                                                 |
| अतिरिक्त प्लगइन | absorbers, emitters                                     | सभी (sounds, themes, trail, zoom, polygon-mask, canvas-mask, background-mask, आदि) |
| ईज़िंग          | Quad                                                    | 15 ईज़िंग                                                                          |

## सामान्य गलतियाँ

- `tsparticles` को `@tsparticles/all` समझने की भूल — ये अलग पैकेज हैं।
- `loadFull(tsParticles)` से पहले `tsParticles.load()` कॉल करना।
- npm पैकेज `tsparticles` है (`@tsparticles/full` नहीं), लोडर `loadFull` है।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [इंस्टॉलेशन गाइड](/hi/guide/installation)
