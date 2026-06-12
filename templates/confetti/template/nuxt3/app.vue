<template>
  <div id="app">
    <h1>Confetti!</h1>
    <div class="controls">
      <button @click="fireConfetti">Fire Confetti</button>
      <select v-model="mode">
        <option value="cannon">Cannon</option>
        <option value="waterfall">Waterfall</option>
        <option value="random">Random</option>
      </select>
    </div>
    <Particles id="tsparticles" :options="options" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { confetti } from "@tsparticles/confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const mode = ref("cannon");
const options = {};

function fireConfetti() {
  switch (mode.value) {
    case "cannon":
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      break;
    case "waterfall": {
      const duration = 3000;
      const end = Date.now() + duration;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
          return;
        }
        confetti({ particleCount: 10, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
        confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
      }, 100);
      break;
    }
    case "random":
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
      break;
  }
}
</script>

<style>
body { margin: 0; overflow: hidden; background: #1a1a2e; font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; }
#app { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; text-align: center; color: #fff; }
h1 { font-size: 3.2em; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); }
.controls { display: flex; gap: 1rem; justify-content: center; align-items: center; margin-top: 2rem; }
button { padding: 0.8em 2em; font-size: 1.1em; border: none; border-radius: 8px; background: #e94560; color: #fff; cursor: pointer; transition: background 0.2s; }
button:hover { background: #ff6b81; }
select { padding: 0.8em 1em; font-size: 1em; border-radius: 8px; border: 1px solid #444; background: #16213e; color: #fff; cursor: pointer; }
</style>
