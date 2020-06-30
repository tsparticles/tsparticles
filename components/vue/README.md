# VueJS  
  
![npm](https://img.shields.io/npm/v/particles.vue) ![npm](https://img.shields.io/npm/dm/particles.vue)  
  
## Installation  
  
```shell script  
yarn add particles.vue  
```  
  
## Usage  
  
```javascript  
import Particles from 'particles.vue';  
  
export default {  
 name: 'App', components: { Particles }
}  
```  
### Simple config  
  
```html  
<template>  
 <div id="app">
   <Particles id="tsparticles" :options="{
                                           background: {
                                             color: {
                                               value: '#0d47a1'
                                             }
                                           },
                                           fpsLimit: 60,
                                           interactivity: {
                                             detectsOn: 'canvas',
                                             events: {
                                               onClick: {
                                                 enable: true,
                                                 mode: 'push'
                                               },
                                               onHover: {
                                                 enable: true,
                                                 mode: 'repulse'
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
                                               value: '#ffffff'
                                             },
                                             links: {
                                               color: '#ffffff',
                                               distance: 150,
                                               enable: true,
                                               opacity: 0.5,
                                               width: 1
                                             },
                                             collisions: {
                                               enable: true
                                             },
                                             move: {
                                               direction: 'none',
                                               enable: true,
                                               outMode: 'bounce',
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
                                               type: 'circle'
                                             },
                                             size: {
                                               random: true,
                                               value: 5
                                             }
                                           },
                                           detectRetina: true
                                         }"/>
  </div>
</template>
```  
  
### Full Config  
  
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
