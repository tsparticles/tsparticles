[![banner](https://cdn.matteobruni.it/images/particles/banner2.png)](https://particles.matteobruni.it)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Official [tsParticles](https://github.com/matteobruni/tsparticles) SvelteJS component

## Installation

```shell
npm install svelte-particles
```

or

```shell
yarn add svelte-particles
```

## Usage

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

    // you can use particlesContainer to call all the Container class
    // (from the core library) methods like play, pause, refresh, start, stop
  };
</script>

<Particles
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
/>
```

### SSR

The particles component isn't built for SSR, so you have to force the component to be called client side with `async import`.

You can see a sample below:

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

    // you can use particlesContainer to call all the Container class
    // (from the core library) methods like play, pause, refresh, start, stop
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

The demo website is [here](https://particles.matteobruni.it)

<https://particles.matteobruni.it>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
