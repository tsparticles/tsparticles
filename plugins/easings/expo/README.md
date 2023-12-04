[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Expo Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-expo/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-expo)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-expo.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-expo)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-expo)](https://www.npmjs.com/package/@tsparticles/plugin-easing-expo) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing expo support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.expo.min.js` file will export the function to load the plugin:

```text
loadEasingExpoPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingExpoPlugin();

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
$ npm install @tsparticles/plugin-easing-expo
```

or

```shell
$ yarn add @tsparticles/plugin-easing-expo
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingExpoPlugin } = require("@tsparticles/plugin-easing-expo");

(async () => {
  await loadEasingExpoPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingExpoPlugin } from "@tsparticles/plugin-easing-expo";

(async () => {
  await loadEasingExpoPlugin();
})();
```
