import { loadVibrantTropicalPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVibrantTropicalPalette?: typeof loadVibrantTropicalPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVibrantTropicalPalette = loadVibrantTropicalPalette;

export * from "./index.js";
