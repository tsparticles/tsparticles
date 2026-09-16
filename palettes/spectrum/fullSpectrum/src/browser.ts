import { loadFullSpectrumPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFullSpectrumPalette?: typeof loadFullSpectrumPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFullSpectrumPalette = loadFullSpectrumPalette;

export * from "./index.js";
