[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# particles.vue3

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Virallinen [tsParticles](https://github.com/matteobruni/tsparticles) VueJS 3.x komponentti

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Asennus

```shell script
yarn add particles.vue3
```

## Käyttö

```javascript
import Particles from "particles.vue3";

createApp(App).use(Particles)
```

### Demo konfiguraatio

```html

<template>
    <div id="app">
        <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                url="http://foo.bar/particles.json"
        />

        <!-- tai -->

        <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
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
                            outModes: {
                                default: 'bounce'
                            },
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
                            value: { min: 1, max: 5 },
                        }
                    },
                    detectRetina: true
                }"
        />
    </div>
</template>
```

```javascript
import { loadFull } from "tsparticles";

const particlesInit = async (engine) => {
    await loadFull(engine);
}

const particlesLoaded = async (container) => {
    console.log("Particles container loaded", container);
}
```

### TypeScript ongelmat

Jos TypeScript palauttaa virheen tuodessaan/käytettäessä Particles-laajennusta, kokeile lisätä seuraava koodi ennen
edellistä.

```typescript
declare module "particles.vue3";
```

## Demot

Demo verkkosivu löytyy [täältä](https://particles.js.org)

<https://particles.js.org>

Aktiivisesti ylläpidetty ja päivitetty CodePen kokoelma löytyy [täältä](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>

## Siirtyminen versiosta Vue 2.x versioon Vue 3.x

Jos olet siirtämässä projektia Vue 2.x:stä 3.x:ään, sinun on toimittava seuraavasti:

- Muuta riippuvuus (dependency) `vue2-particles` -> `vue3-particles`
- Päivitä `node_modules` kansio suorittamalla `npm install` tai `yarn`
- Vaihda `use` funktio `Vue.use(Particles)` -> `createApp(App).use(Particles)`.

`<Particles />` tagin syntaksi pysyy samana, joten sinun ei tarvitse tehdä muita toimenpiteitä.