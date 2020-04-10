<p align="center">
    <a href="https://particles.matteobruni.it/">
        <img src="https://particles.matteobruni.it/images/icons/rounded/tsParticles-96.png" alt="tsParticles" />
    </a>
</p>

# tsParticles - TypeScript Particles

**A lightweight TypeScript library for creating particles. Dependency free (\*) and browser ready!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) converted in TypeScript, dependency free (\*), improved with new cool 😎 features and various bugs fixed and **it's currently under development**!_

## Do you want to use it on your website?

**This library is available on the two most popular CDNs and it's easy and ready to use, if you were using particles.js it's even easier**.

You'll find the instructions [below](https://github.com/matteobruni/tsparticles/blob/master/README.md#library-installation), with all the links you need, and _don't be scared by **TypeScript**, it's just the source language_.

**The output files are just vanilla JavaScript**. 🤩

CDNs and `npm` have all the sources you need in **vanilla Javascript**, a bundle browser ready (tsparticles.min.js) and all files splitted for `import` syntax.

**If you are still interested** some lines below there are some instructions for migrating from the old particles.js library.

### Want to see it in action and try it?

I've created a tsParticles collection on [CodePen](https://codepen.io/collection/DPOage) 😮 or you can checkout my [profile](https://codepen.io/matteobruni)

Otherwise there's the demo page link below. Just click/tap the Coronavirus below, don't be scared. **It's safe** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.matteobruni.it/#virus)

Want to see ever more demos? Clone the repository on your computer and follow these instructions

```shell
npm install && npm start
```

**Boom! 💥** <http://localhost:3000> and you can checkout other demos, _if you are brave enough_ you can switch to the `dev` branch so you can try the features under development.

### Dependencies

You may have notices the \* near dependency free. Well almost all features works without any dependency, but... Well there's a but. The **Polygon Mask** feature requires `pathseg` for some browsers to work well, and obviously the Icon Fonts (like `FontAwesome`) must be included in your page.

---

## Migrating from Particles.js

**tsParticles** are fully compatible with the _particles.js_ configuration.

Seriously, you just need to change the script source et-voilà, **you're ready** 🧙!

You can read more **[here](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Want to know 5 reasons to do the switch? [Read here](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Below you can find all the information you need to install tsParticles and its new syntax._

---

## Plugins/Customizations

tsParticles now supports some customizations 🥳.

**NOW YOU CAN CREATE YOUR OWN SHAPES OR PRESETS**

### Creating a custom shape

You can now create a script with your own shape to use in your website or for distributing it to others. All you have to do is a drawing function, give it a name and use it in the config.

Publish your shapes with `tsparticles-shape` tag on `NPM` so everyone can find it.

You'll find a sample below.

#### Spiral sample

_spiral.js_ - The custom shape script, you can distribute it or reuse in all your websites.

```javascript
// call this method before initializing tsParticles, this shape will be available in all of your tsParticles instances
// parameters: shape name, drawing method
// opacity is just for shapes that needs a differenc opacity handling like images
tsParticles.addShape("spiral", function(context, particle, radius, opacity) {
  const shapeData = particle.shapeData;
  const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

  for (let i = 0; i < realWidth * 10; i++) {
    const angle = 0.1 * i;
    const x =
      (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.cos(angle);
    const y =
      (shapeData.innerRadius + shapeData.lineSpacing * angle) * Math.sin(angle);

    context.lineTo(x, y);
  }
});
```

If you prefere using classes you can, `IShapeDrawer` interface can be implemented in your code or at least a class with a method `draw(context, particle, radius)` in it. You can find a sample below.

```javascript
class SpiralDrawer {
  draw(context, particle, radius, opacity) {
    const shapeData = particle.shapeData;
    const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

    for (let i = 0; i < realWidth * 10; i++) {
      const angle = 0.1 * i;
      const x =
        (shapeData.innerRadius + shapeData.lineSpacing * angle) *
        Math.cos(angle);
      const y =
        (shapeData.innerRadius + shapeData.lineSpacing * angle) *
        Math.sin(angle);

      context.lineTo(x, y);
    }
  }
}

// call this method before initializing tsParticles, this shape will be available in all of your tsParticles instances
// parameters: shape name, drawer class
tsParticles.addShape("spiral", new SpiralDrawer());
```

_config.json_ - The config section to add to your config or in your plugin readme to teach others on how to use it.

```javascript
{
  // [... omitted for brevity]
  "particles": {
    // [... omitted for brevity]
    "shape": {
      "type": "spiral", // this must match the name above, the type works as always, you can use an array with your custom shape inside
      "custom": {
        // this must match the name above, these are the values set in particle.shapeData (the first line of the method above)
        // you can use array as value here too, the values will be random picked, like in standard shapes
        "spiral": {
          "innerRadius": 1,
          "lineSpacing": 1,
          "close": false, // this value is used by tsParticles to close the path, if you don't want to close it set this value to false
          "fill": false // this value is used by tsParticles to fill the shape with the particles color, if you want only the stroke set this value to false
        }
      }
      // [... omitted for brevity]
    }
    // [... omitted for brevity]
  }
  // [... omitted for brevity]
}
```

### Creating a custom preset

You can now create a script with your own preset to use in your website or for distributing it to others. All you have to do is give it a name and set all the options you need it to load correctly. Remember to not import all config, properties not needed can be omitted.

Publish your preset with `tsparticles-preset` tag on `NPM` so everyone can find it.

You'll find a sample below.

#### Fire preset sample

_fire.preset.js_ - The custom preset script, you can distribute it or reuse in all your websites.

```javascript
// call this method before initializing tsParticles, this preset will be available in all of your tsParticles instances
// parameters: preset name, preset partial options
tsParticles.addPreset("fire", {
  fpsLimit: 40,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"]
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    move: {
      enable: true,
      speed: 6,
      random: false
    }
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    }
  },
  background: {
    image: "radial-gradient(#4a0000, #000)"
  }
});
```

_config.json_ - The config section to add to your config or in your plugin readme to teach others on how to use it.

```javascript
{
  "preset": "fire" // this should match the name above, it can be used in array values too, it will be loaded in order like everyone else
}
```

---

## General Informations

| `master`                                                                                                                                                                                                                            | `staging`                                                                                                                                                                                                                              | `dev`                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Master Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=master)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=master) | [![Staging Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=staging)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=staging) | [![Dev Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=dev)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=dev) |

