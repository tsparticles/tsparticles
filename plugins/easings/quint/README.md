[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Quint Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-quint/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-quint)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-quint.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-quint)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-quint)](https://www.npmjs.com/package/@tsparticles/plugin-easing-quint) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing quint support.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.quint.min.js` file will export the function to load the plugin:

```text
loadEasingQuintPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingQuintPlugin();

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
$ npm install @tsparticles/plugin-easing-quint
```

or

```shell
$ yarn add @tsparticles/plugin-easing-quint
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingQuintPlugin } = require("@tsparticles/plugin-easing-quint");

(async () => {
  await loadEasingQuintPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingQuintPlugin } from "@tsparticles/plugin-easing-quint";

(async () => {
  await loadEasingQuintPlugin();
})();
```

## Option mapping

- This package primarily extends runtime behavior or rendering and may not expose a single dedicated root options key.
- Use the usage example in this README and combine with the nearest options section in the docs.

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadEasingQuintPlugin(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
