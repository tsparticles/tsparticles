# Préréglage du défilé de confettis

Préréglage officiel de l'espace de travail `presets/presets/confettiParade`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiParadePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiParade",
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

Documents sources : <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>

Démo : <https://particles.js.org/demos/recipes/confetti-parade>
