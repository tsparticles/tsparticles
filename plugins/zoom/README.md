[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Zoom Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-zoom/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-zoom)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-zoom.svg)](https://www.npmjs.com/package/@tsparticles/plugin-zoom)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-zoom)](https://www.npmjs.com/package/@tsparticles/plugin-zoom) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling zoom interactions.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.zoom.min.js` file will export the function to load the plugin:

```javascript
loadZoomPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadZoomPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-zoom
```

or

```shell
$ yarn add @tsparticles/plugin-zoom
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadZoomPlugin } = require("@tsparticles/plugin-zoom");

(async () => {
  await loadZoomPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadZoomPlugin } from "@tsparticles/plugin-zoom";

(async () => {
  await loadZoomPlugin(tsParticles);
})();
```
