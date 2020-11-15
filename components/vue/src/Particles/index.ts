import Vue from "vue";
import particles from "./Particles.vue";

const VueParticles = {
    install: (vue: typeof Vue, options: unknown) => {
        Vue.component('Particles', particles);
    }
};

export { particles as ParticlesComponent };
export default VueParticles;
