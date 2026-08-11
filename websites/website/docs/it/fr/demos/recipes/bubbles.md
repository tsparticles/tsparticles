# Bulles prédéfinies

Préréglage officiel de l'espace de travail `presets/presets/bubbles`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-bubbles
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBubblesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "bubbles",
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

Utile pour les sections interactives avec un mouvement plus visible.

Démo : <https://particles.js.org/demos/recipes/bubbles>
