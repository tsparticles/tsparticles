import App from "./App.vue";
import Particles from "@tsparticles/vue3";
import { createApp } from "vue";
import { createParticles } from "@tsparticles/particles";
const particles = createParticles(engine);
import { engine } from "../particlesEngine";

const app = createApp(App);

app.use(Particles, {
  engine,
  init: async () => {
    await particles.init();
  },
});

app.mount("#app");
