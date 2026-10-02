import { loadFractalNoisePath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFractalNoisePath?: typeof loadFractalNoisePath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFractalNoisePath = loadFractalNoisePath;

export * from "./index.js";
