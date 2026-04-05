[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Remove Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-remove/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-remove)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-remove.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-remove)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-remove)](https://www.npmjs.com/package/@tsparticles/interaction-external-remove) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for remove effect around mouse or HTML
elements.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.remove.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalRemoveInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalRemoveInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-external-remove
```

or

```shell
$ yarn add @tsparticles/interaction-external-remove
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");
const { loadExternalRemoveInteraction } = require("@tsparticles/interaction-external-remove");

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalRemoveInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadExternalRemoveInteraction } from "@tsparticles/interaction-external-remove";

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalRemoveInteraction(tsParticles);
})();
```

## Option mapping

- Event mode key: `interactivity.events.onHover.mode` or `interactivity.events.onClick.mode` with value `"remove"`
- Mode options key: `interactivity.modes.remove`

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "remove"
      }
    },
    "modes": {
      "remove": {}
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadInteractivityPlugin(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
