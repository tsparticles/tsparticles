import type { Engine } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

type InitializationState = {
  loaded: boolean;
  started: boolean;
  promise: Promise<void>;
  resolve: () => void;
  reject: (error: unknown) => void;
};

const states = new WeakMap<Engine, InitializationState>();

function getInitializationState(engine: Engine): InitializationState {
  const existing = states.get(engine);
  if (existing) {
    return existing;
  }
  let resolve = (): void => {},
    reject: (error: unknown) => void = () => {};
  const promise = new Promise<void>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  const state = { loaded: false, started: false, promise, resolve, reject };
  states.set(engine, state);
  return state;
}

export async function initParticlesEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void> {
  const state = getInitializationState(engine);
  if (!state.started) {
    state.started = true;
    void Promise.resolve()
      .then(async () => {
        await init?.(engine);
        await engine.init();
        state.loaded = true;
        state.resolve();
      })
      .catch((error: unknown) => {
        states.delete(engine);
        state.reject(error);
      });
  }
  return state.promise;
}

export function isParticlesEngineInitialized(engine: Engine): boolean {
  return states.get(engine)?.loaded ?? false;
}

export async function waitForParticlesEngineInitialization(engine: Engine): Promise<void> {
  await getInitializationState(engine).promise;
}
