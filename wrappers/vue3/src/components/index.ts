import type { App } from "vue";
import particles from "./vue-particles.vue";
import {
  createParticlesProviderContext,
  type IParticlesProviderOptions,
  initParticlesProvider,
  particlesProviderKey,
  type ParticlesPluginRegistrar,
  useParticlesProvider,
} from "./particles-provider";

const VueParticles = (app: App, options?: IParticlesProviderOptions) => {
  const context = createParticlesProviderContext();

  app.provide(particlesProviderKey, context);
  app.component("VueParticles", particles);

  void initParticlesProvider(app, context, options?.init);
};

export default VueParticles;

export { createParticlesProviderContext, initParticlesProvider, particlesProviderKey, useParticlesProvider };

export type {
  IParticlesProviderContext,
  IParticlesProviderOptions,
  ParticlesPluginRegistrar,
} from "./particles-provider";
