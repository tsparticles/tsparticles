# Étoiles prédéfinies

Préréglage officiel de l'espace de travail `presets/presets/stars`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-stars
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadStarsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
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

Parfait pour les pages de destination spatiales/cosmiques et les thèmes sombres.

Démo : <https://particles.js.org/demos/recipes/stars>
