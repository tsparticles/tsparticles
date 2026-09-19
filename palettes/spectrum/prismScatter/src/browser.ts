import { loadPrismScatterPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPrismScatterPalette?: typeof loadPrismScatterPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPrismScatterPalette = loadPrismScatterPalette;

export * from "./index.js";
