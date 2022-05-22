[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Official [tsParticles](https://github.com/matteobruni/tsparticles) SvelteJS component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

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

  let particlesInit = async (engine) => {
    // you can use main to customize the tsParticles instance adding presets or custom shapes
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
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

### TypeScript errors

A user reported me a TypeScript error (#3963), and that's because this Svelte component is built using TypeScript.

If someone is experiencing the same error, please follow these steps:

- install these packages: `typescript`, `svelte-preprocess`.
- add a `tsconfig.json` file to your project, following this sample: <https://github.com/ivanhofer/sveltekit-typescript-showcase#configure-typescript> (see this for example: <https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/main/tsconfig.json>)
- import `svelte-preprocess` in your svelte configuration file, like this: `import preprocess from 'svelte-preprocess'` (see this for example: <https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/c824e45338ffc1a9c907c63d00a6a0af4884a0e9/svelte.config.js#L2>)
- use the `preprocess` function in your svelte configuration file, like this: `preprocess: preprocess(),` (see this for example: <https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/c824e45338ffc1a9c907c63d00a6a0af4884a0e9/svelte.config.js#L9>)

After that, everything should work as expected.

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
