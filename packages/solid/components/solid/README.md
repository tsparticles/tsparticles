[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/solid

[![npm](https://img.shields.io/npm/v/@tsparticles/solid)](https://www.npmjs.com/package/@tsparticles/solid) [![npm](https://img.shields.io/npm/dm/@tsparticles/solid)](https://www.npmjs.com/package/@tsparticles/solid) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) solid component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

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
import Particles from "@tsparticles/solid";

function App() {
    const [init, setInit] = createSignal(false);

    createEffect(() => {
        if (init()) {
            return;
        }

        initParticlesEngine(async engine => {
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    });

    return (
        <div class="App">
            {init() && <Particles id="tsparticles" init={particlesInit} url="https://foo.bar/particles.json" />}
        </div>
    );
}
```

_Options object_

```javascript
import Particles from "@tsparticles/solid";

function App() {
    const [init, setInit] = createSignal(false);

    createEffect(() => {
        if (init()) {
            return;
        }

        initParticlesEngine(async engine => {
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    });

    return (
        <div class="App">
            {init() && (
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        background: {
                            color: "#000",
                        },
                        fullScreen: {
                            enable: true,
                        },
                    }}
                />
            )}
        </div>
    );
}
```

### Props

| Prop            | Type     | Definition                                                                                                                                  |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string   | The id of the element.                                                                                                                      |
| width           | string   | The width of the canvas.                                                                                                                    |
| height          | string   | The height of the canvas.                                                                                                                   |
| options         | object   | The options of the particles instance.                                                                                                      |
| url             | string   | The remote options url, called using an AJAX request                                                                                        |
| style           | object   | The style of the canvas element.                                                                                                            |
| className       | string   | The class name of the canvas wrapper.                                                                                                       |
| canvasClassName | string   | the class name of the canvas.                                                                                                               |
| container       | object   | The instance of the [particles container](https://particles.js.org/docs/modules/Core_Container.html)                                        |
| particlesloaded | function | This function is called when particles are correctly loaded in canvas, the current container is the parameter and you can customize it here |

Find your parameters configuration [here](https://particles.js.org).

## Demos

You can see the official sample created using CodeSandbox [here](https://codesandbox.io/s/condescending-dan-7e0r9)

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
