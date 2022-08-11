import { createApp } from "vue";
import Particles from "vue3-particles";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router).use(Particles);

app.mount("#app");
