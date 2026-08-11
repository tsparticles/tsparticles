# Préréglage de neige

Préréglage officiel de l'espace de travail `presets/presets/snow`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-snow
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSnowPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "snow",
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

Préréglage saisonnier léger pour les promotions d'hiver.

Démo : <https://particles.js.org/demos/recipes/snow>
