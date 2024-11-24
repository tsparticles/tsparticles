[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles - TypeScript Particles

**A lightweight TypeScript library for creating particles. Dependency free (\*), browser ready and compatible with
React.js, Vue.js (2.x and 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js, and Web Components**

[![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni?style=for-the-badge)](https://github.com/sponsors/matteobruni)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/tsparticles?style=for-the-badge)](https://www.jsdelivr.com/package/npm/tsparticles)
[![Cdnjs](https://img.shields.io/cdnjs/v/@tsparticles/engine?style=for-the-badge)](https://cdnjs.com/libraries/tsparticles)
[![npm](https://img.shields.io/npm/v/@tsparticles/engine?style=for-the-badge)](https://www.npmjs.com/package/tsparticles)
[![npm](https://img.shields.io/npm/dm/tsparticles?style=for-the-badge)](https://www.npmjs.com/package/tsparticles)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff?style=for-the-badge)](https://lerna.js.org/)
[![CodeFactor](https://www.codefactor.io/repository/github/tsparticles/tsparticles/badge)](https://www.codefactor.io/repository/github/tsparticles/tsparticles)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=tsparticles/tsparticles&utm_campaign=Badge_Grade)
[![Rate this package](https://badges.openbase.com/js/rating/tsparticles.svg?style=openbase&token=A9jHQ1nkb6fnCndKM7O2w4hx3OD8PVCuqHtSpw8mMOg=)](https://openbase.com/js/tsparticles?utm_source=embedded&utm_medium=badge&utm_campaign=rating-badge&utm_term=js/tsparticles)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/tsparticles/tsparticles)
[![Run on Repl.it](https://repl.it/badge/github/tsparticles/tsparticles)](https://repl.it/github/tsparticles/tsparticles)

[![Discord](https://img.shields.io/discord/872061157379301416?label=discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/hACwv45Hme)
[![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)
[![Reddit](https://img.shields.io/reddit/subreddit-subscribers/tsParticles?style=for-the-badge)](https://www.reddit.com/r/tsParticles/)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")
[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00")](https://www.buymeacoffee.com/matteobruni)

---

## Table of Contents

- [tsParticles - TypeScript Particles](#tsparticles---typescript-particles)
- [Table of Contents](#table-of-contents)
- [Do you want to use it on your website?](#do-you-want-to-use-it-on-your-website)
- [**_Library installation_**](#library-installation)
- [**_Hosting / CDN_**](#hosting--cdn)
- [jsDelivr](#jsdelivr)
- [cdnjs](#cdnjs)
- [unpkg](#unpkg)
- [**_npm_**](#npm)
- [**_yarn_**](#yarn)
- [**_pnpm_**](#pnpm)
- [Import and require](#import-and-require)
- [**_Usage_**](#usage)
- [Official components for some of the most used frameworks](#official-components-for-some-of-the-most-used-frameworks)
- [Angular](#angular)
- [`@tsparticles/angular`](#@tsparticles/angular)
- [Astro](#astro)
- [`astro-particles`](#astro-particles)
- [Ember.js](#emberjs)
- [`ember-tsparticles`](#ember-tsparticles)
- [Inferno](#inferno)
- [`inferno-particles`](#inferno-particles)
- [jQuery](#jquery)
- [`jquery-particles`](#jquery-particles)
- [Preact](#preact)
- [`preact-particles`](#preact-particles)
- [ReactJS](#reactjs)
- [`@tsparticles/react`](#tsparticlesreact)
- [RiotJS](#riotjs)
- [`riot-particles`](#riot-particles)
- [SolidJS](#solidjs)
- [`solid-particles`](#solid-particles)
- [Svelte](#svelte)
- [`@tsparticles/svelte`](#@tsparticles/svelte)
- [VueJS 2.x](#vuejs-2x)
- [`@tsparticles/vue2`](#tsparticlesvue2)
- [VueJS 3.x](#vuejs-3x)
- [`@tsparticles/vue3`](#tsparticlesvue3)
- [Web Components](#web-components)
- [`web-particles`](#web-particles)
- [WordPress](#wordpress)
- [`@tsparticles/wordpress`](#@tsparticles/wordpress)
- [Elementor](#elementor)
- [Presets](#presets)
- [Big Circles](#big-circles)
- [Bubbles](#bubbles)
- [Confetti](#confetti)
- [Fire](#fire)
- [Firefly](#firefly)
- [Fireworks](#fireworks)
- [Fountain](#fountain)
- [Links](#links)
- [Sea Anemone](#sea-anemone)
- [Snow](#snow)
- [Stars](#stars)
- [Triangles](#triangles)
- [Templates and Resources](#templates-and-resources)
- [**_Demo / Generator_**](#demo--generator)
- [**_Video Tutorials_**](#video-tutorials)
- [Characters as particles](#characters-as-particles)
- [Polygon mask](#polygon-mask)
- [Animated stars](#animated-stars)
- [Nyan cat flying on scrolling stars](#nyan-cat-flying-on-scrolling-stars)
- [Snow particles](#snow-particles)
- [Background Mask particles](#background-mask-particles)
- [**_Options_**](#options)
- [Want to see it in action and try it?](#want-to-see-it-in-action-and-try-it)
- [Migrating from Particles.js](#migrating-from-particlesjs)
- [Plugins/Customizations](#pluginscustomizations)
- [Dependency Graph](#dependency-graph)
- [Sponsors](#sponsors)
- [Huge thanks to JetBrains for the 2020-2022 Open Source Licenses!](#huge-thanks-to-jetbrains-for-the-2020-2022-open-source-licenses)

---

## Do you want to use it on your website?

_Documentation and Development references [here](https://particles.js.org/docs/) 📖_

**This library is available on two of the most popular CDNs and it's easy and ready to use, if you were using
particles.js
it's even easier**.

You'll find the
instructions [below](https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation), with all the
links you need, and _don't be scared by **TypeScript**, it's just the source language_.

**The output files are just JavaScript**. 🤩

CDNs and `npm` have all the sources you need in **Javascript**, a bundle browser ready (tsparticles.engine.min.js), and
all
files splitted for `import` syntax.

**If you are interested** there are some _simple instructions_
just [below](https://github.com/tsparticles/tsparticles/blob/main/README.md#library-installation) to guide you to
migrate from the old particles.js library.

## **_Library installation_**

### **_Hosting / CDN_**

**_Please use these hosts or your own to load tsParticles on your projects_**

#### jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/confetti/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/confetti)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/engine/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/engine)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/fireworks/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/fireworks)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/basic/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/basic)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/slim/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/slim)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/all/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/all)

#### cdnjs

[![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles)

#### unpkg

<https://unpkg.com/@tsparticles/confetti/> <https://unpkg.com/@tsparticles/engine/> <https://unpkg.com/@tsparticles/fireworks/> <https://unpkg.com/@tsparticles/basic/> <https://unpkg.com/@tsparticles/slim/> <https://unpkg.com/tsparticles/> <https://unpkg.com/@tsparticles/all/>

---

### **_npm_**

_tsParticles Confetti_

[![npm](https://img.shields.io/npm/v/@tsparticles/confetti?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/confetti) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/confetti?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/confetti)

_tsParticles Engine_

[![npm](https://img.shields.io/npm/v/@tsparticles/engine?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/engine) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/engine?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/engine)

_tsParticles Fireworks_

[![npm](https://img.shields.io/npm/v/@tsparticles/fireworks?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/fireworks) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/fireworks?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/fireworks)

_tsParticles Basic_

[![npm](https://img.shields.io/npm/v/@tsparticles/basic?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/basic) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/basic?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/basic)

_tsParticles Slim_

[![npm](https://img.shields.io/npm/v/@tsparticles/slim?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/slim) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/slim?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/slim)

_tsParticles_

[![npm](https://img.shields.io/npm/v/tsparticles?style=for-the-badge)](https://www.npmjs.com/package/tsparticles) [![npmjs](https://img.shields.io/npm/dt/tsparticles?style=for-the-badge)](https://www.npmjs.com/package/tsparticles)

_tsParticles All_

[![npm](https://img.shields.io/npm/v/@tsparticles/all?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/all) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/all?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/all)

```shell
npm install @tsparticles/engine
```

### **_yarn_**

```shell
yarn add @tsparticles/engine
```

### **_pnpm_**

```shell
pnpm install @tsparticles/engine
```

#### Import and require

```javascript
const tsParticles = require("@tsparticles/engine");

// or

import { tsParticles } from "@tsparticles/engine";
```

The imported `tsParticles` is the same instance you have when including the script in the page using the `<script>` tag.

---

### **_Usage_**

Load tsParticles and configure the particles:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)
[![tsParticles Confetti demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://confetti.js.org)

**index.html**

```html
<div id="tsparticles"></div>

<script src="tsparticles.engine.min.js"></script>
```

**app.js**

```javascript
// @path-json can be an object or an array, the first will be loaded directly, and the object from the array will be randomly selected
/* tsParticles.load(@params); */

tsParticles
  .load({
    id: "tsparticles",
    url: "presets/default.json",
  })
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });

//or

tsParticles.load({
  id: "tsparticles",
  options: {
    /* options here */
  },
});

//or

tsParticles.load({
  id: "tsparticles",
  options: [
    {
      /* options here */
    },
    {
      /* other options here */
    },
  ],
});
//random object

tsParticles.load({
  id: "tsparticles",
  options: [
    {
      /* options here */
    },
    {
      /* other options here */
    },
  ],
  index: 1,
}); //the second one
// Important! If the index is not in range 0...<array.length, the index will be ignored.

// after initialization this can be used.

/* tsParticles.setOnClickHandler(@callback); */

/* this will be fired from all particles loaded */

tsParticles.setOnClickHandler((event, particles) => {
  /* custom on click handler */
});

// now you can control the animations too, it's possible to pause and resume the animations
// these methods don't change the config so you're safe with all your configurations
// domItem(0) returns the first tsParticles instance loaded in the dom
const particles = tsParticles.domItem(0);

// play will start the animations, if the move is not enabled it won't enable it, it just updates the frame
particles.play();

// pause will stop the animations
particles.pause();
```

---

## Official components for some of the most used frameworks

### Angular

#### `@tsparticles/angular`

[![npm](https://img.shields.io/npm/v/@tsparticles/angular?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/angular) [![npm](https://img.shields.io/npm/dm/@tsparticles/angular?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/angular)

Instructions available [here](https://github.com/tsparticles/angular/#readme)

### Astro

#### `astro-particles`

[![npm](https://img.shields.io/npm/v/astro-particles?style=for-the-badge)](https://www.npmjs.com/package/astro-particles) [![npm](https://img.shields.io/npm/dm/astro-particles?style=for-the-badge)](https://www.npmjs.com/package/astro-particles)

Instructions available [here](https://github.com/tsparticles/astro/#readme)

### Ember.js

#### `ember-tsparticles`

[![npm](https://img.shields.io/npm/v/ember-tsparticles?style=for-the-badge)](https://www.npmjs.com/package/ember-tsparticles) [![npm](https://img.shields.io/npm/dm/ember-tsparticles?style=for-the-badge)](https://www.npmjs.com/package/ember-tsparticles)

Instructions available [here](https://github.com/tsparticles/ember/#readme)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles?style=for-the-badge)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles?style=for-the-badge)](https://www.npmjs.com/package/inferno-particles)

Instructions available [here](https://github.com/tsparticles/inferno/#readme)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles?style=for-the-badge)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles?style=for-the-badge)](https://www.npmjs.com/package/jquery-particles)

Instructions available [here](https://github.com/tsparticles/jquery/#readme)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles?style=for-the-badge)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles?style=for-the-badge)](https://www.npmjs.com/package/preact-particles)

Instructions available [here](https://github.com/tsparticles/preact/#readme)

### ReactJS

#### `@tsparticles/react`

[![npm](https://img.shields.io/npm/v/@tsparticles/react?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/react) [![npm](https://img.shields.io/npm/dm/@tsparticles/react?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/react)

Instructions available [here](https://github.com/tsparticles/react/#readme)

### RiotJS

#### `riot-particles`

[![npm](https://img.shields.io/npm/v/riot-particles?style=for-the-badge)](https://www.npmjs.com/package/riot-particles) [![npm](https://img.shields.io/npm/dm/riot-particles?style=for-the-badge)](https://www.npmjs.com/package/riot-particles)

You can find the instructions [here](https://github.com/tsparticles/riot/#readme)

### SolidJS

#### `solid-particles`

[![npm](https://img.shields.io/npm/v/solid-particles?style=for-the-badge)](https://www.npmjs.com/package/solid-particles) [![npm](https://img.shields.io/npm/dm/solid-particles?style=for-the-badge)](https://www.npmjs.com/package/solid-particles)

You can find the instructions [here](https://github.com/tsparticles/solid/#readme)

### Svelte

#### `@tsparticles/svelte`

[![npm](https://img.shields.io/npm/v/@tsparticles/svelte?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/svelte) [![npm downloads](https://img.shields.io/npm/dm/@tsparticles/svelte?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/svelte)

Instructions available [here](https://github.com/tsparticles/svelte/#readme)

### VueJS 2.x

#### `@tsparticles/vue2`

[![npm](https://img.shields.io/npm/v/@tsparticles/vue2?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/vue2) [![npm](https://img.shields.io/npm/dm/@tsparticles/vue2?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/vue2)

Instructions available [here](https://github.com/tsparticles/vue2/#readme)

### VueJS 3.x

#### `@tsparticles/vue3`

[![npm](https://img.shields.io/npm/v/@tsparticles/vue3?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/vue3) [![npm](https://img.shields.io/npm/dm/@tsparticles/vue3?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/vue3)

Instruction available [here](https://github.com/tsparticles/vue3/#readme)

### Web Components

#### `web-particles`

[![npm](https://img.shields.io/npm/v/web-particles?style=for-the-badge)](https://www.npmjs.com/package/web-particles) [![npm](https://img.shields.io/npm/dm/web-particles?style=for-the-badge)](https://www.npmjs.com/package/web-particles)

You can find the instructions [here](https://github.com/tsparticles/webcomponents/#readme)

### WordPress

#### `@tsparticles/wordpress`

[![npm](https://img.shields.io/npm/v/@tsparticles/wordpress?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/wordpress) [![npm](https://img.shields.io/npm/dm/@tsparticles/wordpress?style=for-the-badge)](https://www.npmjs.com/package/@tsparticles/wordpress) [![WordPress Plugin Downloads](https://img.shields.io/wordpress/plugin/dw/@tsparticles/block?style=for-the-badge)](https://wordpress.org/plugins/tsparticles-block/) [![WordPress Plugin Active Installs](https://img.shields.io/wordpress/plugin/installs/tsparticles-block?style=for-the-badge)](https://wordpress.org/plugins/tsparticles-block/)

The plugin page hosted on WordPress.org can be
found [here](https://wordpress.org/plugins/tsparticles-block/#description)

### Elementor

Actually, an official tsParticles plugin isn't existing, but I have a collaboration with
the `Premium Addons for Elementor` plugin collection.

<div style="float: left; margin-right: 10px;">
    <img width="64" alt="Premium Addons for Elementor" src="https://particles.js.org/images/premium-addons-wordpress-plugin.png" />
</div>
<div>
    Premium Addons for Elementor is one of the most common plugins for Elementor that offers more than 55 highly customizable Elementor Widgets and Section Add-ons. tsParticles is exclusively included in Premium Particles Section Add-on for Elementor Page Builder. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">Check It Now</a>.<br />
    Use Premium Addons for Elementor Page Builder and get the chance to include tsParticles in your next WordPress website without the need to write a single line of code. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">See a Live Example</a>.
</div>
<div style="clear: both;"></div>

---

## Presets

There are some presets ready to be used in [this repository](https://github.com/tsparticles/presets), and they also have a bundle file that contains everything
needed to run.

### Big Circles

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-big-circles/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-big-circles) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-big-circles.svg)](https://www.npmjs.com/package/@tsparticles/preset-big-circles) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-big-circles)](https://www.npmjs.com/package/@tsparticles/preset-big-circles)

This preset loads big colored circles moving upwards on a white background.

[![demo](https://github.com/tsparticles/presets/raw/main/presets/bigCircles/images/sample.png)](https://particles.js.org/samples/presets/bigCircles)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/bigCircles#readme)

### Bubbles

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-bubbles/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-bubbles.svg)](https://www.npmjs.com/package/@tsparticles/preset-bubbles) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-bubbles)](https://www.npmjs.com/package/@tsparticles/preset-bubbles)

This preset loads colored bubbles coming from the bottom of the screen on a white background.

[![demo](https://github.com/tsparticles/presets/raw/main/presets/bubbles/images/sample.png)](https://particles.js.org/samples/presets/bubbles)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/bubbles#readme)

### Confetti

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-confetti/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-confetti) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-confetti.svg)](https://www.npmjs.com/package/@tsparticles/preset-confetti) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-confetti)](https://www.npmjs.com/package/@tsparticles/preset-confetti)

This preset loads white and red confetti launched from the screen center on a transparent background.

[![demo](https://github.com/tsparticles/presets/raw/main/presets/confetti/images/sample.png)](https://particles.js.org/samples/presets/confetti)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/confetti#readme)

### Fire

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-fire/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-fire) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-fire.svg)](https://www.npmjs.com/package/@tsparticles/preset-fire) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-fire)](https://www.npmjs.com/package/@tsparticles/preset-fire)

This preset loads a faded red to a black background with particles colored like fire and ash sparks.

[![demo](https://github.com/tsparticles/presets/raw/main/presets/fire/images/sample.png)](https://particles.js.org/samples/presets/fire)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/fire#readme)

### Firefly

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-firefly/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-firefly) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-firefly.svg)](https://www.npmjs.com/package/@tsparticles/preset-firefly) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-firefly)](https://www.npmjs.com/package/@tsparticles/preset-firefly)

This preset loads a mouse trail made with small fading particles like little fireflies.

[![demo](https://github.com/tsparticles/presets/raw/main/presets/firefly/images/sample.png)](https://particles.js.org/samples/presets/firefly)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/firefly#readme)

### Fireworks

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-fireworks/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-fireworks) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-fireworks.svg)](https://www.npmjs.com/package/@tsparticles/preset-fireworks) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-fireworks)](https://www.npmjs.com/package/@tsparticles/preset-fireworks)

This preset loads a beautiful fireworks effect.

[![demo](https://github.com/tsparticles/presets/raw/main/presets/fireworks/images/sample.png)](https://particles.js.org/samples/presets/fireworks)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/fireworks#readme)

### Fountain

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-fountain/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-fountain) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-fountain.svg)](https://www.npmjs.com/package/@tsparticles/preset-fountain) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-fountain)](https://www.npmjs.com/package/@tsparticles/preset-fountain)

[![demo](https://github.com/tsparticles/presets/raw/main/presets/fountain/images/sample.png)](https://particles.js.org/samples/presets/fountain)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/fountain#readme)

### Links

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-links/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-links) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-links.svg)](https://www.npmjs.com/package/@tsparticles/preset-links) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-links)](https://www.npmjs.com/package/@tsparticles/preset-links)

[![demo](https://github.com/tsparticles/presets/raw/main/presets/links/images/sample.png)](https://particles.js.org/samples/presets/links)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/links#readme)

### Sea Anemone

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-sea-anemone/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-sea-anemone) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-sea-anemone.svg)](https://www.npmjs.com/package/@tsparticles/preset-sea-anemone) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-sea-anemone)](https://www.npmjs.com/package/@tsparticles/preset-sea-anemone)

[![demo](https://github.com/tsparticles/presets/raw/main/presets/seaAnemone/images/sample.png)](https://particles.js.org/samples/presets/seaAnemone)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/seaAnemone#readme)

### Snow

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-snow/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-snow) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-snow.svg)](https://www.npmjs.com/package/@tsparticles/preset-snow) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-snow)](https://www.npmjs.com/package/@tsparticles/preset-snow)

[![demo](https://github.com/tsparticles/presets/raw/main/presets/snow/images/sample.png)](https://particles.js.org/samples/presets/snow)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/snow#readme)

### Stars

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-stars/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-stars) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-stars.svg)](https://www.npmjs.com/package/@tsparticles/preset-stars) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-stars)](https://www.npmjs.com/package/@tsparticles/preset-stars)

[![demo](https://github.com/tsparticles/presets/raw/main/presets/stars/images/sample.png)](https://particles.js.org/samples/presets/stars)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/stars#readme)

### Triangles

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/preset-triangles/badge?style=for-the-badge)](https://www.jsdelivr.com/package/npm/@tsparticles/preset-triangles) [![npmjs](https://badge.fury.io/js/@tsparticles/preset-triangles.svg)](https://www.npmjs.com/package/@tsparticles/preset-triangles) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/preset-triangles)](https://www.npmjs.com/package/@tsparticles/preset-triangles)

[![demo](https://github.com/tsparticles/presets/raw/main/presets/triangles/images/sample.png)](https://particles.js.org/samples/presets/triangles)

You can find the instructions [here](https://github.com/tsparticles/presets/tree/main/presets/triangles#readme)

---

## Templates and Resources

You can find some tsParticles related templates [here](https://github.com/tsparticles/templates). The templates are
created for _Vanilla Javascript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_, and other frameworks.

The templates will vary, new ones can be created or older ones updated with the latest features or changed to a better
style. Check them out once in a while.

If you created some good design with _tsParticles_ feel free to submit a pull request with your cool template, you'll be
credited as the template author!

<https://github.com/tsparticles/templates>

---

## **_Demo / Generator_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo2.png?v=1.39.1)](https://particles.js.org/samples)

---

## **_Video Tutorials_**

You can find all video tutorials on the website here: <https://particles.js.org/video.html>

_More videos are coming soon! Check every day if there are some new contents._

---

### Characters as particles

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples/#chars)

---

### Polygon mask

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples/#polygonMask)

---

### Animated stars

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples/#nasa)

---

### Nyan cat flying on scrolling stars

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples/#nyancat2)

---

### Snow particles

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples/#snow)

---

### Background Mask particles

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples/#background)

---

**particles.json**

You can find some config samples [here](https://github.com/tsparticles/website/tree/main/presets) 📖

---

## **_Options_**

You can find all options
available [here](https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html)
📖

## Want to see it in action and try it?

I've created a tsParticles collection on [CodePen](https://codepen.io/collection/DPOage) 😮 or you can check out
my [profile](https://codepen.io/matteobruni)

Otherwise, there's the demo page link below.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples/)

Want to see even more demos? Clone the repository on your computer and follow these instructions

```shell
$ pnpm i
$ pnpm run build
$ cd demo/vanilla
$ pnpm start
```

**Boom! 💥** <http://localhost:3000> and you can check out other demos.

_If you are brave enough_ you can switch to the `dev` branch for trying the features under development.

---

## Migrating from Particles.js

**tsParticles** has a package that makes this library 100% compatible with the _particles.js_ configuration.

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/particles.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@tsparticles/particles.js) [![npmjs](https://badge.fury.io/js/@tsparticles/particles.js.svg)](https://www.npmjs.com/package/@tsparticles/particles.js) [![npm](https://img.shields.io/npm/dm/@tsparticles/particles.js)](https://www.npmjs.com/package/@tsparticles/particles.js)

Seriously, you just need to change the script from particles.js to the bundled compatibility package, et-voilà, **you're
ready** 🧙!

You can read more **[here](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Want to know 5 reasons to do the
switch? [Read here](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Below you can find all the information you need to install tsParticles and its new syntax._

---

## Plugins/Customizations

tsParticles now supports some customizations 🥳.

**You can create your own plugins**

_Read more [here](https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html)..._

---

## Dependency Graph

```mermaid
flowchart TD

  subgraph core [Core]
    engine[tsParticles Engine]
    perlin-noise[Perlin Noise Lib]
    simplex-noise[Simplex Noise Lib]
    configs[tsParticles Configs]
  end

  subgraph bundle-basic [tsParticles Basic]

    subgraph basic-movers [Movers]
      move-base[Base]
    end

    subgraph basic-shapes [Shapes]
      shape-circle[Circle]
    end

    subgraph basic-updates [Updaters]
      updater-color[Color]
      updater-opacity[Opacity]
      updater-out-modes[Out Modes]
      updater-size[Size]
    end

  end

  engine --> bundle-basic

  subgraph bundle-confetti [tsParticles Confetti]

    subgraph confetti-plugins [Plugins]
      plugin-emitters
      plugin-motion
    end

    subgraph confetti-shapes [Shapes]
      shape-cards
      shape-emoji
      shape-heart
      shape-image
      shape-polygon
      shape-square
      shape-star
    end

    subgraph confetti-updaters [Updaters]
      updater-life
      updater-roll
      updater-rotate
      updater-tilt
      updater-wobble
    end

  end

  bundle-basic --> bundle-confetti

  subgraph bundle-slim [tsParticles Slim]

    subgraph slim-interactions [Interactions]

      subgraph slim-interactions-external [Externals]
        interaction-external-attract[Attract]
        interaction-external-bounce[Bounce]
        interaction-external-bubble[Bubble]
        interaction-external-connect[Connect]
        interaction-external-grab[Grab]
        interaction-external-pause[Pause]
        interaction-external-push[Push]
        interaction-external-remove[Remove]
        interaction-external-repulse[Repulse]
        interaction-external-slow[Slow]
      end

      subgraph slim-interactions-particles [Particles]
        interaction-particles-attract[Attract]
        interaction-particles-collisions[Collisions]
        interaction-particles-links[Links]
      end

    end

    subgraph slim-movers [Movers]
      move-parallax[Parallax]
    end

    subgraph slim-plugins [Plugins]

      subgraph slim-plugins-easings [Easings]
        plugin-easing-quad[Quad]
      end

    end

    subgraph slim-shapes [Shapes]
      shape-emoji[Emoji]
      shape-image[Image]
      shape-line[Line]
      shape-polygon[Polygon]
      shape-square[Square]
      shape-star[Star]
    end

    subgraph slim-updaters [Updaters]
      updater-life[Life]
      updater-rotate[Rotate]
      updater-stroke-color[Stroke Color]
    end

  end

  bundle-basic --> bundle-slim

  subgraph bundle-fireworks [tsParticles Fireworks]

    subgraph fireworks-effects [Effects]
      effect-trail
    end

    subgraph fireworks-plugins [Plugins]
      plugin-emitters

      subgraph fireworks-plugin-emitters-shapes [Emitters Shapes]
        plugin-emitters-shape-square
      end

      plugin-sounds
    end

    subgraph fireworks-updaters [Updaters]
      updater-destroy
      updater-life
      updater-rotate
    end

  end

  bundle-basic --> bundle-fireworks

  subgraph bundle-full [tsParticles]

    subgraph full-interactions [Interactions]

      subgraph full-interactions-external [Externals]
        interaction-external-trail[Trail]
      end

    end

    subgraph full-plugins [Plugins]
      plugin-absorbers[Absorbers]
      plugin-emitters[Emitters]

      subgraph full-plugin-emitters-shapes [Emitters Shapes]
        plugin-emitters-shape-circle[Circle]
        plugin-emitters-shape-square[Square]
      end

    end

    subgraph full-shapes [Shapes]
      shape-text[Text]
    end

    subgraph full-updaters [Updaters]
      updater-destroy[Destroy]
      updater-roll[Roll]
      updater-tilt[Tilt]
      updater-twinkle[Twinkle]
      updater-wobble[Wobble]
    end

  end

  bundle-slim --> bundle-full

  subgraph bundle-all [tsParticles All]

    bundle-pjs[tsParticles Particles.js Compatibility]

    subgraph all-effects [Effects]
      effect-bubble[Bubble]
      effect-trail[Trail]
    end

    subgraph all-interactions [Interactions]
      subgraph all-interactions-external [External]
        interaction-external-particle[Particle]
        interaction-external-pop[Pop]
      end

      interaction-light[Light]

      subgraph all-interactions-particles [Particles]
        interaction-particles-repulse[Repulse]
      end
    end

    subgraph all-paths [Paths]
      path-curl-noise[Curl Noise]
      path-curves[Curves]
      path-perlin-noise[Perlin Noise]
      path-polygon[Polygon]
      path-simplex-noise[Simplex Noise]
      path-svg[SVG]
    end

    subgraph all-plugins [Plugins]
      plugin-canvas-mask[Canvas Mask]

      subgraph all-plugins-colors [Colors]
        plugin-hsv-color[HSV Color]
        plugin-named-color[Named Color]
        plugin-oklch-color[Oklch Color]
      end

      subgraph all-plugins-easings [Easings]
        plugin-easing-back[Back]
        plugin-easing-circ[Circ]
        plugin-easing-cubic[Cubic]
        plugin-easing-expo[Expo]
        plugin-easing-linear[Linear]
        plugin-easing-quart[Quart]
        plugin-easing-quint[Quint]
        plugin-easing-sine[Sine]
      end

      subgraph all-plugin-emitters-shapes [Emitters Shapes]
        plugin-emitters-shape-canvas[Canvas]
        plugin-emitters-shape-path[Path]
        plugin-emitters-shape-polygon[Polygon]
      end

      subgraph all-plugins-exports [Exports]
        plugin-export-image[Image]
        plugin-export-json[JSON]
        plugin-export-video[Video]
      end

      plugin-infection[Infection]
      plugin-motion[Motion]
      plugin-poisson-disc[Poisson Disc]
      plugin-polygon-mask[Polygon Mask]
      plugin-sounds[Sounds]
    end

    subgraph all-shapes [Shapes]
      shape-arrow[Arrow]
      shape-cards[Cards]
      shape-cog[Cog]
      shape-heart[Heart]
      shape-path[Path]
      shape-rounded-polygon[Rounded Polygon]
      shape-rounded-rect[Rounded Rect]
      shape-spiral[Spiral]
    end

    subgraph all-updaters [Updaters]
      updater-gradient[Gradient]
      updater-orbit[Orbit]
    end

    simplex-noise --> path-curl-noise
    perlin-noise --> path-perlin-noise
    simplex-noise --> path-simplex-noise

  end

  bundle-full --> bundle-all
```

---

<p>  
    <a href="https://www.jetbrains.com/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/tsparticles/tsparticles/gh-pages/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />  
    </a>  
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/tsparticles/tsparticles/gh-pages/images/jetbrains-logos/logo.png" height="150" alt="JetBrains" />  
    </a>  
</p>

## Sponsors

### JetBrains

Huge thanks to [JetBrains](https://www.jetbrains.com/?from=tsParticles) for the 2020-2022 Open Source Licenses!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) is used to maintain this project.
