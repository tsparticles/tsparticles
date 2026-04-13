import { tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: typeof tsParticles) => Promise<void> | void;

let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export function ensureParticlesInitialization(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initPromise && initCallback !== init) {
    throw new Error("@tsparticles/vue2 init callback must be stable across the app lifecycle.");
  }

  if (initPromise) {
    return initPromise;
  }

  initCallback = init;
  initPromise = Promise.resolve(init?.(tsParticles)).catch(error => {
    initPromise = undefined;
    initCallback = undefined;

    throw error;
  });

  return initPromise;
}

export function waitForParticlesInitialization(): Promise<void> {
  return initPromise ?? Promise.resolve();
}
