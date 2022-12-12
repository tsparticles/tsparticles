<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>
    <Particles id="tsparticles" :options="options" :particlesInit="particlesInit"/>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { basic } from "tsparticles-demo-configs";

import Particles from "vue2-particles";

Vue.use(Particles);

export default class App extends Vue {
  options = basic;

  async particlesInit(engine: Engine) {
    await loadFull(engine);
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
</style>
