import App from "./App.vue";
import Particles from "@tsparticles/vue3";
import { createApp } from "vue";
import { engine } from "../particlesEngine";

const app = createApp(App);

app.use(Particles, {
  engine,
});

app.mount("#app");
