import { loadFireworksSilverPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksSilverPalette?: typeof loadFireworksSilverPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksSilverPalette = loadFireworksSilverPalette;

export * from "./index.js";
