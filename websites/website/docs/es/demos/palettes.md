# Catálogo de Paletas

Las paletas provienen del espacio de trabajo `palettes` y están precargadas en el área de juegos.

El pedido sigue la estructura fuente:

- primer nivel: orden de categorías (basado en las carpetas de origen de las paletas)
- segundo nivel: orden de las barras de paleta dentro de cada categoría (alfabético)

Carpeta de origen: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Grupos de paletas disponibles

## Atmósfera (12 paletas)

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

## Atmosférico (10 paletas)

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

## Confeti (12 paletas)

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

## Tierra (7 paletas)

- `caustics`
- `desert-sand`
- `mud-and-dirt`
- `oil-slick`
- `rock-and-gravel`
- `rust-and-corrosion`
- `skin-and-organic`

## Fantasía (8 paletas)

- `bioluminescence`
- `blood-and-gore`
- `fairy-dust`
- `holy-light`
- `ice-magic`
- `ice-triad`
- `jellyfish-glow`
- `poison-and-venom`

## Fuego (8 paletas)

- `candlelight`
- `embers-and-ash`
- `fire`
- `fire-seed`
- `full-fire-gradient`
- `lava-lamp`
- `metal-sparks`
- `molten-metal`

## Fuegos artificiales (24 paletas)

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

## Impacto (7 paletas)

- `bullet-hit`
- `explosion-debris`
- `glass-burst`
- `meteor-impact`
- `nuclear-glow`
- `shockwave-blast`
- `splatter-dark`

## Monocromático (14 paletas)

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

## Naturaleza (9 paletas)

- `autumn-leaves`
- `cherry-blossom`
- `dandelion-seeds`
- `earthy-nature`
- `fireflies`
- `forest-canopy`
- `pollen-and-spores`
- `snowfall`
- `spring-bloom`

## Óptica (7 paletas)

- `bokeh-cold`
- `bokeh-gold`
- `bokeh-pastel`
- `holographic-shimmer`
- `laser-scatter`
- `lens-flare-dust`
- `prism-spectrum`

## Pastel (5 paletas)

- `pastel-cool`
- `pastel-dream`
- `pastel-mint`
- `pastel-sunset`
- `pastel-warm`

## Espacio (10 paletas)

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

## Espectro (10 paletas)

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

## Tech (9 paletas)

- `crt-phosphor`
- `glitch`
- `hologram`
- `lofi-warm`
- `matrix-rain`
- `neon-city`
- `network-nodes`
- `plasma-arc`
- `vaporwave`

## Vibrante (5 paletas)

- `vibrant`
- `vibrant-electric`
- `vibrant-neon`
- `vibrant-retro`
- `vibrant-tropical`

## Agua (8 paletas)

- `deep-ocean`
- `foam-and-bubbles`
- `fog-coastal`
- `ink-in-water`
- `rain`
- `rising-bubbles`
- `water`
- `water-splash`

Todas las paletas publicadas actualmente en npm están incluidas en la precarga del sitio web.

Algunas paletas pueden aparecer en el monorepo antes de su publicación; Estos se agregarán aquí tan pronto como sus paquetes estén disponibles.

## Uso rápido

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

Puedes combinar el mismo `palette` con diferentes ajustes preestablecidos para obtener variantes visuales sin reescribir el resto de opciones.

Utilice [`/playground/palettes`](/es/playground/palettes) para probarlos con controles explícitos de Inicio/Pausa.
