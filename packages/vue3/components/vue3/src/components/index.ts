import type { App } from "vue";
import particles from "./vue-particles.vue";
import { type Engine, tsParticles } from "@tsparticles/engine";

const VueParticles = (app: App, options: { init: (engine: Engine) => Promise<void> }) => {
    app.component("vue-particles", particles);

    (async () => {
        tsParticles.init();

        if (options.init) {
            await options.init(tsParticles);
        }

        dispatchEvent(new CustomEvent("particlesInit", { detail: tsParticles }));
    })();
};

export default VueParticles;
