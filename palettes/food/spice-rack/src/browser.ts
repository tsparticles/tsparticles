import { loadSpiceRackPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSpiceRackPalette?: typeof loadSpiceRackPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSpiceRackPalette = loadSpiceRackPalette;

export * from "./index.js";
