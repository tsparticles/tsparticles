# लिंक प्रीसेट

`presets/presets/links` कार्यक्षेत्र से आधिकारिक प्रीसेट।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadLinksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "links",
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

सास-शैली नायक/नेटवर्क पृष्ठभूमि के लिए आदर्श।

डेमो: <https://particles.js.org/demos/recipes/links>
