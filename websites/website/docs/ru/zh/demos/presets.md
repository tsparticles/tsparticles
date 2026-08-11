# 预设目录

这些是主 `tsParticles` 自述文件中列出的官方预设，可在预设工作区中找到。

源文件夹：<https://github.com/tsparticles/tsparticles/tree/main/presets>

## 预设

- `ambient` - <https://www.npmjs.com/package/@tsparticles/preset-ambient> - [/demos/recipes/ambient](/demos/recipes/ambient)
- `big-circles` - <https://www.npmjs.com/package/@tsparticles/preset-big-circles> - [/demos/recipes/big-circles](/demos/recipes/big-circles)
- `bubbles` - <https://www.npmjs.com/package/@tsparticles/preset-bubbles> - [/demos/recipes/bubbles](/demos/recipes/bubbles)
- `confetti` - <https://www.npmjs.com/package/@tsparticles/preset-confetti> - [/demos/recipes/confetti](/demos/recipes/confetti)
- `confetti-cannon` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-cannon> - [/demos/recipes/confetti-cannon](/demos/recipes/confetti-cannon)
- `confetti-explosions` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-explosions> - [/demos/recipes/confetti-explosions](/demos/recipes/confetti-explosions)
- `confetti-falling` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-falling> - [/demos/recipes/confetti-falling](/demos/recipes/confetti-falling)
- `confetti-parade` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-parade> - [/demos/recipes/confetti-parade](/demos/recipes/confetti-parade)
- `party` - <https://www.npmjs.com/package/@tsparticles/preset-party> - [/demos/recipes/party](/demos/recipes/party)
- `fire` - <https://www.npmjs.com/package/@tsparticles/preset-fire> - [/demos/recipes/fire](/demos/recipes/fire)
- `firefly` - <https://www.npmjs.com/package/@tsparticles/preset-firefly> - [/demos/recipes/firefly](/demos/recipes/firefly)
- `fireworks` - <https://www.npmjs.com/package/@tsparticles/preset-fireworks> - [/demos/recipes/fireworks](/demos/recipes/fireworks)
- `fountain` - <https://www.npmjs.com/package/@tsparticles/preset-fountain> - [/demos/recipes/fountain](/demos/recipes/fountain)
- `hyperspace` - <https://www.npmjs.com/package/@tsparticles/preset-hyperspace> - [/demos/recipes/hyperspace](/demos/recipes/hyperspace)
- `links` - <https://www.npmjs.com/package/@tsparticles/preset-links> - [/demos/recipes/links](/demos/recipes/links)
- `matrix` - 本地网站演示配方可在 [`/demos/recipes/matrix`](/zh/demos/recipes/matrix) 中找到
- `meteors` - <https://www.npmjs.com/package/@tsparticles/preset-meteors> - [/demos/recipes/meteors](/demos/recipes/meteors)
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - [/demos/recipes/sea-anemone](/demos/recipes/sea-anemone)
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - [/demos/recipes/snow](/demos/recipes/snow)
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - [/demos/recipes/squares](/demos/recipes/squares)
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - [/demos/recipes/stars](/demos/recipes/stars)
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - [/demos/recipes/triangles](/demos/recipes/triangles)

每个预设文件夹还包含 monorepo 中的文档，例如：

- <https://github.com/tsparticles/tsparticles/tree/main/presets/confetti#readme>

## 快速使用

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    preset: "links",
    fullScreen: {
      enable: false,
    },
  },
});
```

对于生产设置，请使用手动启动/停止/恢复/销毁，如 [`/demos/`](/zh/demos/) 下的配方中所示。

使用 [`/playground/presets`](/zh/playground/presets) 通过显式开始/暂停控件测试每个预设。
