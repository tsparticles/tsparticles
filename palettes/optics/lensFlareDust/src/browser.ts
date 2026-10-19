import { loadLensFlareDustPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLensFlareDustPalette?: typeof loadLensFlareDustPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLensFlareDustPalette = loadLensFlareDustPalette;

export * from "./index.js";
