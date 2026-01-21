[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Interactivity Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-interactivity/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-interactivity)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-interactivity.svg)](https://www.npmjs.com/package/@tsparticles/plugin-interactivity)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-interactivity)](https://www.npmjs.com/package/@tsparticles/plugin-interactivity) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling interactivity sickness CSS value.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.interactivity.min.js` file will export the function to load the plugin:

```javascript
loadInteractivityPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-interactivity
```

or

```shell
$ yarn add @tsparticles/plugin-interactivity
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");

(async () => {
  await loadInteractivityPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";

(async () => {
  await loadInteractivityPlugin(tsParticles);
})();
```
