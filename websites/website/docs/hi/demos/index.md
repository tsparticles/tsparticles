# डेमो रेडी-टू-यूज़

ये रेसिपी `presets/presets` कार्यक्षेत्र (रिलीज की ओर बीटा/अल्फा) में उपलब्ध आधिकारिक प्रीसेट का उपयोग करती हैं।

## पैटर्न बेस स्टार्ट/स्टॉप (कोई ऑटोप्ले नहीं)

```ts
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";

let container: Container | undefined;

export async function start(id: string, options: ISourceOptions): Promise<void> {
  container?.destroy();
  container = await tsParticles.load({ id, options });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

## पूर्व निर्धारित व्यंजन

- प्रीसेट कैटलॉग: [`/demos/presets`](/hi/demos/presets)
- पैलेट कैटलॉग: [`/demos/palettes`](/hi/demos/palettes)
- शेप कैटलॉग: [`/demos/shapes`](/hi/demos/shapes)

- [`Ambient`](/hi/demos/recipes/ambient)
- [`Big Circles`](/hi/demos/recipes/big-circles)
- [`Bubbles`](/hi/demos/recipes/bubbles)
- [`Confetti`](/hi/demos/recipes/confetti)
- [`Confetti Cannon`](/hi/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/hi/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/hi/demos/recipes/confetti-falling)
- [`Confetti Parade`](/hi/demos/recipes/confetti-parade)
- [`Fire`](/hi/demos/recipes/fire)
- [`Firefly`](/hi/demos/recipes/firefly)
- [`Fireworks`](/hi/demos/recipes/fireworks)
- [`Fountain`](/hi/demos/recipes/fountain)
- [`Hyperspace`](/hi/demos/recipes/hyperspace)
- [`Links`](/hi/demos/recipes/links)
- [`Matrix`](/hi/demos/recipes/matrix)
- [`Sea Anemone`](/hi/demos/recipes/sea-anemone)
- [`Snow`](/hi/demos/recipes/snow)
- [`Squares`](/hi/demos/recipes/squares)
- [`Stars`](/hi/demos/recipes/stars)
- [`Ribbons`](/hi/demos/recipes/ribbons)
- [`Triangles`](/hi/demos/recipes/triangles)

यूआई में उनका तुरंत परीक्षण करने के लिए, [`Playground`](/hi/playground/) का उपयोग करें और जरूरत पड़ने पर ही उन्हें `Start` से प्रारंभ करें।

## फ्रेमवर्क डेमो प्रोजेक्ट

मोनोरेपो में चलाने योग्य एकीकरण डेमो भी शामिल हैं:

- स्रोत फ़ोल्डर: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- उपलब्ध डेमो में शामिल हैं: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`।
