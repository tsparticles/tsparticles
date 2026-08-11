# Carrés prédéfinis

Préréglage officiel de l'espace de travail `presets/presets/squares`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-squares
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSquaresPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "squares",
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

Parfait pour les designs géométriques et structurés et les mises en page modernes.

Démo : <https://particles.js.org/demos/recipes/squares>
