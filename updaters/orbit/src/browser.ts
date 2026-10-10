import { loadOrbitUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOrbitUpdater?: typeof loadOrbitUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOrbitUpdater = loadOrbitUpdater;

export * from "./index.js";
