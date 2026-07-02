# कंफ़ेद्दी प्रीसेट

`presets/presets/confetti` कार्यक्षेत्र से आधिकारिक प्रीसेट।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
    },
  });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

उत्सवों, घोषणाओं और उत्सव के डिज़ाइनों के लिए बिल्कुल सही। विविधता के लिए विभिन्न रंग पट्टियों के साथ संयोजन करें।

डेमो: <https://particles.js.org/demos/recipes/confetti>
