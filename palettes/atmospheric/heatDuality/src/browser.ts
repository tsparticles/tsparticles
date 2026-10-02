import { loadHeatDualityPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHeatDualityPalette?: typeof loadHeatDualityPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHeatDualityPalette = loadHeatDualityPalette;

export * from "./index.js";
