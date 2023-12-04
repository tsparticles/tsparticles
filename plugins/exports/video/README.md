[![banner](https://particles.js.org/videos/banner3.png)](https://particles.js.org)

# tsParticles Export Video Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-export-video/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-export-video)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-export-video.svg)](https://www.npmjs.com/package/@tsparticles/plugin-export-video)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-export-video)](https://www.npmjs.com/package/@tsparticles/plugin-export-video) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the export video support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.export.video.min.js` file will export the function to load the plugin:

```text
loadExportVideoPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadExportVideoPlugin();

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
$ npm install @tsparticles/plugin-export-video
```

or

```shell
$ yarn add @tsparticles/plugin-export-video
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadExportVideoPlugin } = require("@tsparticles/plugin-export-video");

(async () => {
  await loadExportVideoPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadExportVideoPlugin } from "@tsparticles/plugin-export-video";

(async () => {
  await loadExportVideoPlugin();
})();
```
