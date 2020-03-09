# TypeScript Particles

## tsParticles

[![Slack](https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.auto?width=94&height=38)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles - A lightweight TypeScript library for creating particles | Product Hunt Embed](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

[![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=matteobruni/tsparticles&amp;utm_campaign=Badge_Grade)

***API documentation and Development references here: <https://particles.matteobruni.it/docs/>***

### A lightweight TypeScript library for creating particles

[Particles.js](https://github.com/VincentGarreau/particles.js) converted in TypeScript, improved with new cool features and various bugs fixed and **it's currently under development**!

Branch | Build Status
---|----
Master | [![Master Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=master)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=master)
Staging | [![Staging Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=staging)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=staging)
Dev | [![Dev Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=dev)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=dev)

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.matteobruni.it/#virus)

---

## ***Packages install***

### ***npm***

[![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles)

```shell
npm install tsparticles
```

### ***NuGet***

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### ***Hosting / CDN***

***Please use this host or your own to load tsparticles on your projects***

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles)

### ***Usage***

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
tsParticles.loadJSON("tsparticles", "presets/default.json").then((container) => {
  console.log("callback - tsparticles config loaded");
}).catch((error) => {
  console.error(error);
});

//or

/* tsParticles.load(@dom-id, @options); */
tsParticles.load("tsparticles", { /* options here */ });

//or

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */
tsParticles.loadFromArray("tsparticles", [ { /* options here */ }, { /* other options here */ }]); //random object
tsParticles.loadFromArray("tsparticles", [ { /* options here */ }, { /* other options here */ }], 1); //the second one
// Important! If the index is not in range 0...array.length, the index will be ignored.

// after initialization this can be used.

/* tsParticles.setOnClickHandler(@callback); */
/* this will be fired from all particles loaded */
tsParticles.setOnClickHandler((e) => { /* custom on click handler */ });
```

---

### ***Demo / Generator***

<https://particles.matteobruni.it/>

[![Particles demo](https://particles.matteobruni.it/images/demo.png?v=1.8.1)](https://particles.matteobruni.it/)

[![Particles demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.matteobruni.it/#chars)

[![Particles demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.matteobruni.it/#connect)

[![tsParticles demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.matteobruni.it/#mask)

[![Particles demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.matteobruni.it/#nasa)

[![Particles demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.matteobruni.it/#nyancat2)

[![tsParticles demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.matteobruni.it/#snow)

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.matteobruni.it/#virus)

---

**particles.json**

```json
{
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "number": {
      "value": 80,
      "limit": 200,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 80,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 12,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "connect": {
        "distance": 80,
        "lineLinked": {
          "opacity": 0.5
        },
        "radius": 60
      },
      "grab": {
        "distance": 800,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 800,
        "size": 80,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true,
  "fps_limit": 60,
  "polygon": {
    "debug": {
      "enable": true,
      "color": "#000000"
    },
    "type": "inside",
    "move": {
      "radius": 10
    },
    "url": "demo/svg/deer.svg"
  }
}
```

---

### ***Options***

key | option type / notes | example
----|---------|------
`particles.number.value` | number | `40`
`particles.number.limit` | number | `200` / `0` or less disables the limit
`particles.number.density.enable` | boolean | `true` / `false` 
`particles.number.density.area` | number | `800`
`particles.color.value` | HEX (string) <br /> RGB (object) <br /> HSL (object) <br /> array selection (HEX) <br /> random (string) | `"#b61924"` <br /> `{r:182, g:25, b:36}` <br />  `{h:356, s:76, l:41}` <br /> `["#b61924", "#333333", "999999"]` <br /> `"random"`
`particles.shape.type` | string <br /> array selection | `"circle"` <br /> `"line"` <br /> `"edge"` <br /> `"triangle"` <br /> `"polygon"` <br /> `"star"` <br /> `"image"` <br /> `["circle", "triangle", "image"]`
`particles.shape.stroke.width` | number | `2`
`particles.shape.stroke.color` | HEX (string) <br /> random (string) | `"#222222"` <br /> `"random"`
`particles.shape.polygon.sides` | number | `5`
`particles.shape.image` | object / array | A single image object like below or an array of the same objects
`particles.shape.image.src` | path link <br /> svg / png / gif / jpg | `"assets/img/yop.svg"` <br /> `"http://mywebsite.com/assets/img/yop.png"`
`particles.shape.image.width` | number <br />(for aspect ratio) | `100`
`particles.shape.image.height` | number <br />(for aspect ratio) | `100`
`particles.opacity.value` | number (0 to 1) | `0.75`
`particles.opacity.random` | boolean | `true` / `false` 
`particles.opacity.animation.enable` | boolean | `true` / `false` 
`particles.opacity.animation.speed` | number | `3`
`particles.opacity.animation.minimumValue` | number (0 to 1) | `0.25`
`particles.opacity.animation.sync` | boolean | `true` / `false`
`particles.size.value` | number | `20`
`particles.size.random` | boolean | `true` / `false` 
`particles.size.animation.enable` | boolean | `true` / `false` 
`particles.size.animation.speed` | number | `3`
`particles.size.animation.minimumValue` | number | `0.25`
`particles.size.animation.sync` | boolean | `true` / `false`
`particles.lineLinked.enable` | boolean | `true` / `false`
`particles.lineLinked.distance` | number | `150`
`particles.lineLinked.color` | HEX (string)  <br /> random (string) | `#ffffff` <br /> `"random"`
`particles.lineLinked.opacity` | number (0 to 1) | `0.5`
`particles.lineLinked.width` | number | `1.5`
`particles.move.enable` | boolean | `true` / `false`
`particles.move.speed` | number | `4`
`particles.move.direction` | string | `"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"`
`particles.move.random` | boolean | `true` / `false`
`particles.move.straight` | boolean | `true` / `false`
`particles.move.outMode` | string <br /> (out of canvas) | `"out"`<br /> `"destroy"` <br /> `"bounce"` <br /> `"bounce-vertical"` <br /> `"bounce-horizontal"`
`particles.move.bounce` | boolean <br /> (between particles) | `true` / `false`
`particles.move.attract.enable` | boolean | `true` / `false`
`particles.move.attract.rotateX` | number | `3000`
`particles.move.attract.rotateY` | number | `1500`
`interactivity.detectsOn` | string | `"canvas", "window","parent"`
`interactivity.events.onHover.enable` | boolean | `true` / `false`
`interactivity.events.onHover.mode` | string <br /> array selection | `"grab"` <br /> `"bubble"` <br /> `"repulse"` <br /> `"connect"` <br /> `["grab", "bubble"]`
`interactivity.events.onClick.enable` | boolean | `true` / `false`
`interactivity.events.onClick.mode` | string <br /> array selection | `"push"` <br /> `"remove"` <br /> `"bubble"` <br /> `"repulse"` <br /> `["push", "repulse"]`
`interactivity.events.onDiv.mnode` | string <br /> array selection | `"repulse"` <br /> `["repulse"]`
`interactivity.events.onDiv.enable` | boolean | `true` / `false`
`interactivity.events.onDiv.el` | string | `repulse-div`
`interactivity.events.resize` | boolean | `true` / `false`
`interactivity.events.modes.connect.distance` | number | `100`
`interactivity.events.modes.connect.radius` | number | `60`
`interactivity.events.modes.connect.lineLinked.opacity` | number (0 to 1) | `0.75`
`interactivity.events.modes.grab.distance` | number | `100`
`interactivity.events.modes.grab.lineLinked.opacity` | number (0 to 1) | `0.75`
`interactivity.events.modes.bubble.distance` | number | `100`
`interactivity.events.modes.bubble.size` | number | `40`
`interactivity.events.modes.bubble.duration` | number <br /> (second) | `0.4`
`interactivity.events.modes.repulse.distance` | number | `200`
`interactivity.events.modes.repulse.duration` | number <br /> (second) | `1.2`
`interactivity.events.modes.push.quantity` | number | `4`
`interactivity.events.modes.remove.quantity` | number | `4`
`detectRetina` | boolean | `true` / `false`
`fpsLimit` | number | `60`
`polygon.draw.enable` | boolean | `true` / `false`
`polygon.draw.lineWidth` | number | `0.5`
`polygon.draw.lineColor` | HEX (string) | `#ffffff`
`polygon.scale` | number | 1
`polygon.type` | string | `none` / `inside` / `outside` / `inline`
`polygon.move.radius` | number | `10`
`polygon.url` | string | `demo/svg/deer.svg`
