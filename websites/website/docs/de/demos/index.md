# Demo sofort einsatzbereit

Diese Rezepte verwenden die offiziellen Voreinstellungen, die im Arbeitsbereich `presets/presets` verfügbar sind (Beta/Alpha zur Veröffentlichung).

## Start/Stopp der Musterbasis (keine automatische Wiedergabe)

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

## Voreingestellte Rezepte

- Voreinstellungskatalog: [`/demos/presets`](/de/demos/presets)
- Palettenkatalog: [`/demos/palettes`](/de/demos/palettes)
- Formenkatalog: [`/demos/shapes`](/de/demos/shapes)

- [`Ambient`](/de/demos/recipes/ambient)
- [`Big Circles`](/de/demos/recipes/big-circles)
- [`Bubbles`](/de/demos/recipes/bubbles)
- [`Confetti`](/de/demos/recipes/confetti)
- [`Confetti Cannon`](/de/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/de/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/de/demos/recipes/confetti-falling)
- [`Confetti Parade`](/de/demos/recipes/confetti-parade)
- [`Party`](/de/demos/recipes/party)
- [`Fire`](/de/demos/recipes/fire)
- [`Firefly`](/de/demos/recipes/firefly)
- [`Fireworks`](/de/demos/recipes/fireworks)
- [`Fountain`](/de/demos/recipes/fountain)
- [`Hyperspace`](/de/demos/recipes/hyperspace)
- [`Links`](/de/demos/recipes/links)
- [`Matrix`](/de/demos/recipes/matrix)
- [`Sea Anemone`](/de/demos/recipes/sea-anemone)
- [`Snow`](/de/demos/recipes/snow)
- [`Squares`](/de/demos/recipes/squares)
- [`Stars`](/de/demos/recipes/stars)
- [`Ribbons`](/de/demos/recipes/ribbons)
- [`Triangles`](/de/demos/recipes/triangles)

Um sie sofort in der Benutzeroberfläche zu testen, verwenden Sie [`Playground`](/de/playground/) und starten Sie sie nur bei Bedarf mit `Start`.

## Framework-Demoprojekte

Das Monorepo enthält auch ausführbare Integrationsdemos:

- Quellordner: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Zu den verfügbaren Demos gehören: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
