[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# particles.vue3

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Offizieller [tsParticles](https://github.com/matteobruni/tsparticles) VueJS 3.x -Komponent

## Installation

```shell script

yarn add particles.vue3

```

## Verwendung

```javascript
import Particles from 'particles.vue3';

createApp(App).use(Particles);
```

### Demo config

```html
<template>
  <div id="app">
    <Particles
      id="tsparticles"
      :options="{

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

size: 40

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

}"
    />
  </div>
</template>
```

### TypeScript errors

Wenn TypeScript beim Importieren/Benutzen des Particles-Plugins einen Fehler zurückgibt, versuche die folgende Zeile vor dem vorherigen Code einzufügen.

```typescript
declare module 'particles.vue3';
```

## Demos

Klicke [hier](https://particles.js.org) für die Demo-Webseite.

<https://particles.js.org>

[Hier](https://codepen.io/collection/DPOage) gibt es auch eine CodePen-Sammlung, die aktiv gepflegt und geupdated wird.

<https://codepen.io/collection/DPOage>
