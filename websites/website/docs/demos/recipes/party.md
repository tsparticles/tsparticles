# Party Preset

Official preset from the `presets/presets/party` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Ready-to-use (manual start/stop)

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

Perfect for celebration scenes, events, and party-themed overlays.
