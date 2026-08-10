# Préréglage de feu

Préréglage officiel de l'espace de travail `presets/presets/fire`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

Parfait pour les conceptions spectaculaires et énergiques et les démonstrations d’effets.

Démo : <https://particles.js.org/demos/recipes/fire>
