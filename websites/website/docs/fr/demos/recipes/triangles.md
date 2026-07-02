# Triangles prédéfinis

Préréglage officiel de l'espace de travail `presets/presets/triangles`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Prêt à l'emploi (démarrage/arrêt manuel)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadTrianglesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "triangles",
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

Une base solide pour les dispositions géométriques et le design de style technologique.

Démo : <https://particles.js.org/demos/recipes/triangles>
