<script setup lang="ts">
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import TheWelcome from "@/components/TheWelcome.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      options: {
        particles: {
          color: {
            value: "#000",
          },
          links: {
            enable: true,
            color: "#000",
          },
          move: {
            enable: true,
          },
        },
      },
    };
  },
  methods: {
    async particlesInit(engine: Engine) {
      await loadFull(engine);
    },
  },
};
</script>

<template>
  <main>
    <TheWelcome />
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />
  </main>
</template>
