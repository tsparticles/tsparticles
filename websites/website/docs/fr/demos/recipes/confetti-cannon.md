# Préréglage du canon à confettis

Préréglage officiel de l'espace de travail `presets/presets/confettiCannon`.

Pour déclencher des confettis dans ce préréglage, faites glisser la souris sur la zone de canevas.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

Documents sources : <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>

Démo : <https://particles.js.org/demos/recipes/confetti-cannon>
