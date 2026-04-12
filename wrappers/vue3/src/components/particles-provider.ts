import { type Engine, tsParticles } from "@tsparticles/engine";
import { inject, reactive, type App, type InjectionKey } from "vue";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

export interface IParticlesProviderOptions {
  init?: ParticlesPluginRegistrar;
}

export interface IParticlesProviderContext {
  loaded: boolean;
}

export const particlesProviderKey: InjectionKey<IParticlesProviderContext> = Symbol("particles-provider");

const appInitPromises = new WeakMap<App, Promise<void>>();
const appInitCallbacks = new WeakMap<App, ParticlesPluginRegistrar | undefined>();

export function createParticlesProviderContext(): IParticlesProviderContext {
  return reactive<IParticlesProviderContext>({ loaded: false });
}

export function initParticlesProvider(
  app: App,
  context: IParticlesProviderContext,
  init?: ParticlesPluginRegistrar,
): Promise<void> {
  const existingPromise = appInitPromises.get(app);
  const existingCallback = appInitCallbacks.get(app);

  if (existingPromise && existingCallback !== init) {
    throw new Error("@tsparticles/vue3 init callback must be stable across the app lifecycle.");
  }

  if (existingPromise) {
    return existingPromise;
  }

  appInitCallbacks.set(app, init);

  const initPromise = (async () => {
    tsParticles.init();

    if (init) {
      await init(tsParticles);
    }

    context.loaded = true;
  })().catch(error => {
    appInitPromises.delete(app);
    appInitCallbacks.delete(app);

    throw error;
  });

  appInitPromises.set(app, initPromise);

  return initPromise;
}

export function useParticlesProvider(): IParticlesProviderContext {
  const context = inject(particlesProviderKey, undefined);

  if (!context) {
    throw new Error("@tsparticles/vue3 plugin is required. Register it with app.use(Particles, { init }).");
  }

  return context;
}
