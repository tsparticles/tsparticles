# Palettenkatalog

Paletten stammen aus dem Arbeitsbereich `palettes` und sind im Playground vorinstalliert.

Die Reihenfolge folgt der Quellstruktur:

- erste Ebene: Kategoriereihenfolge (basierend auf den Quellordnern der Paletten)
- Zweite Ebene: Reihenfolge der Paletten-Slugs innerhalb jeder Kategorie (alphabetisch)

Quellordner: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Verfügbare Palettengruppen

## Atmosphäre (12 Paletten)

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

## Atmosphärisch (10 Paletten)

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

## Konfetti (12 Paletten)

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

## Erde (7 Paletten)

- `caustics`
- `desert-sand`
- `mud-and-dirt`
- `oil-slick`
- `rock-and-gravel`
- `rust-and-corrosion`
- `skin-and-organic`

## Fantasie (8 Paletten)

- `bioluminescence`
- `blood-and-gore`
- `fairy-dust`
- `holy-light`
- `ice-magic`
- `ice-triad`
- `jellyfish-glow`
- `poison-and-venom`

## Feuer (8 Paletten)

- `candlelight`
- `embers-and-ash`
- `fire`
- `fire-seed`
- `full-fire-gradient`
- `lava-lamp`
- `metal-sparks`
- `molten-metal`

## Feuerwerk (24 Paletten)

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

## Impact (7 Paletten)

- `bullet-hit`
- `explosion-debris`
- `glass-burst`
- `meteor-impact`
- `nuclear-glow`
- `shockwave-blast`
- `splatter-dark`

## Monochromatisch (14 Paletten)

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

## Natur (9 Paletten)

- `autumn-leaves`
- `cherry-blossom`
- `dandelion-seeds`
- `earthy-nature`
- `fireflies`
- `forest-canopy`
- `pollen-and-spores`
- `snowfall`
- `spring-bloom`

## Optik (7 Paletten)

- `bokeh-cold`
- `bokeh-gold`
- `bokeh-pastel`
- `holographic-shimmer`
- `laser-scatter`
- `lens-flare-dust`
- `prism-spectrum`

## Pastell (5 Paletten)

- `pastel-cool`
- `pastel-dream`
- `pastel-mint`
- `pastel-sunset`
- `pastel-warm`

## Space (10 Paletten)

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

## Spektrum (10 Paletten)

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

## Tech (9 Paletten)

- `crt-phosphor`
- `glitch`
- `hologram`
- `lofi-warm`
- `matrix-rain`
- `neon-city`
- `network-nodes`
- `plasma-arc`
- `vaporwave`

## Lebendig (5 Paletten)

- `vibrant`
- `vibrant-electric`
- `vibrant-neon`
- `vibrant-retro`
- `vibrant-tropical`

## Wasser (8 Paletten)

- `deep-ocean`
- `foam-and-bubbles`
- `fog-coastal`
- `ink-in-water`
- `rain`
- `rising-bubbles`
- `water`
- `water-splash`

Alle derzeit auf npm veröffentlichten Paletten sind im Preload des Website-Playgrounds enthalten.

Einige Paletten können vor der Veröffentlichung im Monorepo erscheinen; Diese werden hier hinzugefügt, sobald ihre Pakete verfügbar sind.

## Schnelle Nutzung

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

Sie können dasselbe `palette` mit verschiedenen Voreinstellungen kombinieren, um visuelle Varianten zu erhalten, ohne die restlichen Optionen neu schreiben zu müssen.

Verwenden Sie [`/playground/palettes`](/de/playground/palettes), um sie mit expliziten Start/Pause-Steuerelementen zu testen.
