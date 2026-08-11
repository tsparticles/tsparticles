# パレットカタログ

パレットは `palettes` ワークスペースから取得され、プレイグラウンドにプリロードされます。

順序付けはソース構造に従います。

- 最初のレベル: カテゴリの順序 (パレットのソース フォルダーに基づく)
- 第 2 レベル: 各カテゴリ内のパレット スラグの順序 (アルファベット順)

ソースフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## 使用可能なパレット グループ

## アトモスフィア (12 パレット)

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

## 大気 (10 パレット)

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

## コンフェッティ (12 パレット)

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

## アース (7 パレット)

- `caustics`
- `desert-sand`
- `mud-and-dirt`
- `oil-slick`
- `rock-and-gravel`
- `rust-and-corrosion`
- `skin-and-organic`

## ファンタジー (8 パレット)

- `bioluminescence`
- `blood-and-gore`
- `fairy-dust`
- `holy-light`
- `ice-magic`
- `ice-triad`
- `jellyfish-glow`
- `poison-and-venom`

## 火 (8 パレット)

- `candlelight`
- `embers-and-ash`
- `fire`
- `fire-seed`
- `full-fire-gradient`
- `lava-lamp`
- `metal-sparks`
- `molten-metal`

## 花火 (24 パレット)

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

## インパクト (7 パレット)

- `bullet-hit`
- `explosion-debris`
- `glass-burst`
- `meteor-impact`
- `nuclear-glow`
- `shockwave-blast`
- `splatter-dark`

## モノクロ (14 パレット)

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

## ネイチャー (9 パレット)

- `autumn-leaves`
- `cherry-blossom`
- `dandelion-seeds`
- `earthy-nature`
- `fireflies`
- `forest-canopy`
- `pollen-and-spores`
- `snowfall`
- `spring-bloom`

## 光学系 (7 パレット)

- `bokeh-cold`
- `bokeh-gold`
- `bokeh-pastel`
- `holographic-shimmer`
- `laser-scatter`
- `lens-flare-dust`
- `prism-spectrum`

## パステル (5 パレット)

- `pastel-cool`
- `pastel-dream`
- `pastel-mint`
- `pastel-sunset`
- `pastel-warm`

## スペース (10 パレット)

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

## スペクトル (10 パレット)

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

## テック (9 パレット)

- `crt-phosphor`
- `glitch`
- `hologram`
- `lofi-warm`
- `matrix-rain`
- `neon-city`
- `network-nodes`
- `plasma-arc`
- `vaporwave`

## 鮮やか (5 パレット)

- `vibrant`
- `vibrant-electric`
- `vibrant-neon`
- `vibrant-retro`
- `vibrant-tropical`

## 水 (8パレット)

- `deep-ocean`
- `foam-and-bubbles`
- `fog-coastal`
- `ink-in-water`
- `rain`
- `rising-bubbles`
- `water`
- `water-splash`

現在 npm で公開されているすべてのパレットは、Web サイトのプレイグラウンド プリロードに含まれています。

一部のパレットは公開前にモノリポジトリに表示されることがあります。これらは、パッケージが利用可能になり次第、ここに追加されます。

## 簡単な使い方

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

残りのオプションを書き換えることなく、同じ `palette` を異なるプリセットと組み合わせて、視覚的なバリアントを取得できます。

[`/playground/palettes`](/ja/playground/palettes) を使用して、明示的な開始/一時停止コントロールでテストします。
