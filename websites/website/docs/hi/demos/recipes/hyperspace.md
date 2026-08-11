# हाइपरस्पेस प्रीसेट

कार्यस्थान `presets/presets/hyperspace` के लिए पूर्व निर्धारित अधिकारी।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## उपयोग के लिए तैयार (स्टार्ट/स्टॉप मैनुअल)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

ओटिमो प्रति सेज़ियोनी वाह-इफ़ेक्ट और इंट्रो प्रोडोटो।

डेमो: <https://particles.js.org/demos/recipes/hyperspace>
