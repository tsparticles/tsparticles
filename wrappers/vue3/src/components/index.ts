import {
  type IParticlesProviderOptions,
  createParticlesProviderContext,
  initParticlesProvider,
  particlesProviderKey,
} from "./particles-provider";
import type { App } from "vue";
import particles from "./vue-particles.vue";

const VueParticles = (app: App, options: IParticlesProviderOptions) => {
  const context = createParticlesProviderContext(options.engine);

  app.provide(particlesProviderKey, context);
  app.component("VueParticles", particles);

  void initParticlesProvider(app, context, options.init);
};

export default VueParticles;

export type {
  IParticlesProviderContext,
  IParticlesProviderOptions,
  ParticlesPluginRegistrar,
} from "./particles-provider";
