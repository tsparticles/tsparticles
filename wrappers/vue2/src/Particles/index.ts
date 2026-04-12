import particles from "./vue-particles.vue";
import { tsParticles } from "@tsparticles/engine";
import EventBus from "./event-bus";

export type ParticlesPluginRegistrar = (engine: typeof tsParticles) => Promise<void> | void;

export interface IParticlesPluginOptions {
  init?: ParticlesPluginRegistrar;
}

const VueParticles = {
  install: (vue: { component: (name: string, component: unknown) => void }, options?: IParticlesPluginOptions) => {
    vue.component("VueParticles", particles);
    vue.component("VueParticles", particles);

    if (options?.init) {
      Promise.resolve(options.init(tsParticles)).then(() => {
        EventBus.$emit("particles-init");
      });
    }
  },
};

export { particles as ParticlesComponent };
export default VueParticles;
