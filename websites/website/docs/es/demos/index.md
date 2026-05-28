# Demostración lista para usar

Estas recetas utilizan los ajustes preestablecidos oficiales disponibles en el espacio de trabajo `presets/presets` (beta/alfa hacia el lanzamiento).

## Inicio/parada de la base del patrón (sin reproducción automática)

```ts
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";

let container: Container | undefined;

export async function start(id: string, options: ISourceOptions): Promise<void> {
  container?.destroy();
  container = await tsParticles.load({ id, options });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

## Recetas preestablecidas

- Catálogo de presets: [`/demos/presets`](/es/demos/presets)
- Catálogo de paletas: [`/demos/palettes`](/es/demos/palettes)
- Catálogo de formas: [`/demos/shapes`](/es/demos/shapes)

- [`Ambient`](/es/demos/recipes/ambient)
- [`Big Circles`](/es/demos/recipes/big-circles)
- [`Bubbles`](/es/demos/recipes/bubbles)
- [`Confetti`](/es/demos/recipes/confetti)
- [`Confetti Cannon`](/es/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/es/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/es/demos/recipes/confetti-falling)
- [`Confetti Parade`](/es/demos/recipes/confetti-parade)
- [`Fire`](/es/demos/recipes/fire)
- [`Firefly`](/es/demos/recipes/firefly)
- [`Fireworks`](/es/demos/recipes/fireworks)
- [`Fountain`](/es/demos/recipes/fountain)
- [`Hyperspace`](/es/demos/recipes/hyperspace)
- [`Links`](/es/demos/recipes/links)
- [`Matrix`](/es/demos/recipes/matrix)
- [`Sea Anemone`](/es/demos/recipes/sea-anemone)
- [`Snow`](/es/demos/recipes/snow)
- [`Squares`](/es/demos/recipes/squares)
- [`Stars`](/es/demos/recipes/stars)
- [`Ribbons`](/es/demos/recipes/ribbons)
- [`Triangles`](/es/demos/recipes/triangles)

Para probarlos inmediatamente en la interfaz de usuario, use [`Playground`](/es/playground/) e inícielos con `Start` solo cuando sea necesario.

## Proyectos de demostración del marco

El monorepo también incluye demostraciones de integración ejecutables:

- Carpeta de origen: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Las demostraciones disponibles incluyen: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
