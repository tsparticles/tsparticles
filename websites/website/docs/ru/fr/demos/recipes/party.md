# Préréglage de fête

Préréglage officiel de l'espace de travail `presets/presets/party`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadPartyPreset } from "@tsparticles/preset-party";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadPartyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "party",
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

Parfait pour les scènes de célébration, les événements et les superpositions à thème festif.

Démo : <https://particles.js.org/demos/recipes/party>
