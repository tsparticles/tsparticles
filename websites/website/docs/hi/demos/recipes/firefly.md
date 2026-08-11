# जुगनू प्रीसेट

`presets/presets/firefly` कार्यक्षेत्र से आधिकारिक प्रीसेट।

इंटरैक्टिव जुगनू व्यवहार को सक्रिय करने के लिए माउस को कैनवास के अंदर ले जाएँ।

## स्थापित करें

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## उपयोग के लिए तैयार (मैनुअल स्टार्ट/स्टॉप)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

प्राकृतिक नायक अनुभागों, कहानी कहने और पोर्टफ़ोलियो के लिए सुंदर प्रीसेट।

डेमो: <https://particles.js.org/demos/recipes/firefly>
