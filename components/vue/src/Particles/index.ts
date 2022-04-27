import Vue from "vue";
import particles from "./@tsparticles/vue2";

const VueParticles = {
    install: (vue: typeof Vue, options: unknown) => {
        vue.component('Particles', particles);
    }
};

export { particles as ParticlesComponent };
export default VueParticles;
