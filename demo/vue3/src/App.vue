<script setup lang="ts">
import { ref } from "vue";
import type { Container } from "@tsparticles/engine";
import configs from "@tsparticles/configs";

type ConfigKey = keyof typeof configs;
const configKeys = Object.keys(configs) as ConfigKey[];

const currentTheme = ref<string | undefined>(undefined);
const options = ref(configs.basic);

function switchConfig(key: ConfigKey) {
  options.value = configs[key];
}

function particlesLoaded(container?: Container) {
  console.log("Particles loaded", container);
}
</script>

<template>
  <main>
    <div class="controls">
      <span
        v-for="key in configKeys"
        :key="key"
        class="pill"
        @click="switchConfig(key)"
      >
        {{ key }}
      </span>
    </div>
    <vue-particles
      id="tsparticles"
      :options="options"
      :theme="currentTheme"
      @particles-loaded="particlesLoaded"
    />
    <div class="footer">
      Click a config pill above to switch particle options at runtime.
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";

body {
  margin: 0;
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
}

#app {
  width: 100%;
}

main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.controls {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 90vw;
}

.pill {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--color-text);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.8rem;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s, transform 0.15s;
}

.pill:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.footer {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  opacity: 0.6;
  color: var(--color-text);
}
</style>
