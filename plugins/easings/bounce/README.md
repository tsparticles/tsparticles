[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Bounce Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-bounce/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-bounce)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-bounce.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-bounce)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-bounce)](https://www.npmjs.com/package/@tsparticles/plugin-easing-bounce) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing bounce support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.bounce.min.js` file will export the function to load the plugin:

```text
loadEasingBlendPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingBlendPlugin();

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
$ npm install @tsparticles/plugin-easing-bounce
```

or

```shell
$ yarn add @tsparticles/plugin-easing-bounce
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingBlendPlugin } = require("@tsparticles/plugin-easing-bounce");

(async () => {
  await loadEasingBlendPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingBlendPlugin } from "@tsparticles/plugin-easing-bounce";

(async () => {
  await loadEasingBlendPlugin();
})();
```
