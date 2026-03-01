[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Move Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-move/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-move)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-move.svg)](https://www.npmjs.com/package/@tsparticles/plugin-move)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-move)](https://www.npmjs.com/package/@tsparticles/plugin-move) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) move plugin for standard movement effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.move.min.js` file will export the function to load the interaction plugin:

```javascript
loadMovePlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadMovePlugin(tsParticles);

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
$ npm install @tsparticles/plugin-move
```

or

```shell
$ yarn add @tsparticles/plugin-move
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadMovePlugin } = require("@tsparticles/plugin-move");

(async () => {
  await loadMovePlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadMovePlugin } from "@tsparticles/plugin-move";

(async () => {
  await loadMovePlugin(tsParticles);
})();
```
