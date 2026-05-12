import { type Engine, createBrowserEngine } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;
const engine = createBrowserEngine();

export function ensureParticlesInitialization(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initialized) {
    return Promise.resolve();
  }

  if (initPromise && initCallback !== init) {
    throw new Error("@tsparticles/vue2 init callback must be stable across the app lifecycle.");
  }

  if (initPromise) {
    return initPromise;
  }

  initCallback = init;
  initPromise = Promise.resolve(init?.(engine))
    .then(() => {
      initialized = true;
    })
    .catch(error => {
      initPromise = undefined;
      initCallback = undefined;
      initialized = false;

      throw error;
    });

  return initPromise;
}

export function waitForParticlesInitialization(): Promise<void> {
  return initPromise ?? Promise.resolve();
}

export function isParticlesInitialized(): boolean {
  return initialized;
}
