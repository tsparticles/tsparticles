import { loadVaporwavePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVaporwavePalette?: typeof loadVaporwavePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVaporwavePalette = loadVaporwavePalette;

export * from "./index.js";
