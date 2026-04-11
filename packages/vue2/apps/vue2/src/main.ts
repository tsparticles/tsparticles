import Vue from 'vue'
import App from './App.vue'
import Particles from "@tsparticles/vue2";
import { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

Vue.config.productionTip = false

Vue.use(Particles, {
    init: async (engine: Engine) => {
        await loadFull(engine);
    }
});

new Vue({
    render: h => h(App),
}).$mount('#app')
