# Catalogo preimpostazioni

Queste sono le preimpostazioni ufficiali elencate nel file README `tsParticles` principale e disponibili nell'area di lavoro delle preimpostazioni.

Cartella di origine: <https://github.com/tsparticles/tsparticles/tree/main/presets>

## Preimpostazioni

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
- `matrix` - ricetta dimostrativa sul sito web locale disponibile in [`/demos/recipes/matrix`](/it/demos/recipes/matrix)
- `meteors` - <https://www.npmjs.com/package/@tsparticles/preset-meteors> - [/demos/recipes/meteors](/demos/recipes/meteors)
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - [/demos/recipes/sea-anemone](/demos/recipes/sea-anemone)
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - [/demos/recipes/snow](/demos/recipes/snow)
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - [/demos/recipes/squares](/demos/recipes/squares)
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - [/demos/recipes/stars](/demos/recipes/stars)
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - [/demos/recipes/triangles](/demos/recipes/triangles)

Ogni cartella preimpostata contiene anche documenti nel monorepo, ad esempio:

- <https://github.com/tsparticles/tsparticles/tree/main/presets/confetti#readme>

## Utilizzo rapido

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

Per le configurazioni di produzione, utilizzare l'avvio/arresto/ripresa/distruzione manuale come mostrato nelle ricette in [`/demos/`](/it/demos/).

Utilizza [`/playground/presets`](/it/playground/presets) per testare ciascuna preimpostazione con controlli Avvio/Pausa espliciti.
