[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Responsive Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-responsive/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-responsive)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-responsive.svg)](https://www.npmjs.com/package/@tsparticles/plugin-responsive)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-responsive)](https://www.npmjs.com/package/@tsparticles/plugin-responsive) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling responsive feature.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.responsive.min.js` file will export the function to load the plugin:

```javascript
loadResponsivePlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadResponsivePlugin(tsParticles);

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
$ npm install @tsparticles/plugin-responsive
```

or

```shell
$ yarn add @tsparticles/plugin-responsive
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadResponsivePlugin } = require("@tsparticles/plugin-responsive");

(async () => {
  await loadResponsivePlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadResponsivePlugin } from "@tsparticles/plugin-responsive";

(async () => {
  await loadResponsivePlugin(tsParticles);
})();
```
