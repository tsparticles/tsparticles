# पार्टी प्रीसेट

`presets/presets/party` कार्यक्षेत्र से आधिकारिक प्रीसेट।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadPartyPreset } from "@tsparticles/preset-party";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadPartyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "party",
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

उत्सव के दृश्यों, आयोजनों और पार्टी-थीम वाले ओवरले के लिए बिल्कुल सही।
