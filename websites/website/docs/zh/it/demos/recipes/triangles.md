# Preimpostazione triangoli

Preimpostazione ufficiale dall'area di lavoro `presets/presets/triangles`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Pronto all'uso (avvio/arresto manuale)

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

Una base solida per layout geometrici e design in stile tech.

Dimostrazione: <https://particles.js.org/demos/recipes/triangles>
