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

## Palettes repository

Palettes are now maintained in a dedicated repository:

- Repository: <https://github.com/tsparticles/palettes>
- Samples: <https://particles.js.org/samples/palettes/>

Use this repository for preset packages only.

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
