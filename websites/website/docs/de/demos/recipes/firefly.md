# Firefly-Voreinstellung

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/firefly`.

Bewegen Sie die Maus innerhalb der Leinwand, um das interaktive Glühwürmchenverhalten zu aktivieren.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Betriebsbereit (manueller Start/Stopp)

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

Elegante Voreinstellung für natürliche Heldenabschnitte, Geschichtenerzählen und Portfolios.

Demo: <https://particles.js.org/demos/recipes/firefly>
