# Préréglage d'explosions de confettis

Préréglage officiel de l'espace de travail `presets/presets/confettiExplosions`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-explosions
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiExplosionsPreset } from "@tsparticles/preset-confetti-explosions";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiExplosionsPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiExplosions",
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

Documents sources : <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiExplosions#readme>

Démo : <https://particles.js.org/demos/recipes/confetti-explosions>
