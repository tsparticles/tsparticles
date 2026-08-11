# Bundle: Basic

`@tsparticles/basic` सबसे हल्का बंडल है। केवल आवश्यक चीज़ें शामिल करता है: सर्कल जो एनिमेटेबल ओपेसिटी और साइज़ के साथ चलते हैं।

## शामिल सुविधाएँ

**शेप:** circle

**अपडेटर:**

- paint (रंग)
- opacity
- out-modes (स्क्रीन छोड़ने पर व्यवहार)
- size

**प्लगइन:**

- move
- blend (रंग मिश्रण)
- HEX, HSL, RGB रंग प्लगइन

**शामिल नहीं:**

- माउस/टच इंटरैक्शन
- कण लिंक
- अन्य शेप (स्क्वेयर, स्टार, इमेज, पॉलीगॉन, आदि)
- एमिटर, एब्ज़ॉर्बर, साउंड
- रोटेशन, लाइफ, रोल, टिल्ट, वॉबल

## कब उपयोग करें

- बंडल आकार आपकी सर्वोच्च प्राथमिकता है
- आपको केवल घूमते हुए डॉट्स चाहिए
- किसी इंटरैक्शन या जटिल शेप की आवश्यकता नहीं

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## सामान्य गलतियाँ

- शामिल नहीं की गई सुविधाओं की अपेक्षा (जैसे `links`, माउस इंटरैक्शन) — इनके लिए उच्च बंडलों की आवश्यकता है।
- `loadBasic(tsParticles)` से पहले `tsParticles.load()` कॉल करना — शेप और अपडेटर अभी पंजीकृत नहीं हुए हैं।
- बंडल के बिना केवल `@tsparticles/engine` इंस्टॉल करना — इंजन अकेला कुछ नहीं बनाता।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [इंस्टॉलेशन गाइड](/hi/guide/installation)
