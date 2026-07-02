# Ribbons-Bundle

Offizielles Bundle aus dem Arbeitsbereich `bundles/ribbons`.

Website: <https://ribbons.js.org>

## Installieren

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Betriebsbereit (ganze Seite)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Auf eine bestimmte Canvas beschränkt

```ts
import { ribbons } from "@tsparticles/ribbons";
import type { Container } from "@tsparticles/engine";

const canvas = document.getElementById("ribbons-canvas") as HTMLCanvasElement;

const fire = await ribbons.create(canvas, {
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F"],
});

export function start(): Promise<Container | undefined> {
  return fire();
}

export function stop(): void {
  fire.pause();
}

export function resume(): void {
  fire.play();
}
```

Perfekt für dekorative Hintergründe, festliche Kaskaden und farbenfrohe animierte Spuren.

## Feste Position (einzelner Punkt)

Standardmäßig wird jedes Ribbon-Partikel an einer zufälligen x-Position über die gesamte Canvas-Breite erzeugt. Mit `emitterSize` kann der Erzeugungsbereich gesteuert werden — setze ihn auf `{ width: 0, height: 0 }`, um alle Ribbons vom selben Punkt starten zu lassen:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  positionX: 50,
  emitterSize: { width: 0, height: 0 },
});
```

Nützlich, um Ribbons von einem Button oder einem bestimmten Element auf deiner Seite auszulösen.

Demo: <https://particles.js.org/demos/recipes/ribbons>
