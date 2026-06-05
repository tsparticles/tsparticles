# Bundle: Slim

`@tsparticles/slim` अधिकांश प्रोजेक्ट्स के लिए अनुशंसित बंडल है। इसमें माउस इंटरैक्शन, कई शेप और कण लिंक के साथ आधुनिक कण एनिमेशन के लिए आवश्यक सब कुछ शामिल है।

## शामिल सुविधाएँ

`@tsparticles/basic` से सब कुछ इनहेरिट करता है, साथ ही:

**शेप:** circle, square, star, polygon, line, image, emoji

**बाहरी इंटरैक्शन (माउस/टच):**
- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**कण इंटरैक्शन:**
- attract
- collisions
- links (कण कनेक्शन)

**अतिरिक्त अपडेटर:**
- life (जीवनचक्र)
- rotate

**प्लगइन:**
- interactivity
- easing-quad
- HEX, HSL, RGB रंग प्लगइन

## कब उपयोग करें

- अधिकांश प्रोजेक्ट्स के लिए अनुशंसित शुरुआती बिंदु
- कई शेप (सर्कल, स्टार, पॉलीगॉन, इमेज) की आवश्यकता
- माउस इंटरैक्शन (क्लिक, होवर, बबल, रिपल्स) की आवश्यकता
- कण लिंक की आवश्यकता
- बंडल आकार और सुविधाओं के बीच अच्छा संतुलन

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## सामान्य गलतियाँ

- `loadSlim(tsParticles)` से पहले `tsParticles.load()` कॉल करना।
- इंजन और बंडल के बीच अलग-अलग संस्करण मिलाना — उन्हें संरेखित रखें।
- उच्च बंडलों (एमिटर, एब्ज़ॉर्बर, टेक्स्ट, वॉबल) की सुविधाओं की अपेक्षा — `tsparticles` (full) या व्यक्तिगत प्लगइन की आवश्यकता है।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [इंस्टॉलेशन गाइड](/hi/guide/installation)
