import { loadCurlNoisePath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCurlNoisePath?: typeof loadCurlNoisePath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCurlNoisePath = loadCurlNoisePath;

export * from "./index.js";
