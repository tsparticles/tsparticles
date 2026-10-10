import { loadRgbPrimariesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRgbPrimariesPalette?: typeof loadRgbPrimariesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRgbPrimariesPalette = loadRgbPrimariesPalette;

export * from "./index.js";
