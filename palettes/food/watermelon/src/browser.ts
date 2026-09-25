import { loadWatermelonPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadWatermelonPalette?: typeof loadWatermelonPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadWatermelonPalette = loadWatermelonPalette;

export * from "./index.js";
