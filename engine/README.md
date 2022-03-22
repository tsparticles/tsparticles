[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles - TypeScript Particles

**A lightweight TypeScript library for creating particles. Dependency free (\*), browser ready and compatible with
React.js, Vue.js (2.x and 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js, and Web Components**

[![Rate on Openbase](https://badges.openbase.com/js/rating/tsparticles.svg)](https://openbase.com/js/tsparticles?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles) [![Run on Repl.it](https://repl.it/badge/github/matteobruni/tsparticles)](https://repl.it/github/matteobruni/tsparticles)

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

---

## Table of Contents

- [Use for your website](#Do-you-want-to-use-it-on-your-website)
  - [Library installation](#Library-installation)
- [Official components for some of the most used frameworks](#Official-components-for-some-of-the-most-used-frameworks)
  - [Angular](#Angular)
  - [Inferno](#Inferno)
  - [jQuery](#jQuery)
  - [Preact](#Preact)
  - [ReactJS](#ReactJS)
  - [RiotJS](#RiotJS)
  - [SolidJS](#SolidJS)
  - [Svelte](#Svelte)
  - [VueJS 2.x](#VueJS-2x)
  - [VueJS 3.x](#VueJS-3x)
  - [Web Components](#Web-Components)
  - [WordPress](#WordPress)
- [Presets](#Presets)
  - [Big Circles](#Big-Circles)
  - [Bubbles](#Bubbles)
  - [Confetti](#Confetti)
  - [Fire](#Fire)
  - [Firefly](#Firefly)
  - [Fireworks](#Fireworks)
  - [Fountain](#fountain)
  - [Links](#links)
  - [Sea Anemone](#Sea-Anemone)
  - [Snow](#Snow)
  - [Stars](#Stars)
  - [Triangles](#Triangles)
- [Templates and Resources](#Templates-and-Resources)
- [Demo / Generator](#Demo--Generator)
  - [Characters as particles](#Characters-as-particles)
  - [Mouse hover connections](#Mouse-hover-connections)
  - [Polygon mask](#Polygon-mask)
  - [Animated stars](#Animated-stars)
  - [Nyan cat flying on scrolling stars](#Nyan-cat-flying-on-scrolling-stars)
  - [Background Mask particles](#Background-Mask-particles)
- [Migrating from Particles.js](#Migrating-from-Particlesjs)
- [Plugins/Customizations](#PluginsCustomizations)

---

## Do you want to use it on your website?

_Documentation and Development references [here](https://particles.js.org/docs/) 📖_

**This library is available on the two most popular CDNs and it's easy and ready to use, if you were using particles.js
it's even easier**.

You'll find the
instructions [below](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation), with all the
links you need, and _don't be scared by **TypeScript**, it's just the source language_.

**The output files are just JavaScript**. 🤩

CDNs and `npm` have all the sources you need in **Javascript**, a bundle browser ready (tsparticles.min.js) and all
files splitted for `import` syntax.

**If you are interested** there are some _simple instructions_
just [below](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation) to guide you to
migrate from the old particles.js library.

## **_Library installation_**

### **_Hosting / CDN_**

**_Please use this hosts or your own to load tsParticles on your projects_**

#### jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles)

#### cdnjs

[![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles)

#### unpkg

<https://unpkg.com/tsparticles/>

---

### **_npm_**

[![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npmjs](https://img.shields.io/npm/dt/tsparticles)](https://www.npmjs.com/package/tsparticles)

```shell
npm install tsparticles
```

### **_yarn_**

```shell
yarn add tsparticles
```

#### Import and require

Starting from version 1.12.11 `import` and `require` can be used to import `tsParticles` .

Now you can write something like this

```javascript
const tsParticles = require("tsparticles");

// or

import { tsParticles } from "tsparticles";
```

The imported `tsParticles` is the same instance you have when including the script.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

Load tsParticles and configure the particles:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html
<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json can be an object or an array, the first will be loaded directly, the object from the array will be random selected
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
  .loadJSON("tsparticles", "presets/default.json")
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });

//or

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
  /* options here */
});

//or

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
  {
    /* options here */
  },
  {
    /* other options here */
  },
]);
//random object

tsParticles.loadFromArray(
  "tsparticles",
  [
    {
      /* options here */
    },
    {
      /* other options here */
    },
  ],
  1
); //the second one
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

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### RiotJS

#### `riot-particles`

[![npm](https://img.shields.io/npm/v/riot-particles)](https://www.npmjs.com/package/riot-particles) [![npm](https://img.shields.io/npm/dm/riot-particles)](https://www.npmjs.com/package/riot-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/riot/README.md)

### SolidJS

#### `solid-particles`

[![npm](https://img.shields.io/npm/v/solid-particles)](https://www.npmjs.com/package/solid-particles) [![npm](https://img.shields.io/npm/dm/solid-particles)](https://www.npmjs.com/package/solid-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/solid/README.md)

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS 2.x

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

### VueJS 3.x

#### `particles.vue3`

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md)

### Web Components

#### `web-particles`

[![npm](https://img.shields.io/npm/v/web-particles)](https://www.npmjs.com/package/web-particles) [![npm](https://img.shields.io/npm/dm/web-particles)](https://www.npmjs.com/package/web-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/components/web/README.md)

### WordPress

Actually an official tsParticles plugin isn't existing, but I have a collaboration with
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

There are some presets ready to be used in this repository, and they have also a bundle file that contains everything
needed to run.

### Big Circles

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-big-circles/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-big-circles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-big-circles.svg)](https://www.npmjs.com/package/tsparticles-preset-big-circles) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-big-circles)](https://www.npmjs.com/package/tsparticles-preset-big-circles)

This preset loads big colored circles moving upwards on a white background.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/bigCircles/images/sample.png)](https://particles.js.org/samples/presets/bigCircles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/bigCircles/README.md)

### Bubbles

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-bubbles/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-bubbles.svg)](https://www.npmjs.com/package/tsparticles-preset-bubbles) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-bubbles)](https://www.npmjs.com/package/tsparticles-preset-bubbles)

This preset loads colored bubbles coming from the bottom of the screen on a white background.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/bubbles/images/sample.png)](https://particles.js.org/samples/presets/bubbles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/bubbles/README.md)

### Confetti

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-confetti/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-confetti) [![npmjs](https://badge.fury.io/js/tsparticles-preset-confetti.svg)](https://www.npmjs.com/package/tsparticles-preset-confetti) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-confetti)](https://www.npmjs.com/package/tsparticles-preset-confetti)

This preset loads white and red confetti launched from the screen center on a transparent background.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/confetti/images/sample.png)](https://particles.js.org/samples/presets/confetti)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/confetti/README.md)

### Fire

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fire/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fire) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fire.svg)](https://www.npmjs.com/package/tsparticles-preset-fire) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fire)](https://www.npmjs.com/package/tsparticles-preset-fire)

This preset loads a faded red to black background with particles colored like fire and ash sparks.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fire/images/sample.png)](https://particles.js.org/samples/presets/fire)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/fire/README.md)

### Firefly

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-firefly/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-firefly) [![npmjs](https://badge.fury.io/js/tsparticles-preset-firefly.svg)](https://www.npmjs.com/package/tsparticles-preset-firefly) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-firefly)](https://www.npmjs.com/package/tsparticles-preset-firefly)

This preset loads a mouse trail made with small fading particles like little fireflies.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/firefly/images/sample.png)](https://particles.js.org/samples/presets/firefly)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/firefly/README.md)

### Fireworks

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fireworks/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fireworks) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fireworks.svg)](https://www.npmjs.com/package/tsparticles-preset-fireworks) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fireworks)](https://www.npmjs.com/package/tsparticles-preset-fireworks)

This preset loads a beautiful fireworks effect.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fireworks/images/sample.png)](https://particles.js.org/samples/presets/fireworks)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/fireworks/README.md)

### Fountain

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fountain/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fountain) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fountain.svg)](https://www.npmjs.com/package/tsparticles-preset-fountain) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fountain)](https://www.npmjs.com/package/tsparticles-preset-fountain)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fountain/images/sample.png)](https://particles.js.org/samples/presets/fountain)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/fountain/README.md)

### Links

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-links/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-links) [![npmjs](https://badge.fury.io/js/tsparticles-preset-links.svg)](https://www.npmjs.com/package/tsparticles-preset-links) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-links)](https://www.npmjs.com/package/tsparticles-preset-links)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/links/images/sample.png)](https://particles.js.org/samples/presets/links)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/links/README.md)

### Sea Anemone

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-sea-anemone/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-sea-anemone) [![npmjs](https://badge.fury.io/js/tsparticles-preset-sea-anemone.svg)](https://www.npmjs.com/package/tsparticles-preset-sea-anemone) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-sea-anemone)](https://www.npmjs.com/package/tsparticles-preset-sea-anemone)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/seaAnemone/images/sample.png)](https://particles.js.org/samples/presets/seaAnemone)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/seaAnemone/README.md)

### Snow

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-snow/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-snow) [![npmjs](https://badge.fury.io/js/tsparticles-preset-snow.svg)](https://www.npmjs.com/package/tsparticles-preset-snow) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-snow)](https://www.npmjs.com/package/tsparticles-preset-snow)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/snow/images/sample.png)](https://particles.js.org/samples/presets/snow)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/snow/README.md)

### Stars

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-stars/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-stars) [![npmjs](https://badge.fury.io/js/tsparticles-preset-stars.svg)](https://www.npmjs.com/package/tsparticles-preset-stars) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-stars)](https://www.npmjs.com/package/tsparticles-preset-stars)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/stars/images/sample.png)](https://particles.js.org/samples/presets/stars)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/stars/README.md)

### Triangles

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-triangles/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-triangles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-triangles.svg)](https://www.npmjs.com/package/tsparticles-preset-triangles) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-triangles)](https://www.npmjs.com/package/tsparticles-preset-triangles)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/triangles/images/sample.png)](https://particles.js.org/samples/presets/triangles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/main/preset/triangles/README.md)

---

## Templates and Resources

You can find some tsParticles related templates [here](https://github.com/tsparticles/templates). The templates are
created for _Vanilla Javascript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_ and other frameworks.

The templates will vary, new ones can be created or older ones updated with latest features or changed to a better
style. Check them out once in a while.

If you created some good design with _tsParticles_ feel free to submit a pull request with your cool template, you'll be
credited as the template author!

<https://github.com/tsparticles/templates>

---

## **_Demo / Generator_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo2.png?v=1.39.1)](https://particles.js.org/samples)

---

### Characters as particles

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Mouse hover connections

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Polygon mask

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Animated stars

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Nyan cat flying on scrolling stars

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Snow particles

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Background Mask particles

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 particles

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_Don't click! DON'T CLICK! OH NO IT'S SPREADING!!!!_

**COVID-19 is a serious disease. Please stay at home, wear a mask and stay safe!**

---

**particles.json**

You can find some config samples [here](https://github.com/matteobruni/tsparticles/tree/main/website/presets) 📖

---

## **_Options_**

You can find all options
available [here](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html) 📖

## Want to see it in action and try it?

I've created a tsParticles collection on [CodePen](https://codepen.io/collection/DPOage) 😮 or you can checkout
my [profile](https://codepen.io/matteobruni)

Otherwise there's the demo page link below. Just click/tap the Coronavirus below, don't be scared. **It's safe** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Want to see ever more demos? Clone the repository on your computer and follow these instructions

```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> and you can checkout other demos.

_If you are brave enough_ you can switch to the `dev` branch for trying the features under development.

---

## Migrating from Particles.js

**tsParticles** library is fully compatible with the _particles.js_ configuration.

Seriously, you just need to change the script source et-voilà, **you're ready** 🧙!

You can read more **[here](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Want to know 5 reasons to do the
switch? [Read here](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Below you can find all the information you need to install tsParticles and its new syntax._

---

## Plugins/Customizations

tsParticles now supports some customizations 🥳.

**You can create your own plugins**

_Read more [here](https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html)..._
