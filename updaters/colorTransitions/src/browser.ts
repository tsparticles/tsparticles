import { loadColorTransitionsUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColorTransitionsUpdater?: typeof loadColorTransitionsUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColorTransitionsUpdater = loadColorTransitionsUpdater;

export * from "./index.js";
