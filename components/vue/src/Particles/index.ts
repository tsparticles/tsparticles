import _Vue from "vue";
import particles from "./Particles.vue";

const VueParticles = (Vue: typeof _Vue, options: unknown) => {
    _Vue.component('Particles', particles);
};

export { particles as ParticlesComponent };
export default VueParticles;
