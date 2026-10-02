import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import { particles } from "@tsparticles/particles";
import App from "./App.vue";

const app = createApp(App);

app.use(Particles, {
  init: async () => {
    await particles.init();
  },
});

app.mount("#app");
