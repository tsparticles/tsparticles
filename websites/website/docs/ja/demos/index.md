# すぐに使えるデモ

これらのレシピは、`presets/presets` ワークスペース (リリースに向けたベータ/アルファ) で利用可能な公式プリセットを使用します。

## パターンベースの開始/停止 (自動再生なし)

```ts
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";

let container: Container | undefined;

export async function start(id: string, options: ISourceOptions): Promise<void> {
  container?.destroy();
  container = await tsParticles.load({ id, options });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

## プリセットレシピ

- プリセットカタログ: [`/demos/presets`](/ja/demos/presets)
- パレット カタログ: [`/demos/palettes`](/ja/demos/palettes)
- シェイプ カタログ: [`/demos/shapes`](/ja/demos/shapes)

- [`Ambient`](/ja/demos/recipes/ambient)
- [`Big Circles`](/ja/demos/recipes/big-circles)
- [`Bubbles`](/ja/demos/recipes/bubbles)
- [`Confetti`](/ja/demos/recipes/confetti)
- [`Confetti Cannon`](/ja/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/ja/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/ja/demos/recipes/confetti-falling)
- [`Confetti Parade`](/ja/demos/recipes/confetti-parade)
- [`Party`](/ja/demos/recipes/party)
- [`Fire`](/ja/demos/recipes/fire)
- [`Firefly`](/ja/demos/recipes/firefly)
- [`Fireworks`](/ja/demos/recipes/fireworks)
- [`Fountain`](/ja/demos/recipes/fountain)
- [`Hyperspace`](/ja/demos/recipes/hyperspace)
- [`Links`](/ja/demos/recipes/links)
- [`Matrix`](/ja/demos/recipes/matrix)
- [`Sea Anemone`](/ja/demos/recipes/sea-anemone)
- [`Snow`](/ja/demos/recipes/snow)
- [`Squares`](/ja/demos/recipes/squares)
- [`Stars`](/ja/demos/recipes/stars)
- [`Ribbons`](/ja/demos/recipes/ribbons)
- [`Triangles`](/ja/demos/recipes/triangles)

UI ですぐにテストするには、[`Playground`](/ja/playground/) を使用し、必要な場合にのみ `Start` で開始します。

## フレームワークのデモ プロジェクト

モノリポジトリには、実行可能な統合デモも含まれています。

- ソースフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- 利用可能なデモには次のものがあります: `angular`、`astro`、`electron`、`inferno`、`ionic`、`jquery`、`lit`、`nextjs`、`nextjs-legacy`、 `nuxt2`、`nuxt3`、`nuxt4`、`preact`、`react`、`riot`、`solid`、`svelte`、`svelte-kit`、 `vanilla`、`vanilla_new`、`vite`、`vue2`、`vue3`、`webcomponents`。
