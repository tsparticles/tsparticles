# Préréglage de grands cercles

Préréglage officiel de l'espace de travail `presets/presets/bigCircles`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
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

Parfait pour les designs minimalistes et modernes avec de grands cercles animés.

Démo : <https://particles.js.org/demos/recipes/big-circles>
