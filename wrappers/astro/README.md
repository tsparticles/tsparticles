[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/astro

[![npm](https://img.shields.io/npm/v/@tsparticles/astro)](https://www.npmjs.com/package/@tsparticles/astro) [![npm](https://img.shields.io/npm/dm/@tsparticles/astro)](https://www.npmjs.com/package/@tsparticles/astro) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) Astro component

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_source=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
npm install @tsparticles/astro
```

or

```shell
yarn add @tsparticles/astro
```

## How to use

```astro
---
import Particles, { initParticlesEngine } from "@tsparticles/astro";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

await initParticlesEngine(async (engine) => {
    await loadSlim(engine);
});

const options: ISourceOptions = {
    background: {
        color: {
            value: "#000"
        }
    },
    fullScreen: {
        zIndex: -1,
    },
    particles: {
        links: {
            enable: true,
        },
        number: {
            value: 100,
        },
        move: {
            enable: true,
        },
    }
};
---

<script>
    import type { Container } from "@tsparticles/engine";

    window.particlesLoaded = function (container: Container) {
        console.log("particlesLoaded callback");
    };
</script>

<Particles id="tsparticles" options={options} loaded="particlesLoaded" />
```

## Dev notes

When running the Astro demo in development, Vite/Astro may serve modules directly from the workspace and
the browser needs a browser-ready ESM entry for the wrapper. To ensure the client runtime is initialized
before the custom element upgrades, call initParticlesEngine on the client before the element is upgraded.

Recommended minimal pattern (client-side) — place this in your page before the <Particles> element:

```html
<script type="importmap">
  {
    "imports": {
      "@tsparticles/astro": "/node_modules/@tsparticles/astro/dist/index.client.js",
      "tsparticles": "/node_modules/tsparticles/esm/index.js"
    }
  }
</script>

<script type="module">
  import { initParticlesEngine } from "@tsparticles/astro";

  // Initialize the engine before the web component upgrades.
  initParticlesEngine(async engine => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  }).catch(console.error);
</script>
```

Notes:

- The importmap above is a pragmatic development-time helper so the browser can resolve bare specifiers to
  the local node_modules dist files. In production builds a bundler or proper package exports should make this unnecessary.
- The important part is that initParticlesEngine is invoked (and begins initialization) before the custom element is
  defined/upgraded in the page so the component can detect the initialization and not throw.

### Props

| Prop    | Type   | Definition                                                      |
| ------- | ------ | --------------------------------------------------------------- |
| id      | string | The id of the element.                                          |
| loaded  | string | The name of a global callback called once particles are loaded. |
| options | object | The options of the particles instance.                          |
| url     | string | The remote options url, called using an AJAX request            |

#### particles.json

Find all configuration
options [here](https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html).

You can find sample json
configurations [here](https://github.com/matteobruni/tsparticles/tree/main/websites/particles.js.org/presets) 📖

## Demos

Preset demos can be found [here](https://particles.js.org/samples/presets/index.html)

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

Report bugs and issues [here](https://github.com/matteobruni/tsparticles/issues)

[tsParticle Website](https://particles.js.org)
