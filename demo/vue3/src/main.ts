import App from "./App.vue";
import Particles from "@tsparticles/vue3";
import { createApp } from "vue";
import { engine } from "../particlesEngine";
import "./assets/main.css";
import { registerParticles } from "./particlesInit";

const app = createApp(App);

app.use(Particles, {
  engine,
  init: registerParticles,
});

app.mount("#app");
