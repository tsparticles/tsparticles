import { type App, type InjectionKey, inject, markRaw, reactive } from "vue";
import type { Engine } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

const states = new WeakMap<Engine, { loaded: boolean; promise: Promise<void> }>();

async function initializeEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void> {
  const existing = states.get(engine);
  if (existing) {
    return existing.promise;
  }
  const state = { loaded: false, promise: Promise.resolve() };
  states.set(engine, state);
  state.promise = Promise.resolve()
    .then(async () => {
      await init?.(engine);
      await engine.init();
      state.loaded = true;
    })
    .catch((error: unknown) => {
      states.delete(engine);
      throw error;
    });
  return state.promise;
}

export interface IParticlesProviderOptions {
  engine: Engine;
  init?: ParticlesPluginRegistrar;
}

export interface IParticlesProviderContext {
  engine: Engine;
  loaded: boolean;
}

export const particlesProviderKey: InjectionKey<IParticlesProviderContext> = Symbol("particles-provider");

export function createParticlesProviderContext(engine: Engine): IParticlesProviderContext {
  return reactive({ engine: markRaw(engine), loaded: false });
}

export async function initParticlesProvider(
  _app: App,
  context: IParticlesProviderContext,
  init?: ParticlesPluginRegistrar,
): Promise<void> {
  await initializeEngine(context.engine, init);
  context.loaded = true;
}

export function useParticlesProvider(): IParticlesProviderContext {
  const context = inject(particlesProviderKey, undefined);
  if (!context) {
    throw new Error("@tsparticles/vue3 requires app.use(Particles, { engine, init }).");
  }
  return context;
}
