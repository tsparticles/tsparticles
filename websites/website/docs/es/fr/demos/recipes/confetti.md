# Préréglage de confettis

Préréglage officiel de l'espace de travail `presets/presets/confetti`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confetti",
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

Parfait pour les célébrations, les annonces et les créations festives. Combinez-le avec différentes palettes de couleurs pour plus de variété.

Démo : <https://particles.js.org/demos/recipes/confetti>
