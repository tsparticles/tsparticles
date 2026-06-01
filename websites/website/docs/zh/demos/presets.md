# 预设目录

这些是主 `tsParticles` 自述文件中列出的官方预设，可在预设工作区中找到。

源文件夹：<https://github.com/tsparticles/tsparticles/tree/main/presets>

## 预设

- `ambient` - <https://www.npmjs.com/package/@tsparticles/preset-ambient> - <https://particles.js.org/samples/presets/ambient>
- `big-circles` - <https://www.npmjs.com/package/@tsparticles/preset-big-circles> - <https://particles.js.org/samples/presets/bigCircles>
- `bubbles` - <https://www.npmjs.com/package/@tsparticles/preset-bubbles> - <https://particles.js.org/samples/presets/bubbles>
- `confetti` - <https://www.npmjs.com/package/@tsparticles/preset-confetti> - <https://particles.js.org/samples/presets/confetti>
- `confetti-cannon` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-cannon> - <https://particles.js.org/samples/presets/confettiCannon>
- `confetti-explosions` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-explosions> - <https://particles.js.org/samples/presets/confettiExplosions>
- `confetti-falling` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-falling> - <https://particles.js.org/samples/presets/confettiFalling>
- `confetti-parade` - <https://www.npmjs.com/package/@tsparticles/preset-confetti-parade> - <https://particles.js.org/samples/presets/confettiParade>
- `party` - <https://www.npmjs.com/package/@tsparticles/preset-party> - <https://particles.js.org/samples/presets/party>
- `fire` - <https://www.npmjs.com/package/@tsparticles/preset-fire> - <https://particles.js.org/samples/presets/fire>
- `firefly` - <https://www.npmjs.com/package/@tsparticles/preset-firefly> - <https://particles.js.org/samples/presets/firefly>
- `fireworks` - <https://www.npmjs.com/package/@tsparticles/preset-fireworks> - <https://particles.js.org/samples/presets/fireworks>
- `fountain` - <https://www.npmjs.com/package/@tsparticles/preset-fountain> - <https://particles.js.org/samples/presets/fountain>
- `hyperspace` - <https://www.npmjs.com/package/@tsparticles/preset-hyperspace> - <https://particles.js.org/samples/presets/hyperspace>
- `links` - <https://www.npmjs.com/package/@tsparticles/preset-links> - <https://particles.js.org/samples/presets/links>
- `matrix` - 本地网站演示配方可在 [`/demos/recipes/matrix`](/zh/demos/recipes/matrix) 中找到
- `seaAnemone` - <https://www.npmjs.com/package/@tsparticles/preset-sea-anemone> - <https://particles.js.org/samples/presets/seaAnemone>
- `snow` - <https://www.npmjs.com/package/@tsparticles/preset-snow> - <https://particles.js.org/samples/presets/snow>
- `squares` - <https://www.npmjs.com/package/@tsparticles/preset-squares> - <https://particles.js.org/samples/presets/squares>
- `stars` - <https://www.npmjs.com/package/@tsparticles/preset-stars> - <https://particles.js.org/samples/presets/stars>
- `triangles` - <https://www.npmjs.com/package/@tsparticles/preset-triangles> - <https://particles.js.org/samples/presets/triangles>

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
