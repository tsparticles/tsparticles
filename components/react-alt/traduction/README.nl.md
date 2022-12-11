[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# react-tsparticles

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Officiële [tsParticles](https://github.com/matteobruni/tsparticles) ReactJS component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installatie

```shell
npm install react-tsparticles
```

or

```shell
yarn add react-tsparticles
```

#### create-react-app

Vanaf versie 1.17.0 zijn er twee officiële `create-react-app` sjablonen:

-   `cra-template-particles`: Simpele ReactJS sjabloon met full screen deeltjes. Gebruikt JavaScript
-   `cra-template-particles-typescript`: Simpele ReactJS sjabloon met full screen deeltjes. Gebruikt TypeScript

Je kan ze simpelweg installeren met de `create-react-app` command als dit:

```shell script
create-react-app your_app --template particles
```

or

```shell script
create-react-app your_app --template particles-typescript
```

## Hoe je het gebruikt

### Code

Voorbeeld:

```javascript
import Particles from "react-tsparticles";

const App = () => {
    const particlesInit = main => {
        console.log(main);

        // u kunt hier de instantie van tsParticles (main) initialiseren en aangepaste vormen of voorinstellingen toevoegen
    };

    const particlesLoaded = container => {
        console.log(container);
    };
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
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
                        bubble: {
                            distance: 400,
                            duration: 2,
                            opacity: 0.8,
                            size: 40,
                        },
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
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
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
                        random: true,
                        value: 5,
                    },
                },
                detectRetina: true,
            }}
        />
    );
};
```

### Props

| Prop            | Type   | Definition                                                                                            |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| width           | string | De breedte van het canvas.                                                                            |
| height          | string | De height van het canvas.                                                                             |
| options         | object | De options van de deeltjes instantie.                                                                 |
| style           | object | De stijl van het canvas element.                                                                      |
| className       | string | De class naam van de canvas wrapper.                                                                  |
| canvasClassName | string | De class naam van het canvas.                                                                         |
| container       | object | De instantie van de [deeltjes container](https://particles.js.org/docs/modules/_core_container_.html) |

Vind je parameters configuratie [hier](https://particles.js.org).

### Errors

Als je TypeScript errors hebt, `tsParticles` gebruikt TypeScript `3.9.6` dus probeer op zijn minst 3.8 te installeren voor de `import type` syntaxis.

## Demos

De demo website is [hier](https://particles.js.org)

<https://particles.js.org>

Er is ook een CodePen collectie die actief onderhouden en geüpdated wordt [hier](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
