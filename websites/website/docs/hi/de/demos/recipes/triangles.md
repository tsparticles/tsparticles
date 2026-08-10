# Dreiecke voreingestellt

Offizielle Voreinstellung aus dem Arbeitsbereich `presets/presets/triangles`.

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Betriebsbereit (manueller Start/Stopp)

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

Eine solide Basis für geometrische Layouts und Design im technischen Stil.

Demo: <https://particles.js.org/demos/recipes/triangles>
