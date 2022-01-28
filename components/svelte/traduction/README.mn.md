[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) SvelteJS компонэнт

## Татах

```shell
npm install svelte-particles svelte
```

or

```shell
yarn add svelte-particles svelte
```

## Хэрхэн ашиглах

```html
<script>
  import Particles from "svelte-particles";

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

  let onParticlesInit = (main) => {
    // you can use main to customize the tsParticles instance adding presets or custom shapes
  };
</script>

<Particles
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
  on:particlesInit="{onParticlesInit}"
/>

<!-- эсвэл -->

<Particles
  id="tsparticles"
  url="{particlesUrl}"
  on:particlesLoaded="{onParticlesLoaded}"
  on:particlesInit="{onParticlesInit}"
/>
```

### SSR

Particles компонэнт нь SSR -д зориулж хийгдээгүй учир компонэнтийг хүчээр үйлчлүүлэгчийн талд дуудуулна
`async import` ашиглан

Жишээг доороос харна уу:

```html
<script>
  import { onMount } from "svelte";

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

    // та particlesContainer -ийг ашиглан бүх Container классын дуудаж болно
    // (үндсэн номын сангаас) тоглох, түр зогсоох, сэргээх, эхлүүлэх, зогсоох гэх зэрэг аргууд
  };

  let onParticlesInit = (main) => {
    // та энд tsParticles instance (main) ийг эхлүүлэн дурын дүрс нэмж болно
  };
</script>

<svelte:component
  this="{ParticlesComponent}"
  id="tsparticles"
  options="{particlesConfig}"
  on:particlesLoaded="{onParticlesLoaded}"
  on:particlesInit="{onParticlesInit}"
/>

<!-- эсвэл -->

<svelte:component
  this="{ParticlesComponent}"
  id="tsparticles"
  url="{particlesUrl}"
  on:particlesLoaded="{onParticlesLoaded}"
  on:particlesInit="{onParticlesInit}"
/>
```

## Жишээ

Жишээ [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
