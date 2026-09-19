import { loadFogMorningPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFogMorningPalette?: typeof loadFogMorningPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFogMorningPalette = loadFogMorningPalette;

export * from "./index.js";
