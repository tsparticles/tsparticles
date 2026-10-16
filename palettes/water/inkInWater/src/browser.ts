import { loadInkInWaterPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadInkInWaterPalette?: typeof loadInkInWaterPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadInkInWaterPalette = loadInkInWaterPalette;

export * from "./index.js";
