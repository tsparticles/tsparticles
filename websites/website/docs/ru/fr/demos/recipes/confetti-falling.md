# Préréglage de chute de confettis

Préréglage officiel de l'espace de travail `presets/presets/confettiFalling`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-falling
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiFallingPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiFalling",
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

Documents sources : <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiFalling#readme>

Démo : <https://particles.js.org/demos/recipes/confetti-falling>
