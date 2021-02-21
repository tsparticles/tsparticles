[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Componente Oficial [tsParticles](https://github.com/matteobruni/tsparticles) para SvelteJS

## Instalação

```shell
npm install svelte-particles
```

ou

```shell
yarn add svelte-particles
```

## Como usar

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

    // você pode usar particlesContainer para chamar todos os métodos da classe
    // Container (da biblioteca principal) como play, pause, refresh, start, stop
  };
</script>

<Particles
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
/>
```

### SSR

O componente de partículas não foi criado para SSR, então você deve forçar o componente a ser chamado no lado do cliente com `async import`.

Você pode ver um exemplo abaixo:

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

    // você pode usar particlesContainer para chamar todos os métodos da classe
    // Container (da biblioteca principal) como play, pause, refresh, start, stop
  };
</script>

<svelte:component
  this="{ParticlesComponent}"
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
/>
```

## Demos

O website com a demo está [aqui](https://particles.js.org)

<https://particles.js.org>

Também existe uma coleção no CodePen ativamente mantida e atualizada [aqui](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
