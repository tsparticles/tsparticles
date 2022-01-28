[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# particles.vue

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Официальный компонтент [tsParticles](https://github.com/matteobruni/tsparticles) для VueJS

## Установка

```shell script
yarn add particles.vue
```

## Применение

```javascript
import Particles from "particles.vue";

Vue.use(Particles);
```

### Пример конфигурации

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

### Ошибки TypeScript

Если TypeScript возвращает ошибку вовремя импорта/использования компонента, попробуйте добавить следующее определение перед предыдущим кодом:

```typescript
declare module "particles.vue";
```

## Демо

[Здесь](https://particles.js.org) размещены примеры использования библиотеки

<https://particles.js.org>

Также активно поддерживается и обновляется коллекция CodePen, которую можно посмотреть [здесь](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
