[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/riot

[![npm](https://img.shields.io/npm/v/@tsparticles/riot)](https://www.npmjs.com/package/@tsparticles/riot) [![npm](https://img.shields.io/npm/dm/@tsparticles/riot)](https://www.npmjs.com/package/@tsparticles/riot) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Riot component.

## Installation

```shell
npm install @tsparticles/riot
```

or

```shell
yarn add @tsparticles/riot
```

## Usage

Initialize the engine once before mounting the component.

```html
<script>
  import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
  import { loadSlim } from "@tsparticles/slim";

  void initParticlesEngine(async (engine) => {
    await loadSlim(engine);
  });

  export default {
    components: {
      RiotParticles,
    },
  };
</script>

<riot-particles
  id="tsparticles"
  options={{
    background: {
      color: {
        value: "#000",
      },
    },
    particles: {
      links: {
        enable: true,
      },
      move: {
        enable: true,
      },
    },
  }}
  particlesLoaded={(container) => console.log(container)}
/>

<!-- or -->

<riot-particles
  id="tsparticles"
  url="https://foo.bar/particles.json"
  particlesLoaded={(container) => console.log(container)}
/>
```

`<riot-particles />` props:

- `id`: container id
- `options`: particles options object
- `url`: remote JSON config URL
- `particlesLoaded`: callback invoked with the loaded container
