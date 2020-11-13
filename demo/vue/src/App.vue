<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>
    <Particles id="tsparticles" :options="options" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"/>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { Container, ISourceOptions, Main } from "tsparticles";
import { loadPreset } from "tsparticles-preset-sea-anemone";

declare module 'particles.vue';
import Particles from "particles.vue";

Vue.use(Particles);

/* workaround, the plugin doesn't seem to work anymore */
import { ParticlesComponent } from "particles.vue";

Vue.component("Particles", ParticlesComponent);
/* end workaround */

export default class App extends Vue {
  private options: ISourceOptions = {
    preset: "seaAnemone"
  };

  private particlesInit: (tsParticles: Main) => void = (tsParticles => {
    loadPreset(tsParticles);
  });

  private particlesLoaded: (container: Container) => void = (container => {
    console.log(container);
  });

  private mounted(): void {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#tsparticles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: -10;
}
</style>
