[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Themes Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-themes/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-themes)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-themes.svg)](https://www.npmjs.com/package/@tsparticles/plugin-themes)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-themes)](https://www.npmjs.com/package/@tsparticles/plugin-themes) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling themes feature.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.themes.min.js` file will export the function to load the plugin:

```javascript
loadThemesPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadThemesPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-themes
```

or

```shell
$ yarn add @tsparticles/plugin-themes
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadThemesPlugin } = require("@tsparticles/plugin-themes");

(async () => {
  await loadThemesPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadThemesPlugin } from "@tsparticles/plugin-themes";

(async () => {
  await loadThemesPlugin(tsParticles);
})();
```
