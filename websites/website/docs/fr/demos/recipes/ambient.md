# Préréglage ambiant

Préréglage officiel de l'espace de travail `presets/presets/ambient`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadAmbientPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "ambient",
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

Idéal pour les arrière-plans doux et continus avec un faible bruit visuel.

Démo : <https://particles.js.org/demos/recipes/ambient>
