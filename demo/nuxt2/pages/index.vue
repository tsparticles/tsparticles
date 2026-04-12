<template>
  <div>
    <vue-particles
      id="tsparticles"
      :options="options"
      :particles-loaded="particlesLoaded"
    />
  </div>
</template>

<script lang="ts">
import type { Container, ISourceOptions } from '@tsparticles/engine'
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      options: {
        background: {
          color: '#000',
        },
        particles: {
          links: {
            enable: true,
          },
          move: {
            enable: true,
          },
          number: {
            value: 100,
          },
        },
      } as ISourceOptions,
    }
  },
  methods: {
    particlesLoaded(container?: Container) {
      console.log(container)
    },
  },
})
</script>
