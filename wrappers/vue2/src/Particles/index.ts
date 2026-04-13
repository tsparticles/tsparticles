import particles from "./vue-particles.vue";
import { ensureParticlesInitialization, type ParticlesPluginRegistrar } from "./event-bus";

export interface IParticlesPluginOptions {
  init?: ParticlesPluginRegistrar;
}

const VueParticles = {
  install: (vue: { component: (name: string, component: unknown) => void }, options?: IParticlesPluginOptions) => {
    vue.component("VueParticles", particles);
    vue.component("VueParticles", particles);

    void ensureParticlesInitialization(options?.init);
  },
};

export default VueParticles;
