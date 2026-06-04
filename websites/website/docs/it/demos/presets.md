# Catalogo preimpostazioni

Queste sono le preimpostazioni ufficiali elencate nel file README `tsParticles` principale e disponibili nell'area di lavoro delle preimpostazioni.

Cartella di origine: <https://github.com/tsparticles/tsparticles/tree/main/presets>

## Preimpostazioni

- `ambient` - <https://www.npmjs.com/package/@tsparticles/preset-ambient> - <https://particles.js.org/samples/presets/ambient>
- `big-circles` - <https://www.npmjs.com/package/@tsparticles/preset-big-circles> - <https://particles.js.org/samples/presets/bigCircles>
- `bubbles` - <https://www.npmjs.com/package/@tsparticles/preset-bubbles> - <https://particles.js.org/samples/presets/bubbles>
- `confetti` - <https://www.npmjs.com/package/@tsparticles/preset-confetti> - <https://particles.js.org/samples/presets/confetti>
- `confetti-cannon` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-cannon> - <https://particles.js.org/samples/presets/confettiCannon>
- `confetti-explosions` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-explosions> - <https://particles.js.org/samples/presets/confettiExplosions>
- `confetti-falling` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-falling> - <https://particles.js.org/samples/presets/confettiFalling>
- `confetti-parade` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-parade> - <https://particles.js.org/samples/presets/confettiParade>
- `party` - <https://www.npmjs.com/package/@tsparticles/preset-party> - <https://particles.js.org/samples/presets/party>
- `fire` - <https://www.npmjs.com/package/@tsparticles/preset-fire> - <https://particles.js.org/samples/presets/fire>
- `firefly` - <https://www.npmjs.com/package/@tsparticles/preset-firefly> - <https://particles.js.org/samples/presets/firefly>
- `fireworks` - <https://www.npmjs.com/package/@tsparticles/preset-fireworks> - <https://particles.js.org/samples/presets/fireworks>
- `fountain` - <https://www.npmjs.com/package/@tsparticles/preset-fountain> - <https://particles.js.org/samples/presets/fountain>
- `hyperspace` - <https://www.npmjs.com/package/@tsparticles/preset-hyperspace> - <https://particles.js.org/samples/presets/hyperspace>
- `links` - <https://www.npmjs.com/package/@tsparticles/preset-links> - <https://particles.js.org/samples/presets/links>
- `matrix` - ricetta dimostrativa sul sito web locale disponibile in [`/demos/recipes/matrix`](/it/demos/recipes/matrix)
- `meteors` - <https://www.npmjs.com/package/@tsparticles/preset-meteors> - <https://particles.js.org/samples/presets/meteors>
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - <https://particles.js.org/samples/presets/seaAnemone>
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - <https://particles.js.org/samples/presets/snow>
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - <https://particles.js.org/samples/presets/squares>
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - <https://particles.js.org/samples/presets/stars>
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - <https://particles.js.org/samples/presets/triangles>

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
