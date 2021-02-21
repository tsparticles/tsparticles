[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Официальный компонтент [tsParticles](https://github.com/matteobruni/tsparticles) для SvelteJS

## Установка

```shell
npm install svelte-particles
```

или

```shell
yarn add svelte-particles
```

## Применение

```html
<script>
  import Particles from "svelte-particles";

  let particlesConfig = {
    particles: {
      color: {
        value: "#000",
      },
      links: {
        enable: true,
        color: "#000",
      },
      move: {
        enable: true,
      },
    },
  };

  let onParticlesLoaded = (event) => {
    const particlesContainer = event.detail.particles;

    // вы можете использовать particlesContainer для вызова всех методов класса Container
    // (из библиотеки), таких как пауза, обновление, запуск, остановка
  };
</script>

<Particles
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
/>
```

### Серверный рендер (SSR)

Компонент частиц не имеет поддержки SSR, поэтому компонент должен вызываться на стороне клиента с помощью `async import`.

Пример ниже:

```html
<script>
  import { onMount } from "svelte";

  let ParticlesComponent;

  onMount(async () => {
    const module = await import("svelte-particles");

    ParticlesComponent = module.default;
  });

  let particlesConfig = {
    particles: {
      color: {
        value: "#000",
      },
      links: {
        enable: true,
        color: "#000",
      },
      move: {
        enable: true,
      },
    },
  };

  let onParticlesLoaded = (event) => {
    const particlesContainer = event.detail.particles;

    // вы можете использовать particlesContainer для вызова всех методов класса Container
    // (из библиотеки), таких как пауза, обновление, запуск, остановка
  };
</script>

<svelte:component
  this="{ParticlesComponent}"
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
/>
```

## Демо

[Здесь](https://particles.js.org) размещены примеры использования библиотеки

<https://particles.js.org>

Также активно поддерживается и обновляется коллекция CodePen, которую можно посмотреть [здесь](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
