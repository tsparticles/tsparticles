[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Standard Mover

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/move-base/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/move-base)
[![npmjs](https://badge.fury.io/js/@tsparticles/move-base.svg)](https://www.npmjs.com/package/@tsparticles/move-base)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/move-base)](https://www.npmjs.com/package/@tsparticles/move-base) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) move plugin for standard movement effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.move.base.min.js` file will export the function to load the interaction plugin:

```javascript
loadBaseMover;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadBaseMover(tsParticles);

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
$ npm install @tsparticles/move-base
```

or

```shell
$ yarn add @tsparticles/move-base
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadBaseMover } = require("@tsparticles/move-base");

(async () => {
  await loadBaseMover(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadBaseMover } from "@tsparticles/move-base";

(async () => {
  await loadBaseMover(tsParticles);
})();
```
