<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>
    <Particles id="tsparticles" :options="options" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"/>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import type { Container } from "tsparticles-engine";
import type { ISourceOptions, Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";

export default class App extends Vue {
  private options: ISourceOptions = {
    preset: "bigCircles"
  };

  private particlesInit: (tsParticles: Main) => void = (tsParticles => {
    loadFull(tsParticles);
    loadBigCirclesPreset(tsParticles);
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
