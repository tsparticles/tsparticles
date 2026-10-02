import { loadDualityBlueYellowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDualityBlueYellowPalette?: typeof loadDualityBlueYellowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDualityBlueYellowPalette = loadDualityBlueYellowPalette;

export * from "./index.js";
