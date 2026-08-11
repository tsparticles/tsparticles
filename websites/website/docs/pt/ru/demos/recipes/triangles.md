# Предустановка треугольников

Официальный пресет из рабочей области `presets/presets/triangles`.

## Установить

```bash
pnpm add @tsparticles/engine @tsparticles/preset-triangles
```

## Готов к использованию (ручной запуск/остановка)

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

Надежная основа для геометрических макетов и дизайна в стиле тек.

Демо: <https://particles.js.org/demos/recipes/triangles>
