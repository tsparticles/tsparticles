[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Shadow Effect

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/effect-shadow/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/effect-shadow)
[![npmjs](https://badge.fury.io/js/@tsparticles/effect-shadow.svg)](https://www.npmjs.com/package/@tsparticles/effect-shadow)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/effect-shadow)](https://www.npmjs.com/package/@tsparticles/effect-shadow) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional shadow effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.effect.shadow.min.js` file will export the function to load the effect:

```text
loadShadowEffect
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the effect like this:

```javascript
(async () => {
  await loadShadowEffect(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.effect.type: "shadow" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/effect-shadow
```

or

```shell
$ yarn add @tsparticles/effect-shadow
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadShadowEffect } = require("@tsparticles/effect-shadow");

(async () => {
  await loadShadowEffect(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadShadowEffect } from "@tsparticles/effect-shadow";

(async () => {
  await loadShadowEffect(tsParticles);
})();
```
