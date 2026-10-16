import { loadPoissonDiscPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPoissonDiscPlugin?: typeof loadPoissonDiscPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPoissonDiscPlugin = loadPoissonDiscPlugin;

export * from "./index.js";
