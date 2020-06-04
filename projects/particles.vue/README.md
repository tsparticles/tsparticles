# tsParticles - Vue Component ![Node.js CI](https://github.com/matteobruni/particles.vue/workflows/Node.js%20CI/badge.svg)

Vue.js component for [tsParticles](https://github.com/matteobruni/tsparticles)

## Installation

```shell script
yarn add particles.vue
```

## Usage

```javascript
import Particles from 'particles.vue';

export default {
    name: 'App',
    components: {
        Particles
    }
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
      <particles
        id="tsparticles"
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

## Need More Help?

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
