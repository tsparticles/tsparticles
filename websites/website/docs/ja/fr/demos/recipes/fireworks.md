# Préréglage de feux d'artifice

Préréglage officiel de l'espace de travail `presets/presets/fireworks`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

Préréglage à fort impact : exécutez-le uniquement sur une interaction explicite de l'utilisateur (clic CTA).

Démo : <https://particles.js.org/demos/recipes/fireworks>
