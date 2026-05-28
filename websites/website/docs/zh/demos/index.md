# 演示即用型

这些配方使用 `presets/presets` 工作区中提供的官方预设（即将发布的 beta/alpha）。

## 模式基础开始/停止（无自动播放）

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

## 预设食谱

- 预设目录：[`/demos/presets`](/zh/demos/presets)
- 调色板目录：[`/demos/palettes`](/zh/demos/palettes)
- 形状目录：[`/demos/shapes`](/zh/demos/shapes)

- [`Ambient`](/zh/demos/recipes/ambient)
- [`Big Circles`](/zh/demos/recipes/big-circles)
- [`Bubbles`](/zh/demos/recipes/bubbles)
- [`Confetti`](/zh/demos/recipes/confetti)
- [`Confetti Cannon`](/zh/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/zh/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/zh/demos/recipes/confetti-falling)
- [`Confetti Parade`](/zh/demos/recipes/confetti-parade)
- [`Fire`](/zh/demos/recipes/fire)
- [`Firefly`](/zh/demos/recipes/firefly)
- [`Fireworks`](/zh/demos/recipes/fireworks)
- [`Fountain`](/zh/demos/recipes/fountain)
- [`Hyperspace`](/zh/demos/recipes/hyperspace)
- [`Links`](/zh/demos/recipes/links)
- [`Matrix`](/zh/demos/recipes/matrix)
- [`Sea Anemone`](/zh/demos/recipes/sea-anemone)
- [`Snow`](/zh/demos/recipes/snow)
- [`Squares`](/zh/demos/recipes/squares)
- [`Stars`](/zh/demos/recipes/stars)
- [`Ribbons`](/zh/demos/recipes/ribbons)
- [`Triangles`](/zh/demos/recipes/triangles)

要立即在 UI 中测试它们，请使用 [`Playground`](/zh/playground/) 并仅在需要时使用 `Start` 启动它们。

## 框架演示项目

monorepo 还包括可运行的集成演示：

- 源文件夹：<https://github.com/tsparticles/tsparticles/tree/main/demo>
- 可用演示包括：`angular`、`astro`、`electron`、`inferno`、`ionic`、`jquery`、`lit`、`nextjs`、`nextjs-legacy`、 `nuxt2`、`nuxt3`、`nuxt4`、`preact`、`react`、`riot`、`solid`、`svelte`、`svelte-kit`、 `vanilla`、`vanilla_new`、`vite`、`vue2`、`vue3`、`webcomponents`。
