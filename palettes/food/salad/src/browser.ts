import { loadSaladPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSaladPalette?: typeof loadSaladPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSaladPalette = loadSaladPalette;

export * from "./index.js";
