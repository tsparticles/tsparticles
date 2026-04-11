[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ember-tsparticles

An Ember.js component for using [tsParticles](https://github.com/matteobruni/tsparticles). Easily create highly customizable JavaScript particles effects, confetti explosions and fireworks animations and use them as animated backgrounds for your website.


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```bash
npm install ember-tsparticles
# or
yarn add ember-tsparticles
# or
pnpm install ember-tsparticles
# or
ember install ember-tsparticles
```


## Usage

For the most basic usage of the component you can pass a configuration object via the `options` argument and initialize the tsparticles features you need in the `particlesInit` callback.

By default `tsparticles` doesn't load any extensions required to render particles. Extensions can be loaded on a granular level which has the benefit that only what is required is loaded, but to start out it can be useful to load all options via the `loadFull` function of `tsparticles`.

For the configuration object API documentation, see the [tsparticles repository](https://github.com/matteobruni/tsparticles).

```bash
npm install tsparticles
```

```hbs
<Particles
  @options={{this.options}}
  @particlesInit={{this.particlesInit}}
/>
```
```js
import { Component } from '@glimmer/component';
import { loadFull } from 'tsparticles';

export default class ExampleComponent extends Component {
  options = {
    particles: {
      color: {
        value: '#000',
      },
      links: {
        enable: true,
        color: '#000',
      },
      move: {
        enable: true,
      },
    },
  };

  async particlesInit(engine) {
    await loadFull(engine);
  }
}
```

![ExampleComponent](/images/minimal.png)

### With template import syntax

 When using [ember-template-imports](https://github.com/ember-template-imports/ember-template-imports) the example above would look like this, using the `.gjs` file extension.

 ```js
 import { loadFull } from 'tsparticles';
 import Particles from 'ember-tsparticles/components/particles';
 
 const options = {
   particles: {
     color: {
       value: '#000',
     },
     links: {
       enable: true,
       color: '#000',
     },
     move: {
       enable: true,
     },
   },
 };
 const particlesInit = async (engine) => {
   await loadFull(engine);
 };
 <template>
   <Particles
     @options={{options}}
     @particlesInit={{particlesInit}}
   />
 </template>
 ```

### Using presets

Presets are offered by `tsparticles` which allow to use premade configuration objects. Refer to the [presets](https://github.com/matteobruni/tsparticles#Presets) section in the `tsparticles` repository to view all existing presets.

```bash
npm install tsparticles-preset-confetti
```

```hbs
<Particles
  @options={{hash preset='confetti'}}
  @particlesInit={{this.loadPreset}}
/>
```
```js
import { Component } from '@glimmer/component';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';

export default class ConfettiComponent extends Component {
  async loadPreset(engine) {
    await loadConfettiPreset(engine);
  }
}
```

![ConfettiComponent](/images/confetti.png)

### Loading options from an URL

Options can also be passed via link with the `url` argument. These will be fetched once the component renders.

```hbs
<Particles
  @url={{'http://foo.bar/particles.json'}}
  @particlesInit={{this.particlesInit}}
/>
```
```js
import { Component } from '@glimmer/component';
import { loadFull } from 'tsparticles';

export default class ExampleComponent extends Component {
  async particlesInit(engine) {
    await loadFull(engine);
  }
}
```

### Particles loaded callback

Further customization to the `tsparticles` container can be done by using the `particlesLoaded` callback argument. This callback passes the container instance for that particular component.

```hbs
<Particles
  @url={{'http://foo.bar/particles.json'}}
  @particlesInit={{this.particlesInit}}
  @particlesLoaded={{this.loadedCallback}}
/>
```
```js
import { Component } from '@glimmer/component';
import { loadFull } from 'tsparticles';

export default class ExampleComponent extends Component {
  async particlesInit(engine) {
    await loadFull(engine);
  }

  loadedCallback(container) {
    console.log(
      'A callback function can be passed which triggers when the particles are loaded',
      container
    );
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
