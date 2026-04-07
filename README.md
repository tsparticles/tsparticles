[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Palettes

Official color palettes for tsParticles, reusable across custom particle configurations.

[![Discord](https://img.shields.io/discord/872061157379301416?label=discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/hACwv45Hme)
[![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)
[![Reddit](https://img.shields.io/reddit/subreddit-subscribers/tsParticles?style=for-the-badge)](https://www.reddit.com/r/tsParticles/)

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00")](https://www.buymeacoffee.com/matteobruni) <a href="https://linktr.ee/tsparticles"><img alt="Linktree" height="30" src="https://particles.js.org/images/linktree.svg" /></a>

## Why palettes

- Apply a consistent visual identity without changing your existing behavior settings
- Reuse curated color sets across projects
- Start quickly from accessible, thematic, or high-contrast combinations

## Quick Start

### Installation

```shell
pnpm add @tsparticles/engine @tsparticles/basic @tsparticles/palette-confetti
```

### Register and use

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";

await loadBasic(tsParticles);
await loadConfettiPalette(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 100 },
      move: { enable: true, speed: 2 },
    },
    palette: "confetti",
  },
});
```

## Quick checklist

1. Install `@tsparticles/engine` plus one base bundle (`@tsparticles/basic` recommended)
2. Register the palette loader before `tsParticles.load(...)`
3. Keep your current behavior settings and set only `palette: "..."`

## Choose your quick-start path

- **I already have particle behavior configured**: add one palette package and set `palette: "..."`
- **I need consistent branding colors**: reuse the same palette across multiple effects
- **I want to experiment quickly**: try the demo app and switch palettes by route

## Preset or Palette?

- **Preset**: defines complete behavior (movement, interactions, style)
- **Palette**: mainly defines reusable color combinations

If you need a complete effect quickly, use a preset.
If you already have a config and only want a color direction, use a palette.

## Available palettes

Palettes are available in `palettes/` and can be used to apply a visual color identity across configurations.

- Directory: <https://github.com/tsparticles/palettes/tree/main/palettes>
- Global demos: <https://particles.js.org/samples/palettes/>

## Related repositories

- Presets repository: <https://github.com/tsparticles/presets>

General guides:

- Main tsParticles repository: <https://github.com/tsparticles/tsparticles>
- Official documentation: <https://particles.js.org/docs/>

## Common pitfalls

- Register the palette loader before calling `tsParticles.load(...)`
- Use the same `id` value in your HTML container and load call
- Do not assume every palette is included in every bundle; import the specific palette package
- Keep behavior and interactions in your own config, then apply the palette

## Related docs

- Main docs: <https://particles.js.org/docs/>
- Main tsParticles repository: <https://github.com/tsparticles/tsparticles>
- Palettes samples: <https://particles.js.org/samples/palettes/>

## Support

If you need a new palette or want to contribute:

- open an issue or pull request in this repository
- include screenshots/GIFs and a config snippet to speed up review
