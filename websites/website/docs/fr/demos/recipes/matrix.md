# Préréglage matriciel

Préréglage officiel de l'espace de travail `presets/presets/matrix`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-matrix
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadMatrixPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "matrix",
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

Parfait pour les conceptions esthétiques tech/hacker et les thèmes numériques.

Démo : <https://particles.js.org/demos/recipes/matrix>
