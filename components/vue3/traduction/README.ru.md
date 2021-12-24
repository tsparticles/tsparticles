[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# particles.vue3

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Официальный компонтент [tsParticles](https://github.com/matteobruni/tsparticles) для VueJS версии 3.x

## Установка

```shell script
yarn add particles.vue3
```

## Применение

```javascript
import Particles from "particles.vue3";

createApp(App).use(Particles);
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
declare module "particles.vue3";
```

## Демо

[Здесь](https://particles.js.org) размещены примеры использования библиотеки

<https://particles.js.org>

Также активно поддерживается и обновляется коллекция CodePen, которую можно посмотреть [здесь](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
