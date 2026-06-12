import Vue from "vue";
import VueParticles from "@tsparticles/vue2";
import { loadSlim } from "@tsparticles/slim";
import App from "./App.vue";

Vue.use(VueParticles, {
  init: async (engine) => {
    await loadSlim(engine);
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
