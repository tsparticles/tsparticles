[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Push Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-external-push/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-external-push)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-external-push.svg)](https://www.npmjs.com/package/tsparticles-interaction-external-push)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-external-push)](https://www.npmjs.com/package/tsparticles-interaction-external-push) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for push effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.push.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalPushInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadExternalPushInteraction(tsParticles);

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
$ npm install tsparticles-interaction-external-push
```

or

```shell
$ yarn add tsparticles-interaction-external-push
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadExternalPushInteraction } = require("tsparticles-interaction-external-push");

(async () => {
  await loadExternalPushInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";

(async () => {
  await loadExternalPushInteraction(tsParticles);
})();
```
