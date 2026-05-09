# Bundles ガイド

このページでは、`tsParticles` の適切な bundle を選び、素早くセットアップする方法をまとめています。

## パッケージ比較

| パッケージ               | 向いている用途                                   | セットアップ方式                               |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------- |
| `@tsparticles/basic`     | さらに軽量な構成                                 | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | ほとんどの Web サイト/アプリ                     | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | 公式機能を広く含む full 構成を engine 制御で使う | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | 全機能を使った高速プロトタイプ                   | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | 1 回の呼び出しで紙吹雪演出                       | `await confetti(options)`                      |
| `@tsparticles/fireworks` | 1 回の呼び出しで花火演出                         | `await fireworks(options)`                     |
| `@tsparticles/particles` | シンプルな粒子背景 API                           | `await particles(options)`                     |

## Bundle ガイド

- Basic: [`/guide/bundles-basic`](/ja/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/ja/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/ja/guide/bundles-full)
- All: [`/guide/bundles-all`](/ja/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/ja/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/ja/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/ja/guide/bundles-particles)

## インストール

用途に合うパッケージ経路をインストールします。

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

CDN リンクや他の package manager の例が必要な場合:

- [`/guide/installation`](/ja/guide/installation) を参照してください。

## セットアップ例

### engine + loader bundles (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

他の preset を使う場合は、loader の import/関数名だけ差し替えます:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### 特化 API (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

これらの API は、多数の engine plugin を手動接続せずに素早く統合したい場合に最適です。

## 実践的な選び方

1. ほとんどのプロジェクトでは `@tsparticles/slim` から開始する。
2. bundle サイズ最優先で機能要件がシンプルなら `@tsparticles/basic` を使う。
3. 幅広い機能を持つ full な土台を `loadFull` で使いたい場合は `tsparticles` を使う。
4. プロトタイピングや、多くの機能をすぐ使いたい場合は `@tsparticles/all` を使う。
5. UI に特化した 1 つの演出を最小セットアップで入れたい場合は `@tsparticles/confetti`、`@tsparticles/fireworks`、`@tsparticles/particles` を使う。

## 関連ページ

- playground の特化 bundles: [`/playground/bundles`](/ja/playground/bundles)
- スタートガイド: [`/guide/getting-started`](/ja/guide/getting-started)
- インストール一覧: [`/guide/installation`](/ja/guide/installation)
- wrappers 概要: [`/guide/wrappers`](/ja/guide/wrappers)
