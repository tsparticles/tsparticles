# Party-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/party`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Betriebsbereit (manueller Start/Stopp)

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

Perfekt für Feierszenen, Veranstaltungen und party-themenbezogene Overlays.

Demo: <https://particles.js.org/demos/recipes/party>
