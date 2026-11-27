# v5 移行ガイド — E10 作業草案

状態: E10 作業草稿、2026-11-27 更新。現行候補に対する E9 のインストール済みパッケージとブラウザーの検証は完了しました。このガイドでは engine、wrapper、bundle、color に実装された v5 の仕様を説明します。更新後の E10 サイズ基準に基づき、E0 のサイズ上限は診断用の参考値として記載し、合格とは扱いません。callback を使わない renderer の追加検証では、強制 HDR を含む E0 runtime 30 項目すべてに合格しています。M4/500 の update と render は E0 上限内です。frame p95 は 7.20 ms で、過去の E5 参考値を 0.05 ms 上回ります。実機 HDR 検証と必要なドキュメントレビューは未完了です。

MCP で生成した TypeScript の例と 20 種類すべての CLI scaffold（Vanilla と 19 framework）は、型検査、本番ビルド、Chrome での起動に合格し、ページまたは console のエラーはありません。9 種類すべてのテンプレートファミリーから、削除済みの Vue 2、Nuxt 2、Nuxt 3 の構成が除かれています。9 件すべての草稿の言語レビュー、実機での HDR/browser 検証は未完了です。この文書は社内向け草稿であり、公開用の完成ガイドではありません。

現行サイトの標準および各言語の Vanilla ガイドは byte 単位で同一で、公開済み v4 CDN package を参照します。singleton の例は v5 移行ページの公開準備が整うまで v4 ドキュメントとして維持し、v5 consumer 検証には数えません。

## Engine の所有権

`tsParticles` singleton の import を `createEngine()` に置き換えます。返された instance はアプリケーションスコープに保持し、各 loader に渡し、wrapper/provider に明示的に指定します。ローカル変数名に `tsParticles` を使うことはできます。コンポーネントの teardown が管理するのは自身の container であり、同じ engine を使う無関係な container を破棄してはいけません。

E2 実装では、乱数/logger の設定とアニメーションスケジューリングは instance ごとに所有します。runtime service が所有 engine に従うよう、カスタム plugin は `container.engine` (または `container.pluginManager.engine`) に登録します。

## 廃止された Framework 統合

| 統合                               | 移行先                                | 削除 / 検証            |
| ---------------------------------- | ------------------------------------- | ---------------------- |
| Vue 2 wrapper、demo、starter 参照  | Vue 3 と `@tsparticles/vue3` に移行   | E1 で削除、E9 で再確認 |
| Nuxt 2 wrapper、demo、starter 参照 | Nuxt 4 と `@tsparticles/nuxt4` に移行 | E1 で削除、E9 で再確認 |
| Nuxt 3 wrapper、demo、starter 参照 | Nuxt 4 と `@tsparticles/nuxt4` に移行 | E1 で削除、E9 で再確認 |

Framework の更新はアプリケーションの移行であり、package 名の置換だけではありません。E0 参照検索は [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt) にあります。削除時には installer、生成文字列、ドキュメント、翻訳も確認します。matrix には明示的な engine が必要な継続利用 consumer も含まれます。

## 非推奨 API

RGB を返していた `colorMix()` は削除されました。engine の旧 helper `getStyleFromRgb()` / `getStyleFromHsl()`、HSV plugin の `getStyleFromHsv()`、OKLCH package 内の formatter `getStyleFromOklch()` も削除されています。RGB は `rgbToOklch()`、HSL は `rgbToOklch(hslToRgbFloat(color))` で変換し、HSV option は登録済み HSV color manager と `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })` で解決します。正規化された結果を engine の `getStyleFromOklch()` に渡すと、出力 gamut と HDR 設定が処理されます。出力が本当に RGB のみでよい場合は `mapOklchToSrgb(result).rgb` を使います。

### Interactor の Lifecycle Hook

Interactor 基底クラスは既定で何もしない `reset()` を提供します。外部 interactor の基底クラスも何もしない `clear()` を提供します。manager は interactor の初期化後 (redraw 初期化を含む) にカスタム hook を選択します。状態を保持する、または reset 時に処理する override は残し、`noImplicitOverride` を使う場合は TypeScript の `override` 修飾子を追加します。

[非推奨 API 一覧](../../e9/deprecated-migrations.md)には、削除された color formatter、Confetti と Ribbons の option、維持される opt-in particles.js 互換 API が記載されています。Stencil 5 に compiler を更新する場合、登録を hydration 前に完了する必要があれば `applyPolyfills()` を削除し、`defineCustomElements()` を await します。現行 tsParticles Stencil wrapper は Stencil 4 を使い、引き続き `applyPolyfills()` を宣言します。

## Color、Option、公開契約

入力は引き続き RGB、HSL、HSV、HWB、Lab、LCH、OKLab、CSS string、array、対応する range を受け付けます。particle animation は OKLCH を使います。旧 HSL component `{ h, s, l }` を `{ h, c, l }` に置き換えます。色相は角度のまま、chroma と lightness は v5 の OKLCH 数値スケールを使い、alpha は独立した opacity 値です。HSL saturation を chroma にコピーしないでください。入力境界で変換するか、engine に解析させるため対応する CSS/RGB 入力を保持します。Color extension point を実装する manager は現行 OKLCH manager 契約に従います。入力、gamut mapping、alpha、HDR の詳細は[カラー決定事項](../../../V5-COLOR-DECISIONS.md)を参照してください。

