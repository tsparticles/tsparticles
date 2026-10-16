import { loadWobbleUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadWobbleUpdater?: typeof loadWobbleUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadWobbleUpdater = loadWobbleUpdater;

export * from "./index.js";
