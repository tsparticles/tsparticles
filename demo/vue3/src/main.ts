import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import App from "./App.vue";

import "./assets/main.css";
import { registerParticles } from "./particlesInit";

const app = createApp(App);

app.use(Particles, {
  init: registerParticles,
});

app.mount("#app");
