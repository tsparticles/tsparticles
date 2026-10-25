import { loadVibrantPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVibrantPalette?: typeof loadVibrantPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVibrantPalette = loadVibrantPalette;

export * from "./index.js";
