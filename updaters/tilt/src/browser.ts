import { loadTiltUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTiltUpdater?: typeof loadTiltUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTiltUpdater = loadTiltUpdater;

export * from "./index.js";
