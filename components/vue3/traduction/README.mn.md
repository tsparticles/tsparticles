[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# particles.vue3

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) VueJS 3.x компонэнт

## Татах

```shell script
yarn add particles.vue3 vue@3
```

## Хэрхэн ашиглах

```javascript
import Particles from "particles.vue3";

createApp(App).use(Particles)
```

### Жишээ тохиргоо

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

Хэрвээ TypeScript Partiles plugin импортлох/хэрэглэх үед алдаа гаргавал доорх мөрийг кодныхоо өмнө оруулаарай:

```typescript
declare module "particles.vue3";
```

## Жишээ

Жишээ [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>

## Vue 2.x -оос Vue 3.x руу шилжих

Хэрвээ та прожектоо Vue 2.x -оос Vue 3.x руу шилжүүлж байгаа бол дөрөөх алхамыг дагана уу:

- `particles.vue` -ын хараат байдлыг `particles.vue3` болгон өөрчилнө үү.
- `node_modules` хавтсын `npm install` эсвэл `yarn` ашиглах шинэчилнэ үү.
- `Vue.use(Particles)` доторх `use` функцийг `createApp(App).use(Particles)` болгон өөрчилнө үү.

`<Particles />` хаяг хэвээр учир өөрчлөх шаардлагагүй.