[![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/5d7a0bb5e36cfd44fee6/maintainability)](https://codeclimate.com/github/matteobruni/tsparticles/maintainability)

---

## Social

### Slack

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)

### Product Hunt

[![tsParticles - A lightweight TypeScript library for creating particles | Product Hunt Embed](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---

### API Docs

Documentation and Development references here: <https://particles.matteobruni.it/docs/> 📖

---

## **_Library installation_**

### **_Hosting / CDN_**

**_Please use this hosts or your own to load tsParticles on your projects_**

#### jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles)

#### cdnjs

[![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles)

---

### **_npm_**

[![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles)

```shell
npm install tsparticles
```

### **_yarn_**

```shell
yarn add tsparticles
```

#### Import and require

Starting from version 1.12.7 `import` and `require` can be used to import `tsParticles`.

Now you can write something like this

```javascript
const tsParticles = require('tsparticles');

// or

import { tsParticles } from 'tsparticles';
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
  .then(container => {
    console.log("callback - tsparticles config loaded");
  })
  .catch(error => {
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
  }
]); //random object
tsParticles.loadFromArray(
  "tsparticles",
  [
    {
      /* options here */
    },
    {
      /* other options here */
    }
  ],
  1
); //the second one
// Important! If the index is not in range 0...array.length, the index will be ignored.

// after initialization this can be used.

/* tsParticles.setOnClickHandler(@callback); */
/* this will be fired from all particles loaded */
tsParticles.setOnClickHandler(e => {
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

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.matteobruni.it/#mask)

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

```json
{
  "detectRetina": false,
  "fpsLimit": 60,
  "interactivity": {
    "detectsOn": "canvas",
    "events": {
      "onClick": {
        "enable": false,
        "mode": "push"
      },
      "onDiv": {
        "elementId": "repulse-div",
        "enable": false,
        "mode": "repulse"
      },
      "onHover": {
        "enable": false,
        "mode": "grab",
        "parallax": {
          "enable": false,
          "force": 2,
          "smooth": 10
        }
      },
      "resize": true
    },
    "modes": {
      "bubble": {
        "distance": 200,
        "duration": 0.4,
        "opacity": 1,
        "size": 80
      },
      "connect": {
        "distance": 80,
        "lineLinked": {
          "opacity": 0.5
        },
        "radius": 60
      },
      "grab": {
        "distance": 100,
        "lineLinked": {
          "opacity": 1
        }
      },
      "push": {
        "quantity": 4
      },
      "remove": {
        "quantity": 2
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "slow": {
        "_active": false,
        "factor": 1,
        "radius": 0
      }
    }
  },
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "lineLinked": {
      "blink": false,
      "color": {
        "value": "#fff"
      },
      "consent": false,
      "distance": 150,
      "enable": true,
      "opacity": 0.4,
      "shadow": {
        "blur": 5,
        "color": {
          "value": "lime"
        },
        "enable": false
      },
      "width": 1
    },
    "move": {
      "attract": {
        "enable": false,
        "rotate": {
          "x": 3000,
          "y": 3000
        }
      },
      "collisions": false,
      "direction": "none",
      "enable": true,
      "outMode": "out",
      "random": false,
      "speed": 2,
      "straight": false,
      "trail": {
        "enable": false,
        "length": 10,
        "fillColor": {
          "value": "#000000"
        }
      }
    },
    "number": {
      "density": {
        "enable": false,
        "area": 800
      },
      "limit": 0,
      "value": 100
    },
    "opacity": {
      "animation": {
        "enable": false,
        "minimumValue": 0,
        "speed": 2,
        "sync": false
      },
      "random": {
        "enable": false,
        "minimumValue": 1
      },
      "value": 1
    },
    "rotate": {
      "animation": {
        "enable": false,
        "speed": 0,
        "sync": false
      },
      "direction": "clockwise",
      "random": false,
      "value": 0
    },
    "shape": {
      "character": {
        "fill": false,
        "font": "Verdana",
        "style": "",
        "value": "*",
        "weight": "400"
      },
      "image": {
        "height": 100,
        "replaceColor": true,
        "src": "",
        "width": 100
      },
      "polygon": {
        "sides": 5
      },
      "stroke": {
        "color": {
          "value": "#ff0000"
        },
        "width": 0
      },
      "type": "circle"
    },
    "size": {
      "animation": {
        "enable": false,
        "minimumValue": 0,
        "speed": 5,
        "sync": false
      },
      "random": {
        "enable": false,
        "minimumValue": 1
      },
      "value": 3
    },
    "shadow": {
      "blur": 0,
      "color": {
        "value": "#000000"
      },
      "enable": false,
      "offset": {
        "x": 0,
        "y": 0
      }
    }
  },
  "polygon": {
    "draw": {
      "enable": false,
      "stroke": {
        "color": {
          "value": "#fff"
        },
        "width": 0.5,
        "opacity": 1
      }
    },
    "enable": false,
    "inline": {
      "arrangement": "one-per-point"
    },
    "move": {
      "radius": 10,
      "type": "path"
    },
    "scale": 1,
    "type": "none",
    "url": ""
  },
  "backgroundMask": {
    "cover": {
      "color": {
        "value": "#fff"
      },
      "opacity": 1
    },
    "enable": false
  },
  "pauseOnBlur": true
}
```

---

### **_Options_**

| property         | option type             | example                                 | notes                                                                                                                                                                                                                                                                                              |
| ---------------- | ----------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `background`     | `object`                |                                         | See Background options below                                                                                                                                                                                                                                                                       |
| `backgroundMask` | `object`                |                                         | See Background Mask options below                                                                                                                                                                                                                                                                  |
| `detectRetina`   | `boolean`               | `true` / `false`                        | replaces the old `retina_detect` property                                                                                                                                                                                                                                                          |
| `fpsLimit`       | `number`                | `30`                                    | _defaults to `30`_, replaces the old `fps_limit` property                                                                                                                                                                                                                                          |
| `interactivity`  | `object`                |                                         | See Interactivity options below                                                                                                                                                                                                                                                                    |
| `pauseOnBlur`    | `boolean`               | `true` / `false`                        | pauses the animations when the page isn't on foreground                                                                                                                                                                                                                                            |
| `preset`         | `string` <br /> `array` | `"basic"` <br /> `[ "basic", "60fps" ]` | You can use this property to load one or more presets for focusing on important properties and not all config. <br /> All values available by default are: <br /> `"basic"` <br /> `"backgroundMask"` <br /> `"fontAwesome"` <br /> `"snow"` <br /> `"bouncing"` <br /> `"stars"` <br /> `"60fps"` |

#### Background

| key           | option type                                                                         | example                                                                      | notes                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color.value` | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> random (`string`) | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> | defaults to no color, fully transparent canvas                                                                                                                     |
| `opacity`     | number                                                                              |                                                                              | This property works with `color.value`, the `color.value` property has no alpha values, so if you don't use a `string` with alpha values set this for transparency |
| `image`       | string                                                                              |                                                                              | This property is directly set to the CSS background-image, you can use the same syntax.                                                                            |
| `position`    | string                                                                              |                                                                              | This property is directly set to the CSS background-position, you can use the same syntax.                                                                         |
| `repeat`      | string                                                                              |                                                                              | This property is directly set to the CSS background-repeat, you can use the same syntax.                                                                           |
| `size`        | string                                                                              |                                                                              | This property is directly set to the CSS background-size, you can use the same syntax.                                                                             |

#### Background Mask

| key             | option type                                                                         | example                                                                                 | notes |
| --------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----- |
| `enable`        | `boolean`                                                                           | `true` / `false`                                                                        |
| `cover.value`   | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> random (`string`) | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `"random"` |
| `cover.opacity` | `number`                                                                            | `0...1`                                                                                 |

#### Interactivity

| key                                       | option type             | example                                                                                      | notes                                     |
| ----------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `detectsOn`                               | `string`                | `"canvas", "window", "parent"`                                                               | replaces the old `detect_on` property     |
| `events.onHover.enable`                   | `boolean`               | `true` / `false`                                                                             |
| `events.onHover.mode`                     | `string` <br /> `array` | `"grab"` <br /> `"bubble"` <br /> `"repulse"` <br /> `"connect"` <br /> `["grab", "bubble"]` | the array enables all the specified modes |
| `events.onClick.enable`                   | `boolean`               | `true` / `false`                                                                             |
| `events.onClick.mode`                     | `string` <br /> `array` | `"push"` <br /> `"remove"` <br /> `"bubble"` <br /> `"repulse"` <br /> `["push", "repulse"]` | the array enables all the specified modes |
| `events.onDiv.enable`                     | `boolean`               | `true` / `false`                                                                             |
| `events.onDiv.mode`                       | `string` <br /> `array` | `"repulse"` <br /> `["repulse"]`                                                             | the array enables all the specified modes |
| `events.onDiv.elementId`                  | `string`                | `repulse-div`                                                                                | replaces the old `el` property            |
| `events.resize`                           | `boolean`               | `true` / `false`                                                                             |
| `events.modes.connect.distance`           | `number`                | `100`                                                                                        |
| `events.modes.connect.radius`             | `number`                | `60`                                                                                         |
| `events.modes.connect.lineLinked.opacity` | `number`                | `0...1`                                                                                      |
| `events.modes.grab.distance`              | `number`                | `100`                                                                                        |
| `events.modes.grab.lineLinked.opacity`    | `number`                | `0...1`                                                                                      |
| `events.modes.bubble.distance`            | `number`                | `100`                                                                                        |
| `events.modes.bubble.size`                | `number`                | `40`                                                                                         |
| `events.modes.bubble.duration`            | `number`                | `0.4`                                                                                        | seconds                                   |
| `events.modes.repulse.distance`           | `number`                | `200`                                                                                        |
| `events.modes.repulse.duration`           | `number`                | `1.2`                                                                                        | seconds                                   |
| `events.modes.push.quantity`              | `number`                | `4`                                                                                          |
| `events.modes.remove.quantity`            | `number`                | `4`                                                                                          |

#### Particles

| key                              | option type                                                                                              | example                                                                                                                                                            | notes                                                                                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `number.value`                   | `number`                                                                                                 | `40`                                                                                                                                                               |
| `number.limit`                   | `number`                                                                                                 | `200`                                                                                                                                                              | `0` or less disables the limit                                                                                                               |
| `number.density.enable`          | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `number.density.area`            | `number`                                                                                                 | `800`                                                                                                                                                              |
| `color.value`                    | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> array (`HEX`) <br /> random (`string`) | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `["#b61924", "#333333", "999999"]` <br /> `"random"`                                  |
| `shape.type`                     | `string` <br /> `array`                                                                                  | `"circle"` <br /> `"line"` <br /> `"edge"` <br /> `"triangle"` <br /> `"polygon"` <br /> `"star"` <br /> `"image"` <br /> `["circle", "triangle", "image"]`        |
| `shape.stroke.width`             | `number`                                                                                                 | `2`                                                                                                                                                                |
| `shape.stroke.color`             | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> random (`string`)                      | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `"random"`                                                                            |
| `shape.polygon.sides`            | `number`                                                                                                 | `5`                                                                                                                                                                |
| `shape.character`                | `object` <br /> `array`                                                                                  |                                                                                                                                                                    | A single character object like below or an array of the same objects                                                                         |
| `shape.character.value`          | `object` <br /> array                                                                                    | `\uf179`                                                                                                                                                           |
| `shape.character.font`           | `string`                                                                                                 | `Font Awesome 5 Brands`                                                                                                                                            |
| `shape.character.style`          | `string`                                                                                                 |                                                                                                                                                                    |
| `shape.character.weight`         | `string`                                                                                                 | `400`                                                                                                                                                              | font weight, for FontAwesome it's required to use the exact weight for every family, Chrome won't render correctly otherwise.                |
| `shape.character.fill`           | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   | Fills or strokes the text. If the fonts doesn't support the stroke or the fill you won't see any particle. FontAwesome requires `fill: true` |
| `shape.image`                    | object / array                                                                                           | A single image object like below or an array of the same objects                                                                                                   |
| `shape.image.src`                | path link <br /> svg / png / gif / jpg                                                                   | `"assets/img/yop.svg"` <br /> `"http://mywebsite.com/assets/img/yop.png"`                                                                                          |
| `shape.image.width`              | `number`                                                                                                 | `100`                                                                                                                                                              | for aspect ratio                                                                                                                             |
| `shape.image.height`             | `number`                                                                                                 | `100`                                                                                                                                                              | for aspect ratio                                                                                                                             |
| `opacity.value`                  | `number`                                                                                                 | `0...1`                                                                                                                                                            |
| `opacity.random`                 | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `opacity.animation.enable`       | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `opacity.animation.speed`        | `number`                                                                                                 | `3`                                                                                                                                                                |
| `opacity.animation.minimumValue` | `number`                                                                                                 | `0...1`                                                                                                                                                            | replaces the old `opacity_min` property                                                                                                      |
| `opacity.animation.sync`         | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `rotate.value`                   | `number`                                                                                                 | `45`                                                                                                                                                               | angle in degrees                                                                                                                             |
| `rotate.random`                  | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `rotate.direction`               | `string`                                                                                                 | `clockwise` / `counterclockwise`                                                                                                                                   |
| `rotate.animation.enable`        | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `rotate.animation.speed`         | `number`                                                                                                 | 5                                                                                                                                                                  |
| `rotate.animation.sync`          | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `size.value`                     | `number`                                                                                                 | `20`                                                                                                                                                               |
| `size.random`                    | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `size.animation.enable`          | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `size.animation.speed`           | `number`                                                                                                 | `3`                                                                                                                                                                |
| `size.animation.minimumValue`    | `number`                                                                                                 | `0.25`                                                                                                                                                             |
| `size.animation.sync`            | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `lineLinked.enable`              | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `lineLinked.distance`            | `number`                                                                                                 | `150`                                                                                                                                                              |
| `lineLinked.color`               | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> random (`string`)                      | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `"random"`                                                                            |
| `lineLinked.opacity`             | `number`                                                                                                 | `0...1`                                                                                                                                                            |
| `lineLinked.width`               | `number`                                                                                                 | `1.5`                                                                                                                                                              |
| `move.enable`                    | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `move.speed`                     | `number`                                                                                                 | `4`                                                                                                                                                                |
| `move.direction`                 | `string`                                                                                                 | `"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"` |
| `move.random`                    | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `move.straight`                  | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `move.outMode`                   | `string`                                                                                                 | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"bounce-vertical"` <br /> `"bounce-horizontal"`                                                                | out of canvas                                                                                                                                |
| `move.bounce`                    | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   | between particles                                                                                                                            |
| `move.trail.enable`              | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `move.trail.length`              | `number`                                                                                                 | `10`                                                                                                                                                               |
| `move.trail.fillColor`           | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> random (`string`)                      | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `"random"`                                                                            |
| `move.attract.enable`            | `boolean`                                                                                                | `true` / `false`                                                                                                                                                   |
| `move.attract.rotate.x`          | `number`                                                                                                 | `3000`                                                                                                                                                             |
| `move.attract.rotate.y`          | `number`                                                                                                 | `1500`                                                                                                                                                             |

#### Polygon Mask

| key              | option type                                                                         | example                                                                                 | notes                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `enable`         | `boolean`                                                                           | `true` / `false`                                                                        |
| `draw.enable`    | `boolean`                                                                           | `true` / `false`                                                                        |
| `draw.lineWidth` | `number`                                                                            | `0.5`                                                                                   |
| `draw.lineColor` | HEX (`string`) <br /> RGB (`object`) <br /> HSL (`object`) <br /> random (`string`) | `"#0d47a1"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `"random"` |
| `scale`          | `number`                                                                            | 1                                                                                       |
| `type`           | `string`                                                                            | `none` <br /> `inside` <br /> `outside` <br /> `inline`                                 |
| `move.radius`    | `number`                                                                            | `10`                                                                                    |
| `url`            | `string`                                                                            | `demo/svg/deer.svg`                                                                     | this file will be downloaded with an ajax request, if it won't load you have some **XSS** issues |
