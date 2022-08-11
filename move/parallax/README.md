[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Parallax Mover

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-move-parallax/badge)](https://www.jsdelivr.com/package/npm/tsparticles-move-parallax)
[![npmjs](https://badge.fury.io/js/tsparticles-move-parallax.svg)](https://www.npmjs.com/package/tsparticles-move-parallax)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-move-parallax)](https://www.npmjs.com/package/tsparticles-move-parallax) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) move plugin for parallax effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.move.parallax.min.js` file will export the function to load the interaction plugin:

```javascript
loadParallaxMover;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadParallaxMover(tsParticles);

  await tsParticles.load("tsparticles", {
    /* options */
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-move-parallax
```

or

```shell
$ yarn add tsparticles-move-parallax
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadParallaxMover } = require("tsparticles-move-parallax");

loadParallaxMover(tsParticles); // awaitable
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadParallaxMover } from "tsparticles-move-parallax";

loadParallaxMover(tsParticles); // awaitable
```
