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
   <Particles id="tsparticles" lineLinked="true"/>
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
