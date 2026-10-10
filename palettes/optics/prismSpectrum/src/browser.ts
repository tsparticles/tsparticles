import { loadPrismSpectrumPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPrismSpectrumPalette?: typeof loadPrismSpectrumPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPrismSpectrumPalette = loadPrismSpectrumPalette;

export * from "./index.js";
