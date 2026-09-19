import { loadDestroyUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDestroyUpdater?: typeof loadDestroyUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDestroyUpdater = loadDestroyUpdater;

export * from "./index.js";
