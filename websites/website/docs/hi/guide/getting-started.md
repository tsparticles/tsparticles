# आरंभ करना

tsParticles एक JavaScript/TypeScript लाइब्रेरी है जो कण एनिमेशन, कॉनफ़ेटी, आतिशबाज़ी और बहुत कुछ बनाने के लिए है। यह किसी भी आधुनिक ब्राउज़र में काम करता है और npm पैकेज और CDN दोनों के रूप में `<script>` टैग के साथ उपलब्ध है।

## Quick start

आरंभ करने का सबसे तेज़ तरीका हमारे CLI का उपयोग करना है:

```bash
npm create tsparticles@latest
```

एक टेम्पलेट और फ्रेमवर्क चुनने के लिए इंटरैक्टिव प्रॉम्प्ट का पालन करें।
वर्तमान निर्देशिका में tsParticles के साथ पूर्व-कॉन्फ़िगर किया गया एक नया प्रोजेक्ट बनाया जाएगा।

---

## आर्किटेक्चर: इंजन + बंडल

`@tsparticles/engine` अकेला **कुछ भी दृश्य नहीं बनाता**। इसमें केवल कोर इंजन (एनिमेशन लूप, कैनवास, इवेंट मैनेजमेंट) है, लेकिन **कोई शेप, कोई इंटरैक्शन, कोई दृश्य प्रभाव नहीं**। कुछ देखने के लिए आपको कम से कम एक **बंडल** या व्यक्तिगत **प्लगइन** लोड करना होगा।

| अवधारणा                                                                             | भूमिका                                                                          |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                               | कोर इंजन। `tsParticles`, टाइप्स, ऑप्शन एक्सपोर्ट करता है। अकेला कुछ नहीं बनाता। |
| बंडल (`@tsparticles/basic`, `@tsparticles/slim`, आदि)                               | पूर्व-निर्मित पैकेज जो इंजन पर शेप, इंटरैक्शन और अपडेटर पंजीकृत करता है।        |
| व्यक्तिगत प्लगइन (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, आदि) | एकल पैकेज जिन्हें आप कस्टम बंडल के लिए जोड़ सकते हैं।                           |

## अपना रास्ता चुनें

### पथ A — npm/pnpm/yarn (आधुनिक प्रोजेक्ट बंडलर के साथ)

इंजन + एक बंडल इंस्टॉल करें:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

