[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# particles.vue3

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Official [tsParticles](https://github.com/matteobruni/tsparticles) VueJS 3.x component

## Installation

```shell script
yarn add particles.vue3 vue@3
```

## Usage

```javascript
import Particles from "particles.vue3";

createApp(App).use(Particles)
```

### Demo config

```html

<template>
    <div id="app">
        <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                url="http://foo.bar/particles.json"
        />

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
                    fpsLimit: 60,
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
                                value_area: 800
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

If TypeScript returns error while importing/using Particles plugin try adding the following import before the previous
code:

```typescript
declare module "particles.vue3";
```

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>

## Migrating from Vue 2.x to Vue 3.x

If you are migrating your project from Vue 2.x to 3.x you need to these steps:

- Change the dependency from `particles.vue` to `particles.vue3`
- Update the `node_modules` folder executing `npm install` or `yarn`
- Change the `use` function from `Vue.use(Particles)` to `createApp(App).use(Particles)`.

The `<Particles />` tag syntax remains the same, so you don't need to do any additional action.
