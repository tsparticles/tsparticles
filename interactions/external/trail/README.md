[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Trail Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-external-trail/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-external-trail)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-external-trail.svg)](https://www.npmjs.com/package/tsparticles-interaction-external-trail)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-external-trail)](https://www.npmjs.com/package/tsparticles-interaction-external-trail) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for trail effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.trail.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalTrailInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadExternalTrailInteraction(tsParticles);

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
$ npm install tsparticles-interaction-external-trail
```

or

```shell
$ yarn add tsparticles-interaction-external-trail
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadExternalTrailInteraction } = require("tsparticles-interaction-external-trail");

(async () => {
  await loadExternalTrailInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";

(async () => {
  await loadExternalTrailInteraction(tsParticles);
})();
```
