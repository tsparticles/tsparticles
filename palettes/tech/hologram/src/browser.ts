import { loadHologramPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHologramPalette?: typeof loadHologramPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHologramPalette = loadHologramPalette;

export * from "./index.js";
