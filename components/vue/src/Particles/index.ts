import _Vue from "vue";
import particles from "./Particles.vue";

const VueParticles = (Vue: _Vue, options: unknown) => {
    _Vue.component('Particles', particles);
};

export default VueParticles;