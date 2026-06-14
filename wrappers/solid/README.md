[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/solid

[![npm](https://img.shields.io/npm/v/@tsparticles/solid)](https://www.npmjs.com/package/@tsparticles/solid) [![npm](https://img.shields.io/npm/dm/@tsparticles/solid)](https://www.npmjs.com/package/@tsparticles/solid) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) solid component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_source=badge-tsparticles) <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
npm install @tsparticles/solid
```

or

```shell
yarn add @tsparticles/solid
```

## How to use

### Code

Examples:

_Remote url_

```javascript
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";

initParticlesEngine(async engine => {
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(engine);
});

function App() {
  return <Particles id="tsparticles" url="https://foo.bar/particles.json" />;
}
```

_Options object_

```javascript
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";

initParticlesEngine(async engine => {
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(engine);
});

function App() {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: "#000",
        },
        fullScreen: {
          enable: true,
        },
      }}
    />
  );
}
```

### Props

| Prop            | Type                                       | Default         | Description                                                                                    |
| --------------- | ------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------- |
| id              | string                                     | `"tsparticles"` | The id of the element. Reactive: changing destroys old container and creates a new one.        |
| width           | string                                     |                 | The width of the canvas.                                                                       |
| height          | string                                     |                 | The height of the canvas.                                                                      |
| options         | `ISourceOptions`                           |                 | The options of the particles instance. Reactive: changing replaces particles.                  |
| url             | string                                     |                 | The remote options url, called using an AJAX request. Reactive: changing reloads from URL.     |
| params          | `ISourceOptions`                           |                 | Alias for `options`.                                                                           |
| style           | `JSX.CSSProperties`                        |                 | The style of the canvas element.                                                               |
| class           | string                                     |                 | The class name of the canvas wrapper.                                                          |
| canvasClass     | string                                     |                 | The class name of the canvas.                                                                  |
| container       | `{ current: Container }`                   |                 | Reference to the particles container instance.                                                 |
| theme           | string                                     |                 | Theme name to apply (requires `@tsparticles/plugin-themes`).                                   |
| particlesLoaded | `(container?: Container) => Promise<void>` |                 | Callback fired after `tsParticles.load()` resolves. The container may be undefined on failure. |

## Reactive behavior

Reactive props (`id`, `options`, `url`) trigger a **destroy + reload** cycle when changed at runtime:

- `id` change → old container destroyed, new one created with the new id
- `options` change → particles are reloaded with the new config
- `url` change → config fetched from the new URL and loaded

## Theme support

The `theme` prop requires the optional [`@tsparticles/plugin-themes`](https://www.npmjs.com/package/@tsparticles/plugin-themes) package. Without it, the prop is safely ignored.

```ts
import { loadThemePlugin } from "@tsparticles/plugin-themes";

async function registerParticles(engine: Engine): Promise<void> {
  await loadThemePlugin(engine);
}
```

When the plugin is loaded, changing `theme` applies the new theme on the fly without destroying the container.

## Loaded callback

The `particlesLoaded` callback fires with `Container | undefined` after `tsParticles.load()` resolves. Always guard for `undefined`:

```ts
function particlesLoaded(container?: Container): void {
  if (container) {
    console.log("Particles ready", container);
  }
}
```

Find your parameters configuration [here](https://particles.js.org).

## Demos

You can see the official sample created using CodeSandbox [here](https://codesandbox.io/s/condescending-dan-7e0r9)

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
