<template>
  <main id="app">
    <vue-particles id="tsparticles" :options="options" :particles-loaded="particlesLoaded" />
  </main>
</template>

<script lang="ts">
import { Container } from "@tsparticles/engine";
import { Vue } from "vue-property-decorator";
import configs from "@tsparticles/configs";

export default class App extends Vue {
  options = configs.basic;

  particlesLoaded(container?: Container): void {
    console.log(container);
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
