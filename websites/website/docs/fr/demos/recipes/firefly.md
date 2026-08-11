# Préréglage luciole

Préréglage officiel de l'espace de travail `presets/presets/firefly`.

Déplacez la souris à l’intérieur du canevas pour activer le comportement interactif de luciole.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

Préréglage élégant pour les sections de héros naturels, la narration et les portfolios.

Démo : <https://particles.js.org/demos/recipes/firefly>
