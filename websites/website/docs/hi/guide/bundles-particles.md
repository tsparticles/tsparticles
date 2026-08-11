# Bundle: Particles

`@tsparticles/particles` इंटरैक्टिव कण पृष्ठभूमि बनाने के लिए एक सरलीकृत API प्रदान करता है। `@tsparticles/basic` का एक समृद्ध विकल्प जिसमें मैन्युअल इंजन कॉन्फ़िगरेशन के बजाय समर्पित API है।

## शामिल सुविधाएँ

**शेप:** circle (basic से)

**आंतरिक प्लगइन:** interactivity (links, collisions)

**इंटरैक्शन:** links (कण कनेक्शन), collisions

**API:** `particles(options)` या `particles(canvasId, options)`

## कब उपयोग करें

- वेबसाइट के लिए कण पृष्ठभूमि
- कण लिंक के साथ पृष्ठभूमि (नोड-शैली प्रभाव)
- आप मैन्युअल रूप से इंजन कॉन्फ़िगर नहीं करना चाहते

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// लिंक के साथ पृष्ठभूमि
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// किसी विशिष्ट कैनवास पर
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// कस्टम रंगों के साथ
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### मुख्य पैरामीटर

| पैरामीटर     | टाइप               | डिफ़ॉल्ट   | विवरण             |
| ------------ | ------------------ | ---------- | ----------------- |
| `count`      | number             | 50         | कणों की संख्या    |
| `radius`     | number             | 3          | कण त्रिज्या       |
| `speed`      | number             | 2          | गति               |
| `opacity`    | number             | 0.8        | अपारदर्शिता (0-1) |
| `color`      | string \| string[] | "#ffffff"  | कण रंग            |
| `links`      | boolean            | false      | लिंक दिखाएँ       |
| `linksColor` | string             | "#ffffff"  | लिंक रंग          |
| `linksWidth` | number             | 1          | लिंक मोटाई        |
| `shape`      | string[]           | ["circle"] | कण शेप            |

## सामान्य गलतियाँ

- यह सोचना कि `@tsparticles/particles` से `tsParticles` एक्सपोर्ट होता है — ऐसा नहीं है।
- अनजाने में उसी कैनवास ID का पुन: उपयोग करना।
- उन्नत शेप (स्टार, पॉलीगॉन) की अपेक्षा — particles बंडल basic पर आधारित है और केवल सर्कल का उपयोग करता है।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [आरंभ करना](/hi/guide/getting-started)
