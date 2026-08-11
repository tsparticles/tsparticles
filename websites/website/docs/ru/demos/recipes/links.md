# Links Preset

Official preset from the `presets/presets/links` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Ready-to-use (manual start/stop)

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

Ideal for SaaS-style hero/network backgrounds.

Demo: <https://particles.js.org/demos/recipes/links>
