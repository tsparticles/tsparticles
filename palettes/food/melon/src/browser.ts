import { loadMelonPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMelonPalette?: typeof loadMelonPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMelonPalette = loadMelonPalette;

export * from "./index.js";
