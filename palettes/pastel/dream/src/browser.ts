import { loadPastelDreamPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPastelDreamPalette?: typeof loadPastelDreamPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPastelDreamPalette = loadPastelDreamPalette;

export * from "./index.js";
