# Liens prédéfinis

Préréglage officiel de l'espace de travail `presets/presets/links`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-links
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadLinksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "links",
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

Idéal pour les arrière-plans de héros/réseau de style SaaS.

Démo : <https://particles.js.org/demos/recipes/links>
