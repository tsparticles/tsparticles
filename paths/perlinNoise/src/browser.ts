import { loadPerlinNoisePath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPerlinNoisePath?: typeof loadPerlinNoisePath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPerlinNoisePath = loadPerlinNoisePath;

export * from "./index.js";
