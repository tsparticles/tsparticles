# Bundle: All

`@tsparticles/all` tsParticles रिपॉजिटरी से **सब कुछ** लोड करता है: हर शेप, इंटरैक्शन, अपडेटर, इफ़ेक्ट, पथ, ईज़िंग, प्लगइन और एक्सपोर्ट। यह सबसे बड़ा बंडल है, जो प्रोटोटाइप और डेमो के लिए है।

## शामिल सुविधाएँ

`tsparticles` (full) से सब कुछ इनहेरिट करता है, साथ ही:

**सभी शेप:** arrow, cards, cog, heart, infinity, matrix, path, ribbon, rounded-polygon, rounded-rect, spiral, squircle

**सभी बाहरी इंटरैक्शन:** cannon, light, particle, pop, particles-repulse

**सभी इफ़ेक्ट:** bubble, filter, particles, shadow, trail

**सभी पथ जनरेटर:** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**सभी ईज़िंग:** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**सभी रंग प्लगइन:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**सभी प्लगइन:** absorbers, background-mask, canvas-mask, emitters (सभी शेप), easings (सभी), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, sounds, themes, trail, zoom

**सभी अपडेटर:** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## कब उपयोग करें

- संभावनाओं का पता लगाने के लिए त्वरित प्रोटोटाइप
- डेमो और शोकेस
- डेवलपमेंट वातावरण जहाँ आकार मायने नहीं रखता
- **प्रोडक्शन के लिए अनुशंसित नहीं** — अधिक लक्षित बंडल पसंद करें

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## `tsparticles` और `@tsparticles/all` के बीच अंतर

विस्तृत तुलना के लिए [bundles-full पेज](/hi/guide/bundles-full) पर तुलना तालिका देखें।

## सामान्य गलतियाँ

- प्रोडक्शन में इसका उपयोग करना — छोटे बंडलों के लिए `@tsparticles/slim` या `tsparticles` पसंद करें।
- `loadAll(tsParticles)` से पहले `tsParticles.load()` कॉल करना।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [इंस्टॉलेशन गाइड](/hi/guide/installation)
