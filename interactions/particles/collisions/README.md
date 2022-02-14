[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Particles Collisions Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-particles-collisions/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-particles-collisions)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-particles-collisions.svg)](https://www.npmjs.com/package/tsparticles-interaction-particles-collisions)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-particles-collisions)](https://www.npmjs.com/package/tsparticles-interaction-particles-collisions)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for collisions effect between particles.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.particles.collisions.min.js` file will export the function to load the interaction
plugin:

```javascript
loadParticlesCollisionsInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
loadParticlesCollisionsInteraction(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-interaction-particles-collisions
```

or

```shell
$ yarn add tsparticles-interaction-particles-collisions
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadParticlesCollisionsInteraction } = require("tsparticles-interaction-particles-collisions");

loadParticlesCollisionsInteraction(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadParticlesCollisionsInteraction } from "tsparticles-interaction-particles-collisions";

loadParticlesCollisionsInteraction(tsParticles);
```
