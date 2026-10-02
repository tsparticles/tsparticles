import { loadPastelSunsetPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPastelSunsetPalette?: typeof loadPastelSunsetPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPastelSunsetPalette = loadPastelSunsetPalette;

export * from "./index.js";
