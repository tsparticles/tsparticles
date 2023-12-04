[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Particles Repulsion Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-particles-repulse/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-particles-repulse)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-particles-repulse.svg)](https://www.npmjs.com/package/@tsparticles/interaction-particles-repulse)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-particles-repulse)](https://www.npmjs.com/package/@tsparticles/interaction-particles-repulse) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for repulse effect between particles.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.particles.repulse.min.js` file will export the function to load the interaction
plugin:

```text
loadParticlesRepulseInteraction
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadParticlesRepulseInteraction(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/interaction-particles-repulse
```

or

```shell
$ yarn add @tsparticles/interaction-particles-repulse
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadParticlesRepulseInteraction } = require("@tsparticles/interaction-particles-repulse");

(async () => {
  await loadParticlesRepulseInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadParticlesRepulseInteraction } from "@tsparticles/interaction-particles-repulse";

(async () => {
  await loadParticlesRepulseInteraction(tsParticles);
})();
```
