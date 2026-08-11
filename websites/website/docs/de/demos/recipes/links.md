# Links-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/links`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Betriebsbereit (manueller Start/Stopp)

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

Ideal für Helden-/Netzwerkhintergründe im SaaS-Stil.

Demo: <https://particles.js.org/demos/recipes/links>
