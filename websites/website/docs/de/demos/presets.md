# Voreinstellungskatalog

Dies sind die offiziellen Voreinstellungen, die in der Haupt-README-Datei `tsParticles` aufgeführt sind und im Arbeitsbereich „Voreinstellungen“ verfügbar sind.

Quellordner: <https://github.com/tsparticles/tsparticles/tree/main/presets>

## Voreinstellungen

- `ambient` - <https://www.npmjs.com/package/@tsparticles/preset-ambient> - [/demos/recipes/ambient](/demos/recipes/ambient)
- `big-circles` - <https://www.npmjs.com/package/@tsparticles/preset-big-circles> - [/demos/recipes/big-circles](/demos/recipes/big-circles)
- `bubbles` - <https://www.npmjs.com/package/@tsparticles/preset-bubbles> - [/demos/recipes/bubbles](/demos/recipes/bubbles)
- `confetti` - <https://www.npmjs.com/package/@tsparticles/preset-confetti> - [/demos/recipes/confetti](/demos/recipes/confetti)
- `confetti-cannon` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-cannon> - [/demos/recipes/confetti-cannon](/demos/recipes/confetti-cannon)
- `confetti-explosions` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-explosions> - [/demos/recipes/confetti-explosions](/demos/recipes/confetti-explosions)
- `confetti-falling` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-falling> - [/demos/recipes/confetti-falling](/demos/recipes/confetti-falling)
- `confetti-parade` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-parade> - [/demos/recipes/confetti-parade](/demos/recipes/confetti-parade)
- `party` - <https://www.npmjs.com/package/@tsparticles/preset-party> - [/demos/recipes/party](/demos/recipes/party)
- `fire` - <https://www.npmjs.com/package/@tsparticles/preset-fire> - [/demos/recipes/fire](/demos/recipes/fire)
- `firefly` - <https://www.npmjs.com/package/@tsparticles/preset-firefly> - [/demos/recipes/firefly](/demos/recipes/firefly)
- `fireworks` - <https://www.npmjs.com/package/@tsparticles/preset-fireworks> - [/demos/recipes/fireworks](/demos/recipes/fireworks)
- `fountain` - <https://www.npmjs.com/package/@tsparticles/preset-fountain> - [/demos/recipes/fountain](/demos/recipes/fountain)
- `hyperspace` - <https://www.npmjs.com/package/@tsparticles/preset-hyperspace> - [/demos/recipes/hyperspace](/demos/recipes/hyperspace)
- `links` - <https://www.npmjs.com/package/@tsparticles/preset-links> - [/demos/recipes/links](/demos/recipes/links)
- `matrix` – Demorezept für lokale Website verfügbar in [`/demos/recipes/matrix`](/de/demos/recipes/matrix)
- `meteors` - <https://www.npmjs.com/package/@tsparticles/preset-meteors> - [/demos/recipes/meteors](/demos/recipes/meteors)
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - [/demos/recipes/sea-anemone](/demos/recipes/sea-anemone)
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - [/demos/recipes/snow](/demos/recipes/snow)
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - [/demos/recipes/squares](/demos/recipes/squares)
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - [/demos/recipes/stars](/demos/recipes/stars)
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - [/demos/recipes/triangles](/demos/recipes/triangles)

Jeder voreingestellte Ordner enthält auch Dokumente im Monorepo, zum Beispiel:

- <https://github.com/tsparticles/tsparticles/tree/main/presets/confetti#readme>

## Schnelle Nutzung

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    preset: "links",
    fullScreen: {
      enable: false,
    },
  },
});
```

Verwenden Sie für Produktions-Setups manuelles Starten/Stoppen/Fortsetzen/Zerstören, wie in den Rezepten unter [`/demos/`](/de/demos/) gezeigt.

Verwenden Sie [`/playground/presets`](/de/playground/presets), um jede Voreinstellung mit expliziten Start-/Pause-Steuerelementen zu testen.
