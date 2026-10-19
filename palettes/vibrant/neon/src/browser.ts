import { loadVibrantNeonPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVibrantNeonPalette?: typeof loadVibrantNeonPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVibrantNeonPalette = loadVibrantNeonPalette;

export * from "./index.js";
