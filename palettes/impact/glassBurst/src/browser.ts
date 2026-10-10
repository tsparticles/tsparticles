import { loadGlassBurstPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGlassBurstPalette?: typeof loadGlassBurstPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGlassBurstPalette = loadGlassBurstPalette;

export * from "./index.js";
