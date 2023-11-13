[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Trail Effect

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/effect-trail/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/effect-trail)
[![npmjs](https://badge.fury.io/js/@tsparticles/effect-trail.svg)](https://www.npmjs.com/package/@tsparticles/effect-trail)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/effect-trail)](https://www.npmjs.com/package/@tsparticles/effect-trail) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional trail effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.effect.trail.min.js` file will export the function to load the effect:

```text
loadTrailEffect
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the effect like this:

```javascript
(async () => {
  await loadTrailEffect(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.effect.type: "trail" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/effect-trail
```

or

```shell
$ yarn add @tsparticles/effect-trail
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadTrailEffect } = require("@tsparticles/effect-trail");

(async () => {
  await loadTrailEffect(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadTrailEffect } from "@tsparticles/effect-trail";

(async () => {
  await loadTrailEffect(tsParticles);
})();
```
