import { loadTwinkleUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTwinkleUpdater?: typeof loadTwinkleUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTwinkleUpdater = loadTwinkleUpdater;

export * from "./index.js";
