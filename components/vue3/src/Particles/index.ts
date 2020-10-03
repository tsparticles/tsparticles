import { App } from "vue";
import particles from "./Particles.vue";

const VueParticles = (app: App, options: unknown) => {
    app.component('Particles', particles);
};

export default VueParticles;
