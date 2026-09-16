import { loadSizeUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSizeUpdater?: typeof loadSizeUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSizeUpdater = loadSizeUpdater;

export * from "./index.js";
