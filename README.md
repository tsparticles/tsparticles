[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Presets

Official presets and palettes to use tsParticles in minutes without starting from an empty configuration.

[![Discord](https://img.shields.io/discord/872061157379301416?label=discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/hACwv45Hme)
[![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)
[![Reddit](https://img.shields.io/reddit/subreddit-subscribers/tsParticles?style=for-the-badge)](https://www.reddit.com/r/tsParticles/)

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00")](https://www.buymeacoffee.com/matteobruni) <a href="https://linktr.ee/tsparticles"><img alt="Linktree" height="30" src="https://particles.js.org/images/linktree.svg" /></a>

## Why presets

- Reduce setup time: install and load a ready-to-use effect
- Start from a concrete visual baseline and customize only what you need
- Keep a standard, tested base for websites, landing pages, and apps

## Quick Start

### Installation

```shell
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/preset-stars
```

### Register and use

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadStarsPreset } from "@tsparticles/preset-stars";

await loadSlim(tsParticles);
await loadStarsPreset(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    preset: "stars",
  },
});
```

## Quick checklist

1. Install `@tsparticles/engine` plus one bundle (`@tsparticles/slim` recommended)
2. Register the preset loader before `tsParticles.load(...)`
3. Start from one preset and then merge your custom options

## Choose your quick-start path

- **I want the smallest setup first**: use `@tsparticles/slim` + one preset package
- **I want to test many presets quickly**: use `tsparticles` and register only the presets you need
- **I already have options and need only colors**: use a palette package and keep your current behavior settings

## Preset or Palette?

- **Preset**: defines complete behavior (movement, interactions, style)
- **Palette**: mainly defines reusable color combinations

If you need a complete effect quickly, use a preset.
If you already have a config and only want a color direction, use a palette.

## Main preset catalog

| Preset              | Package                                   | Demo                                                          | README                                                                                  |
|---------------------|-------------------------------------------|---------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Ambient             | `@tsparticles/preset-ambient`             | <https://particles.js.org/samples/presets/ambient>            | <https://github.com/tsparticles/presets/blob/main/presets/ambient/README.md>            |
| Big Circles         | `@tsparticles/preset-big-circles`         | <https://particles.js.org/samples/presets/bigCircles>         | <https://github.com/tsparticles/presets/blob/main/presets/bigCircles/README.md>         |
| Bubbles             | `@tsparticles/preset-bubbles`             | <https://particles.js.org/samples/presets/bubbles>            | <https://github.com/tsparticles/presets/blob/main/presets/bubbles/README.md>            |
| Confetti            | `@tsparticles/preset-confetti`            | <https://particles.js.org/samples/presets/confetti>           | <https://github.com/tsparticles/presets/blob/main/presets/confetti/README.md>           |
| Confetti Cannon     | `@tsparticles/preset-confetti-cannon`     | <https://particles.js.org/samples/presets/confettiCannon>     | <https://github.com/tsparticles/presets/blob/main/presets/confettiCannon/README.md>     |
| Confetti Explosions | `@tsparticles/preset-confetti-explosions` | <https://particles.js.org/samples/presets/confettiExplosions> | <https://github.com/tsparticles/presets/blob/main/presets/confettiExplosions/README.md> |
| Confetti Falling    | `@tsparticles/preset-confetti-falling`    | <https://particles.js.org/samples/presets/confettiFalling>    | <https://github.com/tsparticles/presets/blob/main/presets/confettiFalling/README.md>    |
| Confetti Parade     | `@tsparticles/preset-confetti-parade`     | <https://particles.js.org/samples/presets/confettiParade>     | <https://github.com/tsparticles/presets/blob/main/presets/confettiParade/README.md>     |
| Fire                | `@tsparticles/preset-fire`                | <https://particles.js.org/samples/presets/fire>               | <https://github.com/tsparticles/presets/blob/main/presets/fire/README.md>               |
| Firefly             | `@tsparticles/preset-firefly`             | <https://particles.js.org/samples/presets/firefly>            | <https://github.com/tsparticles/presets/blob/main/presets/firefly/README.md>            |
| Fireworks           | `@tsparticles/preset-fireworks`           | <https://particles.js.org/samples/presets/fireworks>          | <https://github.com/tsparticles/presets/blob/main/presets/fireworks/README.md>          |
| Fountain            | `@tsparticles/preset-fountain`            | <https://particles.js.org/samples/presets/fountain>           | <https://github.com/tsparticles/presets/blob/main/presets/fountain/README.md>           |
| Hyperspace          | `@tsparticles/preset-hyperspace`          | <https://particles.js.org/samples/presets/hyperspace>         | <https://github.com/tsparticles/presets/blob/main/presets/hyperspace/README.md>         |
| Links               | `@tsparticles/preset-links`               | <https://particles.js.org/samples/presets/links>              | <https://github.com/tsparticles/presets/blob/main/presets/links/README.md>              |
| Sea Anemone         | `@tsparticles/preset-sea-anemone`         | <https://particles.js.org/samples/presets/seaAnemone>         | <https://github.com/tsparticles/presets/blob/main/presets/seaAnemone/README.md>         |
| Snow                | `@tsparticles/preset-snow`                | <https://particles.js.org/samples/presets/snow>               | <https://github.com/tsparticles/presets/blob/main/presets/snow/README.md>               |
| Squares             | `@tsparticles/preset-squares`             | <https://particles.js.org/samples/presets/squares>            | <https://github.com/tsparticles/presets/blob/main/presets/squares/README.md>            |
| Stars               | `@tsparticles/preset-stars`               | <https://particles.js.org/samples/presets/stars>              | <https://github.com/tsparticles/presets/blob/main/presets/stars/README.md>              |
| Triangles           | `@tsparticles/preset-triangles`           | <https://particles.js.org/samples/presets/triangles>          | <https://github.com/tsparticles/presets/blob/main/presets/triangles/README.md>          |

## Available palettes

Palettes are available in `palettes/` and can be used to apply a visual color identity across configurations.

- Directory: <https://github.com/tsparticles/presets/tree/main/palettes>
- Global demos: <https://particles.js.org/samples/presets/>

### Accessible & High Contrast

- `@tsparticles/palette-okabe-ito-accessible`
- `@tsparticles/palette-monochrome-noir`
- `@tsparticles/palette-rgb-primaries`
- `@tsparticles/palette-cmy-secondaries`
- `@tsparticles/palette-duality-blue-yellow`
- `@tsparticles/palette-duality-green-magenta`
- `@tsparticles/palette-duality-red-cyan`
- `@tsparticles/palette-sunset-binary`
- `@tsparticles/palette-crt-phosphor`
- `@tsparticles/palette-network-nodes`

### Nature & Organic

- `@tsparticles/palette-autumn-leaves`
- `@tsparticles/palette-cherry-blossom`
- `@tsparticles/palette-forest-canopy`
- `@tsparticles/palette-spring-bloom`
- `@tsparticles/palette-dandelion-seeds`
- `@tsparticles/palette-pollen-and-spores`
- `@tsparticles/palette-fireflies`
- `@tsparticles/palette-skin-and-organic`
- `@tsparticles/palette-desert-sand`
- `@tsparticles/palette-mud-and-dirt`
- `@tsparticles/palette-rock-and-gravel`
- `@tsparticles/palette-rust-and-corrosion`
- `@tsparticles/palette-poison-and-venom`

### Water, Ice & Weather

- `@tsparticles/palette-water`
- `@tsparticles/palette-water-splash`
- `@tsparticles/palette-deep-ocean`
- `@tsparticles/palette-caustics`
- `@tsparticles/palette-foam-and-bubbles`
- `@tsparticles/palette-rising-bubbles`
- `@tsparticles/palette-rain`
- `@tsparticles/palette-snowfall`
- `@tsparticles/palette-thunderstorm`
- `@tsparticles/palette-fog-coastal`
- `@tsparticles/palette-ice-magic`
- `@tsparticles/palette-ice-triad`

### Fire, Heat & Energy

- `@tsparticles/palette-fire`
- `@tsparticles/palette-fire-seed`
- `@tsparticles/palette-full-fire-gradient`
- `@tsparticles/palette-heat-duality`
- `@tsparticles/palette-heat-haze`
- `@tsparticles/palette-lava-lamp`
- `@tsparticles/palette-molten-metal`
- `@tsparticles/palette-embers-and-ash`
- `@tsparticles/palette-explosion-debris`
- `@tsparticles/palette-metal-sparks`
- `@tsparticles/palette-shockwave`
- `@tsparticles/palette-solar-wind`
- `@tsparticles/palette-sunrise-gold`
- `@tsparticles/palette-candlelight`
- `@tsparticles/palette-holy-light`
- `@tsparticles/palette-lightning`
- `@tsparticles/palette-plasma-arc`
- `@tsparticles/palette-thermal-map`

### Cosmic, Neon & Digital

- `@tsparticles/palette-aurora-borealis`
- `@tsparticles/palette-bioluminescence`
- `@tsparticles/palette-cosmic-radiation`
- `@tsparticles/palette-dark-matter`
- `@tsparticles/palette-galaxy-dust`
- `@tsparticles/palette-hologram`
- `@tsparticles/palette-jellyfish-glow`
- `@tsparticles/palette-lens-flare-dust`
- `@tsparticles/palette-portal`
- `@tsparticles/palette-prism-scatter`
- `@tsparticles/palette-pulsar`
- `@tsparticles/palette-supernova`
- `@tsparticles/palette-vaporwave`
- `@tsparticles/palette-neon-city`
- `@tsparticles/palette-matrix-rain`
- `@tsparticles/palette-glitch`

### Smoke & Atmosphere

- `@tsparticles/palette-colored-smoke-magenta`
- `@tsparticles/palette-colored-smoke-teal`
- `@tsparticles/palette-smoke-cold`
- `@tsparticles/palette-smoke-warm`
- `@tsparticles/palette-ink-in-water`
- `@tsparticles/palette-fairy-dust`
- `@tsparticles/palette-lofi-warm`

### Vivid & Celebration

- `@tsparticles/palette-confetti`
- `@tsparticles/palette-fireworks-gold`
- `@tsparticles/palette-fireworks-multicolor`
- `@tsparticles/palette-rainbow`
- `@tsparticles/palette-full-spectrum`
- `@tsparticles/palette-acid-pair`
- `@tsparticles/palette-oil-slick`
- `@tsparticles/palette-blood-and-gore`

## Framework integration

Presets work with the core library and official wrappers (React, Vue, Angular, Svelte, etc.).

General guides:

- Main tsParticles repository: <https://github.com/tsparticles/tsparticles>
- Official documentation: <https://particles.js.org/docs/>

## Common pitfalls

- Register the preset loader before calling `tsParticles.load(...)`
- Use the same `id` value in your HTML container and load call
- Do not assume every preset is included in every bundle; import the specific preset package
- Start from a single preset, then merge custom options incrementally

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Main tsParticles repository: <https://github.com/tsparticles/tsparticles>
- Presets samples: <https://particles.js.org/samples/presets/>

## Support

If you need a new preset or want to contribute:

- open an issue or pull request in this repository
- include screenshots/GIFs and a config snippet to speed up review
