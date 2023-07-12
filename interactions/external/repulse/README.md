[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Repulse Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-external-repulse/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-external-repulse)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-external-repulse.svg)](https://www.npmjs.com/package/tsparticles-interaction-external-repulse)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-external-repulse)](https://www.npmjs.com/package/tsparticles-interaction-external-repulse) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for repulse effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.repulse.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalRepulseInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadExternalRepulseInteraction(tsParticles);

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
$ npm install tsparticles-interaction-external-repulse
```

or

```shell
$ yarn add tsparticles-interaction-external-repulse
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadExternalRepulseInteraction } = require("tsparticles-interaction-external-repulse");

(async () => {
  await loadExternalRepulseInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";

(async () => {
  await loadExternalRepulseInteraction(tsParticles);
})();
```
