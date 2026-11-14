import App from "./App.vue";
import Particles from "@tsparticles/vue3";
import { createApp } from "vue";
import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

const app = createApp(App);

app.use(Particles, {
  engine,
  init: async engine => {
    await loadSlim(engine);
  },
});

app.mount("#app");
