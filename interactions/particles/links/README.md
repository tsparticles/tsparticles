[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Particles Links Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-particles-links/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-particles-links)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-particles-links.svg)](https://www.npmjs.com/package/@tsparticles/interaction-particles-links)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-particles-links)](https://www.npmjs.com/package/@tsparticles/interaction-particles-links) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for links effect between particles.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.particles.links.min.js` file will export the function to load the interaction
plugin:

```javascript
loadParticlesLinksInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadParticlesLinksInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-particles-links
```

or

```shell
$ yarn add @tsparticles/interaction-particles-links
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");
const { loadParticlesLinksInteraction } = require("@tsparticles/interaction-particles-links");

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadParticlesLinksInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadParticlesLinksInteraction(tsParticles);
})();
```

## Option mapping

- Primary options key: `particles.links`

```json
{
  "particles": {
    "links": {
      "enable": true
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
