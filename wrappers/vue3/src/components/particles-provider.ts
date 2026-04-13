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

interface IParticlesInitializationState {
  callback?: ParticlesPluginRegistrar;
  loaded: boolean;
  promise?: Promise<void>;
}

const globalStateKey = "__tsparticles_vue3_init_state__";

function getGlobalInitializationState(): IParticlesInitializationState {
  const globalStore = globalThis as typeof globalThis & {
    [globalStateKey]?: IParticlesInitializationState;
  };

  globalStore[globalStateKey] ??= {
    loaded: false,
  };

  return globalStore[globalStateKey];
}

export function createParticlesProviderContext(): IParticlesProviderContext {
  return reactive<IParticlesProviderContext>({ loaded: false });
}

export function initParticlesProvider(
  _app: App,
  context: IParticlesProviderContext,
  init?: ParticlesPluginRegistrar,
): Promise<void> {
  const state = getGlobalInitializationState();

  if (state.promise && state.callback !== init && !state.loaded) {
    throw new Error("@tsparticles/vue3 init callback must be stable across the app lifecycle.");
  }

  if (state.loaded) {
    context.loaded = true;

    return Promise.resolve();
  }

  if (state.promise) {
    return state.promise.then(() => {
      context.loaded = true;
    });
  }

  state.callback = init;
  state.promise = (async () => {
    if (init) {
      await init(tsParticles);
    }

    await tsParticles.init();

    state.loaded = true;
    context.loaded = true;
  })().catch(error => {
    state.promise = undefined;
    state.callback = undefined;
    state.loaded = false;

    throw error;
  });

  return state.promise;
}

export function useParticlesProvider(): IParticlesProviderContext {
  const context = inject(particlesProviderKey, undefined);

  if (!context) {
    throw new Error("@tsparticles/vue3 plugin is required. Register it with app.use(Particles, { init }).");
  }

  return context;
}
