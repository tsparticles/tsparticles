# इंस्टॉलेशन

## अपना रास्ता चुनें

| परिदृश्य                 | कमांड                                             |
| ------------------------ | ------------------------------------------------- |
| त्वरित शुरुआत (अनुशंसित) | `pnpm add @tsparticles/engine @tsparticles/slim`  |
| न्यूनतम सेटअप            | `pnpm add @tsparticles/engine @tsparticles/basic` |
| पूर्ण फीचर सेट           | `pnpm add @tsparticles/engine tsparticles`        |
| रिपॉजिटरी में सब कुछ     | `pnpm add @tsparticles/engine @tsparticles/all`   |
| केवल कॉनफ़ेटी            | `pnpm add @tsparticles/confetti`                  |
| केवल आतिशबाज़ी           | `pnpm add @tsparticles/fireworks`                 |
| कण पृष्ठभूमि             | `pnpm add @tsparticles/particles`                 |
| रिबन प्रभाव              | `pnpm add @tsparticles/ribbons`                   |

> **महत्वपूर्ण**: `@tsparticles/engine` अकेला कुछ नहीं बनाता। आपको हमेशा एक बंडल (शेप और एनिमेशन लोड करने के लिए) या व्यक्तिगत प्लगइन जोड़ना होगा। बंडल गाइड देखें: [`/hi/guide/bundles`](/hi/guide/bundles)।

## npm

```bash
# इंजन + स्लिम (अधिकांश प्रोजेक्ट्स के लिए अनुशंसित)
npm install @tsparticles/engine @tsparticles/slim

# इंजन + बेसिक (न्यूनतम)
npm install @tsparticles/engine @tsparticles/basic

# इंजन + फुल (tsparticles)
npm install @tsparticles/engine tsparticles

# इंजन + ऑल
npm install @tsparticles/engine @tsparticles/all

# समर्पित API बंडल (स्पष्ट इंजन की आवश्यकता नहीं)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... अन्य बंडलों के लिए समान पैटर्न
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... अन्य बंडलों के लिए समान पैटर्न
```

## CDN (script टैग)

सभी पैकेज jsDelivr, unpkg और cdnjs पर उपलब्ध हैं।

### jsDelivr

| बंडल                  | URL                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------- |
| इंजन                  | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js`              |
| Basic                 | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js`         |
| Slim                  | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`           |
| Full (`tsparticles`)  | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js`                      |
| All                   | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js`             |
| Confetti              | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js`   |
| Fireworks             | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles             | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons               | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js`     |
| particles.js अनुकूलता | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js`                    |

### unpkg

समान संरचना: `https://unpkg.com/{package-name}@{version}/{filename}`

उदाहरण:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Import उदाहरण

### बंडलर के साथ (ES module import)

```ts
// इंजन + बंडल लोडर
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### CommonJS (require) के साथ

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### CDN (script टैग) के साथ

```html
<!-- 1. इंजन -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. बंडल (loadBasic/loadSlim/loadFull/loadAll को ग्लोबली एक्सपोज़ करता है) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. आपकी स्क्रिप्ट -->
<script>
  (async () => {
    await loadSlim(tsParticles); // सुविधाएँ पंजीकृत करें
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

समर्पित API बंडल के साथ:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## संबंधित पेज

- [आरंभ करना](/hi/guide/getting-started)
- [बंडल गाइड](/hi/guide/bundles)
- [फ्रेमवर्क रैपर](/hi/guide/wrappers)
