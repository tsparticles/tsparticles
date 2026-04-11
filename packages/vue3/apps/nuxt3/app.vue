<template>
  <div>
    <!--<NuxtWelcome/>-->
    <client-only>
      <vue-particles
          id="tsparticles"
          :options="options"
          @particles-loaded="particlesLoaded"
      />
    </client-only>
  </div>
</template>
<script setup lang="ts">
import type { ISourceOptions, Container } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#000"
  },
  particles: {
    links: {
      enable: true
    },
    move: {
      enable: true
    },
    number: {
      value: 100
    }
  }
}

const particlesLoaded = (container?: Container) => {
  console.log(container)
}

</script>
<style>
.bg-white {
  background: none !important;
}
</style>
