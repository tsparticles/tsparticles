<p align="center">
    <a href="https://particles.matteobruni.it/">
        <img src="https://particles.matteobruni.it/images/icons/rounded/tsParticles-96.png" alt="tsParticles" />
    </a>
</p>

# tsParticles - TypeScript Particles

**A lightweight TypeScript library for creating particles. Dependency free (\*) and browser ready!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) converted in TypeScript, dependency free (\*), improved with new cool 😎 features and various bugs fixed and **it's currently under development**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) ![npm](https://img.shields.io/npm/dm/tsparticles)

| `master`                                                                                                                                                                                                                            | `staging`                                                                                                                                                                                                                              | `dev`                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Master Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=master)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=master) | [![Staging Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=staging)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=staging) | [![Dev Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=dev)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=dev) |

[![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Coverage) [![Sauce Test Status](https://saucelabs.com/buildstatus/matteobruni)](https://app.saucelabs.com/u/matteobruni)

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

## Do you want to use it on your website?

**This library is available on the two most popular CDNs and it's easy and ready to use, if you were using particles.js it's even easier**.

You'll find the instructions [below](https://github.com/matteobruni/tsparticles/blob/master/README.md#library-installation), with all the links you need, and _don't be scared by **TypeScript**, it's just the source language_.

**The output files are just JavaScript**. 🤩

CDNs and `npm` have all the sources you need in **Javascript**, a bundle browser ready (tsparticles.min.js) and all files splitted for `import` syntax.

**If you are still interested** some lines below there are some instructions for migrating from the old particles.js library.

### Related projects

#### jQuery

If you want to use tsParticles with jQuery checkout [this repository](https://github.com/matteobruni/jquery-particles)

#### VueJS

If you want to use tsParticles with VueJS checkout [this repository](https://github.com/matteobruni/particles.vue)

#### ReactJS

If you want to use tsParticles with ReactJS checkout [this repository](https://github.com/matteobruni/react-tsparticles)

##### 3rd Party

A 3rd-party component is available too, read more [here](https://github.com/Wufe/react-particles-js)

### Want to see it in action and try it?

I've created a tsParticles collection on [CodePen](https://codepen.io/collection/DPOage) 😮 or you can checkout my [profile](https://codepen.io/matteobruni)

Otherwise there's the demo page link below. Just click/tap the Coronavirus below, don't be scared. **It's safe** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.matteobruni.it/#virus)

Want to see ever more demos? Clone the repository on your computer and follow these instructions

```shell
npm install && npm start
```

**Boom! 💥** <http://localhost:3000> and you can checkout other demos.

_If you are brave enough_ you can switch to the `dev` branch for trying the features under development.

### Dependencies

You may have notices the \* near dependency free. Well almost all features works without any dependency, but... Well there's a little but. The **Polygon Mask** feature requires `[pathseg](https://github.com/progers/pathseg)` for some browsers to work fine, and obviously the Icon Fonts (like `FontAwesome`) must be included in your page.

---

## Migrating from Particles.js

**tsParticles** library is fully compatible with the _particles.js_ configuration.

Seriously, you just need to change the script source et-voilà, **you're ready** 🧙!

You can read more **[here](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Want to know 5 reasons to do the switch? [Read here](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Below you can find all the information you need to install tsParticles and its new syntax._

---

## Plugins/Customizations

tsParticles now supports some customizations 🥳.

**NOW YOU CAN CREATE YOUR OWN PLUGINS**

*Read more [here](https://github.com/matteobruni/tsparticles/wiki/Create-a-tsParticles-Plugin)...*

---

### API Docs

Documentation and Development references [here](https://particles.matteobruni.it/docs/) 📖

---

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

Starting from version 1.12.11 `import` and `require` can be used to import `tsParticles`.

Now you can write something like this

```javascript
const tsParticles = require("tsparticles");

// or

import { tsParticles } from "tsparticles";
```

the imported `tsParticles` is the same instance you have including the script.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

Load tsParticles and configure the particles:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.matteobruni.it)

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
]); //random object
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
// Important! If the index is not in range 0...array.length, the index will be ignored.

// after initialization this can be used.

/* tsParticles.setOnClickHandler(@callback); */
/* this will be fired from all particles loaded */
tsParticles.setOnClickHandler((e) => {
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

#### Import and require

Starting from version 1.12.7 `import` and `require` can be used to import `tsParticles`.

Now you can write something like this

```javascript
const tsParticles = require("tsparticles");

// or

import { tsParticles } from "tsparticles";
```

### React.js

**tsParticles ❤️ react-particles-js**

Starting from [react-particles-js](https://github.com/Wufe/react-particles-js) version 3.0.0 it has added tsParticles as a dependency.

You can follow the instructions [here](https://github.com/Wufe/react-particles-js/blob/master/README.md) to install `react-particles-js` and use all the configurations described in this readme to configure the particles.

---

### **_Demo / Generator_**

<https://particles.matteobruni.it/>

[![Particles demo](https://particles.matteobruni.it/images/demo.png?v=1.8.1)](https://particles.matteobruni.it/)

---

#### Characters as particles

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.matteobruni.it/#chars)

---

#### Mouse hover connections

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.matteobruni.it/#connect)

---

#### Polygon mask

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.matteobruni.it/#polygonMask)

---

#### Animated stars

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.matteobruni.it/#nasa)

---

#### Nyan cat flying on scrolling stars

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.matteobruni.it/#nyancat2)

---

#### Snow particles

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.matteobruni.it/#snow)

---

#### Background Mask particles

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.matteobruni.it/#background)

---

#### COVID-19 SARS-CoV-2 particles

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.matteobruni.it/#virus)

_Don't click! DON'T CLICK! OH NO IT'S SPREADING!!!!_

---

**particles.json**

You can find a sample config [here](https://github.com/matteobruni/tsparticles/wiki/tsParticles-Sample-Config) 📖

---

### **_Options_**

You can find all options available [here](https://github.com/matteobruni/tsparticles/wiki/tsParticles-Options) 📖

---

<p>
    <a href="https://www.jetbrains.com/?from=tsParticles">
        <img src="https://cdn.matteobruni.it/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />
    </a>
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">
        <img src="https://cdn.matteobruni.it/images/jetbrains-logos/webstorm_logos/logo.png" height="150" alt="JetBrains" />
    </a>
</p>

### Huge thanks to [JetBrains](https://www.jetbrains.com/?from=tsParticles) for the 2020 Open Source License!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) is used to maintain this project.

### Huge thanks to [SauceLabs](https://saucelabs.com) for the Open Source License!

<img alt="Testing Powered By SauceLabs" src="https://raw.githubusercontent.com/saucelabs/opensource/master/assets/powered-by-saucelabs-badge-red.svg" width="250" />
