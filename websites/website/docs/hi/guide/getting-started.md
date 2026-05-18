# आरंभ करना

यह पथ 2026 में `tsParticles` के लिए सबसे तेज़ विश्वसनीय सेटअप है।

## त्वरित जांच सूची

1. `@tsparticles/engine` इंस्टॉल करें।
2. एक रनटाइम पथ चुनें (`@tsparticles/slim`, `@tsparticles/all`, केंद्रित API जैसे `@tsparticles/particles`, या केवल कस्टम पैकेज)।
3. अपना बंडल एक बार लोड करें.
4. मैन्युअल विकल्प, कॉन्फिग ऑब्जेक्ट या प्रीसेट से प्रारंभ करें।

## 1) इंजन + एक बंडल प्रीसेट स्थापित करें

बेहतरीन डिफ़ॉल्ट आकार/सुविधा संतुलन के लिए `@tsparticles/engine` प्लस `@tsparticles/slim` का उपयोग करें।

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

CDN लिंक, `npm`/`yarn` वेरिएंट, या `require(...)` उदाहरण चाहिए?

- देखें [`/guide/installation`](/hi/guide/installation)।

## 2) HTML में एक कंटेनर बनाएं

```html
<div id="tsparticles"></div>
```

## 3) tsParticles initialize करें

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
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
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) सही बंडल चुनें

- `@tsparticles/slim`: अधिकांश ऐप्स को यहां प्रारंभ करना चाहिए।
- `@tsparticles/basic`: बहुत हल्के सेटअप के लिए छोटा फीचर सेट।
- `@tsparticles/all`: सब कुछ शामिल है, तेज़ प्रोटोटाइप के लिए सबसे आसान।

यदि आपको सीधे `tsParticles` सेटअप के बजाय एक केंद्रित API की आवश्यकता है:

- `@tsparticles/particles`: सरलीकृत कण पृष्ठभूमि एपीआई
- `@tsparticles/confetti`: एक call में confetti API
- `@tsparticles/fireworks`: एक call में fireworks API

## 5) जब आपको गति की आवश्यकता हो तो प्रीसेट/कॉन्फ़िगरेशन का उपयोग करें

यदि आप पूर्वनिर्मित प्रभाव पसंद करते हैं:

```bash
pnpm add @tsparticles/configs
```

फिर कुंजी द्वारा एक कॉन्फ़िगरेशन लोड करें, जैसे [`demo/vite` ऐप](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts)।

यदि आप प्रीसेट-नाम आधारित सेटअप पसंद करते हैं, तो [`/demos/presets`](/hi/demos/presets) में आधिकारिक प्रीसेट कैटलॉग का उपयोग करें।

## त्वरित दस्तावेज़ीकरण मानचित्र

- रूट विकल्प: [`/options/`](/hi/options/)
- रैपर संदर्भ: [`/guide/wrappers`](/hi/guide/wrappers)
- प्रीसेट कैटलॉग: [`/demos/presets`](/hi/demos/presets)
- पैलेट कैटलॉग: [`/demos/palettes`](/hi/demos/palettes)
- शेप कैटलॉग: [`/demos/shapes`](/hi/demos/shapes)
- particles.js से माइग्रेशन: [`/migrations/particles-js`](/hi/migrations/particles-js)
- रंग प्रारूप: [`/guide/color-formats`](/hi/guide/color-formats)
- कंटेनर जीवनचक्र: [`/guide/container-lifecycle`](/hi/guide/container-lifecycle)
- प्लगइन्स और अनुकूलन: [`/guide/plugins-customization`](/hi/guide/plugins-customization)

## समस्या निवारण

- खाली स्क्रीन: `tsParticles.load` पर कॉल करने से पहले सत्यापित करें कि `#tsparticles` मौजूद है।
- अनुपलब्ध सुविधा: आपको संभवतः किसी अन्य प्लगइन/पैकेज (आकार, इंटरेक्शन, अपडेटर) की आवश्यकता होगी।
- विकल्पों पर त्रुटियाँ टाइप करें: अपने पैकेजों को उसी प्रमुख/लघु संस्करण के साथ संरेखित रखें।
