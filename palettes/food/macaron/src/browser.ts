import { loadMacaronPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMacaronPalette?: typeof loadMacaronPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMacaronPalette = loadMacaronPalette;

export * from "./index.js";
