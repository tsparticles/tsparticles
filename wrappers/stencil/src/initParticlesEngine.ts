import { Engine, tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;
  initPromise = (async () => {
    if (init) {
      await init(tsParticles);
    }

    if (typeof (tsParticles as { init?: () => Promise<void> }).init === "function") {
      await (tsParticles as { init: () => Promise<void> }).init();
    }

    initialized = true;
  })().catch((error: unknown) => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
  return initialized;
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
  await (initPromise ?? Promise.resolve());
}
