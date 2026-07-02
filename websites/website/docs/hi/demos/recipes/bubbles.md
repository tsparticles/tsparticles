# बुलबुले प्रीसेट

`presets/presets/bubbles` कार्यक्षेत्र से आधिकारिक प्रीसेट।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

अधिक दृश्यमान गति वाले इंटरैक्टिव अनुभागों के लिए उपयोगी।

डेमो: <https://particles.js.org/demos/recipes/bubbles>
