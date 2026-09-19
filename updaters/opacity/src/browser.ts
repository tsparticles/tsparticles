import { loadOpacityUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOpacityUpdater?: typeof loadOpacityUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOpacityUpdater = loadOpacityUpdater;

export * from "./index.js";
