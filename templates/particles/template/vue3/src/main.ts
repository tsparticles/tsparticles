import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import { loadParticles } from "@tsparticles/particles";
import App from "./App.vue";

const app = createApp(App);

app.use(Particles, {
  init: async (engine) => {
    await loadParticles(engine);
  },
});

app.mount("#app");
