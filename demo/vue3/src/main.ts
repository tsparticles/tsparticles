import { createApp } from "vue";
import Particles from "particles.vue3";
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/lib/common';
import App from "./App.vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";

createApp(App)
  .use(Particles)
  .use(hljsVuePlugin)
  .mount("#app");
