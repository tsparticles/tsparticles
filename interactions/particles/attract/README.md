[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Particles Attraction Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-particles-attract/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-particles-attract)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-particles-attract.svg)](https://www.npmjs.com/package/tsparticles-interaction-particles-attract)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-particles-attract)](https://www.npmjs.com/package/tsparticles-interaction-particles-attract) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for attract effect between particles.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.particles.attract.min.js` file will export the function to load the interaction
plugin:

```javascript
loadParticlesAttractInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
loadParticlesAttractInteraction(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-interaction-particles-attract
```

or

```shell
$ yarn add tsparticles-interaction-particles-attract
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadParticlesAttractInteraction } = require("tsparticles-interaction-particles-attract");

loadParticlesAttractInteraction(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadParticlesAttractInteraction } from "tsparticles-interaction-particles-attract";

loadParticlesAttractInteraction(tsParticles);
```
