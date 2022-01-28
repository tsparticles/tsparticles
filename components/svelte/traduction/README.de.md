[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# svelte-particles

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Offizieller [tsParticles](https://github.com/matteobruni/tsparticles) SvelteJS-Komponent.

## Installation

```shell

npm install svelte-particles

```

oder

```shell

yarn add svelte-particles

```

## Verwendung

```html
<script>
  import Particles from 'svelte-particles';

  let particlesConfig = {
    particles: {
      color: {
        value: '#000',
      },

      links: {
        enable: true,

        color: '#000',
      },

      move: {
        enable: true,
      },
    },
  };

  let onParticlesLoaded = event => {
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

Der Partikel-Komponent ist nicht für SSR programmiert, sodass du den Aufruf des Komponenten auf der Client-Seite mit `async import` erzwingen musst.

Im Folgenden siehst du ein Beispiel:

```html
<script>
  import { onMount } from 'svelte';

  let ParticlesComponent;

  onMount(async () => {
    const module = await import('svelte-particles');

    ParticlesComponent = module.default;
  });

  let particlesConfig = {
    particles: {
      color: {
        value: '#000',
      },

      links: {
        enable: true,

        color: '#000',
      },

      move: {
        enable: true,
      },
    },
  };

  let onParticlesLoaded = event => {
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

Klicke [hier](https://particles.js.org) für die Demo-Webseite.

<https://particles.js.org>

[Hier](https://codepen.io/collection/DPOage) gibt es auch eine CodePen-Sammlung, die aktiv gepflegt und geupdated wird.

<https://codepen.io/collection/DPOage>