## E1 で実装された明示的 Engine API

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

root、`/lazy`、browser module entry は engine を作成せず、`globalThis` に object を公開しません。Classic Rollup script は factory/loader namespace を公開します。

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Standalone bundle には engine 定義が含まれます。外部 feature script を使う場合は、対応 engine と依存関係を先に読み込みます。package version を揃えてください。namespace は定義であり engine ではありません。別 bundle の読み込みで既存 engine が破棄されることはありません。同じ canvas の所有者は、別 bundle に含まれる engine copy 間でも一つです。canvas を移す前に所有者を破棄します。別 canvas に同じ ID を指定しても engine 間で独立します。

plugin registry、random source、logger、scheduler、container 所有権を分離する必要がある場合は別 engine を使います。必要な feature は利用する各 engine に登録します。

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

便利 package は `createConfetti(engine)`、`createFireworks(engine)`、`createParticles(engine)`、`createRibbons(engine)` を export します。返される関数は engine に紐付き、`init`、`create`、`version` を保持します。

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` は `{ particlesJS, pJSDom, Particles }` を返しますが、互換 API を `globalThis` に設定しません。`loadConfigs(engine)` は catalog と palette をその engine に明示登録します。

| Wrapper family                                | Engine の所有と登録                                                                                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | `engine` を `ParticlesProvider` に渡し、必要 plugin をロードする `init` registrar を指定します。                                                      |
| Vue 3                                         | `{ engine, init }` で particles provider を install し、子孫から `useParticlesProvider()` を呼びます。                                                |
| Angular                                       | `service.init(engine, registrar)` に engine を渡し、独立 engine ごとに service provider を分けます。便利 component は `engine` input を受け取ります。 |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | component/provider API で engine を渡し、利用可能な場合は `initParticlesEngine(engine, registrar)` で初期化します。                                   |
| Qwik                                          | client で作成・登録し、`noSerialize` で保持します。server render 中に作成しません。                                                                   |
| Custom elements                               | `.engine` property を設定します。serialize される HTML attribute ではありません。                                                                     |
| Nuxt 4                                        | 設定済み初期化 module の `engine` と `registerParticles` を使います。                                                                                 |

Framework 固有の signature と SSR 制約は各 wrapper README を参照してください。provider 内で module-level の暗黙 engine を作り直さないでください。

コンポーネント teardown が破棄するのは所有 container のみです。共有 engine の寿命はアプリケーションが管理し、破棄前に pending load を完了して container を破棄します。runtime service は engine ごとに所有されるため、container load 前に設定します。

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

旧 global API `setParticlesRandom`、`getParticlesRandom`、`getParticlesRandomFn`、`setParticlesLogger`、`getParticlesLogger` は削除されました。`engine.setRandom`、`engine.getRandom`、`engine.getRandomFn`、`engine.setLogger`、`engine.getLogger` に移行します。カスタム plugin は `container.engine` または `container.pluginManager.engine` から所有 engine を参照できます。runtime helper には明示的な random provider を渡します。所有 engine の安定した `getRandomFn()` provider を使えば、他 engine に影響せず後の source 変更を反映できます。アニメーション scheduling も engine ごとで、各 container の frame は作成した scheduler が cancel します。

### 初期化の順序

`initParticlesEngine` を公開する wrapper では、アプリ初期化時に `initParticlesEngine(engine, registrar)` を呼びます。先に mount された component はその engine の初期化を待ち、暗黙 engine を作成・初期化しません。jQuery では `$.particles(engine).init(registrar)` を使います。React/Vue provider と Angular service 初期化も同じ処理を行います。登録に失敗すると現在の waiter は reject され、初期化を再試行できます。

## Module と Browser の Entry Point

標準 ESM API には package root を import します。遅延 entry point が必要なら `/lazy` subpath を使います。dynamic loading で旧 singleton は復元されません。installed package 検証では root と `/lazy` の ESM `import`、CJS `require`、`browser` 条件を確認します。

Classic browser output では Rollup namespace に factory と feature loader が含まれます。namespace script 読み込み後に engine を作り、各 loader に渡します。外部 feature script には対応 engine と共有依存関係が必要です。bundle の browser README にある順序で一貫した version を使います。standalone bundle は選択した feature を含みます。browser entry の読み込みや package root の import だけで engine が自動作成されることはありません。

## Package 境界と削除された Singleton API

runtime type と `createEngine` は `@tsparticles/engine` から import し、必要な feature package のみ (例: `@tsparticles/slim`、専用 interaction/shape/updater package) を追加します。便利 package は独立した adapter です。他 package の内部 `dist` や source path ではなく、宣言済み export を使います。installed-package E10 report が現在の `exports`、型宣言、解決の検証元です。

export された engine singleton と global engine mutation helper は削除されました。`setParticlesRandom`、`getParticlesRandom`、`getParticlesRandomFn`、`setParticlesLogger`、`getParticlesLogger` を container 所有 engine の対応 method に置き換えます。`tsParticles.load`、`tsParticles.loadJSON`、`tsParticles.dom` を使っていた場合は、明示 engine で呼ぶか返された container を保持します。import した ESM/CJS package から `window.tsParticles` にアクセスしません。classic browser bundle は文書化された namespace を別途公開します。
