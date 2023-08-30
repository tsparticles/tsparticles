[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Pause Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-pause/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-pause)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-pause.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-pause)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-pause)](https://www.npmjs.com/package/@tsparticles/interaction-external-pause) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for pause effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.pause.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalPauseInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadExternalPauseInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-external-pause
```

or

```shell
$ yarn add @tsparticles/interaction-external-pause
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadExternalPauseInteraction } = require("@tsparticles/interaction-external-pause");

(async () => {
  await loadExternalPauseInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadExternalPauseInteraction } from "@tsparticles/interaction-external-pause";

(async () => {
  await loadExternalPauseInteraction(tsParticles);
})();
```
