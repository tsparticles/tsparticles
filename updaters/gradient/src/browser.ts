import { loadGradientUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGradientUpdater?: typeof loadGradientUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGradientUpdater = loadGradientUpdater;

export * from "./index.js";
