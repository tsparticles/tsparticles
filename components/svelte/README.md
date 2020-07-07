# tsParticles Svelte component

![npm](https://img.shields.io/npm/v/svelte-particles) ![npm downloads](https://img.shields.io/npm/dm/svelte-particles)

Official tsParticles Svelte component

## Usage
   
```html
<script>
   import Particles from "svelte-particles";
   
   let particlesConfig = {
       particles: {
           color: {
               value: '#000'
           },
           links: {
               enable: true,
               color: '#000'
           },
           move: {
               enable: true
           }
       }
   };
</script>

<Particles id="tsparticles" options={particlesConfig} />
```