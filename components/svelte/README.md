[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Official [tsParticles](https://github.com/matteobruni/tsparticles) SvelteJS component

## Installation

```shell
npm install svelte-particles svelte
```

or

```shell
yarn add svelte-particles svelte
```

## Usage

```html
<script>
  import Particles from "svelte-particles";
  import { loadFull } from "tsparticles";

  let particlesUrl = "http://foo.bar/particles.json";

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

  let particlesInit = async (main) => {
    // you can use main to customize the tsParticles instance adding presets or custom shapes
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
</script>

<Particles
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
  particlesInit="{particlesInit}"
/>

<!-- or -->

<Particles
  id="tsparticles"
  url="{particlesUrl}"
  on:particlesLoaded="{onParticlesLoaded}"
  particlesInit="{particlesInit}"
/>
```

### SSR

The particles component isn't built for SSR, so you have to force the component to be called client side
with `async import`.

You can see a sample below:

```html
<script>
  import { onMount } from "svelte";
  import { loadFull } from "tsparticles";

  let ParticlesComponent;

  onMount(async () => {
    const module = await import("svelte-particles");

    ParticlesComponent = module.default;
  });

  let particlesUrl = "http://foo.bar/particles.json";

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

  let particlesInit = async (main) => {
    // you can use main to customize the tsParticles instance adding presets or custom shapes
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
</script>

<svelte:component
  this="{ParticlesComponent}"
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
  particlesInit="{particlesInit}"
/>

<!-- or -->

<svelte:component
  this="{ParticlesComponent}"
  id="tsparticles"
  url="{particlesUrl}"
  on:particlesLoaded="{onParticlesLoaded}"
  particlesInit="{particlesInit}"
/>
```

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
