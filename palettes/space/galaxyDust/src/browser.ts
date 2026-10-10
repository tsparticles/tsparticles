import { loadGalaxyDustPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGalaxyDustPalette?: typeof loadGalaxyDustPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGalaxyDustPalette = loadGalaxyDustPalette;

export * from "./index.js";
