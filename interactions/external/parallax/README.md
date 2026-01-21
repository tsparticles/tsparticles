[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Parallax Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-parallax/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-parallax)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-parallax.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-parallax)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-parallax)](https://www.npmjs.com/package/@tsparticles/interaction-external-parallax) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for parallax effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.parallax.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalParallaxInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadExternalParallaxInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-external-parallax
```

or

```shell
$ yarn add @tsparticles/interaction-external-parallax
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadExternalParallaxInteraction } = require("@tsparticles/interaction-external-parallax");

(async () => {
  await loadExternalParallaxInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadExternalParallaxInteraction } from "@tsparticles/interaction-external-parallax";

(async () => {
  await loadExternalParallaxInteraction(tsParticles);
})();
```
