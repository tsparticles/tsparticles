# Catálogo de predefinições

Estas são as predefinições oficiais listadas no README principal do `tsParticles` e disponíveis na área de trabalho de predefinições.

Pasta de origem: <https://github.com/tsparticles/tsparticles/tree/main/presets>

## Predefinições

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
- `matrix` - receita de demonstração do site local disponível em [`/demos/recipes/matrix`](/pt/demos/recipes/matrix)
- `meteors` - <https://www.npmjs.com/package/@tsparticles/preset-meteors> - <https://particles.js.org/samples/presets/meteors>
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - <https://particles.js.org/samples/presets/seaAnemone>
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - <https://particles.js.org/samples/presets/snow>
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - <https://particles.js.org/samples/presets/squares>
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - <https://particles.js.org/samples/presets/stars>
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - <https://particles.js.org/samples/presets/triangles>

Cada pasta predefinida também contém documentos no monorepo, por exemplo:

- <https://github.com/tsparticles/tsparticles/tree/main/presets/confetti#readme>

## Uso rápido

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

Para configurações de produção, use início/parada/retomada/destruição manual, conforme mostrado nas receitas em [`/demos/`](/pt/demos/).

Use [`/playground/presets`](/pt/playground/presets) para testar cada predefinição com controles explícitos de início/pausa.
