# Bundle: Fireworks

`@tsparticles/fireworks` एक सरलीकृत API प्रदान करता है जो एक फ़ंक्शन कॉल के साथ आतिशबाज़ी प्रभाव बनाता है। ध्वनि, कस्टम रंग और इंस्टेंस नियंत्रण (पॉज़/प्ले) का समर्थन करता है।

## शामिल सुविधाएँ

**शेप:** line, circle (basic से)

**आंतरिक प्लगइन:** emitters, emitters-shape-square, blend (मिश्रण), sounds

**अपडेटर:** destroy, life, paint, rotate

**API:** `fireworks(options)` — एक नियंत्रणीय इंस्टेंस लौटाता है

## कब उपयोग करें

- नए साल या उत्सव प्रभाव
- उत्सव UI
- आप मैन्युअल रूप से इंजन कॉन्फ़िगर नहीं करना चाहते

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// मूल प्रभाव
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// इंस्टेंस नियंत्रण
instance?.pause();
instance?.play();

// किसी विशिष्ट कैनवास पर
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // तत्काल आतिशबाज़ी
  fireworks();
</script>
```

### मुख्य पैरामीटर

| पैरामीटर     | टाइप         | डिफ़ॉल्ट | विवरण                       |
| ------------ | ------------ | -------- | --------------------------- |
| `colors`     | string[]     | —        | विस्फोट के रंग              |
| `rate`       | number       | —        | प्रति सेकंड आतिशबाज़ी       |
| `speed`      | { min, max } | —        | कण गति                      |
| `sounds`     | boolean      | true     | ध्वनि प्रभाव सक्षम करें     |
| `gravity`    | number       | —        | गुरुत्वाकर्षण (डिफ़ॉल्ट: 0) |
| `opacity`    | number       | —        | अपारदर्शिता (0-1)           |
| `brightness` | { min, max } | —        | विस्फोट चमक                 |

## सामान्य गलतियाँ

- यह सोचना कि `@tsparticles/fireworks` से `tsParticles` एक्सपोर्ट होता है — ऐसा नहीं है।
- इंस्टेंस का प्रबंधन किए बिना `fireworks()` को लूप में कॉल करना — प्रभाव पहले से ही निरंतर है।
- पेज छोड़ते समय इंस्टेंस को न रोकना — `instance?.pause()` या `instance?.stop()` कॉल करें।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [कॉनफ़ेटी बंडल](/hi/guide/bundles-confetti)
