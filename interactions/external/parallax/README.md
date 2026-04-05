[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Parallax Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-parallax/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-parallax)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-parallax.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-parallax)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-parallax)](https://www.npmjs.com/package/@tsparticles/interaction-external-parallax) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for parallax effect around mouse or HTML
elements.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.parallax.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalParallaxInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalParallaxInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-external-parallax
```

or

```shell
$ yarn add @tsparticles/interaction-external-parallax
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");
const { loadExternalParallaxInteraction } = require("@tsparticles/interaction-external-parallax");

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalParallaxInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadExternalParallaxInteraction } from "@tsparticles/interaction-external-parallax";

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalParallaxInteraction(tsParticles);
})();
```

## Option mapping

- Event mode key: `interactivity.events.onHover.mode` or `interactivity.events.onClick.mode` with value `"parallax"`
- Mode options key: `interactivity.modes.parallax`

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "parallax"
      }
    },
    "modes": {
      "parallax": {}
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
