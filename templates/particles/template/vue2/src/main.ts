import Vue from "vue";
import VueParticles from "@tsparticles/vue2";
import { particles } from "@tsparticles/particles";
import App from "./App.vue";

Vue.use(VueParticles, {
  init: async () => {
    await particles.init();
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");