import { loadRotateUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRotateUpdater?: typeof loadRotateUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRotateUpdater = loadRotateUpdater;

export * from "./index.js";
