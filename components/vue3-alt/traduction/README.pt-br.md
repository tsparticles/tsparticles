[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# particles.vue3

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Componente Oficial [tsParticles](https://github.com/matteobruni/tsparticles) para VueJS 3.x

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Instalação

```shell script
yarn add particles.vue3
```

## Como usar

```javascript
import Particles from "particles.vue3";

createApp(App).use(Particles);
```

### Configuração de exemplo

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

### Erros de TypeScript

Se o Typescript retornar algum erro ao importar/utilizar o plugin, tente adicionar o seguinte import antes do exemplo anterior:

```typescript
declare module "particles.vue3";
```

## Demos

O website com a demo está [aqui](https://particles.js.org)

<https://particles.js.org>

Também existe uma coleção no CodePen ativamente mantida e atualizada [aqui](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
