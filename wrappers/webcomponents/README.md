[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/webcomponents

[![npm](https://img.shields.io/npm/v/@tsparticles/webcomponents)](https://www.npmjs.com/package/@tsparticles/webcomponents) [![npm](https://img.shields.io/npm/dm/@tsparticles/webcomponents)](https://www.npmjs.com/package/@tsparticles/webcomponents) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Web Component.

## Installation

```shell
npm install @tsparticles/webcomponents @tsparticles/engine
```

or

```shell
yarn add @tsparticles/webcomponents @tsparticles/engine
```

## Usage

```ts
import { tsParticles } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";

globalThis.tsParticles = tsParticles;

await initParticlesEngine(async engine => {
  await loadSlim(engine);
});
```

Then use the custom element:

```html
<web-particles id="tsparticles" url="https://foo.bar/particles.json"></web-particles>

<!-- or -->

<web-particles id="tsparticles-options"></web-particles>

<script>
  const element = document.getElementById("tsparticles-options");

  element.options = {
    background: {
      color: {
        value: "#0d47a1",
      },
    },
    particles: {
      links: {
        enable: true,
      },
      move: {
        enable: true,
      },
    },
  };

  element.addEventListener("particlesLoaded", event => {
    console.log(event.detail);
  });
</script>
```
