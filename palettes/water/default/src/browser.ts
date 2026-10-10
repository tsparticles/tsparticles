import { loadWaterPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadWaterPalette?: typeof loadWaterPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadWaterPalette = loadWaterPalette;

export * from "./index.js";
