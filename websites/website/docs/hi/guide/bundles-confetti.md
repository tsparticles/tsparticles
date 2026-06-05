# Bundle: Confetti

`@tsparticles/confetti` एक सरलीकृत API प्रदान करता है जो एक फ़ंक्शन कॉल के साथ कॉनफ़ेटी प्रभाव बनाता है। सीधे `tsParticles` से बातचीत करने की आवश्यकता नहीं है।

## शामिल सुविधाएँ

**शेप:** circle, heart, cards (फ़्रेंच सूट: hearts, diamonds, clubs, spades), emoji, images, polygon, square, star

**आंतरिक प्लगइन:** emitters, motion (उपयोगकर्ता की reduced motion प्राथमिकता का सम्मान करता है)

**अपडेटर:** life, roll, rotate, tilt, wobble

**API:** `confetti(options)` या `confetti(canvasId, options)`

## कब उपयोग करें

- "बधाई हो!" या "जन्मदिन मुबारक!" बटन
- त्वरित उत्सव प्रभाव
- आप मैन्युअल रूप से इंजन कॉन्फ़िगर नहीं करना चाहते

## इंस्टॉलेशन

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// मूल प्रभाव
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// किसी विशिष्ट कैनवास पर
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN (script टैग)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### मुख्य पैरामीटर

| पैरामीटर        | टाइप     | डिफ़ॉल्ट     | विवरण                                             |
| --------------- | -------- | ------------ | ------------------------------------------------- |
| `particleCount` | number   | 50           | कॉनफ़ेटी टुकड़ों की संख्या                        |
| `spread`        | number   | 60           | फैलाव कोण (डिग्री)                                |
| `angle`         | number   | 90           | दिशा (डिग्री, 90 = नीचे)                          |
| `startVelocity` | number   | 30           | प्रारंभिक वेग                                     |
| `colors`        | string[] | —            | कॉनफ़ेटी रंग                                      |
| `origin`        | { x, y } | { 0.5, 0.5 } | मूल बिंदु (0-1)                                   |
| `drift`         | number   | 0            | क्षैतिज बहाव                                      |
| `shapes`        | string[] | —            | शेप: "circle", "heart", "square", "star", "cards" |

## सामान्य गलतियाँ

- यह सोचना कि `@tsparticles/confetti` से `tsParticles` एक्सपोर्ट होता है — ऐसा नहीं है।
- अनजाने में उसी कैनवास ID का पुन: उपयोग करना।
- प्रदर्शन का प्रबंधन किए बिना लूप में `confetti` कॉल करना — उचित अंतराल का उपयोग करें या एनिमेशन समाप्त होने पर रोकें।

## यह भी देखें

- [बंडल अवलोकन](/hi/guide/bundles)
- [आतिशबाज़ी बंडल](/hi/guide/bundles-fireworks)
