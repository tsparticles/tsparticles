<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>
    <vue-particles id="tsparticles" :options="options"/>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import configs from "@tsparticles/configs";

export default class App extends Vue {
  options = configs.basic;
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
