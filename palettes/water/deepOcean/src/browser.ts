import { loadDeepOceanPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDeepOceanPalette?: typeof loadDeepOceanPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDeepOceanPalette = loadDeepOceanPalette;

export * from "./index.js";
