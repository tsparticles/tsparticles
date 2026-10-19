import { loadSplatterDarkPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSplatterDarkPalette?: typeof loadSplatterDarkPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSplatterDarkPalette = loadSplatterDarkPalette;

export * from "./index.js";
