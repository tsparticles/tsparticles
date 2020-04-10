# particles.vue

Vue.js component for [tsParticles](https://github.com/matteobruni/tsparticles)

## Installation

```shell script
yarn add particles.vue
```

## Usage

```javascript
import Vue from 'vue';
import VueParticles from 'vue-particles';

Vue.use(VueParticles)
```
### Simple config

```html
<template>
    <div id="app">
      <particles color="#dedede"></particles>
    </div>
 </template>
```

### Full Config

```html
<template>
    <div id="app">
      <particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </particles>
    </div>
 </template>
```
