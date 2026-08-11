# प्रीसेट कैटलॉग

ये मुख्य `tsParticles` README में सूचीबद्ध आधिकारिक प्रीसेट हैं और प्रीसेट कार्यक्षेत्र में उपलब्ध हैं।

स्रोत फ़ोल्डर: <https://github.com/tsparticles/tsparticles/tree/main/presets>

## प्रीसेट

- `ambient` - <https://www.npmjs.com/package/@tsparticles/preset-ambient> - [/demos/recipes/ambient](/demos/recipes/ambient)
- `big-circles` - <https://www.npmjs.com/package/@tsparticles/preset-big-circles> - [/demos/recipes/big-circles](/demos/recipes/big-circles)
- `bubbles` - <https://www.npmjs.com/package/@tsparticles/preset-bubbles> - [/demos/recipes/bubbles](/demos/recipes/bubbles)
- `confetti` - <https://www.npmjs.com/package/@tsparticles/preset-confetti> - [/demos/recipes/confetti](/demos/recipes/confetti)
- `confetti-cannon` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-cannon> - [/demos/recipes/confetti-cannon](/demos/recipes/confetti-cannon)
- `confetti-explosions` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-explosions> - [/demos/recipes/confetti-explosions](/demos/recipes/confetti-explosions)
- `confetti-falling` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-falling> - [/demos/recipes/confetti-falling](/demos/recipes/confetti-falling)
- `confetti-parade` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-parade> - [/demos/recipes/confetti-parade](/demos/recipes/confetti-parade)
- `party` - <https://www.npmjs.com/package/@tsparticles/preset-party> - [/demos/recipes/party](/demos/recipes/party)
- `fire` - <https://www.npmjs.com/package/@tsparticles/preset-fire> - [/demos/recipes/fire](/demos/recipes/fire)
- `firefly` - <https://www.npmjs.com/package/@tsparticles/preset-firefly> - [/demos/recipes/firefly](/demos/recipes/firefly)
- `fireworks` - <https://www.npmjs.com/package/@tsparticles/preset-fireworks> - [/demos/recipes/fireworks](/demos/recipes/fireworks)
- `fountain` - <https://www.npmjs.com/package/@tsparticles/preset-fountain> - [/demos/recipes/fountain](/demos/recipes/fountain)
- `hyperspace` - <https://www.npmjs.com/package/@tsparticles/preset-hyperspace> - [/demos/recipes/hyperspace](/demos/recipes/hyperspace)
- `links` - <https://www.npmjs.com/package/@tsparticles/preset-links> - [/demos/recipes/links](/demos/recipes/links)
- `matrix` - स्थानीय वेबसाइट डेमो रेसिपी [`/demos/recipes/matrix`](/hi/demos/recipes/matrix) में उपलब्ध है
- `meteors` - <https://www.npmjs.com/package/@tsparticles/preset-meteors> - [/demos/recipes/meteors](/demos/recipes/meteors)
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - [/demos/recipes/sea-anemone](/demos/recipes/sea-anemone)
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - [/demos/recipes/snow](/demos/recipes/snow)
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - [/demos/recipes/squares](/demos/recipes/squares)
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - [/demos/recipes/stars](/demos/recipes/stars)
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - [/demos/recipes/triangles](/demos/recipes/triangles)

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
