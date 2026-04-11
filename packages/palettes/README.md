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
- Total packages: `157` palettes across `17` categories

### Palette index by category

- [atmosphere (10)](#atmosphere-10)
- [atmospheric (10)](#atmospheric-10)
- [confetti (10)](#confetti-10)
- [earth (7)](#earth-7)
- [fantasy (8)](#fantasy-8)
- [fire (8)](#fire-8)
- [fireworks (23)](#fireworks-23)
- [impact (7)](#impact-7)
- [monochromatic (13)](#monochromatic-13)
- [nature (9)](#nature-9)
- [optics (7)](#optics-7)
- [pastel (5)](#pastel-5)
- [space (8)](#space-8)
- [spectrum (10)](#spectrum-10)
- [tech (9)](#tech-9)
- [vibrant (5)](#vibrant-5)
- [water (8)](#water-8)

#### atmosphere (10)

- [`@tsparticles/palette-colored-smoke-blue`](./palettes/atmosphere/coloredSmokeBlue)
- [`@tsparticles/palette-colored-smoke-green`](./palettes/atmosphere/coloredSmokeGreen)
- [`@tsparticles/palette-colored-smoke-magenta`](./palettes/atmosphere/coloredSmokeMagenta)
- [`@tsparticles/palette-colored-smoke-orange`](./palettes/atmosphere/coloredSmokeOrange)
- [`@tsparticles/palette-colored-smoke-purple`](./palettes/atmosphere/coloredSmokePurple)
- [`@tsparticles/palette-colored-smoke-rainbow`](./palettes/atmosphere/coloredSmokeRainbow)
- [`@tsparticles/palette-colored-smoke-teal`](./palettes/atmosphere/coloredSmokeTeal)
- [`@tsparticles/palette-dust-haze`](./palettes/atmosphere/dustHaze)
- [`@tsparticles/palette-fog-morning`](./palettes/atmosphere/fogMorning)
- [`@tsparticles/palette-volcanic-ash`](./palettes/atmosphere/volcanicAsh)

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

#### confetti (10)

- [`@tsparticles/palette-confetti`](./palettes/confetti/confetti)
- [`@tsparticles/palette-confetti-gold`](./palettes/confetti/confettiGold)
- [`@tsparticles/palette-confetti-monochrome-blue`](./palettes/confetti/confettiMonochromeBlue)
- [`@tsparticles/palette-confetti-monochrome-green`](./palettes/confetti/confettiMonochromeGreen)
- [`@tsparticles/palette-confetti-monochrome-pink`](./palettes/confetti/confettiMonochromePink)
- [`@tsparticles/palette-confetti-neon`](./palettes/confetti/confettiNeon)
- [`@tsparticles/palette-confetti-pastel`](./palettes/confetti/confettiPastel)
- [`@tsparticles/palette-confetti-patriotic`](./palettes/confetti/confettiPatriotic)
- [`@tsparticles/palette-confetti-rainbow`](./palettes/confetti/confettiRainbow)
- [`@tsparticles/palette-confetti-winter`](./palettes/confetti/confettiWinter)

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

#### fireworks (23)

- [`@tsparticles/palette-fireworks-blue`](./palettes/fireworks/fireworksBlue)
- [`@tsparticles/palette-fireworks-blue-stroke`](./palettes/fireworks/fireworksBlueStroke)
- [`@tsparticles/palette-fireworks-copper`](./palettes/fireworks/fireworksCopper)
- [`@tsparticles/palette-fireworks-copper-stroke`](./palettes/fireworks/fireworksCopperStroke)
- [`@tsparticles/palette-fireworks-gold`](./palettes/fireworks/fireworksGold)
- [`@tsparticles/palette-fireworks-gold-stroke`](./palettes/fireworks/fireworksGoldStroke)
- [`@tsparticles/palette-fireworks-green`](./palettes/fireworks/fireworksGreen)
- [`@tsparticles/palette-fireworks-green-stroke`](./palettes/fireworks/fireworksGreenStroke)
- [`@tsparticles/palette-fireworks-ice`](./palettes/fireworks/fireworksIce)
- [`@tsparticles/palette-fireworks-ice-stroke`](./palettes/fireworks/fireworksIceStroke)
- [`@tsparticles/palette-fireworks-multicolor`](./palettes/fireworks/fireworksMulticolor)
- [`@tsparticles/palette-fireworks-multicolor-stroke`](./palettes/fireworks/fireworksMulticolorStroke)
- [`@tsparticles/palette-fireworks-neon`](./palettes/fireworks/fireworksNeon)
- [`@tsparticles/palette-fireworks-neon-stroke`](./palettes/fireworks/fireworksNeonStroke)
- [`@tsparticles/palette-fireworks-pastel`](./palettes/fireworks/fireworksPastel)
- [`@tsparticles/palette-fireworks-pastel-stroke`](./palettes/fireworks/fireworksPastelStroke)
- [`@tsparticles/palette-fireworks-purple`](./palettes/fireworks/fireworksPurple)
- [`@tsparticles/palette-fireworks-purple-stroke`](./palettes/fireworks/fireworksPurpleStroke)
- [`@tsparticles/palette-fireworks-rainbow-stroke`](./palettes/fireworks/fireworksRainbowStroke)
- [`@tsparticles/palette-fireworks-red`](./palettes/fireworks/fireworksRed)
- [`@tsparticles/palette-fireworks-red-stroke`](./palettes/fireworks/fireworksRedStroke)
- [`@tsparticles/palette-fireworks-silver`](./palettes/fireworks/fireworksSilver)
- [`@tsparticles/palette-fireworks-silver-stroke`](./palettes/fireworks/fireworksSilverStroke)

#### impact (7)

- [`@tsparticles/palette-bullet-hit`](./palettes/impact/bulletHit)
- [`@tsparticles/palette-explosion-debris`](./palettes/impact/explosionDebris)
- [`@tsparticles/palette-glass-burst`](./palettes/impact/glassBurst)
- [`@tsparticles/palette-meteor-impact`](./palettes/impact/meteorImpact)
- [`@tsparticles/palette-nuclear-glow`](./palettes/impact/nuclearGlow)
- [`@tsparticles/palette-shockwave-blast`](./palettes/impact/shockwaveBlast)
- [`@tsparticles/palette-splatter-dark`](./palettes/impact/splatterDark)

#### monochromatic (13)

- [`@tsparticles/palette-monochrome-blues`](./palettes/monochromatic/monochromeBlues)
- [`@tsparticles/palette-monochrome-brown`](./palettes/monochromatic/monochromeBrown)
- [`@tsparticles/palette-monochrome-cyan`](./palettes/monochromatic/monochromeCyan)
- [`@tsparticles/palette-monochrome-gold`](./palettes/monochromatic/monochromeGold)
- [`@tsparticles/palette-monochrome-greens`](./palettes/monochromatic/monochromeGreens)
- [`@tsparticles/palette-monochrome-noir`](./palettes/monochromatic/monochromeNoir)
- [`@tsparticles/palette-monochrome-oranges`](./palettes/monochromatic/monochromeOranges)
- [`@tsparticles/palette-monochrome-pinks`](./palettes/monochromatic/monochromePinks)
- [`@tsparticles/palette-monochrome-purples`](./palettes/monochromatic/monochromePurples)
- [`@tsparticles/palette-monochrome-reds`](./palettes/monochromatic/monochromeReds)
- [`@tsparticles/palette-monochrome-teal`](./palettes/monochromatic/monochromeTeal)
- [`@tsparticles/palette-monochrome-white`](./palettes/monochromatic/monochromeWhite)
- [`@tsparticles/palette-monochrome-yellows`](./palettes/monochromatic/monochromeYellows)

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

#### optics (7)

- [`@tsparticles/palette-bokeh-cold`](./palettes/optics/bokehCold)
- [`@tsparticles/palette-bokeh-gold`](./palettes/optics/bokehGold)
- [`@tsparticles/palette-bokeh-pastel`](./palettes/optics/bokehPastel)
- [`@tsparticles/palette-holographic-shimmer`](./palettes/optics/holographicShimmer)
- [`@tsparticles/palette-laser-scatter`](./palettes/optics/laserScatter)
- [`@tsparticles/palette-lens-flare-dust`](./palettes/optics/lensFlareDust)
- [`@tsparticles/palette-prism-spectrum`](./palettes/optics/prismSpectrum)

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
