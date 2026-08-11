# Préréglage de fontaine

Préréglage officiel de l'espace de travail `presets/presets/fountain`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fountain
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFountainPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fountain",
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

Parfait pour des animations de particules élégantes et fluides et des effets sur le thème de l'eau.

Démo : <https://particles.js.org/demos/recipes/fountain>
