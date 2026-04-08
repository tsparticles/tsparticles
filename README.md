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
pnpm add @tsparticles/engine @tsparticles/basic @tsparticles/palette-<palette-name>
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

### Palette index by category

- [atmosphere (2)](#atmosphere-2)
- [atmospheric (10)](#atmospheric-10)
- [celebration (3)](#celebration-3)
- [earth (7)](#earth-7)
- [fantasy (8)](#fantasy-8)
- [fire (8)](#fire-8)
- [impact (1)](#impact-1)
- [monochromatic (5)](#monochromatic-5)
- [nature (9)](#nature-9)
- [optics (1)](#optics-1)
- [pastel (5)](#pastel-5)
- [space (8)](#space-8)
- [spectrum (10)](#spectrum-10)
- [tech (9)](#tech-9)
- [vibrant (5)](#vibrant-5)
- [water (8)](#water-8)

#### atmosphere (2)

- [`@tsparticles/palette-colored-smoke-magenta`](./palettes/atmosphere/coloredSmokeMagenta)
- [`@tsparticles/palette-colored-smoke-teal`](./palettes/atmosphere/coloredSmokeTeal)

#### atmospheric (10)

- [`@tsparticles/palette-heat-duality`](./palettes/atmospheric/heatDuality)
- [`@tsparticles/palette-heat-haze`](./palettes/atmospheric/heatHaze)
- [`@tsparticles/palette-lightning`](./palettes/atmospheric/lightning)
- [`@tsparticles/palette-shockwave`](./palettes/atmospheric/shockwave)
- [`@tsparticles/palette-smoke-cold`](./palettes/atmospheric/smokeCold)
- [`@tsparticles/palette-smoke-warm`](./palettes/atmospheric/smokeWarm)
- [`@tsparticles/palette-sunrise-gold`](./palettes/atmospheric/sunriseGold)
- [`@tsparticles/palette-sunset-binary`](./palettes/atmospheric/sunsetBinary)
- [`@tsparticles/palette-thermal-map`](./palettes/atmospheric/thermalMap)
- [`@tsparticles/palette-thunderstorm`](./palettes/atmospheric/thunderstorm)

#### celebration (3)

- [`@tsparticles/palette-confetti`](./palettes/celebration/confetti)
- [`@tsparticles/palette-fireworks-gold`](./palettes/celebration/fireworksGold)
- [`@tsparticles/palette-fireworks-multicolor`](./palettes/celebration/fireworksMulticolor)

#### earth (7)

- [`@tsparticles/palette-caustics`](./palettes/earth/caustics)
- [`@tsparticles/palette-desert-sand`](./palettes/earth/desertSand)
- [`@tsparticles/palette-mud-and-dirt`](./palettes/earth/mudAndDirt)
- [`@tsparticles/palette-oil-slick`](./palettes/earth/oilSlick)
- [`@tsparticles/palette-rock-and-gravel`](./palettes/earth/rockAndGravel)
- [`@tsparticles/palette-rust-and-corrosion`](./palettes/earth/rustAndCorrosion)
- [`@tsparticles/palette-skin-and-organic`](./palettes/earth/skinAndOrganic)

#### fantasy (8)

- [`@tsparticles/palette-bioluminescence`](./palettes/fantasy/bioluminescence)
- [`@tsparticles/palette-blood-and-gore`](./palettes/fantasy/bloodAndGore)
- [`@tsparticles/palette-fairy-dust`](./palettes/fantasy/fairyDust)
- [`@tsparticles/palette-holy-light`](./palettes/fantasy/holyLight)
- [`@tsparticles/palette-ice-magic`](./palettes/fantasy/iceMagic)
- [`@tsparticles/palette-ice-triad`](./palettes/fantasy/iceTriad)
- [`@tsparticles/palette-jellyfish-glow`](./palettes/fantasy/jellyfishGlow)
- [`@tsparticles/palette-poison-and-venom`](./palettes/fantasy/poisonAndVenom)

#### fire (8)

- [`@tsparticles/palette-candlelight`](./palettes/fire/candlelight)
- [`@tsparticles/palette-embers-and-ash`](./palettes/fire/embersAndAsh)
- [`@tsparticles/palette-fire`](./palettes/fire/fire)
- [`@tsparticles/palette-fire-seed`](./palettes/fire/fireSeed)
- [`@tsparticles/palette-full-fire-gradient`](./palettes/fire/fullFireGradient)
- [`@tsparticles/palette-lava-lamp`](./palettes/fire/lavaLamp)
- [`@tsparticles/palette-metal-sparks`](./palettes/fire/metalSparks)
- [`@tsparticles/palette-molten-metal`](./palettes/fire/moltenMetal)

#### impact (1)

- [`@tsparticles/palette-explosion-debris`](./palettes/impact/explosionDebris)

#### monochromatic (5)

- [`@tsparticles/palette-monochrome-blues`](./palettes/monochromatic/monochromeBlues)
- [`@tsparticles/palette-monochrome-greens`](./palettes/monochromatic/monochromeGreens)
- [`@tsparticles/palette-monochrome-noir`](./palettes/monochromatic/monochromeNoir)
- [`@tsparticles/palette-monochrome-pinks`](./palettes/monochromatic/monochromePinks)
- [`@tsparticles/palette-monochrome-purples`](./palettes/monochromatic/monochromePurples)

#### nature (9)

- [`@tsparticles/palette-autumn-leaves`](./palettes/nature/autumnLeaves)
- [`@tsparticles/palette-cherry-blossom`](./palettes/nature/cherryBlossom)
- [`@tsparticles/palette-dandelion-seeds`](./palettes/nature/dandelionSeeds)
- [`@tsparticles/palette-earthy-nature`](./palettes/nature/earthyNature)
- [`@tsparticles/palette-fireflies`](./palettes/nature/fireflies)
- [`@tsparticles/palette-forest-canopy`](./palettes/nature/forestCanopy)
- [`@tsparticles/palette-pollen-and-spores`](./palettes/nature/pollenAndSpores)
- [`@tsparticles/palette-snowfall`](./palettes/nature/snowfall)
- [`@tsparticles/palette-spring-bloom`](./palettes/nature/springBloom)

#### optics (1)

- [`@tsparticles/palette-lens-flare-dust`](./palettes/optics/lensFlareDust)

#### pastel (5)

- [`@tsparticles/palette-pastel-cool`](./palettes/pastel/pastelCool)
- [`@tsparticles/palette-pastel-dream`](./palettes/pastel/pastelDream)
- [`@tsparticles/palette-pastel-mint`](./palettes/pastel/pastelMint)
- [`@tsparticles/palette-pastel-sunset`](./palettes/pastel/pastelSunset)
- [`@tsparticles/palette-pastel-warm`](./palettes/pastel/pastelWarm)

#### space (8)

- [`@tsparticles/palette-aurora-borealis`](./palettes/space/auroraBorealis)
- [`@tsparticles/palette-cosmic-radiation`](./palettes/space/cosmicRadiation)
- [`@tsparticles/palette-dark-matter`](./palettes/space/darkMatter)
- [`@tsparticles/palette-galaxy-dust`](./palettes/space/galaxyDust)
- [`@tsparticles/palette-portal`](./palettes/space/portal)
- [`@tsparticles/palette-pulsar`](./palettes/space/pulsar)
- [`@tsparticles/palette-solar-wind`](./palettes/space/solarWind)
- [`@tsparticles/palette-supernova`](./palettes/space/supernova)

#### spectrum (10)

- [`@tsparticles/palette-acid-pair`](./palettes/spectrum/acidPair)
- [`@tsparticles/palette-cmy-secondaries`](./palettes/spectrum/cmySecondaries)
- [`@tsparticles/palette-duality-blue-yellow`](./palettes/spectrum/dualityBlueYellow)
- [`@tsparticles/palette-duality-green-magenta`](./palettes/spectrum/dualityGreenMagenta)
- [`@tsparticles/palette-duality-red-cyan`](./palettes/spectrum/dualityRedCyan)
- [`@tsparticles/palette-full-spectrum`](./palettes/spectrum/fullSpectrum)
- [`@tsparticles/palette-okabe-ito-accessible`](./palettes/spectrum/okabeItoAccessible)
- [`@tsparticles/palette-prism-scatter`](./palettes/spectrum/prismScatter)
- [`@tsparticles/palette-rainbow`](./palettes/spectrum/rainbow)
- [`@tsparticles/palette-rgb-primaries`](./palettes/spectrum/rgbPrimaries)

#### tech (9)

- [`@tsparticles/palette-crt-phosphor`](./palettes/tech/crtPhosphor)
- [`@tsparticles/palette-glitch`](./palettes/tech/glitch)
- [`@tsparticles/palette-hologram`](./palettes/tech/hologram)
- [`@tsparticles/palette-lofi-warm`](./palettes/tech/lofiWarm)
- [`@tsparticles/palette-matrix-rain`](./palettes/tech/matrixRain)
- [`@tsparticles/palette-neon-city`](./palettes/tech/neonCity)
- [`@tsparticles/palette-network-nodes`](./palettes/tech/networkNodes)
- [`@tsparticles/palette-plasma-arc`](./palettes/tech/plasmaArc)
- [`@tsparticles/palette-vaporwave`](./palettes/tech/vaporwave)

#### vibrant (5)

- [`@tsparticles/palette-vibrant`](./palettes/vibrant/vibrant)
- [`@tsparticles/palette-vibrant-electric`](./palettes/vibrant/vibrantElectric)
- [`@tsparticles/palette-vibrant-neon`](./palettes/vibrant/vibrantNeon)
- [`@tsparticles/palette-vibrant-retro`](./palettes/vibrant/vibrantRetro)
- [`@tsparticles/palette-vibrant-tropical`](./palettes/vibrant/vibrantTropical)

#### water (8)

- [`@tsparticles/palette-deep-ocean`](./palettes/water/deepOcean)
- [`@tsparticles/palette-foam-and-bubbles`](./palettes/water/foamAndBubbles)
- [`@tsparticles/palette-fog-coastal`](./palettes/water/fogCoastal)
- [`@tsparticles/palette-ink-in-water`](./palettes/water/inkInWater)
- [`@tsparticles/palette-rain`](./palettes/water/rain)
- [`@tsparticles/palette-rising-bubbles`](./palettes/water/risingBubbles)
- [`@tsparticles/palette-water`](./palettes/water/water)
- [`@tsparticles/palette-water-splash`](./palettes/water/waterSplash)

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
