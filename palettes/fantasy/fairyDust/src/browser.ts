import { loadFairyDustPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFairyDustPalette?: typeof loadFairyDustPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFairyDustPalette = loadFairyDustPalette;

export * from "./index.js";
