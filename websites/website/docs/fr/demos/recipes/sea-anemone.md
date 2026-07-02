# Préréglage d'anémone de mer

Préréglage officiel de l'espace de travail `presets/presets/seaAnemone`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

Parfait pour les animations organiques et fluides d’inspiration sous-marine.

Démo : <https://particles.js.org/demos/recipes/sea-anemone>
