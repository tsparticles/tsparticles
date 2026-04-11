import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import App from "./App.vue";

import "./assets/main.css";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";

const app = createApp(App);

app.use(Particles, {
    init: async (engine: Engine) => {
        await loadFull(engine);
    }
});

app.mount("#app");
