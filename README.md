![banner](https://cdn.matteobruni.it/images/particles/banner.png)

# tsParticles - TypeScript Particles  
  
**A lightweight TypeScript library for creating particles. Dependency free (\*) and browser ready!**  
  
_[Particles.js](https://github.com/VincentGarreau/particles.js) converted in TypeScript, dependency free (\*), improved with new cool 😎 features and various bugs fixed and **it's currently under development**!_  
  
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) ![npm](https://img.shields.io/npm/dm/tsparticles)  
  
| `master` | `staging` | `dev` |  
| --- | --- | --- |  
| [![Master Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=master)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=master) | [![Staging Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=staging)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=staging) | [![Dev Build Status](https://dev.azure.com/hollowmatt/particles.ts/_apis/build/status/matteobruni.tsparticles?branchName=dev)](https://dev.azure.com/hollowmatt/particles.ts/_build/latest?definitionId=11&branchName=dev) | 

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Coverage) [![Sauce Test Status](https://saucelabs.com/buildstatus/matteobruni)](https://app.saucelabs.com/u/matteobruni)  
  
[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")  
  
## Do you want to use it on your website?  
  
**This library is available on the two most popular CDNs and it's easy and ready to use, if you were using particles.js it's even easier**.  
  
You'll find the instructions [below](https://github.com/matteobruni/tsparticles/blob/master/README.md#library-installation), with all the links you need, and _don't be scared by **TypeScript**, it's just the source language_.  
  
**The output files are just JavaScript**. 🤩  
  
CDNs and `npm` have all the sources you need in **Javascript**, a bundle browser ready (tsparticles.min.js) and all files splitted for `import` syntax.  
  
**If you are still interested** some lines below there are some instructions for migrating from the old particles.js library.  
  
### Related projects  
  
#### jQuery  
  
![npm](https://img.shields.io/npm/v/jquery-particles) ![npm](https://img.shields.io/npm/dm/jquery-particles)  
  
##### Installation  
  
```shell script  
npm install jquery-particles  
```  
  
or from jsDelivr  
  
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)  
  
```html  
<!-- first include tsParticles -->  
<script src="https://cdn.jsdelivr.net/npm/tsparticles@1.16.0/dist/tsparticles.min.js"></script>  
<!-- then include jquery wrapper -->  
<script src="https://cdn.jsdelivr.net/npm/jquery-particles@1.16.0/dist/jquery.particles.min.js"></script>  
```  
  
##### How to use  
  
HTML  
  
```html  
<div id="tsparticles"></div>  
```  
  
```javascript  
$("#tsparticles")  
 .particles() .init({
  background: {
    color: {
      value: "#0d47a1"
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}, function (container) { // container is the particles container where you can play/pause or stop/start. // the container is already started, you don't need to start it manually. } );  
// or  
  
$("#tsparticles")  
 .particles() .ajax("particles.json", function (container) { // container is the particles container where you can play/pause or stop/start. // the container is already started, you don't need to start it manually. });
```  
  
#### VueJS  
  
![npm](https://img.shields.io/npm/v/particles.vue) ![npm](https://img.shields.io/npm/dm/particles.vue)  
  
##### Installation  
  
```shell script  
yarn add particles.vue  
```  
  
##### Usage  
  
```javascript  
import Particles from 'particles.vue';  
  
export default {  
 name: 'App', components: { Particles }}  
```  
###### Simple config  
  
```html  
<template>  
 <div id="app"> <Particles id="tsparticles" lineLinked="true"/> </div>
</template>
```  
  
###### Full Config  
  
```html  
<template>  
 <div id="app">
   <particles id="tsparticles"
              color="#dedede"
              particleOpacity="0.7"
              particlesNumber="80"
              shapeType="circle"
              particleSize="5"
              linesColor="#dedede"
              linesWidth="1"
              lineLinked="true"
              lineOpacity="0.4"
              linesDistance="150"
              moveSpeed="6"
              hoverEffect="true"
              hoverMode="bubble"
              clickEffect="true"
              clickMode="push"></particles>
  </div>
</template>
```
  
#### ReactJS  
  
![npm](https://img.shields.io/npm/v/react-tsparticles) ![npm](https://img.shields.io/npm/dm/react-tsparticles)  
  
##### Installation  
  
`npm install react-tsparticles`  
  
or  
  
`yarn add react-tsparticles`  
  
##### How to use  
  
###### Code  
  
Example:  
  
```javascript  
import Particles from 'react-tsparticles';  
  
class App extends Component{  
     render(){  
 return (
 <Particles id="tsparticles" params={{
  background: {
    color: {
      value: "#0d47a1"
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}} />
     );
  } 
}
```  
  
###### Props  
  
| Prop | Type | Definition |  
| --- | --- | --- |  
| width | string | The width of the canvas. |  
| height | string | The height of the canvas. |  
| params | object | The parameters of the particles instance. |  
| style | object | The style of the canvas element. |  
| className | string | The class name of the canvas wrapper. |  
| canvasClassName | string | the class name of the canvas. |  
| container | object | The instance of the [particles container](https://github.com/matteobruni/tsparticles/wiki/Particles-Container-class) |  
  
Find your parameters configuration [here](https://particles.matteobruni.it).  
  
###### Errors  
  
If you have typescript errors `tsParticles` uses TypeScript `3.9.3` so try installing at least 3.8 for `import type` syntax.  
  
##### 3rd Party  
  
A 3rd-party component is available too, read more [here](https://github.com/Wufe/react-particles-js)  
  
#### Preact  
  
![npm](https://img.shields.io/npm/v/preact-particles) ![npm](https://img.shields.io/npm/dm/preact-particles)  
  
##### Installation  
  
`npm install preact-particles`  
  
or  
  
`yarn add preact-particles`  
  
##### How to use  
  
###### Code  
  
Example:  
  
```javascript  
import Particles from 'preact-particles';  
  
class App extends Component{  
     render(){  
 return (
 <Particles id="tsparticles" params={{
  background: {
    color: {
      value: "#0d47a1"
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}} />
    );
  };  
}  
  
```  
  
###### Props  
  
| Prop | Type | Definition |  
| --- | --- | --- |  
| width | string | The width of the canvas. |  
| height | string | The height of the canvas. |  
| params | object | The parameters of the particles instance. |  
| style | object | The style of the canvas element. |  
| className | string | The class name of the canvas wrapper. |  
| canvasClassName | string | the class name of the canvas. |  
| container | object | The instance of the [particles container](https://github.com/matteobruni/tsparticles/wiki/Particles-Container-class) |  
  
Find your parameters configuration [here](https://particles.matteobruni.it).  
  
###### Errors  
  
If you have typescript errors `tsParticles` uses TypeScript `3.9.3` so try installing at least 3.8 for `import type` syntax.  
  
#### Angular CLI  
  
![npm](https://img.shields.io/npm/v/ng-particles) ![npm](https://img.shields.io/npm/dm/ng-particles)  
  
##### How to use it  
  
###### Install  
  
```shell script  
npm install ng-particles  
```  
  
or  
  
```shell script  
yarn add ng-particles  
```  
  
###### Usage  
  
*template.html*  
  
```html  
<ng-particles id="tsparticles" [options]="particlesOptions"></ng-particles>  
```  
  
*app.ts*  
  
```typescript  
export class AppComponent {  
 particlesOptions = {
  background: {
    color: {
      value: "#0d47a1"
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
};
}  
```  
  
*app.module.ts*  
  
```typescript  
import { NgParticlesModule } from 'ng-particles';  
import { NgModule } from "@angular/core";  
  
@NgModule({  
 declarations: [ /* AppComponent */ ],
 imports: [ /* other imports */ NgParticlesModule // NgParticlesModule is required ],
 providers: [],
 bootstrap: [ /* AppComponent */ ]
 })  
export class AppModule { }  
```  
  
### Want to see it in action and try it?  
  
I've created a tsParticles collection on [CodePen](https://codepen.io/collection/DPOage) 😮 or you can checkout my [profile](https://codepen.io/matteobruni)  
  
Otherwise there's the demo page link below. Just click/tap the Coronavirus below, don't be scared. **It's safe** 😷.  
  
[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.matteobruni.it/#virus)  
  
Want to see ever more demos? Clone the repository on your computer and follow these instructions  
  
```shell  
yarn install && yarn start  
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
  
_Read more [here](https://github.com/matteobruni/tsparticles/wiki/Create-a-tsParticles-Plugin)..._  
  
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
 .loadJSON("tsparticles", "presets/default.json") .then((container) => { console.log("callback - tsparticles config loaded"); }) .catch((error) => { console.error(error); });  
//or  
  
/* tsParticles.load(@dom-id, @options); */  
tsParticles.load("tsparticles", {  
 /* options here */});  
  
//or  
  
/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */  
tsParticles.loadFromArray("tsparticles", [  
 { /* options here */ }, { /* other options here */ },]); //random object  
tsParticles.loadFromArray(  
 "tsparticles", [ { /* options here */ }, { /* other options here */ }, ], 1); //the second one  
// Important! If the index is not in range 0...array.length, the index will be ignored.  
  
// after initialization this can be used.  
  
/* tsParticles.setOnClickHandler(@callback); */  
/* this will be fired from all particles loaded */  
tsParticles.setOnClickHandler((e) => {  
 /* custom on click handler */});  
  
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
  
## Stargazers over time  
  
[![Stargazers over time](https://starchart.cc/matteobruni/tsparticles.svg)](https://starchart.cc/matteobruni/tsparticles)  
  
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
