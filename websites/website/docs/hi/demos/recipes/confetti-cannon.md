# कंफ़ेद्दी तोप प्रीसेट

`presets/presets/confettiCannon` कार्यक्षेत्र से आधिकारिक प्रीसेट।

इस प्रीसेट में कंफ़ेद्दी को ट्रिगर करने के लिए, माउस को कैनवास क्षेत्र पर खींचें।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

डेमो: <https://particles.js.org/demos/recipes/confetti-cannon>

स्रोत दस्तावेज़: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
