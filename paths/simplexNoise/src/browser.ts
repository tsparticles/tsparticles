import { loadSimplexNoisePath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSimplexNoisePath?: typeof loadSimplexNoisePath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSimplexNoisePath = loadSimplexNoisePath;

export * from "./index.js";
