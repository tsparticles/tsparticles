[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Light Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-light/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-light)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-light.svg)](https://www.npmjs.com/package/tsparticles-interaction-light)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-light)](https://www.npmjs.com/package/tsparticles-interaction-light)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for light effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.light.min.js` file will export the function to load the interaction plugin:

```javascript
loadLightInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
loadLightInteraction(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-interaction-light
```

or

```shell
$ yarn add tsparticles-interaction-light
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadLightInteraction } = require("tsparticles-interaction-light");

loadLightInteraction(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadLightInteraction } from "tsparticles-interaction-light";

loadLightInteraction(tsParticles);
```
