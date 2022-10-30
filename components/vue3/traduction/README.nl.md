[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# vue3-particles

[![npm](https://img.shields.io/npm/v/vue3-particles)](https://www.npmjs.com/package/vue3-particles) [![npm](https://img.shields.io/npm/dm/vue3-particles)](https://www.npmjs.com/package/vue3-particles)

Officiële [tsParticles](https://github.com/matteobruni/tsparticles) VueJS 3.x component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installatie

```shell script
yarn add vue3-particles
```

## Gebruik

```javascript
import Particles from "vue3-particles";

createApp(App).use(Particles);
```

### Demo configuratie

```html
<template>
    <div id="app">
        <Particles
            id="tsparticles"
            :options="{
            background: {
                color: {
                    value: '#0d47a1'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40
                    },
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#ffffff'
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outMode: 'bounce',
                    random: false,
                    speed: 6,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    random: true,
                    value: 5
                }
            },
            detectRetina: true
        }"
        />
    </div>
</template>
```

### TypeScript errors

Als TypeScript foutmeldingen geeft tijdens het importeren of gebruik maken van de Particles plugin probeer de volgende import toe te voegen voor de vorige stuk code:

```typescript
declare module "vue3-particles";
```

## Demos

De demo website is [hier](https://particles.js.org)

<https://particles.js.org>

Er is ook een CodePen collectie die actief onderhouden en geüpdated wordt [hier](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
