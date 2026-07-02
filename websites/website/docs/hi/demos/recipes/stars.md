# सितारे प्रीसेट

`presets/presets/stars` कार्यक्षेत्र से आधिकारिक प्रीसेट।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

अंतरिक्ष/ब्रह्मांडीय लैंडिंग पृष्ठों और डार्क थीम के लिए बिल्कुल सही।

डेमो: <https://particles.js.org/demos/recipes/stars>
