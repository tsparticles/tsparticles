# Каталог палитр

Палитры берутся из рабочей области `palettes` и предварительно загружаются в игровую площадку.

Порядок соответствует исходной структуре:

- первый уровень: порядок категорий (на основе исходных папок палитр)
- второй уровень: порядок фрагментов палитры внутри каждой категории (в алфавитном порядке).

Исходная папка: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Доступные группы палитр

## Атмосфера (12 палитр)

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

## Атмосферный (10 палитр)

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

## Конфетти (12 палитр)

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

## Земля (7 палитр)

- `caustics`
- `desert-sand`
- `mud-and-dirt`
- `oil-slick`
- `rock-and-gravel`
- `rust-and-corrosion`
- `skin-and-organic`

## Фэнтези (8 палитр)

- `bioluminescence`
- `blood-and-gore`
- `fairy-dust`
- `holy-light`
- `ice-magic`
- `ice-triad`
- `jellyfish-glow`
- `poison-and-venom`

## Огонь (8 палитр)

- `candlelight`
- `embers-and-ash`
- `fire`
- `fire-seed`
- `full-fire-gradient`
- `lava-lamp`
- `metal-sparks`
- `molten-metal`

## Фейерверк (24 палитры)

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

## Импакт (7 палитр)

- `bullet-hit`
- `explosion-debris`
- `glass-burst`
- `meteor-impact`
- `nuclear-glow`
- `shockwave-blast`
- `splatter-dark`

## Монохроматический (14 палитр)

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

## Природа (9 палитр)

- `autumn-leaves`
- `cherry-blossom`
- `dandelion-seeds`
- `earthy-nature`
- `fireflies`
- `forest-canopy`
- `pollen-and-spores`
- `snowfall`
- `spring-bloom`

## Оптика (7 палитр)

- `bokeh-cold`
- `bokeh-gold`
- `bokeh-pastel`
- `holographic-shimmer`
- `laser-scatter`
- `lens-flare-dust`
- `prism-spectrum`

## Пастель (5 палитр)

- `pastel-cool`
- `pastel-dream`
- `pastel-mint`
- `pastel-sunset`
- `pastel-warm`

## Пространство (10 палитр)

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

## Спектр (10 палитр)

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

## Тех (9 палитр)

- `crt-phosphor`
- `glitch`
- `hologram`
- `lofi-warm`
- `matrix-rain`
- `neon-city`
- `network-nodes`
- `plasma-arc`
- `vaporwave`

## Яркий (5 палитр)

- `vibrant`
- `vibrant-electric`
- `vibrant-neon`
- `vibrant-retro`
- `vibrant-tropical`

## Вода (8 палитр)

- `deep-ocean`
- `foam-and-bubbles`
- `fog-coastal`
- `ink-in-water`
- `rain`
- `rising-bubbles`
- `water`
- `water-splash`

Все палитры, опубликованные в настоящее время на npm, включены в предварительную загрузку игровой площадки веб-сайта.

Некоторые палитры могут появиться в монорепозитории до публикации; они будут добавлены сюда, как только их пакеты станут доступны.

## Быстрое использование

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

Вы можете комбинировать один и тот же `palette` с разными пресетами, чтобы получить визуальные варианты, не переписывая остальные параметры.

Используйте [`/playground/palettes`](/ru/playground/palettes), чтобы протестировать их с явными элементами управления «Пуск/Пауза».
