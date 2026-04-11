import Vue from "vue";
import particles from "./vue-particles.vue";
import { Engine, tsParticles } from "@tsparticles/engine";
import EventBus from "./event-bus.js";

const VueParticles = {
    install: (vue: typeof Vue, options: { init: (engine: Engine) => Promise<void> }) => {
        vue.component("vue-particles", particles);

        if (options && options.init) {
            options.init(tsParticles).then(() => {
                EventBus.$emit("particles-init");
            });
        }
    },
};

export { particles as ParticlesComponent };
export default VueParticles;
