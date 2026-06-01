# प्रीसेट कैटलॉग

ये मुख्य `tsParticles` README में सूचीबद्ध आधिकारिक प्रीसेट हैं और प्रीसेट कार्यक्षेत्र में उपलब्ध हैं।

स्रोत फ़ोल्डर: <https://github.com/tsparticles/tsparticles/tree/main/presets>

## प्रीसेट

- `ambient` - <https://www.npmjs.com/package/@tsparticles/preset-ambient> - <https://particles.js.org/samples/presets/ambient>
- `big-circles` - <https://www.npmjs.com/package/@tsparticles/preset-big-circles> - <https://particles.js.org/samples/presets/bigCircles>
- `bubbles` - <https://www.npmjs.com/package/@tsparticles/preset-bubbles> - <https://particles.js.org/samples/presets/bubbles>
- `confetti` - <https://www.npmjs.com/package/@tsparticles/preset-confetti> - <https://particles.js.org/samples/presets/confetti>
- `confetti-cannon` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-cannon> - <https://particles.js.org/samples/presets/confettiCannon>
- `confetti-explosions` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-explosions> - <https://particles.js.org/samples/presets/confettiExplosions>
- `confetti-falling` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-falling> - <https://particles.js.org/samples/presets/confettiFalling>
- `confetti-parade` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-parade> - <https://particles.js.org/samples/presets/confettiParade>
- `party` - <https://www.npmjs.com/package/@tsparticles/preset-party> - <https://particles.js.org/samples/presets/party>
- `fire` - <https://www.npmjs.com/package/@tsparticles/preset-fire> - <https://particles.js.org/samples/presets/fire>
- `firefly` - <https://www.npmjs.com/package/@tsparticles/preset-firefly> - <https://particles.js.org/samples/presets/firefly>
- `fireworks` - <https://www.npmjs.com/package/@tsparticles/preset-fireworks> - <https://particles.js.org/samples/presets/fireworks>
- `fountain` - <https://www.npmjs.com/package/@tsparticles/preset-fountain> - <https://particles.js.org/samples/presets/fountain>
- `hyperspace` - <https://www.npmjs.com/package/@tsparticles/preset-hyperspace> - <https://particles.js.org/samples/presets/hyperspace>
- `links` - <https://www.npmjs.com/package/@tsparticles/preset-links> - <https://particles.js.org/samples/presets/links>
- `matrix` - स्थानीय वेबसाइट डेमो रेसिपी [`/demos/recipes/matrix`](/hi/demos/recipes/matrix) में उपलब्ध है
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - <https://particles.js.org/samples/presets/seaAnemone>
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - <https://particles.js.org/samples/presets/snow>
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - <https://particles.js.org/samples/presets/squares>
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - <https://particles.js.org/samples/presets/stars>
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - <https://particles.js.org/samples/presets/triangles>

प्रत्येक प्रीसेट फ़ोल्डर में मोनोरेपो में दस्तावेज़ भी होते हैं, उदाहरण के लिए:

- <https://github.com/tsparticles/tsparticles/tree/main/presets/confetti#readme>

## त्वरित उपयोग

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    preset: "links",
    fullScreen: {
      enable: false,
    },
  },
});
```

उत्पादन सेटअप के लिए, मैन्युअल स्टार्ट/स्टॉप/रेज़्यूमे/डिस्ट्रॉय का उपयोग करें जैसा कि [`/demos/`](/hi/demos/) के अंतर्गत व्यंजनों में दिखाया गया है।

स्पष्ट स्टार्ट/पॉज़ नियंत्रणों के साथ प्रत्येक प्रीसेट का परीक्षण करने के लिए [`/playground/presets`](/hi/playground/presets) का उपयोग करें।
