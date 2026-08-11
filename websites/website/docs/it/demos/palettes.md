# Catalogo tavolozze

Le tavolozze provengono dall'area di lavoro `palettes` e sono precaricate nel parco giochi.

L'ordinamento segue la struttura della fonte:

- primo livello: ordine delle categorie (basato sulle cartelle di origine delle tavolozze)
- secondo livello: ordine degli slug della palette all'interno di ogni categoria (alfabetico)

Cartella di origine: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Gruppi di tavolozze disponibili

## Atmosfera (12 tavolozze)

- `colored-smoke-amber`
- `colored-smoke-blue`
- `colored-smoke-green`
- `colored-smoke-magenta`
- `colored-smoke-orange`
- `colored-smoke-purple`
- `colored-smoke-rainbow`
- `colored-smoke-red`
- `colored-smoke-teal`
- `dust-haze`
- `fog-morning`
- `volcanic-ash`

## Atmosferico (10 tavolozze)

- `heat-duality`
- `heat-haze`
- `lightning`
- `shockwave`
- `smoke-cold`
- `smoke-warm`
- `sunrise-gold`
- `sunset-binary`
- `thermal-map`
- `thunderstorm`

## Coriandoli (12 palette)

- `confetti`
- `confetti-gold`
- `confetti-monochrome-blue`
- `confetti-monochrome-green`
- `confetti-monochrome-pink`
- `confetti-monochrome-purple`
- `confetti-monochrome-red`
- `confetti-neon`
- `confetti-pastel`
- `confetti-patriotic`
- `confetti-rainbow`
- `confetti-winter`

## Terra (7 tavolozze)

- `caustics`
- `desert-sand`
- `mud-and-dirt`
- `oil-slick`
- `rock-and-gravel`
- `rust-and-corrosion`
- `skin-and-organic`

## Fantasia (8 tavolozze)

- `bioluminescence`
- `blood-and-gore`
- `fairy-dust`
- `holy-light`
- `ice-magic`
- `ice-triad`
- `jellyfish-glow`
- `poison-and-venom`

## Fuoco (8 tavolozze)

- `candlelight`
- `embers-and-ash`
- `fire`
- `fire-seed`
- `full-fire-gradient`
- `lava-lamp`
- `metal-sparks`
- `molten-metal`

## Fuochi d'artificio (24 tavolozze)

- `fireworks-blue`
- `fireworks-blue-stroke`
- `fireworks-copper`
- `fireworks-copper-stroke`
- `fireworks-gold`
- `fireworks-gold-stroke`
- `fireworks-green`
- `fireworks-green-stroke`
- `fireworks-ice`
- `fireworks-ice-stroke`
- `fireworks-multicolor`
- `fireworks-multicolor-stroke`
- `fireworks-neon`
- `fireworks-neon-stroke`
- `fireworks-pastel`
- `fireworks-pastel-stroke`
- `fireworks-purple`
- `fireworks-purple-stroke`
- `fireworks-rainbow`
- `fireworks-rainbow-stroke`
- `fireworks-red`
- `fireworks-red-stroke`
- `fireworks-silver`
- `fireworks-silver-stroke`

## Impatto (7 tavolozze)

- `bullet-hit`
- `explosion-debris`
- `glass-burst`
- `meteor-impact`
- `nuclear-glow`
- `shockwave-blast`
- `splatter-dark`

## Monocromatico (14 tavolozze)

- `monochrome-blues`

- `monochrome-brown`
- `monochrome-cyan`
- `monochrome-gold`
- `monochrome-greens`
- `monochrome-noir`
- `monochrome-oranges`
- `monochrome-pinks`
- `monochrome-purples`
- `monochrome-reds`
- `monochrome-silver`
- `monochrome-teal`
- `monochrome-white`
- `monochrome-yellows`

## Natura (9 tavolozze)

- `autumn-leaves`
- `cherry-blossom`
- `dandelion-seeds`
- `earthy-nature`
- `fireflies`
- `forest-canopy`
- `pollen-and-spores`
- `snowfall`
- `spring-bloom`

## Ottica (7 tavolozze)

- `bokeh-cold`
- `bokeh-gold`
- `bokeh-pastel`
- `holographic-shimmer`
- `laser-scatter`
- `lens-flare-dust`
- `prism-spectrum`

## Pastello (5 tavolozze)

- `pastel-cool`
- `pastel-dream`
- `pastel-mint`
- `pastel-sunset`
- `pastel-warm`

## Spazio (10 tavolozze)

- `aurora-borealis`
- `cosmic-radiation`
- `dark-matter`
- `galaxy-dust`
- `lagoon`
- `nebula`
- `portal`
- `pulsar`
- `solar-wind`
- `supernova`

## Spettro (10 tavolozze)

- `acid-pair`
- `cmy-secondaries`
- `duality-blue-yellow`
- `duality-green-magenta`
- `duality-red-cyan`
- `full-spectrum`
- `okabe-ito-accessible`
- `prism-scatter`
- `rainbow`
- `rgb-primaries`

## Tecnologia (9 tavolozze)

- `crt-phosphor`
- `glitch`
- `hologram`
- `lofi-warm`
- `matrix-rain`
- `neon-city`
- `network-nodes`
- `plasma-arc`
- `vaporwave`

## Vibrante (5 tavolozze)

- `vibrant`
- `vibrant-electric`
- `vibrant-neon`
- `vibrant-retro`
- `vibrant-tropical`

## Acqua (8 tavolozze)

- `deep-ocean`
- `foam-and-bubbles`
- `fog-coastal`
- `ink-in-water`
- `rain`
- `rising-bubbles`
- `water`
- `water-splash`

Tutte le tavolozze attualmente pubblicate su npm sono incluse nel precaricamento del sito Web Playground.

Alcune tavolozze possono apparire nel monorepo prima della pubblicazione; quelli verranno aggiunti qui non appena i loro pacchetti saranno disponibili.

## Utilizzo rapido

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    preset: "links",
    palette: "rock-and-gravel",
    fullScreen: {
      enable: false,
    },
  },
});
```

Puoi combinare lo stesso `palette` con diverse preimpostazioni per ottenere varianti visive senza riscrivere il resto delle opzioni.

Utilizza [`/playground/palettes`](/it/playground/palettes) per testarli con controlli Avvio/Pausa espliciti.
