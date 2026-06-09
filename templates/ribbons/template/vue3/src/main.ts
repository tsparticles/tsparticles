import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import App from "./App.vue";

const app = createApp(App);

app.use(Particles, {});

app.mount("#app");
