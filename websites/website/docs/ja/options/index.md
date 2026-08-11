# オプションリファレンス

`tsParticles` の options は非常に広いため、このページを全体マップとして使ってから各サブオプションへ進むのがおすすめです。

## 構成パスを選ぶ

- **素早く見た目を作る**: preset から始めて主要フィールドを上書きする。
- **フルコントロール**: `particles`、`interactivity`、`background` を手動で定義する。
- **config-first の進め方**: `@tsparticles/configs` から始めて、段階的に調整する。

## クイックガイド（ローカル）

- [`Background & Canvas`](/ja/options/background)
- [`Background Mask`](/ja/options/background-mask)
- [`Full Screen`](/ja/options/fullscreen)
- [`Motion`](/ja/options/motion)
- [`Manual Particles`](/ja/options/manual-particles)
- [`Themes`](/ja/options/themes)
- [`Particles`](/ja/options/particles)
- [`Particles Number`](/ja/options/particles-number)
- [`Particles Move`](/ja/options/particles-move)
- [`Particles Links`](/ja/options/particles-links)
- [`Particles Palette`](/ja/options/particles-palette)
- [`Particles Shape`](/ja/options/particles-shape)
- [`Particles Collisions`](/ja/options/particles-collisions)
- [`Particles Life`](/ja/options/particles-life)
- [`Particles Orbit`](/ja/options/particles-orbit)
- [`Particles Roll`](/ja/options/particles-roll)
- [`Particles Rotate`](/ja/options/particles-rotate)
- [`Interactivity`](/ja/options/interactivity)
- [`Interactivity Click`](/ja/options/interactivity-click)
- [`Interactivity Hover`](/ja/options/interactivity-hover)
- [`Interactivity Div`](/ja/options/interactivity-div)
- [`Interactivity Events`](/ja/options/interactivity-events)
- [`Interactivity Modes`](/ja/options/interactivity-modes)
- [`Plugin: Absorbers`](/ja/options/plugin-absorbers)
- [`Plugin: Emitters`](/ja/options/plugin-emitters)
- [`Plugin: Infection`](/ja/options/plugin-infection)
- [`Plugin: Polygon Mask`](/ja/options/plugin-polygon-mask)
- [`Performance Guide`](/ja/options/performance)

## particles の詳細ページ

- [`Particles Bounce`](/ja/options/particles-bounce)
- [`Particles Color`](/ja/options/particles-color)
- [`Particles Destroy`](/ja/options/particles-destroy)
- [`Particles Group`](/ja/options/particles-group)
- [`Particles Opacity`](/ja/options/particles-opacity)
- [`Particles Palette`](/ja/options/particles-palette)
- [`Particles Repulse`](/ja/options/particles-repulse)
- [`Particles Shadow`](/ja/options/particles-shadow)
- [`Particles Size`](/ja/options/particles-size)
- [`Particles Stroke`](/ja/options/particles-stroke)
- [`Particles Tilt`](/ja/options/particles-tilt)
- [`Particles Twinkle`](/ja/options/particles-twinkle)
- [`Particles Wobble`](/ja/options/particles-wobble)
- [`Particles ZIndex`](/ja/options/particles-zindex)

## 参照元ドキュメント

- メイン options ドキュメント: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- 詳細 options ページ: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- TypeScript インターフェース: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## よく使う root options

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## よく使うセクション

- `background`: canvas 背景とマスキングの基本。
- `particles.number`: 数と密度。
- `particles.move`: 速度、方向、out modes。
- `particles.shape`: 円、多角形、画像、絵文字、カスタム。
- `particles.palette`: 調和したカラーパレットを素早く切り替え。
- `interactivity`: hover/click モードと外部エフェクト。
- `detectRetina`: 高 DPI 画面での品質とパフォーマンスのバランス。

## particles マップ（ネスト表示）

個別ページを開く前に、次のツリーをナビゲーションとして使ってください。

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

まず root docs、その後に詳細セクションを読む流れがおすすめです。

- 基本: [`Particles`](/ja/options/particles)
- 詳細: [`Particles Number`](/ja/options/particles-number), [`Particles Move`](/ja/options/particles-move), [`Particles Links`](/ja/options/particles-links)

## 安全に進めるオプション設定手順

1. demos または presets から動く設定を開始する。
2. 一度に 1 セクションずつ変更する。
3. アプリコードで TypeScript（`IOptions`）検証を行う。
4. 本番用 options は専用 JSON ファイルに分離する。

## 最小の型付き例

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## パフォーマンスのガードレール

- 高度な plugins が不要なら `@tsparticles/slim` を優先する。
- 粒子数はコンテナ面積に比例させる。
- 重い interactivity を追加する前に実機でプロファイリングする。

## 関連リファレンス

- configs package docs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- presets フォルダー: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- palettes フォルダー: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

各サブオプションの完全な説明は、上記で案内した `tsparticles/markdown/Options` の各ページを参照してください。
