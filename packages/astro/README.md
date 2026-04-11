[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# astro-particles

[![npm](https://img.shields.io/npm/v/astro-particles)](https://www.npmjs.com/package/astro-particles) [![npm](https://img.shields.io/npm/dm/astro-particles)](https://www.npmjs.com/package/astro-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) Astro component

[![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
npm install astro-particles
```

or

```shell
yarn add astro-particles
```

## How to use

```astro
---
import Particles from "astro-particles"
import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
    background: {
        color: "#000"
    },
    fullScreen: {
        zIndex: -1
    },
    particles: {
        number: {
            value: 100
        },
        move: {
            enable: true
        }
    }
};
---

<script>
    import { type Container, type Engine, tsParticles } from "tsparticles-engine";
    import { loadFull } from "tsparticles";

    // the function name is the parameter passed to the init attribute
    // required
    // add the function to window is mandatory, it will be searched there
    window.particlesInit = async function (engine: Engine) {
        await loadFull(engine);
    }
    
    // the function name is the parameter passed to the loaded attribute
    // optional
    // add the function to window is mandatory, it will be searched there
    window.particlesLoaded = function (container: Container) {
        console.log("particlesLoaded callback");
    }
</script>

<Particles id="tsparticles" options={options} init="particlesInit" />
```

### Props

| Prop    | Type   | Definition                                                             |
|---------|--------|------------------------------------------------------------------------|
| id      | string | The id of the element.                                                 |
| init    | string | The name of the function to call when the particles instance is ready. |
| loaded  | string | The name of the function to call when the particles are loaded.        |
| options | object | The options of the particles instance.                                 |
| url     | string | The remote options url, called using an AJAX request                   |

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
