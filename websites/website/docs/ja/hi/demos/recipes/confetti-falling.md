# कंफ़ेद्दी फ़ॉलिंग प्रीसेट

`presets/presets/confettiFalling` कार्यक्षेत्र से आधिकारिक प्रीसेट।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiFallingPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiFalling",
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

डेमो: <https://particles.js.org/demos/recipes/confetti-falling>

स्रोत दस्तावेज़: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>
