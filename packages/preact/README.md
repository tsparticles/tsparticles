[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/preact

[![npm](https://img.shields.io/npm/v/@tsparticles/preact)](https://www.npmjs.com/package/@tsparticles/preact) [![npm](https://img.shields.io/npm/dm/@tsparticles/preact)](https://www.npmjs.com/package/@tsparticles/preact) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) Preact component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
npm install @tsparticles/preact
```

or

```shell
yarn add @tsparticles/preact
```

## How to use

### Code

Examples:

_Remote url_

```javascript
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

class App extends Component {
    state = {
        particlesInitialized: false,
    };

    constructor(props) {
        super(props);

        this.particlesLoaded = this.particlesLoaded.bind(this);

        initParticlesEngine(async engine => {
            // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadFull(engine);
        }).then(() => {
            this.setState({
                particlesInitialized: true,
            });
        });
    }

    particlesLoaded(container) {
        console.log(container);
    }

    render() {
        if (!this.state.particlesInitialized) {
            return null;
        }

        return (
            <Particles id="tsparticles" url="http://foo.bar/particles.json" particlesLoaded={this.particlesLoaded} />
        );
    }
}
```

_Options object_

```javascript
import Particles from "@tsparticles/preact";
import { loadFull } from "tsparticles";

class App extends Component {
    state = {
        particlesInitialized: false,
    };

    constructor(props) {
        super(props);

        this.particlesLoaded = this.particlesLoaded.bind(this);

        initParticlesEngine(async engine => {
            // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadFull(engine);
        }).then(() => {
            this.setState({
                particlesInitialized: true,
            });
        });
    }

    particlesLoaded(container) {
        console.log(container);
    }

    render() {
        if (!this.state.particlesInitialized) {
            return null;
        }

        return (
            <Particles
                id="tsparticles"
                particlesLoaded={this.particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#0d47a1",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        );
    }
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
| particlesLoaded | function | This function is called when particles are correctly loaded in canvas, the current container is the parameter and you can customize it here |

Find your parameters configuration [here](https://particles.js.org).

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