फिर अपने कोड में:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. सभी स्लिम बंडल सुविधाओं को इंजन पर पंजीकृत करें
  await loadSlim(tsParticles);

  // 2. एनिमेशन बनाएं
  await tsParticles.load({
    id: "tsparticles", // HTML कंटेनर ID
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

HTML कंटेनर:

```html
<div id="tsparticles"></div>
```

### पथ B — CDN `<script>` टैग के साथ (बिना बंडलर, वेनिला HTML)

पहले इंजन लोड करें, फिर बंडल। CDN फ़ाइलें सब कुछ `window` पर एक्सपोज़ करती हैं — `import` की ज़रूरत नहीं।

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles इंजन -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- स्लिम बंडल (loadSlim को ग्लोबली एक्सपोज़ करता है) -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim CDN बंडल से ग्लोबली उपलब्ध है
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **नोट**: CDN बंडल के साथ भी आपको `tsParticles.load()` से पहले `loadSlim(tsParticles)` (या `loadBasic` / `loadFull` / `loadAll`) कॉल करना होगा। CDN बंडल लोडर फ़ंक्शन को ग्लोबली एक्सपोज़ करते हैं लेकिन इसे ऑटो-कॉल नहीं करते।

यही पैटर्न `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll` पर लागू होता है।

### पथ C — समर्पित API वाले विशेष बंडल (confetti, fireworks, particles)

कुछ बंडलों का अपना सरलीकृत API होता है, `tsParticles.load()` का उपयोग करने की आवश्यकता नहीं:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

यही `fireworks()`, `particles()`, `ribbons()` के लिए भी है।

## कौन सा बंडल चुनें?

| बंडल                     | npm                      | कब उपयोग करें                                                                                             |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | न्यूनतम: सर्कल, मूवमेंट, ओपेसिटी, साइज़। कोई इंटरैक्शन नहीं।                                              |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **अधिकांश प्रोजेक्ट्स के लिए अनुशंसित।** इंटरैक्शन (क्लिक/होवर), कण लिंक, इमेज, स्टार, पॉलीगॉन जोड़ता है। |
| `tsparticles`            | `loadFull(tsParticles)`  | पूर्ण आधिकारिक फीचर सेट: एमिटर, एब्ज़ॉर्बर, टेक्स्ट शेप, रोल, वॉबल, ट्रेल।                                |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | रिपॉजिटरी में **सब कुछ**: हर शेप, इंटरैक्शन, इफ़ेक्ट, ईज़िंग, पथ, एक्सपोर्ट। केवल प्रोटोटाइप के लिए।      |
| `@tsparticles/confetti`  | `confetti(options)`      | एक फ़ंक्शन कॉल में कॉनफ़ेटी। समर्पित API।                                                                 |
| `@tsparticles/fireworks` | `fireworks(options)`     | एक फ़ंक्शन कॉल में आतिशबाज़ी। समर्पित API।                                                                |
| `@tsparticles/particles` | `particles(options)`     | सरलीकृत कण पृष्ठभूमि। समर्पित API।                                                                        |
| `@tsparticles/ribbons`   | `ribbons(options)`       | रिबन प्रभाव। समर्पित API।                                                                                 |

अधिक जानकारी: [`/hi/guide/bundles`](/hi/guide/bundles)।

## प्रीसेट का उपयोग करना

`@tsparticles/configs` पैकेज में दर्जनों तैयार कॉन्फ़िगरेशन हैं (एब्ज़ॉर्बर, बबल, स्नो, स्टार, ग्रैविटी, कोलिज़न, आदि)।

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

CDN के साथ:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## त्वरित संदर्भ

- ऑप्शन दस्तावेज़ीकरण: [`/hi/options/`](/hi/options/)
- बंडल गाइड: [`/hi/guide/bundles`](/hi/guide/bundles)
- प्रीसेट कैटलॉग: [`/hi/demos/presets`](/hi/demos/presets)
- पैलेट कैटलॉग: [`/hi/demos/palettes`](/hi/demos/palettes)
- शेप कैटलॉग: [`/hi/demos/shapes`](/hi/demos/shapes)
- फ्रेमवर्क रैपर: [`/hi/guide/wrappers`](/hi/guide/wrappers)
- रंग प्रारूप: [`/hi/guide/color-formats`](/hi/guide/color-formats)
- कंटेनर जीवनचक्र: [`/hi/guide/container-lifecycle`](/hi/guide/container-lifecycle)
- प्लगइन और अनुकूलन: [`/hi/guide/plugins-customization`](/hi/guide/plugins-customization)

## समस्या निवारण

| समस्या                                                 | संभावित कारण                                                              | समाधान                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| खाली स्क्रीन, कोई कण नहीं                              | `#tsparticles` DOM में मौजूद नहीं है जब `tsParticles.load()` कॉल किया गया | स्क्रिप्ट से पहले DIV मौजूद होना सुनिश्चित करें, या `DOMContentLoaded` का उपयोग करें               |
| खाली स्क्रीन, कोई कण नहीं                              | केवल `@tsparticles/engine` इंस्टॉल किया                                   | एक बंडल (`@tsparticles/slim`) या प्लगइन भी इंस्टॉल करें — इंजन अकेले कोई शेप नहीं बनाता            |
| "loadBasic/loadSlim/loadFull is not a function" त्रुटि | बंडल इंस्टॉल नहीं या गलत import                                           | `pnpm add @tsparticles/slim` और `{ loadSlim }` import करें                                         |
| कण हिलते नहीं हैं                                      | `move.enable` `true` पर सेट नहीं है                                       | `move: { enable: true, speed: 2 }` जोड़ें                                                          |
| लापता सुविधा (जैसे लिंक, कोलिज़न)                      | चुने गए बंडल में वह शामिल नहीं है                                         | एक समृद्ध बंडल (`@tsparticles/slim` या `tsparticles`) पर स्विच करें या विशिष्ट प्लगइन इंस्टॉल करें |
| TypeScript टाइप त्रुटियाँ                              | पैकेज संस्करण बेमेल हैं                                                   | इंजन और बंडल को एक ही मेजर/माइनर संस्करण पर रखें                                                   |
