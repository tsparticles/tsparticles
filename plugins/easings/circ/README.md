[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Circ Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-circ/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-circ)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-circ.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-circ)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-circ)](https://www.npmjs.com/package/@tsparticles/plugin-easing-circ) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing circ support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.circ.min.js` file will export the function to load the plugin:

```text
loadEasingCircPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingCircPlugin();

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
$ npm install @tsparticles/plugin-easing-circ
```

or

```shell
$ yarn add @tsparticles/plugin-easing-circ
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingCircPlugin } = require("@tsparticles/plugin-easing-circ");

(async () => {
  await loadEasingCircPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingCircPlugin } from "@tsparticles/plugin-easing-circ";

(async () => {
  await loadEasingCircPlugin();
})();
```
