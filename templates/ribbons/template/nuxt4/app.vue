<script setup lang="ts">
import { ribbons } from "@tsparticles/ribbons";

function fireRibbons() {
  ribbons();
}
</script>

<template>
  <div id="app">
    <h1>Ribbons</h1>
    <div class="controls">
      <button @click="fireRibbons">Fire Ribbons</button>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
  background: #0a0a23;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

#app {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}

h1 {
  font-size: 3.2em;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.controls {
  margin-top: 2rem;
}

button {
  padding: 0.8em 2em;
  font-size: 1.1em;
  border: none;
  border-radius: 8px;
  background: #6c5ce7;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #a29bfe;
}
</style>
